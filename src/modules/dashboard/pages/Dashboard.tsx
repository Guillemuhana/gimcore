import { Users, UserX, Wallet, TrendingUp, CalendarCheck, UserPlus } from "lucide-react";
import { useDashboardStats } from "../hooks/useDashboardStats";
import StatsCard from "../components/StatsCard";
import RevenueChart from "../components/RevenueChart";
import AttendanceChart from "../components/AttendanceChart";
import { formatCurrency } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Dashboard() {
  const { data: stats, isLoading, isError } = useDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted">Resumen general del gimnasio, en tiempo real.</p>
      </div>

      {isError && (
        <div className="rounded-xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger">
          No pudimos cargar las métricas. Verificá la conexión con Supabase (.env) y que las migraciones estén aplicadas.
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard
          label="Socios activos"
          value={isLoading ? "…" : String(stats?.activeMembersCount ?? 0)}
          icon={Users}
          accent="primary"
        />
        <StatsCard
          label="Socios vencidos"
          value={isLoading ? "…" : String(stats?.overdueMembersCount ?? 0)}
          icon={UserX}
          accent="danger"
        />
        <StatsCard
          label="Cobros del día"
          value={isLoading ? "…" : formatCurrency(stats?.todayCollections ?? 0)}
          icon={Wallet}
          accent="accent"
        />
        <StatsCard
          label="Ingresos del mes"
          value={isLoading ? "…" : formatCurrency(stats?.monthlyRevenue ?? 0)}
          icon={TrendingUp}
          accent="primary"
        />
        <StatsCard
          label="Asistencias hoy"
          value={isLoading ? "…" : String(stats?.todayAttendance ?? 0)}
          icon={CalendarCheck}
          accent="accent"
        />
        <StatsCard
          label="Nuevos socios (mes)"
          value={isLoading ? "…" : String(stats?.newMembersThisMonth ?? 0)}
          icon={UserPlus}
          accent="warning"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart data={stats?.revenueByMonth ?? []} />
        <AttendanceChart data={stats?.attendanceByDay ?? []} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximos cumpleaños</CardTitle>
          <CardDescription>Socios que cumplen años esta semana</CardDescription>
        </CardHeader>
        <CardContent>
          {stats?.upcomingBirthdays?.length ? (
            <ul className="divide-y divide-border">
              {stats.upcomingBirthdays.map((b) => (
                <li key={b.id} className="flex items-center justify-between py-2 text-sm">
                  <span>{b.name}</span>
                  <span className="text-muted">{b.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Sin cumpleaños próximos por ahora.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
