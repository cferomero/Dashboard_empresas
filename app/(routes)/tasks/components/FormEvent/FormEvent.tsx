"use client"

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// components UI
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { FormEventProps } from "./FormEvent.types";


// Schema del formulario
const formSchema = z.object({
    eventName: z.string().min(2),
    companiesSelected: z.object({
        name: z.string().min(2),
        id: z.string()
    })
})


export function FormEvent(props: FormEventProps) {
    const {companies, setNewEvent, setOnSaveEvent, setOpen} = props;
    const [selectedCompany, setSelectedCompany] = useState({
        name: "",
        id: ""
    })

    const form = useForm<z.infer<typeof formSchema>> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventName: "",
            companiesSelected: {
                name: "",
                id: ""
            }
        }
    })


    // Funcion para generar el onSubmit del button
    // Genera el newevent, cierra el modal y guarda el evento
    function onSubmit(values: z.infer<typeof formSchema> ) {
        setNewEvent(values)
        setOpen(false)
        setOnSaveEvent(true)
    }

    // funcion para cambiar de empresa
    const handleCompanyChange = (newValue: string) => {
        const selectedCompany = companies.find(company => company.name === newValue)
        if(selectedCompany) {
            setSelectedCompany({
                name: selectedCompany.name,
                id: selectedCompany.id
            })
            form.setValue("companiesSelected.name", selectedCompany.name)
            form.setValue("companiesSelected.id", selectedCompany.id)
        }
    }

    return (
        <Form {...form} >
            <form onClick={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Input del nombre del nuevo evento */}
                <FormField
                    control={form.control}
                    name="eventName"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Your event..." {...field}/>
                            </FormControl>
                            <FormDescription>Your name event.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Input para seleccionar la empresa */}
                <FormField 
                    control={form.control}
                    name="companiesSelected.name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Company name</FormLabel>
                            <Select 
                                onValueChange={(newValue) => {
                                    field.onChange(newValue)
                                    handleCompanyChange(newValue)
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona una compañía" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {companies.map((companie) => (
                                        <SelectItem key={companie.id} value={companie.name}>
                                            {companie.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Boton de enviar */}
                <Button type="submit">Create new event</Button>
            </form>
        </Form>
    )
}