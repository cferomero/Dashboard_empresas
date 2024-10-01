// Configuracion del uploading de archivos
// en el formulario de new companies

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs";
import { UploadThingError } from "uploadthing/server";


// Constante para crear el upload
const f = createUploadthing();


// Aqui validamos si no existe ningun usuario
const handleAuth = () => {
    const {userId} = auth();

    if(!userId) throw new Error("Unauthorized");
    return {userId};
};

export const ourFileRouter = {
    // Validar el tamaño maximo y el numero maximo de archivos
    // y validar de nuevo que el usuario exista con middleware
    profileImage: f({image: {maxFileSize: "4MB", maxFileCount: 1}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
