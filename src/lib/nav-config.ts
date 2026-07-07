import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Dashboard", path: "/dashboard", icon: "LayoutDashboard" },
  { label: "Socios", path: "/members", icon: "Users" },
  { label: "Pagos", path: "/payments", icon: "CreditCard" },
  { label: "Entrenadores", path: "/trainers", icon: "Dumbbell" },
  { label: "Máquinas", path: "/machines", icon: "Cog" },
  { label: "Rutinas", path: "/routines", icon: "ClipboardList" },
  { label: "Ejercicios", path: "/exercises", icon: "Activity" },
  { label: "Progreso", path: "/progress", icon: "TrendingUp" },
  { label: "IA Personal", path: "/ai", icon: "Sparkles" },
  { label: "Reportes", path: "/reports", icon: "BarChart3" },
  { label: "Configuración", path: "/settings", icon: "Settings" },
];
