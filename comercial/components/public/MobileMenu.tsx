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

    if (!isOpen) {
      document.body.style.overflow = ''
      return
    }


    document.body.style.overflow = 'hidden'


    function handleEscape(event: KeyboardEvent) {

      if (event.key === 'Escape') {
        setIsOpen(false)
      }

    }


    window.addEventListener(
      'keydown',
      handleEscape
    )


    return () => {
      document.body.style.overflow = ''
      window.removeEventListener(
        'keydown',
        handleEscape
      )
    }

  }, [isOpen])





  function isActive(href: string) {

    if (href === '/') {
      return pathname === '/'
    }


    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    )

  }




  return (
    <>


      {/* BOTÓN */}

      <button
        type="button"
        aria-label={
          isOpen
            ? 'Cerrar menú'
            : 'Abrir menú'
        }
        aria-expanded={isOpen}
        onClick={() =>
          setIsOpen((value) => !value)
        }
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-100 bg-white text-cyan-800 shadow-sm lg:hidden"
      >

        <span className="sr-only">
          {isOpen
            ? 'Cerrar menú'
            : 'Abrir menú'}
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

        <div
          className="fixed inset-0 z-[999] lg:hidden"
          role="dialog"
          aria-modal="true"
        >


          {/* FONDO */}

          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() =>
              setIsOpen(false)
            }
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />






          {/* PANEL */}

          <aside
            className="fixed right-0 top-0 z-[1000] flex h-screen w-[88%] max-w-sm flex-col bg-white shadow-2xl"
          >



            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">


              <div>

                <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">
                  CRC
                </p>


                <p className="mt-1 font-bold text-gray-950">
                  {clubName}
                </p>

              </div>





              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() =>
                  setIsOpen(false)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-xl font-bold text-gray-700 hover:bg-gray-200"
              >
                ×
              </button>


            </div>







            <nav className="flex-1 overflow-y-auto p-5">


              <ul className="space-y-2">


                {links.map((link) => {

                  const active = isActive(link.href)


                  return (

                    <li key={link.href}>


                      <Link
                        href={link.href}
                        aria-current={
                          active
                            ? 'page'
                            : undefined
                        }
                        className={[
                          'block rounded-xl px-4 py-3 text-base font-semibold transition',
                          active
                            ? 'bg-cyan-600 text-white'
                            : 'text-gray-700 hover:bg-cyan-50 hover:text-cyan-800',
                        ].join(' ')}
                      >

                        {link.label}

                      </Link>


                    </li>

                  )

                })}


              </ul>


            </nav>







            <div className="border-t border-gray-100 p-5">


              <Link
                href="/contacto"
                className="block rounded-xl bg-cyan-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-cyan-700"
              >
                Quiero sumarme
              </Link>


            </div>


          </aside>


        </div>

      )}

    </>
  )
}