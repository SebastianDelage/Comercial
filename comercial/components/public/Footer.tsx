import Link from 'next/link'

const CLUB_NAME = 'Comercial Rugby Club'

const institutionalLinks = [
  {
    href: '/institucional/historia-del-club',
    label: 'Historia',
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

const sportsLinks = [
  {
    href: '/rugby',
    label: 'Rugby',
  },
  {
    href: '/hockey',
    label: 'Hockey',
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-cyan-900/40 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">

          {/* CLUB */}
          <div className="text-center lg:text-left">

            <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-center">

              <img
                src="/images/branding/logo.png"
                alt={`Escudo de ${CLUB_NAME}`}
                className="h-16 w-16 object-contain"
              />

              <div>
                <p className="font-black uppercase tracking-[0.15em] text-cyan-400">
                  Comercial
                </p>

                <p className="text-lg font-bold">
                  Rugby Club
                </p>
              </div>

            </div>

            <p className="mx-auto mt-5 max-w-sm text-sm leading-6 text-slate-300 lg:mx-0">
              Rugby, hockey, formación, amistad y sentido de pertenencia.
            </p>


            <div className="mt-6 flex justify-center gap-3 lg:justify-start">

              <a
                href="https://www.instagram.com/comercialrugbyclub/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/20 px-4 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
              >
                Instagram
              </a>


              <a
                href="https://www.facebook.com/comercialrugbyclub/events/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/20 px-4 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
              >
                Facebook
              </a>

            </div>

          </div>



          {/* EL CLUB */}
          <div className="text-center lg:text-left">

            <h2 className="text-xs font-black uppercase tracking-[0.18em] text-cyan-400">
              El club
            </h2>


            <ul className="mt-5 space-y-3">

              {institutionalLinks.map((link)=>(
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

            </ul>

          </div>




          {/* DEPORTES */}
          <div className="text-center lg:text-left">

            <h2 className="text-xs font-black uppercase tracking-[0.18em] text-cyan-400">
              Deportes
            </h2>


            <ul className="mt-5 space-y-3">

              {sportsLinks.map((link)=>(
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

            </ul>

          </div>




          {/* CONTACTO */}
          <div className="text-center lg:text-left">

            <h2 className="text-xs font-black uppercase tracking-[0.18em] text-cyan-400">
              Encontranos
            </h2>


            <div className="mt-5 text-sm leading-6 text-slate-300">

              <p className="font-bold text-white">
                Comercial Rugby Club
              </p>

              <p>
                Ruta 226, km 17,5
              </p>

              <p>
                Sierra de los Padres
              </p>


              <div className="mt-5 flex justify-center gap-3 lg:justify-start">

                <Link
                  href="/contacto"
                  className="rounded-lg bg-cyan-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-cyan-500"
                >
                  Contactanos
                </Link>


                <a
                  href="https://www.google.com/maps/place/Comercial+Rugby+Club"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/20 px-4 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10"
                >
                  Cómo llegar
                </a>

              </div>

            </div>

          </div>


        </div>

      </div>



      {/* COPYRIGHT */}

      <div className="border-t border-white/10">

        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-xs text-slate-400 lg:px-8">
          © {currentYear} {CLUB_NAME}. Todos los derechos reservados.
        </div>

      </div>


    </footer>
  )
}