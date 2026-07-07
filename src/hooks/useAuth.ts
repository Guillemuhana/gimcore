import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import type { Profile } from "@/types";

async function loadProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
  if (error) {
    // eslint-disable-next-line no-console
    console.error("[useAuth] error cargando perfil:", error.message);
    return null;
  }
  return data;
}

/**
 * Se monta una única vez en la raíz de la app (ver AppRouter).
 * Sincroniza la sesión de Supabase Auth con el store global de Zustand.
 */
export function useAuthInit() {
  const setProfile = useAuthStore((s) => s.setProfile);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      if (data.session?.user) {
        const profile = await loadProfile(data.session.user.id);
        if (mounted) setProfile(profile);
      }
      if (mounted) setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await loadProfile(session.user.id);
        setProfile(profile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [setProfile, setLoading]);
}

export function useAuth() {
  const profile = useAuthStore((s) => s.profile);
  const isLoading = useAuthStore((s) => s.isLoading);

  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signUp(params: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: { first_name: params.firstName, last_name: params.lastName },
      },
    });
    if (error) throw error;

    if (data.user) {
      const newProfile: Partial<Profile> = {
        id: data.user.id,
        first_name: params.firstName,
        last_name: params.lastName,
        email: params.email,
        role: "socio",
      };
      const { error: profileError } = await supabase.from("profiles").insert(newProfile);
      if (profileError) throw profileError;
    }
  }

  async function resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) throw error;
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return { profile, isLoading, isAuthenticated: !!profile, signIn, signUp, resetPassword, signOut };
}
