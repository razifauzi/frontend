import MobileNavBar from "@/components/MobileNavBar";
import SideBar from "@/components/SideBar";

import Image from "next/image";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  // console.log(loggedIn)

  
  return (
    <main className="flex h-screen w-full font-inter">
        <SideBar />
        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image
              src='/icons/logo.svg'
              width={30}
              height={30}
              alt="menu icon"
            />
            <div className="">
              <MobileNavBar />
            </div>
          </div>
          {children}
        </div>
        
    </main>
  );
}
