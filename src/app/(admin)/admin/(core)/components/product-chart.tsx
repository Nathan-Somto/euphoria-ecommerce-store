'use client';

import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

export interface ProductChartProps {
    chartData: { name: string; total: number; color: string }[];
}

export default function ProductChart({ chartData }: ProductChartProps) {
    //const total = chartData.reduce((acc, item) => acc + item.total, 0);

    return (
        <div className="flex flex-col items-center lg:flex-row lg:gap-x-16">
            <ResponsiveContainer height={400} width={'100%'} className="flex-1 max-w-md flex-shrink-0">
                <PieChart
                    width={450}
                    height={450}
                >
                    <Pie
                        data={chartData}
                        dataKey="total"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        label={
                            ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                                return (
                                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                                        {`${(percent * 100).toFixed(0)}%`}
                                    </text>
                                );
                            }
                        }
                        labelLine={false}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>

            <ul className="mt-6 lg:mt-0 lg:ml-6">
                {chartData.map((item, index) => (
                    <li key={index} className="flex items-center mb-2">
                        <span
                            className="inline-block w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: item.color }}
                        ></span>
                        <span className="text-sm font-medium">{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
