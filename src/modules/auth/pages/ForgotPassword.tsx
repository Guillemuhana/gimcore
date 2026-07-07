import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { KeyRound } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email("Ingresá un email válido"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      await resetPassword(values.email);
      setSent(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "No pudimos enviar el email.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <KeyRound className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-semibold">Recuperar contraseña</h1>
          <p className="text-sm text-muted">Te mandamos un link para restablecerla.</p>
        </div>

        {sent ? (
          <div className="rounded-xl bg-primary/10 px-4 py-3 text-center text-sm text-primary">
            Listo, revisá tu casilla de email.
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} error={!!errors.email} />
              {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
            </div>

            {serverError && (
              <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">{serverError}</p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar link"}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted">
          <Link to="/auth/login" className="text-primary hover:underline">
            Volver al login
          </Link>
        </p>
      </div>
    </div>
  );
}
