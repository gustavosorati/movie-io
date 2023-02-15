import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  total_pages: number;
}

export function Pagination({total_pages}: Props) {
  const [currentPage, setCurrentPage] = useState(1)

  const router = useRouter()
  const teste = {
    initialPage: 1,
    previousPage: Array.from({length: 3}).map((_, i) => {
      return currentPage - (i + 1)
    }).filter(el => el > 1).reverse(),
    nextPage: Array.from({length: 3}).map((_, i) => {
      return currentPage + (i + 1)
    }).filter(el => el < total_pages),
    lastPage: total_pages
  }

  function handleUpdatePage(index: number) {
    setCurrentPage(index)
    router.push(`?page=${index}`)
  }


  return (
    <div className="flex gap-3 items-center justify-center">
      {teste.initialPage !== currentPage && <p 
        className="bg-white/10 px-2 py-1 rounded-sm"
        onClick={() => handleUpdatePage(teste.initialPage)}
      >{teste.initialPage}</p>}

      {teste.previousPage.map(page => (
        <p 
          key={page} 
          onClick={() => handleUpdatePage(page)} 
          className="bg-white/10 px-2 py-1 rounded-sm"
        >
          {page}
        </p>
      ))}
      <p className="bg-green-500 px-2 py-1 rounded-sm">{currentPage}</p>
      {teste.nextPage.map(page => (
        <p 
          key={page} 
          onClick={() => handleUpdatePage(page)} 
          className="bg-white/10 px-2 py-1 rounded-sm"
        >
          {page}
        </p>      
      ))}
      <p className="bg-white/10 px-2 py-1 rounded-sm">{teste.lastPage}</p>
    </div>
  )
}