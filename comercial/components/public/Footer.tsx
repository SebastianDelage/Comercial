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
    <footer className="border-t-4 border-cyan-500 bg-cyan-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr] lg:px-8 lg:py-20">
        {/* CLUB */}
        <div>
          <div className="flex items-center gap-4">
            <img
              src="/images/branding/logo.png"
              alt={`Escudo de ${CLUB_NAME}`}
              className="h-16 w-16 object-contain"
            />

            <div>
              <p className="font-black uppercase tracking-[0.15em] text-cyan-300">
                Comercial
              </p>

              <p className="text-lg font-bold">
                Rugby Club
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-sm text-sm leading-7 text-cyan-100/70">
            Rugby, hockey, formación, amistad y sentido de pertenencia.
          </p>

          {/* REDES */}
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/comercialrugbyclub/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Comercial Rugby Club"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-2.5 text-sm font-bold text-cyan-50/80 transition hover:border-cyan-300/60 hover:bg-white/10 hover:text-white"
            >
              Instagram
            </a>

            <a
              href="https://www.facebook.com/comercialrugbyclub/events/?ref=page_internal&_rdr"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook de Comercial Rugby Club"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-2.5 text-sm font-bold text-cyan-50/80 transition hover:border-cyan-300/60 hover:bg-white/10 hover:text-white"
            >
              Facebook
            </a>
          </div>
        </div>

        {/* EL CLUB */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
            El club
          </h2>

          <ul className="mt-5 space-y-3">
            {institutionalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cyan-50/70 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* DEPORTES */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
            Deportes
          </h2>

          <ul className="mt-5 space-y-3">
            {sportsLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cyan-50/70 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACTO */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">
            Encontranos
          </h2>

          <div className="mt-5 text-sm leading-7 text-cyan-50/70">
            <p className="font-bold text-white">
              Comercial Rugby Club
            </p>

            <p className="mt-1">
              Ruta 226, km 17,5
            </p>

            <p>
              Sierra de los Padres
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contacto"
                className="inline-flex rounded-xl bg-cyan-500 px-4 py-2.5 font-bold text-cyan-950 transition hover:bg-cyan-300"
              >
                Contactanos
              </Link>

              <a
                href="https://www.google.com/maps/place/Comercial+Rugby+Club/@-37.9126182,-57.7524213,16z/data=!4m6!3m5!1s0x95852ebcbf3e7a17:0x26cf1a163a8de9bf!8m2!3d-37.9116532!4d-57.7529363!16s%2Fg%2F11bzv0q6d1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl border border-white/15 px-4 py-2.5 font-bold text-cyan-50/80 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
              >
                Cómo llegar
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BARRA INFERIOR */}
      <div className="border-t border-white/10 bg-black/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-cyan-50/50 lg:px-8">
          <p>
            © {currentYear} {CLUB_NAME}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}