import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || !['admin', 'editor'].includes(profile.role)) {
    redirect('/admin/login')
  }

  const roleLabel =
    profile.role === 'admin' ? 'Administrador' : 'Editor'

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <AdminSidebar />

      <div className="min-w-0 flex-1">
        {/* HEADER SUPERIOR */}
        <header className="border-b border-slate-200 bg-white">
          <div className="flex h-20 items-center justify-between gap-6 px-6 lg:px-10">
            <div className="min-w-0">
              <p className="truncate text-xs font-bold uppercase tracking-[0.16em] text-cyan-700">
                Comercial Rugby Club
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Panel de administración
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-800 sm:inline-flex"
              >
                Ver sitio
                <span className="ml-2" aria-hidden="true">
                  ↗
                </span>
              </a>

              <div className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-800">
                {roleLabel}
              </div>
            </div>
          </div>
        </header>

        {/* CONTENIDO */}
        <main className="px-6 py-8 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-[1400px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}