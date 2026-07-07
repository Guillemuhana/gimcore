import { Dumbbell } from "lucide-react";
import ModulePlaceholder from "@/components/layout/ModulePlaceholder";

export default function Trainers() {
  return (
    <ModulePlaceholder
      title="Entrenadores"
      description="Gestión de entrenadores, asignación de socios y disponibilidad."
      icon={Dumbbell}
      phase="Fase 2"
    />
  );
}
