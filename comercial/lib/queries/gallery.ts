import 'server-only'

import { createClient } from '@/lib/supabase/server'

export async function getAdminAlbums() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('gallery_albums')
    .select(`
      id,
      title,
      slug,
      description,
      cover_image_url,
      cover_image_path,
      event_date,
      status,
      display_order,
      created_at,
      updated_at,
      gallery_images (
        id
      )
    `)
    .order('display_order', { ascending: true })
    .order('event_date', {
      ascending: false,
      nullsFirst: false,
    })
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getAlbumById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('gallery_albums')
    .select(`
      id,
      title,
      slug,
      description,
      cover_image_url,
      cover_image_path,
      event_date,
      status,
      display_order,
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

export async function getPublishedAlbums() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('gallery_albums')
    .select(`
      id,
      title,
      slug,
      description,
      cover_image_url,
      event_date,
      display_order,
      gallery_images (
        id
      )
    `)
    .eq('status', 'published')
    .order('display_order', { ascending: true })
    .order('event_date', {
      ascending: false,
      nullsFirst: false,
    })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getPublishedAlbumBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('gallery_albums')
    .select(`
      id,
      title,
      slug,
      description,
      cover_image_url,
      event_date,
      gallery_images (
        id,
        image_url,
        image_path,
        title,
        description,
        alt_text,
        display_order,
        created_at
      )
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .order('display_order', {
      referencedTable: 'gallery_images',
      ascending: true,
    })
    .single()

  if (error) {
    return null
  }

  return data
}

export async function getAlbumWithImagesById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('gallery_albums')
    .select(`
      id,
      title,
      slug,
      description,
      cover_image_url,
      status,
      gallery_images (
        id,
        image_url,
        image_path,
        title,
        description,
        alt_text,
        display_order,
        created_at
      )
    `)
    .eq('id', id)
    .order('display_order', {
      referencedTable: 'gallery_images',
      ascending: true,
    })
    .order('created_at', {
      referencedTable: 'gallery_images',
      ascending: true,
    })
    .single()

  if (error) {
    return null
  }

  return data
}