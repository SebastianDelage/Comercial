'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils/slug'

function validatePageData(formData: FormData) {
  const title = String(formData.get('title') || '').trim()
  const content = String(formData.get('content') || '').trim()

  if (!title) {
    throw new Error('El título es obligatorio.')
  }

  if (!content) {
    throw new Error('El contenido es obligatorio.')
  }

  return {
    title,
    content,
    slug: generateSlug(title),
  }
}

export async function createPage(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { title, content, slug } = validatePageData(formData)

  const { error } = await supabase
    .from('pages')
    .insert({
      title,
      slug,
      content,
    })

  if (error) {
    if (error.code === '23505') {
      throw new Error(
        'Ya existe una página con ese título o slug.'
      )
    }

    throw new Error(error.message)
  }

  revalidatePath('/admin/pages')
  revalidatePath(`/institucional/${slug}`)

  redirect('/admin/pages')
}

export async function updatePage(
  id: string,
  formData: FormData
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { title, content, slug } = validatePageData(formData)

  const { data: currentPage, error: currentPageError } =
    await supabase
      .from('pages')
      .select('slug')
      .eq('id', id)
      .single()

  if (currentPageError || !currentPage) {
    throw new Error('No se encontró la página.')
  }

  const oldSlug = currentPage.slug

  const { error } = await supabase
    .from('pages')
    .update({
      title,
      slug,
      content,
    })
    .eq('id', id)

  if (error) {
    if (error.code === '23505') {
      throw new Error(
        'Ya existe una página con ese título o slug.'
      )
    }

    throw new Error(error.message)
  }

  revalidatePath('/admin/pages')
  revalidatePath(`/institucional/${oldSlug}`)
  revalidatePath(`/institucional/${slug}`)

  redirect('/admin/pages')
}

export async function deletePage(id: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: page } = await supabase
    .from('pages')
    .select('slug')
    .eq('id', id)
    .single()

  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/pages')

  if (page?.slug) {
    revalidatePath(`/institucional/${page.slug}`)
  }

  redirect('/admin/pages')
}