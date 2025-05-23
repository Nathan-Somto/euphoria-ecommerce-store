"use client";
import { convertToCurrency } from "@/utils/convertToCurrency";
import { formatter } from "@/utils/formatter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export default function RevenueChart({ chartData }: RevenueChartProps) {
  console.log("the chart data:", chartData);
  return (
    <ResponsiveContainer height={400} width={'100%'}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          tickFormatter={(value) => `${convertToCurrency(+value, '$', '₦')}`}
        />
        <Tooltip formatter={(value) => `${convertToCurrency(+value, '$', '₦')}`} />
        <Legend />
        <Bar dataKey="total" fill="hsl(266,98%,60%)" radius={4} />
      </BarChart>
    </ResponsiveContainer>
  );
}
