-- =====================================================================
-- GymCore AI · Migración inicial (Fase 0)
-- Esquema completo multi-tenant (multi-gimnasio) con RBAC
-- =====================================================================

create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- ENUMS
-- ---------------------------------------------------------------------
create type app_role as enum (
  'super_admin',
  'dueno',
  'administrador',
  'recepcion',
  'entrenador',
  'socio'
);

create type member_status as enum ('activo', 'vencido', 'suspendido', 'congelado', 'baja');
create type payment_method as enum ('mercado_pago', 'transferencia', 'efectivo', 'otro');
create type payment_status as enum ('pendiente', 'aprobado', 'rechazado', 'reembolsado');
create type plan_period as enum ('mensual', 'trimestral', 'semestral', 'anual');
create type machine_status as enum ('operativa', 'mantenimiento', 'fuera_de_servicio');
create type notification_type as enum (
  'entrenamiento', 'cuota', 'agua', 'cumpleanos', 'rutina_lista', 'sistema'
);

-- ---------------------------------------------------------------------
-- GYMS (tenants) & SUCURSALES
-- ---------------------------------------------------------------------
create table gyms (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  logo_url text,
  timezone text default 'America/Argentina/Cordoba',
  mercado_pago_public_key text,
  groq_api_key_set boolean default false,
  whatsapp_number text,
  smtp_config jsonb,
  created_at timestamptz default now()
);

create table branches (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid not null references gyms(id) on delete cascade,
  name text not null,
  address text,
  opening_hours jsonb,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- PROFILES (extiende auth.users de Supabase) & ROLES
-- ---------------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  gym_id uuid references gyms(id) on delete set null,
  branch_id uuid references branches(id) on delete set null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  avatar_url text,
  role app_role not null default 'socio',
  is_active boolean default true,
  two_factor_enabled boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_profiles_gym on profiles(gym_id);
create index idx_profiles_role on profiles(role);

-- ---------------------------------------------------------------------
-- MEMBER PROFILE (ficha extendida del socio)
-- ---------------------------------------------------------------------
create table member_details (
  profile_id uuid primary key references profiles(id) on delete cascade,
  birth_date date,
  sex text check (sex in ('masculino', 'femenino', 'otro')),
  height_cm numeric(5,2),
  weight_kg numeric(5,2),
  body_fat_pct numeric(4,2),
  goal text,
  level text check (level in ('principiante', 'intermedio', 'avanzado')),
  start_date date default current_date,
  injuries text,
  restrictions text,
  preferences text,
  weekly_availability jsonb,
  qr_code text unique,
  status member_status not null default 'activo',
  updated_at timestamptz default now()
);

create table member_documents (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  file_url text not null,
  file_name text not null,
  uploaded_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- ASISTENCIAS
-- ---------------------------------------------------------------------
create table attendance (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  branch_id uuid references branches(id),
  checked_in_at timestamptz not null default now(),
  method text check (method in ('qr', 'manual')) default 'qr',
  registered_by uuid references profiles(id)
);

create index idx_attendance_profile_date on attendance(profile_id, checked_in_at);

-- ---------------------------------------------------------------------
-- PLANES & PAGOS
-- ---------------------------------------------------------------------
create table plans (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid not null references gyms(id) on delete cascade,
  name text not null,
  period plan_period not null,
  price numeric(10,2) not null,
  description text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table payments (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  plan_id uuid references plans(id),
  amount numeric(10,2) not null,
  method payment_method not null,
  status payment_status not null default 'pendiente',
  mercado_pago_id text,
  receipt_url text,
  paid_at timestamptz,
  due_date date,
  created_at timestamptz default now()
);

create index idx_payments_profile on payments(profile_id);
create index idx_payments_status on payments(status);

-- ---------------------------------------------------------------------
-- MÁQUINAS (con QR)
-- ---------------------------------------------------------------------
create table machines (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid not null references gyms(id) on delete cascade,
  branch_id uuid references branches(id),
  name text not null,
  photo_url text,
  description text,
  muscle_group text,
  status machine_status not null default 'operativa',
  location text,
  qr_code text unique not null,
  created_at timestamptz default now()
);

create table machine_videos (
  id uuid primary key default uuid_generate_v4(),
  machine_id uuid not null references machines(id) on delete cascade,
  video_url text not null,
  title text
);

-- ---------------------------------------------------------------------
-- EJERCICIOS
-- ---------------------------------------------------------------------
create table exercises (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) on delete cascade,
  name text not null,
  description text,
  common_mistakes text,
  muscle_groups text[] default '{}',
  difficulty text check (difficulty in ('principiante', 'intermedio', 'avanzado')),
  equipment text,
  video_url text,
  gif_url text,
  image_url text,
  machine_id uuid references machines(id),
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- RUTINAS
-- ---------------------------------------------------------------------
create table routines (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  created_by uuid references profiles(id),
  source text check (source in ('ia', 'entrenador')) default 'entrenador',
  name text not null,
  notes text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table routine_exercises (
  id uuid primary key default uuid_generate_v4(),
  routine_id uuid not null references routines(id) on delete cascade,
  exercise_id uuid not null references exercises(id),
  day_of_week int check (day_of_week between 1 and 7),
  sets int not null default 3,
  reps text not null default '10-12',
  weight_kg numeric(6,2),
  rest_seconds int default 60,
  is_superset boolean default false,
  is_circuit boolean default false,
  order_index int default 0,
  notes text
);

create table routine_history (
  id uuid primary key default uuid_generate_v4(),
  routine_exercise_id uuid not null references routine_exercises(id) on delete cascade,
  performed_at timestamptz default now(),
  sets_completed int,
  reps_completed text,
  weight_used_kg numeric(6,2)
);

-- ---------------------------------------------------------------------
-- IA: CONVERSACIONES Y MENSAJES
-- ---------------------------------------------------------------------
create table ai_conversations (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  title text default 'Nueva conversación',
  created_at timestamptz default now()
);

create table ai_messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references ai_conversations(id) on delete cascade,
  role text check (role in ('user', 'assistant')) not null,
  content text not null,
  is_favorite boolean default false,
  attachment_url text,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- SEGUIMIENTO (progreso físico)
-- ---------------------------------------------------------------------
create table progress_logs (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  logged_at date default current_date,
  weight_kg numeric(5,2),
  body_fat_pct numeric(4,2),
  muscle_pct numeric(4,2),
  water_pct numeric(4,2),
  chest_cm numeric(5,2),
  waist_cm numeric(5,2),
  hip_cm numeric(5,2),
  arm_cm numeric(5,2),
  photo_url text,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- NOTIFICACIONES
-- ---------------------------------------------------------------------
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references profiles(id) on delete cascade,
  type notification_type not null,
  title text not null,
  body text,
  is_read boolean default false,
  scheduled_for timestamptz,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_profiles_updated_at before update on profiles
  for each row execute function set_updated_at();

create trigger trg_member_details_updated_at before update on member_details
  for each row execute function set_updated_at();
