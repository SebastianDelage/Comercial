'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils/slug'

export async function createPost(formData: FormData) {
  const supabase = await createClient()

  const title = String(formData.get('title') || '')
  const excerpt = String(formData.get('excerpt') || '')
  const content = String(formData.get('content') || '')
  const status = String(formData.get('status') || 'draft') as 'draft' | 'published'

  const slug = generateSlug(title)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { error } = await supabase.from('posts').insert({
    title,
    slug,
    excerpt,
    content,
    status,
    author_id: user.id,
    published_at: status === 'published' ? new Date().toISOString() : null,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/posts')
  revalidatePath('/noticias')

  redirect('/admin/posts')
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = String(formData.get('title') || '')
  const excerpt = String(formData.get('excerpt') || '')
  const content = String(formData.get('content') || '')
  const status = String(formData.get('status') || 'draft') as 'draft' | 'published'

  const slug = generateSlug(title)

  const { data: currentPost } = await supabase
    .from('posts')
    .select('status, published_at')
    .eq('id', id)
    .single()

  const shouldSetPublishedAt =
    status === 'published' && !currentPost?.published_at

  const { error } = await supabase
    .from('posts')
    .update({
      title,
      slug,
      excerpt,
      content,
      status,
      published_at: shouldSetPublishedAt
        ? new Date().toISOString()
        : currentPost?.published_at ?? null,
    })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/posts')
  revalidatePath('/noticias')
  revalidatePath(`/noticias/${slug}`)

  redirect('/admin/posts')
}

export async function deletePost(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/posts')
  revalidatePath('/noticias')

  redirect('/admin/posts')
}