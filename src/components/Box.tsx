import { ReactNode } from "react"

interface Props {
  children: ReactNode
  classNames?: string;
}

export function Box({children, classNames}: Props) {
  return (
    <div className={`w-full flex bg-[#21242D] p-6 border-2 border-white/10 rounded-lg ${classNames}`}>
      {children}
    </div>
  )
}