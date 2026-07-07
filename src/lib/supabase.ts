import { createClient } from "@supabase/supabase-js";

// Nota: usamos el cliente sin el genérico estricto `Database` para evitar fricción de tipos
// entre versiones de @supabase/supabase-js. Los tipos de dominio siguen viviendo en
// `@/types/database.types` y se usan explícitamente en los hooks/servicios que consultan cada tabla.
// Cuando conectes tu proyecto real, podés correr `npx supabase gen types typescript` y volver
// a tipar el cliente si preferís inferencia automática end-to-end.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.error(
    "[GymCore AI] Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Copiá .env.example a .env y completá los valores de tu proyecto Supabase."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
