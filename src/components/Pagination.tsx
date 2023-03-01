import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  total_pages: number;
  current_page: number;
}

export function Pagination({total_pages, current_page}: Props) {
  const [currentPage, setCurrentPage] = useState(current_page);

  const router = useRouter();

  const pagination = {
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
    setCurrentPage(index);
    router.push(`?page=${index}`);
  }

  return (
    <div className="flex flex-wrap gap-3 items-center justify-center">
      
      {/* Index Página 1 */}
      {pagination.initialPage !== currentPage && <p 
        className="bg-white/10 px-2 py-1 rounded-sm"
        onClick={() => handleUpdatePage(pagination.initialPage)}
      >{pagination.initialPage}</p>}

      {/* Páginas anteriores ao index atual */}
      {pagination.previousPage.map(page => (
        <p 
          key={page} 
          onClick={() => handleUpdatePage(page)} 
          className="bg-white/10 px-2 py-1 rounded-sm"
        >
          {page}
        </p>
      ))}

      {/* Index Atual */}
      <p className="bg-green-500 px-2 py-1 rounded-sm">{currentPage}</p>

      {/* Páginas posteriores ao index atual */}
      {pagination.nextPage.map(page => (
        <p 
          key={page} 
          onClick={() => handleUpdatePage(page)} 
          className="bg-white/10 px-2 py-1 rounded-sm"
        >
          {page}
        </p>      
      ))}

      {/* Ultímo index */}
      <p className="bg-white/10 px-2 py-1 rounded-sm">{pagination.lastPage}</p>
    </div>
  )
}