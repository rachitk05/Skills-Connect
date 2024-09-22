'use client'
import React from 'react'

export default function Section2() {
    return (
        <section>
            <div className="bg-black text-white w-full py-16 sm:py-24 md:py-32">
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 md:gap-32 items-center justify-center my-10 px-4 sm:px-8 md:px-16">
                    <div className="flex flex-col gap-2 sm:gap-3 items-center justify-center">
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold">8M+</h1>
                        <p className="text-sm sm:text-base md:text-lg">Tech Jobs</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-3 items-center justify-center">
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold">150K+</h1>
                        <p className="text-sm sm:text-base md:text-lg">Tech Jobs</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-3 items-center justify-center">
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold">10M+</h1>
                        <p className="text-sm sm:text-base md:text-lg">Startup Ready Candidates</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3 items-center justify-center">
                    <hr className="w-3/4 sm:w-1/2 md:w-1/3" />
                </div>
            </div>
        </section>
    )
}
