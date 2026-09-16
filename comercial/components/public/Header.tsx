'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import MobileMenu from '@/components/public/MobileMenu'

const CLUB_NAME = 'Comercial Rugby Club'

const navigation = [
  {
    href: '/',
    label: 'Inicio',
  },
  {
    href: '/institucional/historia-del-club',
    label: 'El Club',
  },
  {
    href: '/rugby',
    label: 'Rugby',
  },
  {
    href: '/hockey',
    label: 'Hockey',
  },
  {
    href: '/noticias',
    label: 'Noticias',
  },
  {
    href: '/galeria',
    label: 'Galería',
  },
  {
    href: '/contacto',
    label: 'Contacto',
  },
]

export default function Header() {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-cyan-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
        >
          <img
            src="/images/branding/logo.png"
            alt={`Escudo de ${CLUB_NAME}`}
            className="h-14 w-14 shrink-0 object-contain"
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-black uppercase tracking-[0.12em] text-cyan-700">
              Comercial
            </p>

            <p className="truncate text-base font-bold text-gray-950 sm:text-lg">
              Rugby Club
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={[
                'rounded-lg px-3 py-2 text-sm font-semibold transition xl:px-4',
                isActive(item.href)
                  ? 'bg-cyan-600 text-white'
                  : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-800',
              ].join(' ')}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileMenu clubName={CLUB_NAME} />
      </div>
    </header>
  )
}