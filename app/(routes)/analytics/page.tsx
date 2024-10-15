import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/bd";
import { CompaniesChart } from "./components/CompaniesChart";


export default async function PageAnalytics() {
    const {userId} = auth();

    // validamos que el usuario exista
    if(!userId) {
        return redirect('/');
    }
    
    
    const companies = await db.company.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })


    const events = await db.event.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    return (
        <div className="p-4 bg-background shadow-md rounded-lg ">
            <h2 className="mb-4 text-2xl">Analytics page</h2>
            <div>
                <CompaniesChart companies={companies} events={events} />
            </div>
        </div>
    )
}