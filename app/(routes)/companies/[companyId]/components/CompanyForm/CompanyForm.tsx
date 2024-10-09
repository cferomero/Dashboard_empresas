// Componentes del formulario

"use client"

// Companentes estado
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TypeOf, z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Librerias
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// Componentes dev
import { UploadButton } from "@/utils/uploadthing";
import { countries, ICountry } from 'countries-list';
import { EmojiFlags } from "@/utils/emojiFlags";

// Tipados
import { CompanyFormProps } from "./CompanyForm.types";
import { formSchema } from "./CompanyForm.form";


export function CompanyForm(props: CompanyFormProps) {
    const {company} = props;
    const router = useRouter();
    const [photoUploaded,  setPhotoUploaded] = useState(false);
    // Countries
    // Conversión del objeto a array
    const countryList = Object.entries(countries) as [string, ICountry][];


    //Valores por defecto del formulario
    const form = useForm<z.infer<typeof formSchema>> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // Agregamos los valores por defecto desde company de las props
            name: company.name,
            description: company.description,
            country: company.country,
            website: company.website,
            phone: company.phone,
            cif: company.cif,
            profileImage: company.profileImage!
        }
    })


    // funcion del boton onSubmit
    // Boton para actualizar los datos de la empresa
    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/company/${company.id}`, values);
            toast({
                title: 'Company updated',
                variant: 'destructive'
            })
            router.refresh();
        } catch(error) {
            toast({
                title: 'Something went wrong',
                variant: 'destructive'
            })
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-3">
                    {/* Nombre de la compañia */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name company</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name Company" readOnly type="text" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Select del país */}
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
                    {/* Website */}
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input placeholder="Url website" readOnly type="text" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Phone */}
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
                    {/* CIF */}
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
                    {/* Profile image */}
                    <FormField
                        control={form.control}
                        name="profileImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile Image</FormLabel>
                                <FormControl>
                                    <div>
                                        {photoUploaded ? (
                                            <p className="text-sm">Image uploaded</p>
                                        ) : (
                                            <UploadButton
                                                className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted out-3"
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
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="cif"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CIF</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Description"
                                        {...field} 
                                        value={form.getValues().description ?? ''} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">Edit company</Button>
            </form>
        </Form>
    )
}