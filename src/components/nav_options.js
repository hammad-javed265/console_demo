"use client";
import React, { useState } from 'react';

const NavMenu = () => {
    const [showDashboardSubMenu, setShowDashboardSubMenu] = useState(false);
    const [showReportsSubMenu, setShowReportsSubMenu] = useState(false);

    const toggleDashboardSubMenu = () => {
        setShowDashboardSubMenu(!showDashboardSubMenu);
    };

    const toggleReportsSubMenu = () => {
        setShowReportsSubMenu(!showReportsSubMenu);
    };

    return (
        <nav className="mt-4 text-white text-lg">
            <a href="#" className="flex items-center py-2 px-4 hover:bg-[#12a7ff] rounded" onClick={toggleDashboardSubMenu}>
                <p className='flex-grow'> Dashboard </p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-5 w-5 transition-transform ${showDashboardSubMenu ? "transform rotate-180" : ""
                        }`}
                >
                    <path
                        fillRule="evenodd"
                        d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </a>

            {showDashboardSubMenu && (
                <ul className="bg-[#1988eb] ml-8">
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-[#12a7ff] rounded">
                           - Plant Summary
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-[#12a7ff] rounded">
                           - Energy Comparision
                        </a>
                    </li>
                </ul>
            )}

            <a href="#" className="block py-2 px-4 hover:bg-[#12a7ff] rounded">
                SLD
            </a>

            <a href="#" className="block py-2 px-4 hover:bg-[#12a7ff] rounded">
                Trends
            </a>

            <a href="#" className="flex items-center py-2 px-4 hover:bg-[#12a7ff] rounded" onClick={toggleReportsSubMenu}>
            <p className='flex-grow'> Reports </p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`h-5 w-5 transition-transform  ${showReportsSubMenu ? "transform rotate-180" : ""
                        }`}
                >
                    <path
                        fillRule="evenodd"
                        d="M6.293 7.293a1 1 0 0 1 1.414 0L10 9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </a>
            {showReportsSubMenu && (
                <ul className="bg-[#1988eb] ml-8">
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-[#12a7ff] rounded">
                           - Cost Report
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 px-4 hover:bg-[#12a7ff] rounded">
                           - Usage Report
                        </a>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default NavMenu;
