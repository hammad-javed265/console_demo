"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const TrendMenu = () => {

    const pathname = usePathname();
    return (
        <div>

            <nav className={`mt-4 text-white text-lg slide-from-right`}>
              

                <Link href="/custom_trend" className={`block py-3 px-4 hover:bg-[#12a7ff] text-[16px] rounded ${pathname == "/custom_trend" ? 'bg-[#2b388f] text-white mx-2' : ''}`}>
                    Customized Trend
                </Link>
                <Link href="#" className="block py-3 px-4 hover:bg-[#12a7ff] text-[16px] rounded">
                    Comparision Trend
                </Link>

               
            </nav>
        </div>
    );
};

export default TrendMenu;
