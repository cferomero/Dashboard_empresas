import React from "react";
import { HeaderCompanies } from "./components/HeaderCompanies";
import { ListCompanies } from "./components/ListCompanies";

export default function CompaniesPage() {
    return (
        <div>
            {/* Header */}
            <HeaderCompanies />
            {/* Lista de las compañias creadas */}
            <ListCompanies />
        </div>
    )
}