import { createClient } from '@/lib/supabase/server'

export async function getAdminPages() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('pages')
    .select(`
      id,
      title,
      slug,
      created_at,
      updated_at
    `)
    .order('updated_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getPageById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('pages')
    .select(`
      id,
      title,
      slug,
      content,
      created_at,
      updated_at
    `)
    .eq('id', id)
    .single()

  if (error) {
    return null
  }

  return data
}

export async function getPageBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('pages')
    .select(`
      id,
      title,
      slug,
      content,
      updated_at
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    return null
  }

  return data
}