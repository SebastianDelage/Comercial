import Link from 'next/link'

type FooterProps = {
  clubName: string
  shortDescription?: string | null
  logoUrl?: string | null
  address?: string | null
  phone?: string | null
  contactEmail?: string | null
  whatsappNumber?: string | null
  instagramUrl?: string | null
  facebookUrl?: string | null
  youtubeUrl?: string | null
}

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

export default function Footer({
  clubName,
  shortDescription,
  logoUrl,
  address,
  phone,
  contactEmail,
  whatsappNumber,
  instagramUrl,
  facebookUrl,
  youtubeUrl,
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`
    : null

  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-4">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`Escudo de ${clubName}`}
                className="h-16 w-16 object-contain"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600 font-black">
                CRC
              </div>
            )}

            <div>
              <p className="font-black uppercase tracking-[0.15em] text-cyan-400">
                Comercial
              </p>

              <p className="text-lg font-bold">
                Rugby Club
              </p>
            </div>
          </div>

          {shortDescription && (
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
              {shortDescription}
            </p>
          )}
        </div>

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

          <div className="mt-7 flex flex-wrap gap-3">
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10"
              >
                Instagram
              </a>
            )}

            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10"
              >
                Facebook
              </a>
            )}

            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10"
              >
                YouTube
              </a>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.16em] text-cyan-400">
            Contacto
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-6 text-slate-300">
            {address && (
              <p>
                <span className="block font-semibold text-white">
                  Dirección
                </span>
                {address}
              </p>
            )}

            {phone && (
              <p>
                <span className="block font-semibold text-white">
                  Teléfono
                </span>

                <a
                  href={`tel:${phone}`}
                  className="hover:text-white"
                >
                  {phone}
                </a>
              </p>
            )}

            {contactEmail && (
              <p>
                <span className="block font-semibold text-white">
                  Correo
                </span>

                <a
                  href={`mailto:${contactEmail}`}
                  className="break-all hover:text-white"
                >
                  {contactEmail}
                </a>
              </p>
            )}

            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl bg-cyan-600 px-4 py-3 font-bold text-white hover:bg-cyan-500"
              >
                Escribinos por WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {currentYear} {clubName}. Todos los derechos reservados.
          </p>

          <Link
            href="/admin/login"
            className="hover:text-white"
          >
            Administración
          </Link>
        </div>
      </div>
    </footer>
  )
}