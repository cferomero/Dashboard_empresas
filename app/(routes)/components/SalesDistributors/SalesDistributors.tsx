import { CustomIcon } from "@/components/ui/CustomIcon";
import { BarChart } from "lucide-react";
import { GraphicsSubscribers } from "../GraphicsSubscribers";

export function SalesDistributors() {
    return (
        <div className="shadow-sm rounded-lg bg-background p-5">
            <div className="flex gap-x-2 items-center">
                <CustomIcon icon={BarChart}/>
                <p className="text-xl">Sales Distribution</p>
            </div>
            <GraphicsSubscribers />
        </div>
    )
}