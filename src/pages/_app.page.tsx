import { Router } from "next/router"
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import NProgress from 'nprogress'

import '@/styles/globals.css'
import '@/styles/nprogress.css'

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
})

Router.events.on("routeChangeComplete", (url) => {
  NProgress.done();
})
Router.events.on("routeChangeError", (url) => {
  NProgress.done();
})



export default function App({ 
  Component, 
  pageProps: { session, ...pageProps } 
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
