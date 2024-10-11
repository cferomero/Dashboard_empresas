"use client"

import { FormEvent } from "../FormEvent";
import { ModalAddEventProps } from "./ModalAddEvent.types";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ModalAddEvent(props: ModalAddEventProps) {
    const { open, setOpen, setOnSaveNewEvent, companies, setNewEvent} = props;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]:">
                <DialogHeader>
                    <DialogTitle>Add new event</DialogTitle>
                </DialogHeader>
                {/* componente formulario para crear nuevo evento */}
                <FormEvent
                    setOnSaveEvent={setOnSaveNewEvent}
                    companies={companies}
                    setOpen={setOpen}
                    setNewEvent={setNewEvent}
                />
            </DialogContent>
        </Dialog>
    )
}