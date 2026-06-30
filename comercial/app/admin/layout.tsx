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
    error: userError,
  } = await supabase.auth.getUser()

  console.log('DEBUG user:', user?.id, user?.email, 'error:', userError)

  if (!user) {
    redirect('/admin/login')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  console.log('DEBUG profile:', profile, 'error:', profileError)

  if (!profile || !['admin', 'editor'].includes(profile.role)) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}