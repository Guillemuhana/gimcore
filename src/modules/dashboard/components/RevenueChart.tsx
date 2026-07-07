import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface RevenueChartProps {
  data: { month: string; revenue: number }[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingresos mensuales</CardTitle>
        <CardDescription>Evolución de la facturación aprobada</CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(158 64% 52%)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="hsl(158 64% 52%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 18% 16%)" vertical={false} />
            <XAxis dataKey="month" stroke="hsl(215 14% 60%)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(215 14% 60%)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "hsl(222 25% 9%)",
                border: "1px solid hsl(222 18% 16%)",
                borderRadius: "0.75rem",
                color: "hsl(210 20% 96%)",
              }}
            />
            <Area type="monotone" dataKey="revenue" stroke="hsl(158 64% 52%)" fill="url(#revenueGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
