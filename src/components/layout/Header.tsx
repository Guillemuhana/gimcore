import { Bell, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { profile, signOut } = useAuth();
  const fullName = profile ? `${profile.first_name} ${profile.last_name}` : "";

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-surface/60 px-6 backdrop-blur">
      <div>
        <p className="text-sm text-muted">
          Hola, <span className="font-medium text-foreground">{profile?.first_name ?? "invitado"}</span> 👋
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" aria-label="Notificaciones">
          <Bell className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2 rounded-xl border border-border px-2 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-xs font-semibold text-accent">
            {fullName ? getInitials(fullName) : "?"}
          </div>
          <span className="hidden text-sm sm:inline">{fullName}</span>
        </div>

        <Button variant="ghost" size="icon" aria-label="Cerrar sesión" onClick={() => signOut()}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
