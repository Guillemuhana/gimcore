import { Activity } from "lucide-react";
import ModulePlaceholder from "@/components/layout/ModulePlaceholder";

export default function Exercises() {
  return (
    <ModulePlaceholder
      title="Ejercicios"
      description="Base de datos editable con videos, GIFs, errores comunes y dificultad."
      icon={Activity}
      phase="Fase 4"
    />
  );
}
