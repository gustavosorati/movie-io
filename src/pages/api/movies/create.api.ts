// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) { 
  if(req.method !== "POST") {
    return res.status(405).end()
  }

  const session = await getSession({req})

  if(!session?.user){
    return res.status(405).end()
  }

  const userExist = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!
    }
  })
  if(!userExist) throw new Error('User not exists')

  const {movie, id} = req.body;

  console.log(movie);

  try {
    const moviesAlreadyExists = await prisma.movies.findFirst({
      where: {
        tmdb_id: id
      }
    })
    console.log('O filme já existe => ', moviesAlreadyExists)
    if(moviesAlreadyExists) {
      await prisma.movies.delete({ where: {
        id: moviesAlreadyExists.id
      }})
    } else {
      await prisma.movies.create({
        data: {
          tmdb_id: id,
          title: movie.title,
          poster_path: movie.poster_path,
          vote_count: movie.vote_count,
          vote_average: movie.vote_average,
          userId: userExist.id,
          isFavorite: true,
        }
      })
    }
  } catch (err) {
    console.log(err)
  }
  

  res.status(201).end();
}
