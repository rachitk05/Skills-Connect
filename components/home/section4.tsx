'use client'

import React from "react"
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Section4() {
    return (
        <section className="lg:mx-42 md:mx-32 my-10 p-6">
            <div className="flex flex-col lg:gap-4 gap-10 lg:flex-row justify-between bg-emerald-900 rounded-3xl p-10">
                {/* Text Section */}
                <div className="flex flex-col items-start justify-center gap-12 text-zinc-50 lg:w-1/2">
                    <Button  as={Link} variant="solid" color="primary" href={"/signup"} >Let's Get Started</Button>
                    <h3 className="font-bold text-3xl lg:text-5xl">
                        Collaborate Seamlessly,<br />
                        Work Effortlessly.
                    </h3>
                    <p className="text-md lg:text-lg">
                        Our collaborative tools are designed to enhance teamwork and productivity. From interactive whiteboards and real-time document editing to integrated chat and video conferencing, you'll have everything you need to stay connected with your team. Keep track of tasks, discussions, and deadlines all in one place with features like time tracking, task management, and organized comment threads.                    </p>
                    <Button variant="solid" as={Link} href={"/about_us"} color="primary">Learn More</Button>
                </div>
                {/* Image Section */}
                <div className="flex lg:w-1/2 justify-center items-center">
                    <img
                        src="https://cdn.prod.website-files.com/64626a4a74818ca87606a29e/651c8dc4feb114a88edaa1b4_Hero-Graphic-RC-p-1080.png"
                        alt="RecruiterCloud AI"
                        className="w-full max-w-lg object-contain"
                    />
                </div>
            </div>
        </section>
    )
}
