// Configuracion de las props para la crealcion de un nuevo evento

import { Company } from "@prisma/client"
import { Dispatch, SetStateAction } from "react"


// Creamos los tipos de las props
export type ModalAddEventProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    setOnSaveNewEvent: Dispatch<SetStateAction<boolean>>
    companies: Company[]
    setNewEvent: Dispatch<SetStateAction<{
        eventName: string
        companiesSelected: {name: string, id: string}
    }>>
}