'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Congratulations() {
    const router = useRouter()
    const [countdown, setCountdown] = useState(5)

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1)
        }, 1000)

        const redirect = setTimeout(() => {
            router.push('/')
        }, 5000)

        return () => {
            clearInterval(timer)
            clearTimeout(redirect)
        }
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="text-center">
                <div className="mb-8">
                    <svg
                        className="w-24 h-24 mx-auto text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h1 className="text-4xl font-bold mb-4 text-gray-800">
                    Congratulations!
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    You have successfully applied for the job.
                </p>
                <p className="text-lg text-gray-500">
                    Redirecting in {countdown} seconds...
                </p>
            </div>
        </div>
    )
}