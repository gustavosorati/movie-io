import { Router } from "next/router"
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import NProgress from 'nprogress'

import '@/styles/globals.css'
import '@/styles/nprogress.css'
import { MoviesContextProvider } from "@/context/MoviesContext"

Router.events.on("routeChangeStart", () => {
  NProgress.start();
})

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
})
Router.events.on("routeChangeError", () => {
  NProgress.done();
})

export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <MoviesContextProvider>
        <Component {...pageProps} />
      </MoviesContextProvider>
    </SessionProvider>
  )
}
