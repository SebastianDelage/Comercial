import { createClient } from '@/lib/supabase/server'

export async function getAdminPosts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, status, published_at, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getPublishedPosts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, cover_image_url, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getPostBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      slug,
      excerpt,
      content,
      cover_image_url,
      status,
      published_at
    `)
    .eq('slug', slug)
    .single()

  if (error) {
    return null
  }

  return data
}

export async function getPostById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, content, status, cover_image_url')
    .eq('id', id)
    .single()

  if (error) {
    return null
  }

  return data
}