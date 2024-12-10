import MobileNavBar from "@/components/MobileNavBar";
import SideBar from "@/components/SideBar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser()
  // console.log(loggedIn)

  
  return (
    <main className="flex h-screen w-full font-inter">
        <SideBar user={loggedIn}/>
        <div className="flex size-full flex-col">
          <div className="root-layout">
            <Image
              src='/icons/logo.svg'
              width={30}
              height={30}
              alt="menu icon"
            />
            <div className="">
              <MobileNavBar user={loggedIn}/>
            </div>
          </div>
          {children}
        </div>
        
    </main>
  );
}