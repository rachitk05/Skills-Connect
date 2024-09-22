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
            <div
                className="flex flex-col lg:flex-row justify-around items-center lg:gap-16 gap-10  md:mx-32 p-6">
                {/* Left Section */}
                <div className="flex flex-col gap-10 lg:min-w-1/2">
                    <p className="font-bold text-xl">Got Talent?</p>
                    <h3 className="font-bold text-3xl">Why job seekers love us</h3>
                    <div className="flex flex-col gap-8 items-start ">
                        <Feature
                            text="Connect directly with founders at top startups - no third party recruiters allowed."/>
                        <Feature text="No job boards, just personal connections with founders."/>
                        <Feature text="Get matched with startups that align with your career goals."/>
                        <Feature text="Access exclusive job opportunities not listed elsewhere."/>
                    </div>
                    <div className="flex gap-5">
                        <Button variant="bordered" color="primary">Learn More</Button>
                        <Button as={Link} variant="solid" color="primary" href={"/signup"}>Sign Up</Button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex flex-col gap-10 lg:min-w-1/2 bg-gray-200 p-6 rounded-lg">
                    <p className="font-bold text-xl">Got Talent?</p>
                    <h3 className="font-bold text-3xl">Why job seekers love us</h3>
                    <div className="flex flex-col gap-8 items-start">
                        <Feature
                            text="Connect directly with founders at top startups - no third party recruiters allowed."/>
                        <Feature text="No job boards, just personal connections with founders."/>
                        <Feature text="Get matched with startups that align with your career goals."/>
                        <Feature text="Access exclusive job opportunities not listed elsewhere."/>
                    </div>
                    <div className="flex gap-5 mt-6">
                        <Button variant="bordered" color="primary">Learn More</Button>
                        <Button as={Link} variant="solid" color="primary"  href={"/signup"}>Sign Up</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
