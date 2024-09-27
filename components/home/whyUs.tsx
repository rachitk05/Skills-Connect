'use client'

import React from 'react'
import { Button } from "@nextui-org/react";
import Link from "next/link";

// Reusable component for each feature
interface FeatureProps {
    text: string;
}
const Feature: React.FC<FeatureProps>  = ({ text }) => (
    <div className="flex justify-center items-center gap-5">
        <img src={"https://img.icons8.com/?size=50&id=111399&format=png&color=000000"}/>
        <p>{text}</p>
    </div>
);

export default function WhyUs() {
    return (
        <section className="w-full border-b border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-stretch lg:gap-8 gap-10 md:mx-32 p-6">
                {/* Left Section */}
                <div className="flex flex-col gap-10 lg:w-1/2">
                    <p className="font-bold text-xl">Got Talent?</p>
                    <h3 className="font-bold text-3xl">Why job seekers love us</h3>
                    <div className="flex flex-col gap-8 items-start ">
                        <Feature
                            text="Engage directly with hiring managers, cutting out the middlemen and building professional relationships faster."/>
                        <Feature text="Collaborate with potential employers and teammates in real-time using integrated tools for document sharing, video conferencing, and project management."/>
                        <Feature text="Get access to unique job opportunities that aren't available on other platforms, giving you a competitive edge in the job market."/>
                        <Feature text="Easily communicate and collaborate with team members, allowing you to start contributing from day one with streamlined onboarding and project management features."/>
                    </div>
                    <div className="flex gap-5">
                        <Button variant="bordered" as={Link} href={"/about_us"} color="primary">Learn More</Button>
                        <Button as={Link} variant="solid" color="primary" href={"/signup"}>Sign Up</Button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col gap-10 lg:w-1/2 bg-gray-200 p-6 rounded-lg">
                    <p className="font-bold text-xl">Need talent?</p>
                    <h3 className="font-bold text-3xl">Why Recruiters love us</h3>
                    <div className="flex flex-col gap-8 items-start">
                        <Feature
                            text="Connect directly with skilled candidates, bypassing the lengthy recruitment process."/>
                        <Feature text="Manage and track all your job listings in one place, simplifying recruitment for multiple roles."/>
                        <Feature text="Save on recruitment costs by directly connecting with pre-qualified candidates, reducing reliance on external agencies."/>
                        <Feature text="Easily collaborate with your team to review, interview, and hire candidates without leaving the platform."/>
                    </div>
                    <div className="flex gap-5 mt-6">
                        <Button variant="bordered" as={Link} href={"/about_us"} color="primary">Learn More</Button>
                        <Button as={Link} variant="solid" color="primary"  href={"/signup"}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}