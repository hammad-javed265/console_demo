"use client";
import { useState, useEffect } from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardMenu from "@/components/dashboard_options";
import Link from 'next/link';
import DiagramMenu from '@/components/diagram_options';
import TrendMenu from '@/components/trend_options';
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog, faGear } from '@fortawesome/free-solid-svg-icons';
import SettingMenu from '@/components/setting_options';

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Console App",
//   description: "Generated by Jahaann",
// };

const DynamicMenu = ({ activeTab }) => {
  if (activeTab === 'Home') {
    return <DashboardMenu />;
  } else if (activeTab === 'Diagram') {
    return <DiagramMenu />;
  } else if (activeTab === 'Trends') {
    return <TrendMenu />;
  } else if (activeTab === 'Setting') {
    return <SettingMenu/>;
  }
  // Add more conditions for other tabs if needed
  return null; // Default case, return null or any default component
};

export default function RootLayout({ children }) {
  const [activeTab, setActiveTab] = useState('Home');
  const pathname = usePathname();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Check different conditions for setting activeTab based on pathname
    setActiveTab((prevTab) => {
      if (window.location.pathname === '/sld') {
        return 'Diagram';
      } else if (window.location.pathname === '/custom_trend') {
        return 'Trends';
      } else if (window.location.pathname === '/user') {
        return 'Setting';
      }
      // Add more conditions for other pathnames if needed
      return prevTab;
    });
  }, []);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          {/* <aside className="flex-shrink-0 w-64 bg-gray-800 text-white h-[97vh] m-3 rounded-2xl"> */}
          <aside className="flex-shrink-0 w-72 text-white h-[97vh] m-3 rounded-2xl relative overflow-hidden bg-center bg-contain bg-no-repeat" style={{ backgroundImage: 'url("./logo.png")', background: 'rgb(0,127,255)', background: 'linear-gradient(180deg, rgba(0,127,255,1) 0%, rgba(17,164,255,1) 50%, rgba(57,255,255,1) 100%)' }}>
            <div className="p-4 text-center rounded-2xl" style={{ boxShadow: 'inset grey 0px 0px 60px -25px' }}>
              <img
                src={'./user.png'}
                alt="User Image"
                className="w-[auto] h-16 rounded-full mb-2 m-[auto]"
              />
              <p className="text-lg text-white">Hammad Javed</p>
              {/* <p className="text-sm text-gray-300">{name}</p> */}
            </div>
            {/* sidebar */}
            <DynamicMenu activeTab={activeTab} />
            <img
              src={'./Jahaanns.png'}
              alt="User Image"
              className="w-full h-[auto] rounded-full absolute m-[auto] bottom-0"
            />
          </aside>
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* <NavBar></NavBar> */}
            <header className="bg-[#0091cf] text-white m-3 p-2 rounded-2xl flex">
              <Link href="#" className={`py-[8px] px-4`} onClick={() => handleTabClick('Home')}>
                <p className={`px-4 py-1 cursor-pointer rounded-lg ${pathname === '/' ? 'bg-white text-black' : ''}`}>Home</p>
              </Link>
              <Link href="#" className={`py-[8px] px-4`} onClick={() => handleTabClick('Diagram')}>
                <p className={`px-4 py-1 cursor-pointer rounded-lg ${pathname === '/sld' ? 'bg-white text-black' : ''}`}>Diagram</p>
              </Link>
              <Link href="#" className={`py-[8px] px-4`} onClick={() => handleTabClick('Trends')}>
                <p className={`px-4 py-1 cursor-pointer rounded-lg ${activeTab === 'Trends' ? 'bg-white text-black' : ''}`}>Trends</p>
              </Link>
              <Link href="#" className={`py-[8px] px-4`} onClick={() => handleTabClick('Alarms')}>
                <p className={`px-4 py-1 cursor-pointer rounded-lg ${activeTab === 'Alarms' ? 'bg-white text-black' : ''}`}>Alarms</p>
              </Link>
              <Link href="#" className={`py-[8px] px-4`} onClick={() => handleTabClick('Reports')}>
                <p className={`px-4 py-1 cursor-pointer rounded-lg ${activeTab === 'Reports' ? 'bg-white text-black' : ''}`}>Reports</p>
              </Link>
              {/* <Link href="/user" className={`py-[8px] px-4`}>
                <p className={`px-4 py-1 cursor-pointer rounded-lg ${pathname == "/user" ? 'bg-white text-black' : ''}`}><FontAwesomeIcon icon={faUserCog} /> User Managment</p>
              </Link> */}
              <Link href="#" className={`py-[8px] px-4`} onClick={() => handleTabClick('Setting')}>
                <p className={`px-4 py-1 cursor-pointer rounded-lg ${activeTab === 'Setting' ? 'bg-white text-black' : ''}`}><FontAwesomeIcon icon={faGear} /> Settings</p>
              </Link>
              <img
                src={'./logout.png'}
                alt="User Image"
                className="w-[auto] h-12 rounded-full ml-[auto] cursor-pointer"
              />
            </header>
            <main className="flex-1 overflow-x-hidden overflow-y-auto m-3 bg-center bg-contain bg-no-repeat" style={{ backgroundImage: 'url("./bglogo.png")' }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
