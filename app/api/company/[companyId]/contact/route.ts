// Creamos la configuracion para crear un nuevo contacto

import { db } from "@/lib/bd";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(request:Request, {params}: {params: {companyId: string}}) {
    try {
        const {userId} = auth();
        const data = await request.json();

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }


        // Creamos y validamos si la compañia existe para poder crear el contacto
        const company = await db.company.findUnique({
            where: {
                id: params.companyId
            },
        });

        if(!company) {
            return new NextResponse("Company not foun", {status: 404})
        }


        // crear el contacto
        const contact = await db.contact.create({
            data: {
                companyId: params.companyId,
                ...data,
            },
        });

        return NextResponse.json(contact);
        
    } catch(error) {
        console.log("[CONTACT]", error);
        return new NextResponse("Internal error",  {status:500})
    }
}