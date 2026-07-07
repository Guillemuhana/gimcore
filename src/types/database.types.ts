export type AppRole =
  | "super_admin"
  | "dueno"
  | "administrador"
  | "recepcion"
  | "entrenador"
  | "socio";

export type MemberStatus = "activo" | "vencido" | "suspendido" | "congelado" | "baja";
export type PaymentMethod = "mercado_pago" | "transferencia" | "efectivo" | "otro";
export type PaymentStatus = "pendiente" | "aprobado" | "rechazado" | "reembolsado";
export type PlanPeriod = "mensual" | "trimestral" | "semestral" | "anual";
export type MachineStatus = "operativa" | "mantenimiento" | "fuera_de_servicio";
export type NotificationType =
  | "entrenamiento"
  | "cuota"
  | "agua"
  | "cumpleanos"
  | "rutina_lista"
  | "sistema";

export interface Profile {
  id: string;
  gym_id: string | null;
  branch_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  role: AppRole;
  is_active: boolean;
  two_factor_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface MemberDetails {
  profile_id: string;
  birth_date: string | null;
  sex: "masculino" | "femenino" | "otro" | null;
  height_cm: number | null;
  weight_kg: number | null;
  body_fat_pct: number | null;
  goal: string | null;
  level: "principiante" | "intermedio" | "avanzado" | null;
  start_date: string;
  injuries: string | null;
  restrictions: string | null;
  preferences: string | null;
  weekly_availability: Record<string, unknown> | null;
  qr_code: string | null;
  status: MemberStatus;
  updated_at: string;
}

export interface Attendance {
  id: string;
  profile_id: string;
  branch_id: string | null;
  checked_in_at: string;
  method: "qr" | "manual";
  registered_by: string | null;
}

export interface Plan {
  id: string;
  gym_id: string;
  name: string;
  period: PlanPeriod;
  price: number;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Payment {
  id: string;
  profile_id: string;
  plan_id: string | null;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  mercado_pago_id: string | null;
  receipt_url: string | null;
  paid_at: string | null;
  due_date: string | null;
  created_at: string;
}

export interface Machine {
  id: string;
  gym_id: string;
  branch_id: string | null;
  name: string;
  photo_url: string | null;
  description: string | null;
  muscle_group: string | null;
  status: MachineStatus;
  location: string | null;
  qr_code: string;
  created_at: string;
}

export interface Exercise {
  id: string;
  gym_id: string | null;
  name: string;
  description: string | null;
  common_mistakes: string | null;
  muscle_groups: string[];
  difficulty: "principiante" | "intermedio" | "avanzado" | null;
  equipment: string | null;
  video_url: string | null;
  gif_url: string | null;
  image_url: string | null;
  machine_id: string | null;
  created_at: string;
}

export interface Routine {
  id: string;
  profile_id: string;
  created_by: string | null;
  source: "ia" | "entrenador";
  name: string;
  notes: string | null;
  is_active: boolean;
  created_at: string;
}

export interface RoutineExercise {
  id: string;
  routine_id: string;
  exercise_id: string;
  day_of_week: number | null;
  sets: number;
  reps: string;
  weight_kg: number | null;
  rest_seconds: number;
  is_superset: boolean;
  is_circuit: boolean;
  order_index: number;
  notes: string | null;
}

export interface AiConversation {
  id: string;
  profile_id: string;
  title: string;
  created_at: string;
}

export interface AiMessage {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  is_favorite: boolean;
  attachment_url: string | null;
  created_at: string;
}

export interface ProgressLog {
  id: string;
  profile_id: string;
  logged_at: string;
  weight_kg: number | null;
  body_fat_pct: number | null;
  muscle_pct: number | null;
  water_pct: number | null;
  chest_cm: number | null;
  waist_cm: number | null;
  hip_cm: number | null;
  arm_cm: number | null;
  photo_url: string | null;
  created_at: string;
}

export interface NotificationRow {
  id: string;
  profile_id: string;
  type: NotificationType;
  title: string;
  body: string | null;
  is_read: boolean;
  scheduled_for: string | null;
  created_at: string;
}

// Supabase generated-style Database type (hand-maintained until `supabase gen types` se corre contra el proyecto real)
export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Partial<Profile>; Update: Partial<Profile> };
      member_details: { Row: MemberDetails; Insert: Partial<MemberDetails>; Update: Partial<MemberDetails> };
      attendance: { Row: Attendance; Insert: Partial<Attendance>; Update: Partial<Attendance> };
      plans: { Row: Plan; Insert: Partial<Plan>; Update: Partial<Plan> };
      payments: { Row: Payment; Insert: Partial<Payment>; Update: Partial<Payment> };
      machines: { Row: Machine; Insert: Partial<Machine>; Update: Partial<Machine> };
      exercises: { Row: Exercise; Insert: Partial<Exercise>; Update: Partial<Exercise> };
      routines: { Row: Routine; Insert: Partial<Routine>; Update: Partial<Routine> };
      routine_exercises: { Row: RoutineExercise; Insert: Partial<RoutineExercise>; Update: Partial<RoutineExercise> };
      ai_conversations: { Row: AiConversation; Insert: Partial<AiConversation>; Update: Partial<AiConversation> };
      ai_messages: { Row: AiMessage; Insert: Partial<AiMessage>; Update: Partial<AiMessage> };
      progress_logs: { Row: ProgressLog; Insert: Partial<ProgressLog>; Update: Partial<ProgressLog> };
      notifications: { Row: NotificationRow; Insert: Partial<NotificationRow>; Update: Partial<NotificationRow> };
    };
  };
}
