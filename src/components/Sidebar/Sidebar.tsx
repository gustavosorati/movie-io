import Link from "next/link";
import { ArrowSquareRight, Airplay, Heart } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "./components/Avatar";
import { LinkComponent } from "./components/Link";

const linksSideBar = [
  {
    id: 1,
    url: '/',
    title: 'Home',
    icon: <Airplay size={30} weight="fill" />,
  },
  {
    id: 2,
    url: '/favorites',
    title: 'Favoritos',
    icon: <Heart size={30} weight="fill" />,
  },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  function handleToogleSideBar() {
    setIsOpen(state => !state)
  }

  return (
    <nav className={`
      fixed flex flex-col py-6 px-2 
      min-h-screen bg-[#21242D] border-r-2 border-r-white/10
      transition-all ${isOpen ? 'w-96 items-start px-8' : 'w-24 items-center px-2'}
    `}>
      <button className={`inline-flex w-8 h-8 mb-14 ${isOpen && 'animate-rotate self-end'}`}onClick={handleToogleSideBar}>
        <ArrowSquareRight size={32} className="text-s-blue-500" />
      </button>
        
      <header className="mb-16">
        <Avatar isActive={isOpen}/>
      </header>  

      {linksSideBar.map(link => (
        <LinkComponent 
          key={link.id}
          url={link.url}
          icon={link.icon}
          title={link.title}
          isVisible={isOpen}
        />
      ))}   

      <button>Login</button>
    </nav>
  )
}