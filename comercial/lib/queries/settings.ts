import 'server-only'

import { createClient } from '@/lib/supabase/server'

export type SiteSettings = {
  id: string
  club_name: string
  short_description: string | null

  logo_url: string | null
  logo_path: string | null

  favicon_url: string | null
  favicon_path: string | null

  contact_email: string | null
  phone: string | null
  whatsapp_number: string | null
  address: string | null

  instagram_url: string | null
  facebook_url: string | null
  youtube_url: string | null

  created_at: string
  updated_at: string
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('site_settings')
    .select(`
      id,
      club_name,
      short_description,
      logo_url,
      logo_path,
      favicon_url,
      favicon_path,
      contact_email,
      phone,
      whatsapp_number,
      address,
      instagram_url,
      facebook_url,
      youtube_url,
      created_at,
      updated_at
    `)
    .eq('id', 'general')
    .maybeSingle()

  if (error) {
    console.error('Error obteniendo configuración:', error)
    return null
  }

  return data
}