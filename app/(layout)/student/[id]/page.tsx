'use client'
import React from "react";
import {useParams} from "next/navigation";
import StudentProfileDisplay from "@/components/Student/profile";
export default function App() {
    const { id } = useParams();
    return (<>
            <StudentProfileDisplay studentId={id as string} />
        </>
    );
}

