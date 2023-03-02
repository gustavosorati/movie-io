import z from 'zod'
import { AxiosError } from 'axios'
import { prisma } from '@/lib/prisma'
import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'

const schemaMovieRequest = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) { 
  if(req.method !== "POST") {
    return res.status(405).end();
  }

  const session = await getSession({req});
  if(!session?.user){
    return res.status(405).end();
  }

  try {
    const userExist = await prisma.user.findUnique({ where: { email: session?.user?.email! } });
    if(!userExist) throw new Error('User not exists');

    const {id, title, poster_path, vote_average, vote_count} = schemaMovieRequest.parse(req.body);
  
    const moviesAlreadyExists = await prisma.movies.findFirst({
      where: {
        tmdb_id: id
      }
    });

    if(moviesAlreadyExists) {
      await prisma.movies.delete({ where: {
        id: moviesAlreadyExists.id
      }});
    } else {
      await prisma.movies.create({
        data: {
          tmdb_id: id,
          title,
          poster_path,
          vote_count,
          vote_average,
          userId: userExist.id,
          isFavorite: true,
        }
      });
    }
  } catch (error) {
    if(error instanceof AxiosError) {
      return res.status(400).json({ message: error.response?.data.message });
    }

    return res.status(500).json({ message: "Aconteceu um erro, tente novamente mais tarde" });
  }

  return res.status(201).end();
}
