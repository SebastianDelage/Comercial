import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})


export const metadata: Metadata = {
  title: {
    default: 'Comercial Rugby Club',
    template: '%s | Comercial Rugby Club',
  },

  description:
    'Sitio oficial de Comercial Rugby Club. Noticias, historia, rugby, hockey y actividades del club.',

  keywords: [
    'Comercial Rugby Club',
    'Rugby Mar del Plata',
    'Hockey',
    'Club deportivo',
  ],

  icons: {
    icon: '/images/branding/logo.png',
  },

  openGraph: {
    title: 'Comercial Rugby Club',
    description:
      'Noticias, historia y actualidad del club.',
    type: 'website',
    locale: 'es_AR',
  },
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="es">

      <body
        className={inter.className}
      >
        {children}
      </body>

    </html>
  )
}