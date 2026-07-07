import { CreditCard } from "lucide-react";
import ModulePlaceholder from "@/components/layout/ModulePlaceholder";

export default function Payments() {
  return (
    <ModulePlaceholder
      title="Pagos"
      description="Planes, Mercado Pago, transferencias, efectivo, recibos y deudas."
      icon={CreditCard}
      phase="Fase 3"
    />
  );
}
