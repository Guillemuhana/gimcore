import { TrendingUp } from "lucide-react";
import ModulePlaceholder from "@/components/layout/ModulePlaceholder";

export default function Progress() {
  return (
    <ModulePlaceholder
      title="Progreso"
      description="Peso, IMC, fotos, medidas, grasa corporal y comparaciones."
      icon={TrendingUp}
      phase="Fase 6"
    />
  );
}
