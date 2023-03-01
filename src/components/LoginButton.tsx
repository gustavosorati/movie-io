import { signIn } from 'next-auth/react'
import Image from 'next/image'
import GoogleLogoSVG from '../assets/google-icon.svg'

export function LoginButton() {
  return (
    <button 
      className='flex items-center justify-center gap-2 bg-white shadow-lg rounded-md py-2 px-2 text-gray-900 text-xs hover:bg-gray-200'
      onClick={() => signIn('google')}  
    >
      <GoogleLogoSVG />

      Logar com o google
    </button>
  )
}