import Header from "@/components/home/navbar";

export default function Appp({children}: { children: React.ReactNode }) {
    return (
        <>
            <Header/>
            {children}
        </>
    );
}
