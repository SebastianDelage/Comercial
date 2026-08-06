'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export type SettingsFormState = {
  success: boolean
  message: string
  errors?: Record<string, string>
}

const initialErrorState: SettingsFormState = {
  success: false,
  message: '',
}

function optionalValue(formData: FormData, field: string) {
  const value = String(formData.get(field) ?? '').trim()
  return value || null
}

function isValidOptionalUrl(value: string | null) {
  if (!value) {
    return true
  }

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export async function updateSiteSettings(
  previousState: SettingsFormState = initialErrorState,
  formData: FormData
): Promise<SettingsFormState> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const clubName = String(
    formData.get('club_name') ?? ''
  ).trim()

  const contactEmail = optionalValue(
    formData,
    'contact_email'
  )

  const instagramUrl = optionalValue(
    formData,
    'instagram_url'
  )

  const facebookUrl = optionalValue(
    formData,
    'facebook_url'
  )

  const youtubeUrl = optionalValue(
    formData,
    'youtube_url'
  )

  const errors: Record<string, string> = {}

  if (!clubName) {
    errors.club_name = 'El nombre del club es obligatorio.'
  }

  if (
    contactEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)
  ) {
    errors.contact_email =
      'Ingresá una dirección de correo válida.'
  }

  const urls = [
    ['instagram_url', instagramUrl],
    ['facebook_url', facebookUrl],
    ['youtube_url', youtubeUrl],
  ] as const

  for (const [field, value] of urls) {
    if (!isValidOptionalUrl(value)) {
      errors[field] =
        'Ingresá una dirección completa que comience con http:// o https://.'
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Revisá los campos indicados.',
      errors,
    }
  }

  const settings = {
    id: 'general',
    club_name: clubName,
    short_description: optionalValue(
      formData,
      'short_description'
    ),

    logo_url: optionalValue(formData, 'logo_url'),
    logo_path: optionalValue(formData, 'logo_path'),

    favicon_url: optionalValue(formData, 'favicon_url'),
    favicon_path: optionalValue(
      formData,
      'favicon_path'
    ),

    contact_email: contactEmail,
    phone: optionalValue(formData, 'phone'),
    whatsapp_number: optionalValue(
      formData,
      'whatsapp_number'
    ),
    address: optionalValue(formData, 'address'),

    instagram_url: instagramUrl,
    facebook_url: facebookUrl,
    youtube_url: youtubeUrl,
  }

  const { error } = await supabase
    .from('site_settings')
    .upsert(settings, {
      onConflict: 'id',
    })

  if (error) {
    console.error(
      'Error actualizando configuración:',
      error
    )

    return {
      success: false,
      message:
        'No se pudo guardar la configuración. Intentá nuevamente.',
    }
  }

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/admin/settings')
  revalidatePath('/noticias')
  revalidatePath('/galeria')
  revalidatePath('/institucional', 'layout')

  return {
    success: true,
    message: 'La configuración se guardó correctamente.',
  }
}