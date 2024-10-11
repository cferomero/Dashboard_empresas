// ruta Page del calendar

"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import multiMonthPlugin from '@fullcalendar/multiMonth';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateSelectArg,EventContentArg } from "@fullcalendar/core/index.js";

import axios from "axios";

import {formatDate} from "@/lib/formatDate";
import { Toast } from "@/components/ui/toast";

import { CalendarProps } from "./Calendar.types";
import { ModalAddEvent } from "../ModalAddEvent";
import { toast } from "@/hooks/use-toast";

export function Calendar(props: CalendarProps) {
    const {companies, events} = props;
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [onSaveNewEvent, setOnSaveNewEvent] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DateSelectArg>();
    const [newEvent, setNewEvent] = useState({
        // propiedades para el nuevo evento
        eventName: "",
        companiesSelected: {
            name: "",
            id: ""
        }
    });


    // funcion para abrir un modal cuando le doy clic al dia
    const handleDateClick = async (selected: DateSelectArg) => {
        setOpen(true);
        setSelectedItem(selected);
    }

    // Validamos si el newEvent se guardó correctamente
    useEffect(() => {
        if(onSaveNewEvent && selectedItem?.view.calendar) {
            const calendarApi = selectedItem.view.calendar
            calendarApi.unselect()

            // Agregamos el evento a prisma
            // Guardamos el nombre y la fecha del evento
            const newEventPrisma = {
                companyId: newEvent.companiesSelected.id,
                title: newEvent.eventName,
                start: new Date(selectedItem.start),
                allDay: false,
                timeFormat: "H(:mm)"
            }

            // Hacemos la peticion con axios y refrescamos la ruta
            axios.post(`/api/company/${newEvent.companiesSelected.id}/event`, newEventPrisma)
            .then(() => {
                toast({
                    title: "Event created"
                })
                router.refresh()
            })
            .catch(error => {
                toast({
                    title: "Error",
                    variant: "destructive"
                })
            })


            setNewEvent({
                eventName: "",
                companiesSelected: {
                    name: "",
                    id: ""
                }
            })


            setOnSaveNewEvent(false)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSaveNewEvent, selectedItem, events])



    // Funcion para elimiar el evento
    const handleEventClick = async (selected: any) => {
        if(window.confirm(
            `Are you sure  you want to delete this event ${selected.event.title}`
        )) {
            try {
                await axios.delete(`/api/event/${selected.event._def.publicId}`)
                toast({
                    title: "Event deleted"
                })
                router.refresh()
            } catch (error) {
                toast({
                    title: "Something went wrong",
                    variant: "destructive"
                })
            }
        }
    }


    return(
        <div>
            <div className="md:flex gap-x-3">
                <div className="w-[200px] relative">
                    <div className="overflow-auto absolute left-0 top-0 h-full w-full">
                        <p className="mb-3 text-xl">Listado de tareas</p>
                        {/* Mapeamos los eventos de la base de datos */}
                        {events.map((currentEvent) => (
                            // Eventos creados que se muestran al costado
                            <div key={currentEvent.id} className="p-4 rounded-lg shadow-md mb-2 bg-slate-200 dark:bg-background">
                                <p className="font-bold">{currentEvent.title}</p>
                                <p>{formatDate(currentEvent.start)}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 calendar-container">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin]}
                        headerToolbar={{
                            left: "prev,next,today",
                            center: "title",
                            right: "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear,listMonth"
                        }}
                        height="80vh"
                        initialView="dayGridMonth"
                        weekends={false}
                        events={events}
                        eventContent={renderEventContent}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                    />
                </div>
            </div>
            {/* Modal para agregar nuevo evento */}
            <ModalAddEvent
                open={open}
                setOpen={setOpen}
                setOnSaveNewEvent={setOnSaveNewEvent}
                companies={companies}
                setNewEvent={setNewEvent}
            />
        </div>
    )
}



// Render evento content
function renderEventContent(eventInfo: EventContentArg) {
    return (
        <div className="bg-slate-200 dark:bg-background w-full p-1">
            <i>
                {eventInfo.event.title}
            </i>
        </div>
    )
}