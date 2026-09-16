import 'server-only'

import { createClient } from '@/lib/supabase/server'

export async function getPublicHomeData() {
  const supabase = await createClient()

  const [
    postsResult,
    albumsResult,
  ] = await Promise.all([
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
  ])

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

  return {
    posts: postsResult.data ?? [],
    albums: albumsResult.data ?? [],
  }
}