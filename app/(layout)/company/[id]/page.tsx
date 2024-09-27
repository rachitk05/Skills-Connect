'use client'
import React from "react";
import CompanyProfileDisplay from "@/components/company/profile";
import {useParams} from "next/navigation";
export default function App() {
    const { id } = useParams();

    return (<>
            <CompanyProfileDisplay companyId={id as string} />
        </>
    );
}
