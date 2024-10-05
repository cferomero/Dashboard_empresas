// Cuando le demos clic al boton del formulario
// y cargar los datos desde aqui
// hacia nuestra base de datos. Creando los endpoints


import { db } from '@/lib/bd';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const  {userId} = auth();
        const data = await req.json();

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401})
        }

        // Pasamos toda la informacion del Data
        const company = await db.company.create({
            data: {
                userId,
                ...data
            }
        });

        return NextResponse.json(company);

    } catch(error) {
        console.log("[COMPANY]", error);
        return new NextResponse("Internal error", { status: 500})
    }
}