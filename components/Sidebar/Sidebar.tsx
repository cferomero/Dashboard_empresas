import { SidebarRoutes } from "../SidebarRoutes"
import { Logo } from "@/components/Logo"

export function Sidebar() {
    return (
        //  Sidebar de la parte responsive design para web pantalla grande
        <div className="h-screen">
            <div className="h-full flex flex-col border-r">
                <Logo />
                <SidebarRoutes />
            </div>
        </div>
    )
}