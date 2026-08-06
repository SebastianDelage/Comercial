'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { logoutAdmin } from '@/lib/actions/auth-actions'

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/posts', label: 'Noticias' },
  { href: '/admin/pages', label: 'Páginas' },
  { href: '/admin/gallery', label: 'Galería' },
  { href: '/admin/settings', label: 'Configuración' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex min-h-screen w-72 flex-col bg-cyan-600 text-white">
      <div className="border-b border-white/20 p-6">
        <div className="text-2xl font-bold">CRC</div>
        <p className="text-sm text-cyan-100">
          Panel administrativo
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => {
          const isActive =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href)

          return (
            <Link
              key={link.href}
              href={link.href}
              className={[
                'block rounded-xl px-4 py-3 text-sm font-medium transition',
                isActive
                  ? 'bg-white text-cyan-700 shadow-sm'
                  : 'text-white hover:bg-white/15',
              ].join(' ')}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/20 p-4">
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-cyan-700 transition hover:bg-cyan-50"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  )
}