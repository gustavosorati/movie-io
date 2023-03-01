import { motion } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react';
import Image from "next/image";
import { HandWaving } from 'phosphor-react';



export function Avatar() {
  const { data } = useSession();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-4">
        {data?.user?.image && (
          <>
            <Image
              src={data.user.image}
              alt="Imagem do avatar"
              width={45}
              height={45}
              className="rounded-full"
            />
          
            <div className="flex flex-col">
              <span className="flex gap-2 text-white/20 text-lg font-bold">
                Olá,
                <motion.div
                  initial={{ rotate: '-16deg' }}
                  animate={{ rotate: '16deg' }}
                  transition={{ duration: .4, repeatType: 'loop' }}
                >
                <HandWaving size={24} />
                </motion.div>
              </span>

              <p className="text-white text-xl font-semibold">{data.user.name}</p>
            </div>
          </>
        )}
      </div>

      <button 
        className='self-end hover:text-s-blue-500 text-xs uppercase'
        onClick={() => signOut()}
      >
        Deslogar
      </button>

    </div>
  )
}