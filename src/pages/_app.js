import '@styles/tailwind.css'
import MainLayout from '@layouts/MainLayout'
import { ProviderAuth } from '../hooks/useAuth'

function MyApp({ Component, pageProps }) {
  return (
    <ProviderAuth>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ProviderAuth>
  )
}

export default MyApp
