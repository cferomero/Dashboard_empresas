// Creando las props para
// el formulario de creacion de empresas
import { Dispatch, SetStateAction } from "react"

export type FormCreateCustomersProps = {
    setOpenModalCreate: Dispatch<SetStateAction<boolean>>
}