import { ClipboardList } from "lucide-react";
import ModulePlaceholder from "@/components/layout/ModulePlaceholder";

export default function Routines() {
  return (
    <ModulePlaceholder
      title="Rutinas"
      description="Rutinas por IA o por entrenador: series, repeticiones, superseries y circuitos."
      icon={ClipboardList}
      phase="Fase 5"
    />
  );
}
