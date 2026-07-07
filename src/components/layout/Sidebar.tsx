import { NavLink } from "react-router-dom";
import * as Icons from "lucide-react";
import { navItems } from "@/lib/nav-config";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface md:flex">
      <div className="flex h-16 items-center gap-2 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-bold">
          G
        </div>
        <span className="font-display text-lg font-semibold tracking-tight">GymCore AI</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
            item.icon
          ];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted hover:bg-surface-hover hover:text-foreground"
                )
              }
            >
              {Icon && <Icon className="h-4 w-4" />}
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-border p-4 text-xs text-muted">
        GymCore AI · v0.1.0
      </div>
    </aside>
  );
}
