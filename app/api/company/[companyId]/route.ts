import { db } from '@/lib/bd';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request, {params}: {params: {companyId: string}}) {
    try {
        // Parametros que le pasamos al endpoint
        const {userId} = auth();
        const {companyId} = params;
        const values = await request.json();


        // Validamos si el idUser no existe
        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }


        // En caso que el idUser si exista
        const  company = await db.company.update({
            where: {
                id: companyId,
                userId
            },
            data: { // Pasamos todos los valores que le pasamos por medio del request.json()
                ...values
            }
        });

        return NextResponse.json(company);
    } catch (error) {
        // le enviamos un console.log para verificar en caso de fallar
        // que esta fallando
        console.log("[COMPANY ID]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}


export async function DELETE(req: Request, {params}: {params: {companyId: string}}) {
    try {
        const {userId} = auth();
        const {companyId} = params;

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401})
        }


        const deletedCompany = await db.company.delete({
            where: {
                id: companyId,
            }
        })

        return NextResponse.json(deletedCompany);

    } catch(error) {
        console.log("[DELETE COMPANY ID]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}