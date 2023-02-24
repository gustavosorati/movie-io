import { ReactNode } from "react"

interface Props {
  title: string;
  children: ReactNode
}

export function MovieGrid({title, children}: Props) {
  return (
    <section className="flex flex-col flex-wrap max-w-[946px] w-full mb-16">
      <h2 className="text-white/20 text-lg font-bold mb-10">{title}</h2>

      <div className="flex flex-wrap gap-6 w-full">
        {children}
      </div>      
    </section>
  )
}