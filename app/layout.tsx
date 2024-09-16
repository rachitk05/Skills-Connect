import {Providers} from "./providers";
import '@/styles/globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
})

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en"  className={`${roboto.className} light text-foreground backlight bg-background`} >
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}