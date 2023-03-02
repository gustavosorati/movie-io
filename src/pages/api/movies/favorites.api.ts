import { AxiosError } from 'axios'
import { prisma } from '@/lib/prisma'
import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) { 
  if(req.method !== "GET") {
    return res.status(405).end()
  }

  const session = await getSession({req});
  if(!session?.user){
    return res.status(405).end();
  }

  try {
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

    return res.status(200).json([...favoriteMovies]);
  } catch (error) {
    if(error instanceof AxiosError) {
      return res.status(400).json({ message: error.response?.data.message });
    }

    return res.status(500).json({ message: "Aconteceu um erro, tente novamente mais tarde" });
  }
}
