'use client'
import React from "react";
import Header from "@/components/home/navbar";
import Section1 from "@/components/home/section1";
import Section2 from "@/components/home/section2";
import WhyUs from "@/components/home/whyUs";
import Section4 from "@/components/home/section4";
import Quotes from "@/components/home/Quotes";
import Footer from "@/components/home/footer";
export default function App() {
    return (<>
            <Header/>
            <Section1/>
            <Section2/>
            <WhyUs/>
            <Section4/>
            <hr/>
            <Quotes/>
            <Footer/>
        </>


    );
}
