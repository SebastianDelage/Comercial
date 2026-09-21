'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function loginAdmin(formData: FormData) {
  const email = String(
    formData.get('email') ?? ''
  ).trim()

  const password = String(
    formData.get('password') ?? ''
  ).trim()


  if (!email || !password) {
    redirect('/admin/login?error=1')
  }


  const supabase = await createClient()


  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })


  if (error) {
    redirect('/admin/login?error=1')
  }


  redirect('/admin')
}



export async function logoutAdmin() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  redirect('/admin/login')
}