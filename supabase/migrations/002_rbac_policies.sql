-- =====================================================================
-- GymCore AI · RBAC vía Row Level Security
-- =====================================================================

alter table gyms enable row level security;
alter table branches enable row level security;
alter table profiles enable row level security;
alter table member_details enable row level security;
alter table member_documents enable row level security;
alter table attendance enable row level security;
alter table plans enable row level security;
alter table payments enable row level security;
alter table machines enable row level security;
alter table machine_videos enable row level security;
alter table exercises enable row level security;
alter table routines enable row level security;
alter table routine_exercises enable row level security;
alter table routine_history enable row level security;
alter table ai_conversations enable row level security;
alter table ai_messages enable row level security;
alter table progress_logs enable row level security;
alter table notifications enable row level security;

-- Helper: rol y gym del usuario autenticado
create or replace function auth_role() returns app_role as $$
  select role from profiles where id = auth.uid();
$$ language sql stable security definer;

create or replace function auth_gym_id() returns uuid as $$
  select gym_id from profiles where id = auth.uid();
$$ language sql stable security definer;

create or replace function is_staff() returns boolean as $$
  select auth_role() in ('super_admin', 'dueno', 'administrador', 'recepcion', 'entrenador');
$$ language sql stable security definer;

-- PROFILES: cada uno ve su propio perfil; staff ve los de su gym
create policy profiles_self_select on profiles for select
  using (id = auth.uid() or (is_staff() and gym_id = auth_gym_id()));

create policy profiles_self_update on profiles for update
  using (id = auth.uid() or (is_staff() and gym_id = auth_gym_id()));

create policy profiles_staff_insert on profiles for insert
  with check (is_staff() and gym_id = auth_gym_id());

-- MEMBER_DETAILS: el socio ve lo suyo, staff ve todo su gym
create policy member_details_select on member_details for select
  using (
    profile_id = auth.uid()
    or exists (
      select 1 from profiles p
      where p.id = member_details.profile_id and p.gym_id = auth_gym_id() and is_staff()
    )
  );

create policy member_details_write on member_details for all
  using (
    profile_id = auth.uid()
    or exists (
      select 1 from profiles p
      where p.id = member_details.profile_id and p.gym_id = auth_gym_id() and is_staff()
    )
  );

-- ATTENDANCE: socio ve la suya, staff ve la de su gym
create policy attendance_select on attendance for select
  using (
    profile_id = auth.uid()
    or exists (select 1 from profiles p where p.id = attendance.profile_id and p.gym_id = auth_gym_id() and is_staff())
  );

create policy attendance_insert on attendance for insert
  with check (
    profile_id = auth.uid()
    or is_staff()
  );

-- PAYMENTS: socio ve los suyos; solo staff (recepción+) puede escribir
create policy payments_select on payments for select
  using (
    profile_id = auth.uid()
    or exists (select 1 from profiles p where p.id = payments.profile_id and p.gym_id = auth_gym_id() and is_staff())
  );

create policy payments_write on payments for insert
  with check (is_staff());

create policy payments_update on payments for update
  using (is_staff());

-- PLANS, MACHINES, EXERCISES: lectura para todo el gym, escritura solo staff
create policy plans_select on plans for select
  using (gym_id = auth_gym_id());
create policy plans_write on plans for all
  using (is_staff() and gym_id = auth_gym_id());

create policy machines_select on machines for select
  using (gym_id = auth_gym_id());
create policy machines_write on machines for all
  using (is_staff() and gym_id = auth_gym_id());

create policy exercises_select on exercises for select
  using (gym_id = auth_gym_id() or gym_id is null);
create policy exercises_write on exercises for all
  using (is_staff());

-- ROUTINES: socio ve las suyas; entrenador/staff ve las de su gym
create policy routines_select on routines for select
  using (
    profile_id = auth.uid()
    or exists (select 1 from profiles p where p.id = routines.profile_id and p.gym_id = auth_gym_id() and is_staff())
  );
create policy routines_write on routines for all
  using (
    profile_id = auth.uid()
    or is_staff()
  );

-- AI: cada socio ve únicamente sus propias conversaciones
create policy ai_conversations_owner on ai_conversations for all
  using (profile_id = auth.uid());

create policy ai_messages_owner on ai_messages for all
  using (
    exists (select 1 from ai_conversations c where c.id = ai_messages.conversation_id and c.profile_id = auth.uid())
  );

-- PROGRESS_LOGS: privado por socio, visible para staff de su gym
create policy progress_logs_select on progress_logs for select
  using (
    profile_id = auth.uid()
    or exists (select 1 from profiles p where p.id = progress_logs.profile_id and p.gym_id = auth_gym_id() and is_staff())
  );
create policy progress_logs_write on progress_logs for all
  using (profile_id = auth.uid() or is_staff());

-- NOTIFICATIONS: privado por socio
create policy notifications_owner on notifications for all
  using (profile_id = auth.uid());
