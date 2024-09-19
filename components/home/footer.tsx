'use client'
import React from 'react'

export default function Footer(){
    return(

        <div className={"bg-black text-zinc-50 p-16 flex flex-col gap-10 "}>
            <div className={"flex  justify-around items-center"}>
            <div className={"text-5xl font-bold "}>SKILL CONNECT</div>
                <div className={"flex items-center gap-10  text-sm"}>
                    <div className={"flex flex-col items-start justify-around gap-3"}>
                        <h2 className={"font-bold text-2xl"}>For Candidates</h2>
                        <p>Overview</p>
                        <p>Startup jobs</p>
                        <p>Web3 Jobs</p>
                        <p>Featured</p>
                        <p>Remote</p>
                    </div>
                    <div className={"flex flex-col items-start justify-center gap-3"}>
                        <h2 className={"font-bold text-2xl"}>For Candidates</h2>
                        <p>Overview</p>
                        <p>Startup jobs</p>
                        <p>Web3 Jobs</p>
                        <p>Featured</p>
                        <p>Remote</p>
                    </div>
                    <div className={"flex flex-col items-start justify-center gap-3"}>
                        <h2 className={"font-bold text-2xl"}>For Candidates</h2>
                        <p>Overview</p>
                        <p>Startup jobs</p>
                        <p>Web3 Jobs</p>
                        <p>Featured</p>
                        <p>Remote</p>
                </div>
            </div>
            </div>
            <div className={"flex justify-around items-center"}>
                <p>Copyright © 2024 Skill Connect. All rights reserved.</p>
            </div>

        </div>
    )
}