import { db } from "@/lib/bd";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(request: Request, {params}: {params: {companyId: string}}) {
    try {
        const {userId} = auth();
        const data = await request.json()

        // Validamos si el idUser no existe
        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const company = await db.company.findUnique({
            where: {
                id: params.companyId
            },
        });


        // Validamos si la compañia no retorna nada
        if(!company) {
            return new NextResponse("Company not found", {status: 404});
        }


        // Realizamos la consulta para insertar el evento en la BD
        const event = await db.event.create({
            data: {
                companyId: params.companyId,
                ...data
            }
        })


        return NextResponse.json(event);

    } catch(error) {
        console.log("[EVENT]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}