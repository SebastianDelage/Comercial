import Link from 'next/link'
import { logoutAdmin } from '@/lib/actions/auth-actions'

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r bg-white p-6">
      <h2 className="mb-8 text-xl font-bold">Panel Admin</h2>

      <nav className="space-y-3">
        <Link href="/admin" className="block rounded px-3 py-2 hover:bg-gray-100">
          Dashboard
        </Link>

        <Link href="/admin/posts" className="block rounded px-3 py-2 hover:bg-gray-100">
          Noticias
        </Link>

        <Link href="/admin/pages" className="block rounded px-3 py-2 hover:bg-gray-100">
          Páginas
        </Link>

        <Link href="/admin/gallery" className="block rounded px-3 py-2 hover:bg-gray-100">
          Galería
        </Link>

        <Link href="/admin/settings" className="block rounded px-3 py-2 hover:bg-gray-100">
          Configuración
        </Link>
      </nav>

      <form action={logoutAdmin} className="mt-10">
        <button className="w-full rounded bg-red-600 px-3 py-2 text-white">
          Cerrar sesión
        </button>
      </form>
    </aside>
  )
}