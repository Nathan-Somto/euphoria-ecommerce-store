'use client';
import { ResponsiveContainer,PieChart, Pie, Tooltip } from "recharts";

export default function ProductChart({chartData}:ProductChartProps) {
    return (
        <ResponsiveContainer height={400} width={'100%'}>
            <PieChart
            data={chartData}
            title="Most Purchased Product"
            >
                <Pie dataKey={"total"} nameKey={'name'}  fill="hsl(266,98%,60%)" />
                <Tooltip/>
            </PieChart>
        </ResponsiveContainer>
    )
}