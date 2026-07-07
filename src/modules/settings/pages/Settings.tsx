import { Settings as SettingsIcon } from "lucide-react";
import ModulePlaceholder from "@/components/layout/ModulePlaceholder";

export default function Settings() {
  return (
    <ModulePlaceholder
      title="Configuración"
      description="Datos del gimnasio, planes, roles, sucursales, Mercado Pago, Groq, SMTP y WhatsApp."
      icon={SettingsIcon}
      phase="Fase 6"
    />
  );
}
