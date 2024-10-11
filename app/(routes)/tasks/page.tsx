import { auth } from "@clerk/nextjs";

import { redirect } from "next/navigation";
import { db } from "@/lib/bd";
// calendario
import { Calendar } from "./components/Calendar";



export default async function TasksPage() {
    const {userId} = auth();

    if(!userId) {
        return redirect("/")
    }

    // Realizar la consulta de las compañias en la base de datos
    const companies = await db.company.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })


    // Realizar la consulta de los eventos en la base de datos
    const events = await db.event.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    console.log(events);

    return (
        <div>
            <Calendar companies={companies} events={events} />
        </div>
    )
}