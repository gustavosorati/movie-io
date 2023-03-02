import { Heart, HouseSimple } from "phosphor-react"
import { LinkComponent } from "./Link"

import HomeSVG from '../../../assets/category.svg'
import BookSVG from '../../../assets/book.svg'
import { useRouter } from "next/router"

const linksSideBar = [
  {
    id: 1,
    url: '/',
    title: 'Home',
    icon: <HomeSVG />
  },
  {
    id: 2,
    url: '/movie/favorites',
    title: 'Favoritos',
    icon: <BookSVG />,
  },
]


export function LinksComponent() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col items-start justify-start">
      {linksSideBar.map(link => (
        <LinkComponent 
          key={link.id}
          url={link.url}
          icon={link.icon}
          title={link.title}
          isActivePath={router.pathname === link.url}
        />
      ))}  
    </div>
  )
}