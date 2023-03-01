import { Box } from "@/components/Box";
import { MovieDTO } from "@/dtos/MovieDTO";

interface Props {
  movie: MovieDTO
}

export function MovieExtraInfo({movie}: Props) {
  return (
    <Box classNames="flex-col w-full max-w-[968px]">
      <div className="flex flex-col">
        <strong>Data de Lançamento</strong>
        <p>{movie.details.release_date}</p>
      </div>

      <div className="flex flex-col">
        <strong>Idioma original</strong>
        <p>{movie.details.original_language}</p>
      </div>

      <div className="flex flex-col">
        <strong>Orçamento</strong>
        <p>{Intl.NumberFormat("pt-BR", {
          currency: "USD",
          style: "currency"
        }).format(movie.details.budget)}</p>
      </div>

      <div className="flex flex-col">
        <strong>Receita</strong>
        <p>{Intl.NumberFormat("pt-BR", {
          currency: "USD",
          style: "currency"
        }).format(movie.details.revenue)}</p>
      </div>
    </Box>
  )
}