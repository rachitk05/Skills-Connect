'use client'
import '@/styles/globals.css'
import { Roboto } from 'next/font/google'
import Header from "@/components/home/navbar";

const roboto = Roboto({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})

export default function Appp({children}: { children: React.ReactNode }) {
    return (
        <>
            <Header/>
            {children}
        </>

);
}