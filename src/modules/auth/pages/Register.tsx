import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dumbbell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z
  .object({
    firstName: z.string().min(2, "Ingresá tu nombre"),
    lastName: z.string().min(2, "Ingresá tu apellido"),
    email: z.string().email("Ingresá un email válido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      await signUp({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      });
      setSuccess(true);
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "No pudimos crear tu cuenta.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <Dumbbell className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-semibold">Creá tu cuenta</h1>
          <p className="text-sm text-muted">Empezá tu camino con un entrenador con IA.</p>
        </div>

        {success ? (
          <div className="rounded-xl bg-primary/10 px-4 py-3 text-center text-sm text-primary">
            Cuenta creada. Revisá tu email para confirmar y te llevamos al login.
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" {...register("firstName")} error={!!errors.firstName} />
                {errors.firstName && <p className="text-xs text-danger">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" {...register("lastName")} error={!!errors.lastName} />
                {errors.lastName && <p className="text-xs text-danger">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} error={!!errors.email} />
              {errors.email && <p className="text-xs text-danger">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" {...register("password")} error={!!errors.password} />
              {errors.password && <p className="text-xs text-danger">{errors.password.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
              <Input id="confirmPassword" type="password" {...register("confirmPassword")} error={!!errors.confirmPassword} />
              {errors.confirmPassword && <p className="text-xs text-danger">{errors.confirmPassword.message}</p>}
            </div>

            {serverError && (
              <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">{serverError}</p>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted">
          ¿Ya tenés cuenta?{" "}
          <Link to="/auth/login" className="text-primary hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
