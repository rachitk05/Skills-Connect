'use client'

import React from "react"
import {Button} from "@nextui-org/react";
export default function Section4()   {
    return(
        <div className={"lg:mx-48 md-mx-32 my-10"}>
            <div className={" flex justify-between bg-emerald-900 rounded-3xl p-10"}>
                <div className={"flex flex-col items-start justify-center gap-12 text-zinc-50"}>
                    <Button variant="solid" color={"primary"} >Early Access</Button>
                    <h3 className={"font-bold text-5xl "}>Meet RecruiterCloud.<br/>
                        Wellfound's AI recruiter.</h3>
                    <p className={"text-md"}>Here to help with all the logistics. RecruiterCloud finds best fit candidates, vets for interest, and schedules your favorites on your calendar — all in a matter of days.
                        ‍It's that easy.</p>
                    <Button variant="solid" color={"primary"} >Learn More</Button>

                </div>
                <div className={""}>
                    <img src={"https://cdn.prod.website-files.com/64626a4a74818ca87606a29e/651c8dc4feb114a88edaa1b4_Hero-Graphic-RC-p-1080.png"} alt={""} />
                </div>
            </div>
        </div>
    )
}
