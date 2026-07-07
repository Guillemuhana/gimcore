-- =====================================================================
-- GymCore AI · Seed del primer usuario admin
-- =====================================================================
-- Requisitos previos (en la Dashboard de Supabase):
--   1) Correr las migraciones 001 y 002 en el SQL Editor (en ese orden).
--   2) Authentication > Users > "Add user":
--        - Email:    poné tu email
--        - Password: elegí una contraseña
--        - Marcá "Auto Confirm User" (para no depender del email de confirmación)
--   3) Reemplazá 'TU_EMAIL_AQUI' abajo por ese mismo email y ejecutá este script.
--
-- Este script corre como postgres en el SQL Editor, así que ignora RLS y
-- puede crear el primer perfil (rol 'dueno') que de otro modo estaría bloqueado.
-- ---------------------------------------------------------------------

with nuevo_gym as (
  insert into gyms (name)
  values ('Mi Gym')
  returning id
)
insert into profiles (id, gym_id, first_name, last_name, email, role, is_active)
select u.id, nuevo_gym.id, 'Admin', 'GymCore', u.email, 'dueno', true
from auth.users u, nuevo_gym
where u.email = 'demo@gmail.com'
on conflict (id) do update
  set role = excluded.role,
      gym_id = excluded.gym_id,
      is_active = true;

-- Verificación:
select id, email, role, gym_id from profiles;
