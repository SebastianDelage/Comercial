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
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* CLUB */}
        <div>
          <div className="flex items-center gap-4">
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

          <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
            Rugby, hockey, formación, amistad y sentido de pertenencia.
          </p>
        </div>

        {/* EL CLUB */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-cyan-400">
            El club
          </h2>

          <ul className="mt-5 space-y-3">
            {institutionalLinks.map((link) => (
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
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-cyan-400">
            Deportes
          </h2>

          <ul className="mt-5 space-y-3">
            {sportsLinks.map((link) => (
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
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-cyan-400">
            Contacto
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
            <p>
              Encontrá toda la información para comunicarte con
              Comercial Rugby Club.
            </p>

            <Link
              href="/contacto"
              className="inline-flex rounded-xl bg-cyan-600 px-4 py-3 font-bold text-white transition hover:bg-cyan-500"
            >
              Contactanos
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-slate-400 lg:px-8">
          <p>
            © {currentYear} {CLUB_NAME}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}