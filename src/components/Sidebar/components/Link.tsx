import Link from "next/link";
import { ReactElement } from "react";

interface Props {
  url: string
  title: string
  icon: ReactElement
  isActivePath: boolean;
}


export function LinkComponent({url, title, icon, isActivePath}: Props) {
  
  return (
    <Link 
      href={url} 
      aria-label={title} 
      className="
        w-full flex gap-2 py-4 px-8 items-center transition-all text-white/40
        hover:bg-gray-400 hover:text-black
      ">
        {icon}
        
        <p className="flex-1 font-bold text-base">{title}</p>

        {isActivePath && <div className=" w-4 h-4 bg-green-500 rounded-full shadow-[-1px_-1px_20px_1px_rgba(0,0,0,0.1)] shadow-green-500" />}
    </Link>
  )
}