'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { logoutAdmin } from '@/lib/actions/auth-actions'

const links = [
  {
    href: '/admin',
    label: 'Inicio',
    description: 'Resumen general',
  },
  {
    href: '/admin/posts',
    label: 'Noticias',
    description: 'Publicaciones del club',
  },
  {
    href: '/admin/gallery',
    label: 'Galería',
    description: 'Álbumes y fotografías',
  },
]

export default function AdminMobileMenu() {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen
      ? 'hidden'
      : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])


  function isActive(href: string) {
    if (href === '/admin') {
      return pathname === '/admin'
    }

    return pathname.startsWith(href)
  }


  return (
    <>
      <button
        type="button"
        aria-label={
          isOpen
            ? 'Cerrar menú'
            : 'Abrir menú'
        }
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex h-11 w-11 items-center justify-center
          rounded-xl border border-slate-200
          bg-white text-slate-800
          shadow-sm transition
          hover:bg-slate-50
        "
      >
        <span className="sr-only">
          {isOpen ? 'Cerrar menú' : 'Abrir menú'}
        </span>


        <div className="space-y-1.5">

          <span
            className={[
              'block h-0.5 w-6 bg-current transition',
              isOpen
                ? 'translate-y-2 rotate-45'
                : '',
            ].join(' ')}
          />

          <span
            className={[
              'block h-0.5 w-6 bg-current transition',
              isOpen
                ? 'opacity-0'
                : '',
            ].join(' ')}
          />

          <span
            className={[
              'block h-0.5 w-6 bg-current transition',
              isOpen
                ? '-translate-y-2 -rotate-45'
                : '',
            ].join(' ')}
          />

        </div>
      </button>


      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">


          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsOpen(false)}
            className="
              absolute inset-0
              bg-slate-950/50
              backdrop-blur-sm
            "
          />


          <aside
            className="
              absolute right-0 top-0
              flex h-full w-[88%] max-w-sm
              flex-col
              bg-slate-950 text-white
              shadow-2xl
              animate-in slide-in-from-right
            "
          >

            {/* HEADER MENU */}
            <div
              className="
                flex items-center justify-between
                border-b border-white/10
                px-6 py-5
              "
            >

              <Link
                href="/admin"
                className="flex items-center gap-3"
              >

                <div className="
                  flex h-12 w-12
                  items-center justify-center
                  rounded-xl bg-white p-2
                ">
                  <img
                    src="/images/branding/logo.png"
                    alt="Comercial Rugby Club"
                    className="h-full w-full object-contain"
                  />
                </div>


                <div>
                  <p className="
                    text-xs font-black uppercase
                    tracking-[0.2em]
                    text-cyan-400
                  ">
                    CRC
                  </p>

                  <p className="mt-1 font-bold">
                    Administración
                  </p>
                </div>

              </Link>


              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setIsOpen(false)}
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-white/10
                  text-2xl
                  transition
                  hover:bg-white/20
                "
              >
                ×
              </button>

            </div>



            {/* NAVEGACIÓN */}
            <nav className="flex-1 overflow-y-auto px-5 py-6">

              <p className="
                mb-3 px-3
                text-[11px]
                font-black
                uppercase
                tracking-[0.2em]
                text-slate-500
              ">
                Gestión
              </p>


              <ul className="space-y-2">

                {links.map((link) => {

                  const active = isActive(link.href)

                  return (
                    <li key={link.href}>

                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={[
                          'block rounded-2xl px-4 py-3 transition',
                          active
                            ? 'bg-cyan-500 text-slate-950'
                            : 'text-slate-300 hover:bg-white/10 hover:text-white',
                        ].join(' ')}
                      >

                        <p className="text-sm font-bold">
                          {link.label}
                        </p>


                        <p
                          className={[
                            'mt-1 text-xs',
                            active
                              ? 'text-slate-800/70'
                              : 'text-slate-500',
                          ].join(' ')}
                        >
                          {link.description}
                        </p>

                      </Link>

                    </li>
                  )

                })}

              </ul>

            </nav>



            {/* FOOTER MENU */}
            <div className="
              border-t border-white/10
              p-5
            ">

              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="
                  block rounded-xl
                  px-4 py-3
                  text-sm font-semibold
                  text-slate-300
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
              >
                Ver sitio público ↗
              </a>


              <form action={logoutAdmin}>

                <button
                  type="submit"
                  className="
                    mt-2 block w-full
                    rounded-xl px-4 py-3
                    text-left
                    text-sm font-semibold
                    text-slate-300
                    transition
                    hover:bg-red-500/10
                    hover:text-red-300
                  "
                >
                  Cerrar sesión
                </button>

              </form>

            </div>

          </aside>

        </div>
      )}
    </>
  )
}