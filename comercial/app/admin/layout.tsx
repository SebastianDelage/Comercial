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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <header className="flex h-20 items-center justify-between border-b bg-white px-8">
          <div>
            <p className="text-sm text-gray-500">Comercial Rugby Club</p>
            <h2 className="text-lg font-semibold text-gray-900">
              Administración
            </h2>
          </div>

          <div className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-700">
            Administrador
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}