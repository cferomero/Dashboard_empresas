import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/bd";

import { ListContactsProps } from "./ListContacts.types";

import { Mail, Phone } from "lucide-react";

import { Separator } from "@/components/ui/separator";


export async function  ListContacts(props: ListContactsProps) {
    const { company } = props;
    const { userId } = auth();

    if(!userId) {
        return redirect('/');
    }


    // Realizamos la consulta que nos devuelva
    // todos los contactos relacionados al id de la compañia
    const contact = await db.contact.findMany({
        where: {
            company: {
                id: company.id
            }
        }
    })

    // Validamos si no hay contactos, entonces me muestre un mensaje.
    if(contact.length === 0) {
        return <p>Actualmente no dispones de ningun contacto.</p>
    }

    return(
        <div>
            {/* Generamos el HTML */}
            <div className="mt-4 mb-2 grid grid-cols-3 p-2 gap-x-3 items-center justify-between px-4 bg-slate-400/20 rounded-lg">
                <p>Name</p>
                <p>Role</p>
                <p className="text-right">Contact</p>
            </div>

            {/* Extraemos todos los contactos con un Map y lo mostramos en un elemento html */}
            {contact.map((contacts) => (
                <div key={contacts.id}>
                    <div className="grid grid-cols-3 gap-x-3 items-center justify-between px-4">
                        <p>{contacts.name}</p>
                        <p>{contacts.role}</p>
                        <div className="flex items-center gap-x-6 justify-end">
                            <a href={`telto: ${contacts.phone}`} target="_blank">
                                <Phone className="w-4 h-4" />
                            </a>
                            <a href={`mailto: ${contacts.email}`} target="_blank">
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                    <Separator className="my-3" />
                </div>
            ))}
        </div>
    )
}