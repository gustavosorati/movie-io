import axios, { AxiosError } from 'axios'
import { MovieBasicDTO } from '@/dtos/MovieDTO'
import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { getSession } from 'next-auth/react'
import { prisma } from '@/lib/prisma'

interface IRequest {
  results: Omit<MovieBasicDTO, "isFavorite">[],
  page: number,
  total_pages: number
}

const schemaRequestBody = z.object({
  page: z.string().optional()
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) { 
  if(req.method !== "GET") {
    return res.status(405).end();
  }

  const { page } = schemaRequestBody.parse(req.query);

  try {
    // Fetch data TMDB API
    const { data: tmdbRequest } = await axios.get<IRequest>(`https://api.themoviedb.org/3/movie/popular?language=pt-Br&page=${page}`, {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN_V4}`
      }
    });

    // Define a Object for work
    const tmdbMovies = tmdbRequest.results.map(movie => {
      return {
        ...movie,
        isFavorite: false
      }
    })   

    // Verify if has session
    const session = await getSession({req});
    if(session){
      // Session Exists, find User
      const userExist = await prisma.user.findUnique({ where: { email: session.user?.email! } })
      if(!userExist) throw new Error('User not found!');
      
      // Find Favorite Movies of this users
      const favorite_movies = await prisma.movies.findMany({
        where: {
          userId: userExist.id
        }
      });
      
      // If User has favorite movies group data
      if(favorite_movies && favorite_movies.length > 0) {

        const movies = tmdbMovies.map(movieTMDB => {
          favorite_movies.map(favoriteMovie => {
            if(favoriteMovie.tmdb_id === movieTMDB.id) {
              movieTMDB.isFavorite = true;
            }
          });
          return movieTMDB;
        });

        return res.status(200).json({
          movies: movies,
          page: tmdbRequest.page
        });
      }
    }
    
    // !Session return API Request has been modify to work
    return res.status(201).json({
      movies: tmdbMovies,
      page: tmdbRequest.page
    });
  } catch (error) {
    if(error instanceof AxiosError) {
      return res.status(400).json({ message: error.response?.data.message });
    }

    return res.status(500).json({ message: "Aconteceu um erro, tente novamente mais tarde" });
  }

}
