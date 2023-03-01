import { useSession } from "next-auth/react"

import { Avatar } from "./components/Avatar";
import { LoginButton } from "../LoginButton";
import { LinksComponent } from "./components/LinksComponent";
import { useRouter } from "next/router";
import { useState } from "react";
import { List, X } from "phosphor-react";

export function Sidebar() {
  const {data} = useSession();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  function handleToggleMenu() {
    setMenuIsOpen(prevState => !prevState)
  }

  return (
    <div className="">
      <button 
        className={`fixed top-3 bg-gray-1 p-1 rounded-md z-10 transition-all border-2 border-white/40 focus:border-blue-500 ${menuIsOpen ? 'left-[320px]' : 'left-3'}`}     onClick={handleToggleMenu}
      >
        {menuIsOpen ? <X size={32} /> : <List size={32} />}
      </button>
       
      <nav className={`fixed h-screen bg-gray-1 flex flex-col items-start py-20 border-r-2 border-r-white/10 ransition-all z-10 transition-all ${menuIsOpen ? 'opacity-1 w-72 visible' : 'w-0 opacity-0 invisible'}`}>
          
          <div className="flex-1 w-full">
            <LinksComponent />
          </div>

          <footer className="mt-full self-center">
            {!data?.user ? (
              <LoginButton />
            ) : (
              <Avatar />
            )}
          </footer> 
        </nav> 
      
    </div>

    
  )
}