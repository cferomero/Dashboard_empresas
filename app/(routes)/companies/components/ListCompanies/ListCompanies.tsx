import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/bd";
import { DataTable } from "./data-table";
import { columns } from "./columns";


export async function ListCompanies() {
    const {userId} = auth();

    if(!userId) {
        return redirect('/') // Hacemos un redirect para cuando no exista ningun usuario logeado
    }

    // Hacemos la consulta a la base de datos
    const companies = await db.company.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <DataTable 
            columns={columns} 
            data={companies}
        />
    )
}