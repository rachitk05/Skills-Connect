import '@/styles/globals.css'
import { Roboto } from 'next/font/google'
import type { Metadata } from 'next'

const roboto = Roboto({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Skill Connect',
    description: 'Find the right freelance service, right away. Connect skilled professionals with companies.',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${roboto.className} light`}>
        <body>
            {children}
        </body>
        </html>
    );
}
