import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
import  SocketProvider   from '../context/SocketProvider'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <SocketProvider >
    <RecoilRoot>
     <Component {...pageProps} />
    </RecoilRoot>
  </SocketProvider>
  )
}

export default MyApp
