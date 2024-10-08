// Componente formulario para el registro de empresas
"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormCreateCustomersProps } from "./FormCreateCustomers.types";
import { UploadButton } from "@/utils/uploadthing";
// router
import { useRouter } from "next/navigation";
// axios
import axios from "axios";
// countries
import { countries, ICountry } from 'countries-list';
import { EmojiFlags } from "@/utils/emojiFlags";
import { toast } from "@/hooks/use-toast";


// Defino los valores y los campos y le establexco 
// un mensaje de error al input con ZOD
const formSchema = z.object({
    name: z.string(),
    country: z.string().min(2),
    website: z.string().min(2),
    phone: z.string().min(10),
    cif: z.string().min(6),
    profileImage: z.string()
})


// funcion exportada del formulaio y el html
export function FormCreateCustomers(props: FormCreateCustomersProps) {
    // Definiendo los estados de las propiedades del formulario
    const { setOpenModalCreate } = props; // Creando un destructuring de las props
    const router = useRouter();
    const [photoUploaded, setPhotoUploaded] = useState(false);
    // Countries
    // Conversión del objeto a array
    const countryList = Object.entries(countries) as [string, ICountry][];


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            country: "",
            website: "",
            phone: "",
            cif: "",
            profileImage: ""
        },
    })

    const { isValid } = form.formState // validando el formulario
     
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            // Cuando creemos la empresa. Refrescamos la pag con router.rfresh() y cerramos el form.
            axios.post("/api/company", values) // Pasamos la ruta del endpoint con axios POST. Y los VALUES     ue recibimos atraves del onSubmit
            toast({title: 'Company created'})
            router.refresh()
            setOpenModalCreate(false)
        } catch (error) {
            toast({
                title: 'Something went wrong',
                variant: 'destructive'
            })
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-3">
                        {/* ****----FormFiled cada Campo del formularo */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name Company" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar el país" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {countryList.map(([code,country]) => (
                                                <SelectItem 
                                                    key={code} 
                                                    value={code}
                                                >
                                                    {EmojiFlags(code)} {country.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Url website" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+57 3134 567 890" type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cif"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CIF</FormLabel>
                                    <FormControl>
                                        <Input placeholder="1234567-9" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="profileImage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Profile Image</FormLabel>
                                    <FormControl>
                                        {photoUploaded ? (
                                            <p className="text-center font-semibold text-sm">Image uploaded</p>
                                        ) : (
                                            <UploadButton
                                                className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3"
                                                {...field}
                                                endpoint="profileImage"
                                                onClientUploadComplete={(res) => {
                                                    form.setValue("profileImage", res?.[0].url)
                                                    toast({ // Mostrando el mensaje cuando se carga la foto
                                                        title: "Image uploaded"
                                                    })
                                                    setPhotoUploaded(true)
                                                }}
                                                onUploadError={(error: Error) => {
                                                    toast({ // Mostrando el mensaje cuando hay error para cargar la foto
                                                        title: "Error uploading image"
                                                    })
                                                }}
                                            />
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={!isValid}>Create</Button>
                </form>
            </Form>
        </div>
    )
}