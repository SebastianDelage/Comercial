'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { logoutAdmin } from '@/lib/actions/auth-actions'

const links = [
  {
    href: '/admin',
    label: 'Inicio',
    description: 'Resumen general',
    icon: HomeIcon,
  },
  {
    href: '/admin/posts',
    label: 'Noticias',
    description: 'Publicaciones del club',
    icon: NewsIcon,
  },
  {
    href: '/admin/gallery',
    label: 'Galería',
    description: 'Álbumes y fotografías',
    icon: GalleryIcon,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 flex-col border-r border-slate-800 bg-slate-950 text-white lg:flex">
      {/* IDENTIDAD */}
      <div className="border-b border-white/10 px-6 py-6">
        <Link
          href="/admin"
          className="flex items-center gap-4"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white p-2">
            <img
              src="/images/branding/logo.png"
              alt="Escudo de Comercial Rugby Club"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-400">
              Comercial
            </p>

            <p className="mt-1 font-bold text-white">
              Administración
            </p>
          </div>
        </Link>
      </div>

      {/* NAVEGACIÓN */}
      <div className="flex-1 px-4 py-6">
        <p className="mb-3 px-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
          Gestión
        </p>

        <nav className="space-y-2">
          {links.map((link) => {
            const isActive =
              link.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(link.href)

            const Icon = link.icon

            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'group flex items-center gap-3 rounded-2xl px-3 py-3 transition',
                  isActive
                    ? 'bg-cyan-500 text-slate-950'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white',
                ].join(' ')}
              >
                <div
                  className={[
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition',
                    isActive
                      ? 'bg-white/20'
                      : 'bg-white/5 group-hover:bg-white/10',
                  ].join(' ')}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold">
                    {link.label}
                  </p>

                  <p
                    className={[
                      'mt-0.5 truncate text-xs',
                      isActive
                        ? 'text-slate-800/70'
                        : 'text-slate-500',
                    ].join(' ')}
                  >
                    {link.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* ACCIONES INFERIORES */}
      <div className="border-t border-white/10 p-4">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <ExternalLinkIcon className="h-5 w-5" />
          Ver sitio público
        </a>

        <form
          action={logoutAdmin}
          className="mt-1"
        >
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-400 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <LogoutIcon className="h-5 w-5" />
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  )
}

function HomeIcon({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  )
}

function NewsIcon({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M7 7h10" />
      <path d="M7 11h10" />
      <path d="M7 15h6" />
    </svg>
  )
}

function GalleryIcon({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
      />
      <circle
        cx="8.5"
        cy="9"
        r="1.5"
      />
      <path d="m5 18 4.5-4.5 3 3 2-2L19 18" />
    </svg>
  )
}

function ExternalLinkIcon({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 4h6v6" />
      <path d="m20 4-9 9" />
      <path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6" />
    </svg>
  )
}

function LogoutIcon({
  className,
}: {
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
    </svg>
  )
}