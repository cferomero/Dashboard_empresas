import { db } from "@/lib/bd";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function DELETE(request: Request, {params}: {params: {eventId: string}}) {
    try {
        const {userId} = auth();

        // Validamos si el idUser no existe
        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }


        // Realizamos la consulta para eliminar el evento en la BD
        const deleteEvent = await db.event.delete({
            where: {
                id: params.eventId
            }
        })


        return NextResponse.json(deleteEvent);

    } catch(error) {
        console.log("[DELETE_EVENT]", error)
        return new NextResponse("Internal error", {status: 500})
    }
}