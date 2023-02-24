import { motion } from 'framer-motion'
import Image from "next/image";
import { HandWaving } from 'phosphor-react';

interface Props {
  isActive: boolean;
}

export function Avatar({isActive}: Props) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src="https://i.pravatar.cc/60"
        alt="Imagem do avatar"
        width={60}
        height={60}
        className="rounded-full"
      />

      {isActive && (
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

          <p className="text-white text-2xl font-semibold">Jonh Doe</p>
        </div>
      )}
    </div>
  )
}