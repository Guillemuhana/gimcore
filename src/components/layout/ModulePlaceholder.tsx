import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ModulePlaceholderProps {
  title: string;
  description: string;
  icon: LucideIcon;
  phase: string;
}

export default function ModulePlaceholder({ title, description, icon: Icon, phase }: ModulePlaceholderProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted">{description}</p>
      </div>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-7 w-7" />
          </div>
          <p className="font-display text-lg font-medium">Este módulo se construye en {phase}</p>
          <p className="max-w-md text-sm text-muted">
            La ruta, el layout y los permisos RBAC ya están conectados. El schema en Supabase para este módulo
            también existe — falta la UI e integración final.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
