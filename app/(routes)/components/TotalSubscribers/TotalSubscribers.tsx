"use client"

import { Percent } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend } from 'recharts';
import { CustomIcon } from "@/components/ui/CustomIcon";


const data = [
    {
        name: "website",
        value: 456,
        fill: "#8884d8"
    },
    {
        name: "Instagram",
        value: 750,
        fill: "#00c49f"
    },
    {
        name: "Other",
        value: 220,
        fill: "#ffbb28"
    },
]

export function TotalSubscribers() {
    return (
        <div className="mb-4 lg:mb-0 shadow-sm bg-background rounded-lg p-5 w-full xl:w-96 hover:shadow-lg transition">
            <div className="flex gap-x-2 items-center mb-4">
                <CustomIcon icon={Percent} />
                <p className="text-xl">Total Subscribers</p>
            </div>
            <div className="w-full h-[200px]">
                <ResponsiveContainer aspect={1} maxHeight={200}>
                    <PieChart>
                        <Pie
                            dataKey="value"
                            data={data}
                            outerRadius={80}
                            labelLine={false}
                        />
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}