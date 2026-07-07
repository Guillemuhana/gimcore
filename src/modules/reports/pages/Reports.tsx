import { BarChart3 } from "lucide-react";
import ModulePlaceholder from "@/components/layout/ModulePlaceholder";

export default function Reports() {
  return (
    <ModulePlaceholder
      title="Reportes"
      description="Ingresos, asistencias, retención, máquinas más usadas y horarios pico. Export PDF/Excel."
      icon={BarChart3}
      phase="Fase 6"
    />
  );
}
