import { Cog } from "lucide-react";
import ModulePlaceholder from "@/components/layout/ModulePlaceholder";

export default function Machines() {
  return (
    <ModulePlaceholder
      title="Máquinas"
      description="Fichas con QR, videos, grupo muscular, estado y ejercicios disponibles."
      icon={Cog}
      phase="Fase 4"
    />
  );
}
