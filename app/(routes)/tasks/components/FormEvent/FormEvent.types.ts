import { Company } from "@prisma/client"
import { Dispatch, SetStateAction } from "react"

export type FormEventProps = {
    setNewEvent: Dispatch<SetStateAction<{
        eventName: string,
        companiesSelected: {name: string, id: string}
    }>>,
    setOpen: Dispatch<SetStateAction<boolean>>,
    companies: Company[],
    setOnSaveEvent: Dispatch<SetStateAction<boolean>>
}