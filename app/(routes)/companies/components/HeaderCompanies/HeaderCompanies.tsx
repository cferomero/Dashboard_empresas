"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { FormCreateCustomers } from "../FormCreateCustomers";

export function HeaderCompanies() {
    const [openModalCreate, setOpenModalCreate] = useState(false);
    return (
        <div className="flex justify-between items-center">
            <h2 className="text-2xl">List of companies</h2>
            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button>
                        Create Company
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Customer</DialogTitle>
                        <DialogDescription>Create and configure your Customer</DialogDescription>
                    </DialogHeader>

                    <FormCreateCustomers />
                </DialogContent>
            </ Dialog>
        </div>
    )
}