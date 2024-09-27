'use client';

import React from 'react';

interface QuoteProps {
    content: string;
}

const Quote: React.FC<QuoteProps> = ({ content }) => {
    return (
        <div className="flex flex-col justify-center items-start bg-amber-200 gap-8 px-6 py-6 sm:px-8 sm:py-14 md:px-10 md:py-12 lg:px-12 lg:py-20 rounded-3xl">
            <div className="bg-black rounded-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="39"
                    viewBox="0 0 40 39"
                    fill="none"
                >
                    <path
                        d="M16.8008 17.674H10.4008C9.97643 17.674 9.56947 17.5054 9.26941 17.2053C8.96935 16.9053 8.80078 16.4983 8.80078 16.074V11.274C8.80078 10.8496 8.96935 10.4426 9.26941 10.1426C9.56947 9.84252 9.97643 9.67395 10.4008 9.67395H15.2008C15.6251 9.67395 16.0321 9.84252 16.3322 10.1426C16.6322 10.4426 16.8008 10.8496 16.8008 11.274V20.874C16.8008 25.1412 14.668 27.8068 10.4008 28.874"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M31.2012 17.674H24.8012C24.3768 17.674 23.9699 17.5054 23.6698 17.2053C23.3697 16.9053 23.2012 16.4983 23.2012 16.074V11.274C23.2012 10.8496 23.3697 10.4426 23.6698 10.1426C23.9699 9.84252 24.3768 9.67395 24.8012 9.67395H29.6012C30.0255 9.67395 30.4325 9.84252 30.7325 10.1426C31.0326 10.4426 31.2012 10.8496 31.2012 11.274V20.874C31.2012 25.1412 29.0684 27.8068 24.8012 28.874"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <p className="text-sm sm:text-md md:text-lg lg:text-xl">{content}</p>
        </div>
    );
};

export default Quote;
