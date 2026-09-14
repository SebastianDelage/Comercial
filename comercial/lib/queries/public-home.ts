import 'server-only'

import { createClient } from '@/lib/supabase/server'

export async function getPublicHomeData() {
  const supabase = await createClient()

  const [
    settingsResult,
    postsResult,
    albumsResult,
    historyResult,
  ] = await Promise.all([
    supabase
      .from('site_settings')
      .select(`
        club_name,
        short_description,
        logo_url,
        address,
        phone,
        contact_email,
        whatsapp_number,
        hero_image_url,
        rugby_image_url,
        hockey_image_url,
        history_image_url
      `)
      .eq('id', 'general')
      .maybeSingle(),

    supabase
      .from('posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        cover_image_url,
        published_at
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(3),

    supabase
      .from('gallery_albums')
      .select(`
        id,
        title,
        slug,
        description,
        cover_image_url,
        event_date,
        gallery_images (
          id
        )
      `)
      .eq('status', 'published')
      .order('event_date', {
        ascending: false,
        nullsFirst: false,
      })
      .limit(3),

    supabase
      .from('pages')
      .select(`
        title,
        slug,
        content
      `)
      .eq('slug', 'historia-del-club')
      .maybeSingle(),
  ])

  if (settingsResult.error) {
    console.error(
      'Error cargando configuración:',
      settingsResult.error
    )
  }

  if (postsResult.error) {
    console.error(
      'Error cargando noticias:',
      postsResult.error
    )
  }

  if (albumsResult.error) {
    console.error(
      'Error cargando galería:',
      albumsResult.error
    )
  }

  if (historyResult.error) {
    console.error(
      'Error cargando historia:',
      historyResult.error
    )
  }

  return {
    settings: settingsResult.data,
    posts: postsResult.data ?? [],
    albums: albumsResult.data ?? [],
    history: historyResult.data,
  }
}