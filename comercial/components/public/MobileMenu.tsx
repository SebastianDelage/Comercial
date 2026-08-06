'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type MobileMenuProps = {
  clubName: string
}

const links = [
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

export default function MobileMenu({
  clubName,
}: MobileMenuProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  function isActive(href: string) {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname.startsWith(href)
  }

  return (
    <>
      <button
        type="button"
        aria-label={
          isOpen
            ? 'Cerrar menú de navegación'
            : 'Abrir menú de navegación'
        }
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-100 bg-white text-cyan-800 shadow-sm lg:hidden"
      >
        <span className="sr-only">
          {isOpen ? 'Cerrar menú' : 'Abrir menú'}
        </span>

        <div className="space-y-1.5">
          <span
            className={[
              'block h-0.5 w-6 bg-current transition',
              isOpen ? 'translate-y-2 rotate-45' : '',
            ].join(' ')}
          />

          <span
            className={[
              'block h-0.5 w-6 bg-current transition',
              isOpen ? 'opacity-0' : '',
            ].join(' ')}
          />

          <span
            className={[
              'block h-0.5 w-6 bg-current transition',
              isOpen ? '-translate-y-2 -rotate-45' : '',
            ].join(' ')}
          />
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
          />

          <aside className="absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                  CRC
                </p>

                <p className="mt-1 font-bold text-gray-950">
                  {clubName}
                </p>
              </div>

              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-700"
              >
                ×
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-5">
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={[
                        'block rounded-xl px-4 py-3 text-base font-semibold transition',
                        isActive(link.href)
                          ? 'bg-cyan-600 text-white'
                          : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-800',
                      ].join(' ')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-gray-100 p-5">
              <Link
                href="/contacto"
                className="block rounded-xl bg-cyan-600 px-5 py-3 text-center text-sm font-bold text-white hover:bg-cyan-700"
              >
                Sumate al club
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  )
}