'use client'
import React from 'react'
import {useRouter} from "next/navigation";

export default function Footer() {
    const router= useRouter()
    return (
        <div className={"bg-black text-zinc-50 p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col gap-6 md:gap-8 lg:gap-10"}>
            <div className={"flex flex-col sm:flex-row justify-between sm:justify-around items-center"}>
                <div className={"text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-0"}>SKILL CONNECT</div>
                <div className={"flex flex-col sm:flex-row  gap-6 sm:gap-10 text-xs sm:text-sm"}>
                    <div className={"flex flex-col items-start gap-2 sm:gap-3"}  onClick={() => router.push("/jobs")}>
                        <h2 className={"font-bold text-xl sm:text-2xl"}>For Candidates</h2>
                        <p>Overview</p>
                        <p>Startup jobs</p>
                        <p>Web3 Jobs</p>
                        <p>Featured</p>
                        <p>Remote</p>
                    </div>
                    <div className={"flex flex-col items-start gap-2 sm:gap-3"}>
                        <h2 className={"font-bold text-xl sm:text-2xl"}>For Employers</h2>
                        <p onClick={() => router.push("/jobs/new")}>Post a job</p>
                        <p  onClick={() => router.push("/student/all")}>Startup hiring</p>
                        <p  onClick={() => router.push("/student/all")}>Remote hiring</p>
                    </div>
                    <div onClick={() => router.push("about_us")} className={"flex flex-col items-start gap-2 sm:gap-3"}>
                        <h2 className={"font-bold text-xl sm:text-2xl" }>About Us</h2>
                        <p>Our team</p>
                        <p>Careers</p>
                        <p>Contact</p>
                        <p>FAQs</p>
                    </div>
                </div>
            </div>
            <div className={"flex justify-center mt-6"}>
                <p className={"text-center text-xs sm:text-sm"}>Copyright © 2024 Skill Connect. All rights reserved.</p>
            </div>
        </div>
    )
}
