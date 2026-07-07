# GymCore AI

Plataforma premium para gimnasios. React 19 + Vite + TypeScript + Tailwind + Supabase.

## Estado actual: Fase 0 + Fase 1

Lo que **ya funciona** en este entregable:

- ✅ Proyecto Vite + React 19 + TS + Tailwind configurado (modo oscuro por defecto).
- ✅ Schema SQL completo en `supabase/migrations/001_init_schema.sql` — todas las tablas del brief (gyms, profiles, member_details, attendance, plans, payments, machines, exercises, routines, ai_conversations, progress_logs, notifications, etc).
- ✅ RBAC vía Row Level Security en `supabase/migrations/002_rbac_policies.sql` (super_admin, dueño, administrador, recepción, entrenador, socio).
- ✅ Tipos TypeScript (`src/types/database.types.ts`) reflejando el schema.
- ✅ Auth completo: login, registro, recuperar contraseña, sesión persistida con Supabase Auth + Zustand.
- ✅ Dashboard conectado a datos reales: socios activos/vencidos, cobros del día, ingresos del mes, asistencias, nuevos socios, gráficos (Recharts).
- ✅ Layout premium (sidebar + header) con navegación a los 10 módulos restantes, con RBAC ya cableado en `ProtectedRoute`.
- ✅ Módulos restantes scaffoldeados y ruteados (Socios, Pagos, Entrenadores, Máquinas, Rutinas, Ejercicios, Progreso, Reportes, Configuración, IA) — quedan marcados con la fase en la que se construyen.

## Cómo correrlo

```bash
npm install
cp .env.example .env
# completá VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY con tu proyecto
npm run dev
```

### Setup de Supabase

1. Creá un proyecto en [supabase.com](https://supabase.com).
2. Corré las migraciones en orden (SQL Editor o `supabase db push` si usás la CLI):
   - `supabase/migrations/001_init_schema.sql`
   - `supabase/migrations/002_rbac_policies.sql`
3. Copiá la URL y la anon key a tu `.env`.
4. El primer usuario que se registre queda con rol `socio` por default — para probar como staff, actualizá el `role` manualmente en la tabla `profiles` desde el SQL editor.

## Roadmap (próximas fases)

| Fase | Contenido |
|---|---|
| 2 | Socios (alta/edición/baja, ficha completa, QR personal), Entrenadores, Asistencias por QR |
| 3 | Pagos: Mercado Pago, recibos PDF, alertas de deuda |
| 4 | Máquinas con QR + Ejercicios (videos/GIFs) |
| 5 | Rutinas + IA Personal (Groq) con chat estilo ChatGPT y streaming |
| 6 | Seguimiento, Reportes (export PDF/Excel), Notificaciones, Configuración |

## Stack

React 19 · Vite · TypeScript · TailwindCSS · shadcn/ui (Radix) · Framer Motion · React Router · TanStack Query · Zustand · Supabase (Auth + Postgres + Storage) · Groq API · Mercado Pago · Recharts · React Hook Form · Zod
