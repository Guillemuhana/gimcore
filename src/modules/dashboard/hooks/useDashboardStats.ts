import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export interface DashboardStats {
  activeMembersCount: number;
  overdueMembersCount: number;
  todayCollections: number;
  monthlyRevenue: number;
  todayAttendance: number;
  newMembersThisMonth: number;
  upcomingBirthdays: { id: string; name: string; date: string }[];
  revenueByMonth: { month: string; revenue: number }[];
  attendanceByDay: { day: string; count: number }[];
}

async function fetchDashboardStats(): Promise<DashboardStats> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

  const [
    { count: activeMembersCount },
    { count: overdueMembersCount },
    { data: todayPayments },
    { data: monthPayments },
    { count: todayAttendance },
    { count: newMembersThisMonth },
  ] = await Promise.all([
    supabase.from("member_details").select("*", { count: "exact", head: true }).eq("status", "activo"),
    supabase.from("member_details").select("*", { count: "exact", head: true }).eq("status", "vencido"),
    supabase.from("payments").select("amount").eq("status", "aprobado").gte("paid_at", startOfDay),
    supabase.from("payments").select("amount, paid_at").eq("status", "aprobado").gte("paid_at", startOfMonth),
    supabase.from("attendance").select("*", { count: "exact", head: true }).gte("checked_in_at", startOfDay),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "socio").gte("created_at", startOfMonth),
  ]);

  const todayCollections = ((todayPayments ?? []) as { amount: number }[]).reduce(
    (sum, p) => sum + Number(p.amount),
    0
  );
  const monthlyRevenue = ((monthPayments ?? []) as { amount: number; paid_at: string }[]).reduce(
    (sum, p) => sum + Number(p.amount),
    0
  );

  return {
    activeMembersCount: activeMembersCount ?? 0,
    overdueMembersCount: overdueMembersCount ?? 0,
    todayCollections,
    monthlyRevenue,
    todayAttendance: todayAttendance ?? 0,
    newMembersThisMonth: newMembersThisMonth ?? 0,
    upcomingBirthdays: [],
    revenueByMonth: [],
    attendanceByDay: [],
  };
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
  });
}
