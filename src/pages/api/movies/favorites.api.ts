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
  if(req.method !== "GET") {
    return res.status(405).end()
  }

  const session = await getSession({req})

  const userExist = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!
    }
  })
  if(!userExist) throw new Error('User not exists')

  const favoriteMovies = await prisma.movies.findMany({
    where: {
      userId: userExist.id
    }
  })
  
  // console.log(favoriteMovies)

  res.status(200).json([...favoriteMovies]);
}
