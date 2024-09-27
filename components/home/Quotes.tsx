'use client';

import React from 'react';
import Quote from './Quote';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

interface QuoteData {
    id: number;
    comment: string;
}

const Quotes: React.FC = () => {
    const quotes: QuoteData[] = [
        {
            id: 1,
            comment: "Skill Connect has made my work so much more efficient. I can't imagine my day-to-day tasks without it. It’s like having an extra set of hands!"
        },
        {
            id: 2,
            comment: "This platform has completely changed the way I approach freelance work. It's streamlined every process and saved me countless hours. Truly a game-changer."
        },
        {
            id: 3,
            comment: "Before using Skill Connect, managing multiple projects felt overwhelming. Now, I handle everything smoothly and effortlessly. I recommend this to every freelancer!"
        },
        {
            id: 4,
            comment: "The user interface is absolutely fantastic! It’s so intuitive and easy to navigate that using the platform has become an essential part of my daily routine."
        },
        {
            id: 5,
            comment: "I signed up on a whim, and it’s easily the best decision I’ve made for my career. My productivity has never been this high—Skill Connect is a revelation."
        },
        {
            id: 6,
            comment: "Skill Connect is the missing link I never knew I needed. It has simplified my workflow and helped me focus on what truly matters in my projects."
        },
        {
            id: 7,
            comment: "Since joining Skill Connect, I've felt more organized, productive, and in control of my work. It’s like a personal assistant that never fails."
        },
        {
            id: 8,
            comment: "I was skeptical at first, but Skill Connect exceeded all my expectations. The tools provided have genuinely transformed the way I manage my freelance projects."
        },
        {
            id: 9,
            comment: "The platform's simplicity and functionality are what make it a daily staple in my workflow. It's made organizing and tracking my projects so much easier!"
        },
        {
            id: 10,
            comment: "If you’re serious about improving your productivity and efficiency, you need Skill Connect in your life. It’s been an absolute lifesaver in keeping me on track."
        }
    ];


    return (
        <div className="flex-col flex gap-5 my-32 px-4 sm:px-8 md:px-12 lg:mx-64">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold leading-tight">Quotes</h1>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">From our Users</h3>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent className="flex gap-4">
                    {quotes.map((quote) => (
                        <CarouselItem
                            key={quote.id}
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                        >
                            <Quote content={quote.comment} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default Quotes;
