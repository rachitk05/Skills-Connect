'use client'
import React from 'react'

export default function Section2() {
    return (
        <section>
            <div className="bg-black text-white w-full py-32">
                <div className="flex gap-32 items-center justify-center my-10">
                    <div className="flex flex-col gap-3 items-center justify-center">
                        <h1 className="text-8xl font-bold">8M+</h1>
                        <p className="text-lg">Tech Jobs</p>
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-center">
                        <h1 className="text-8xl font-bold">150K+</h1>
                        <p className="text-lg">Tech Jobs
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-center">
                        <h1 className="text-8xl font-bold">10M+</h1>
                        <p className="text-lg">Startup Ready Candidates</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 items-center justify-center">
                    <hr className="w-1/2" />
                </div>
            </div>
        </section>
    )
}