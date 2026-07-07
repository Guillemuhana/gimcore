import { Sparkles } from "lucide-react";
import ModulePlaceholder from "@/components/layout/ModulePlaceholder";

export default function AiChat() {
  return (
    <ModulePlaceholder
      title="IA Personal"
      description="Chat estilo ChatGPT con tu entrenador virtual: streaming, memoria y contexto real desde Supabase."
      icon={Sparkles}
      phase="Fase 5"
    />
  );
}
