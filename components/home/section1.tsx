'use client'
import React from "react";
import {Button} from "@nextui-org/react";

export default function Section1()  {
    return (
        <section>
            <div className="mx-auto max-w-8xl h-[55vh]"></div>
            <hr/>
            <div className="flex flex-col items-center justify-center gap-10 my-8">
                <h1 className={"text-3xl font-bold text-center"}>Where Skills meet Opportunity</h1>
                <h2 className={"text-1xl font-bold text-center"}>Your gateway to project success—start, bid, and achieve your goals here.</h2>
                <div className="flex items-center justify-center w-full gap-10">
                    <Button className={"w-1/6 p-8 bg-black text-white text-xl"} color={"primary"} variant={"solid"}>Find Your Next Hire</Button>
                    <Button className={"w-1/6 p-8 bg-transparent border-2 hover:bg-black hover:text-white text-black text-xl"} >Find Your Next Job</Button>
                </div>
            </div>
        </section>
    );
};
