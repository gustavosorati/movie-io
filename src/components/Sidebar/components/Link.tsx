import Link from "next/link";
import { ReactElement, ReactNode } from "react";

interface Props {
  url: string
  title: string
  icon: ReactElement
  isVisible: boolean
}

export function LinkComponent({url, title, icon, isVisible}: Props) {
  return (
    <Link href="/" aria-label="Dashboard" className="flex items-center justify-center gap-4 mb-6">
        {icon}
        {isVisible && <p>{title}</p>}
    </Link>
  )
}