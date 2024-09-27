import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {MountainIcon} from "lucide-react";

export default function ComingSoon() {
    return (
        <div className="flex flex-col min-h-[90vh] bg-white">
            <main className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md space-y-8 text-center px-4">
                    <div className="relative w-24 h-24 mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-640 rounded-full opacity-20 animate-pulse"></div>
                        <MountainIcon className="absolute inset-0 m-auto h-12 w-12 black" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                        Coming Soon
                    </h1>
                    <p className="text-xl text-gray-600">
                        We're working hard to bring you the future of student freelancing. Stay tuned!
                    </p>
                </div>
            </main>
            <footer className="py-6 text-center text-gray-500">
                <p className="text-sm">© 2024 Skill Connect. All rights reserved.</p>
            </footer>
        </div>
        )
};