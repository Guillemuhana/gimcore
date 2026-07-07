import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface AttendanceChartProps {
  data: { day: string; count: number }[];
}

export default function AttendanceChart({ data }: AttendanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Asistencias de la semana</CardTitle>
        <CardDescription>Check-ins por día</CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 18% 16%)" vertical={false} />
            <XAxis dataKey="day" stroke="hsl(215 14% 60%)" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(215 14% 60%)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "hsl(222 25% 9%)",
                border: "1px solid hsl(222 18% 16%)",
                borderRadius: "0.75rem",
                color: "hsl(210 20% 96%)",
              }}
              cursor={{ fill: "hsl(222 22% 12%)" }}
            />
            <Bar dataKey="count" fill="hsl(266 85% 66%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
