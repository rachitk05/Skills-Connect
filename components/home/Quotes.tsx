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
            comment: "I can't imagine my day-to-day without this platform. Life would be a lot more difficult.",
        },
        {
            id: 2,
            comment: "This service has revolutionized the way I work. It's a total game-changer!",
        },
        {
            id: 3,
            comment: "I never realized how much I needed this until I started using it. Highly recommended!",
        },
        {
            id: 4,
            comment: "The user interface is so intuitive and smooth, it's a joy to use every day.",
        },
        {
            id: 5,
            comment: "From the moment I signed up, my productivity skyrocketed. Amazing tool!",
        },
        {
            id: 6,
            comment: "A must-have for anyone looking to streamline their workflow. It's a lifesaver.",
        },
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
