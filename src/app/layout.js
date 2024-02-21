import { Inter } from "next/font/google";
import "./globals.css";
import NavMenu from "@/components/nav_options";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Console App",
  description: "Generated by Jahaann",
};

// export default function RootLayout({ children, user }) {
  export default function RootLayout({ children }) {
  // Assuming user has properties like name and image
  // const { name, image } = user;

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          {/* <aside className="flex-shrink-0 w-64 bg-gray-800 text-white h-[97vh] m-3 rounded-2xl"> */}
          <aside className="flex-shrink-0 w-64 text-white h-[97vh] m-3 rounded-2xl relative overflow-hidden bg-center bg-contain bg-no-repeat" style={{ backgroundImage: 'url("./logo.png")', background: 'rgb(0,127,255)',background: 'linear-gradient(180deg, rgba(0,127,255,1) 0%, rgba(17,164,255,1) 50%, rgba(57,255,255,1) 100%)'}}>
          <div className="p-4 text-center rounded-2xl"  style={{ boxShadow: 'inset grey 0px 0px 60px -25px' }}>
              <img
                src={'./user.png'}
                alt="User Image"
                className="w-[auto] h-16 rounded-full mb-2 m-[auto]"
              />
              <p className="text-lg text-white">Hammad</p>
              {/* <p className="text-sm text-gray-300">{name}</p> */}
            </div>
           <NavMenu></NavMenu>
            <img
                src={'./Jahaanns.png'}
                alt="User Image"
                className="w-full h-[auto] rounded-full absolute m-[auto] bottom-0"
              />
          </aside>
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="bg-[#0091cf] text-white p-2 m-3 rounded-2xl flex">
             <p className="p-[12px]">Navbar Content</p>
            <img
                src={'./logout.png'}
                alt="User Image"
                className="w-[auto] h-12 rounded-full ml-[auto] cursor-pointer"
              />
              </header>
            <main className="flex-1 overflow-x-hidden overflow-y-auto m-3 bg-center bg-contain bg-no-repeat" style={{ backgroundImage: 'url("./bglogo.png")'}}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
