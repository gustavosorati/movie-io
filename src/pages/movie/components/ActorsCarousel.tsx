import { Box } from "@/components/Box"
import { MovieDTO } from "@/dtos/MovieDTO";
import { motion } from "framer-motion";
import Image from "next/image";
import { User } from "phosphor-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  movie: MovieDTO
}

export function ActorsCarousel({movie}: Props) {
  const carrousel = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(carrousel.current!.scrollWidth - carrousel.current!.offsetWidth)
  }, [])

  return (
    <Box classNames="flex-col w-full max-w-[1010px]">
      <h2 className="text-base font-medium text-white/40 mb-4">Elenco</h2>

          <motion.div 
            className="carousel w-full h-[450px] flex relative cursor-grab overflow-hidden"
            whileTap={{ cursor: "grabbing" }}
            ref={carrousel}
          >
            <motion.div 
              className="inner absolute top-0 left-0 flex gap-6 h-[368px]"
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {movie.cast.map((actor, index) => {
                return (
                  <motion.a key={index + actor.name} className="w-[250px] h-[368px]">
                    {actor.profile_path !== null
                    ? (
                      <>
                        <Image
                          className="rounded-xl pointer-events-none"
                          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                          alt={actor.name}
                          width={250}
                          height={368}
                          loading="lazy"
                        />

                        <strong className="text-sm tracking-wider	">{actor.name}</strong>
                        <br />
                        <span className="text-white/40">Interpretando: {actor.character}</span>
                      </>
                      )
                    : (
                      <>
                        <div className="rounded-xl bg-gray-800 max-w-[250px] w-full h-full flex items-center justify-center">
                          <User size={32} weight="fill" className="text-white/10" />
                        </div>

                        <strong className="text-sm tracking-wider	">{actor.name}</strong>
                        <br />
                        <span className="text-white/40">Interpretando: {actor.character}</span>
                      </>
                    )}
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>   
        </Box>
  )
}