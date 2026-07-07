import { Users } from "lucide-react";
import ModulePlaceholder from "@/components/layout/ModulePlaceholder";

export default function Members() {
  return (
    <ModulePlaceholder
      title="Socios"
      description="Alta, edición, baja, suspensión, congelamiento y renovación de membresías."
      icon={Users}
      phase="Fase 2"
    />
  );
}
