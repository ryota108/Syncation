import '../styles/globals.css'
import { RecoilRoot } from 'recoil';
import  SocketProvider   from '../context/SocketProvider'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <RecoilRoot>
    <SocketProvider>
    <Component {...pageProps} />
    </SocketProvider>
  </RecoilRoot>)
}

export default MyApp
