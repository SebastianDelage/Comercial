'use client'

import {
  useActionState,
  useEffect,
  useRef,
} from 'react'

import ImageUploader from '@/components/admin/ImageUploader'
import Card from '@/components/ui/Card'

import {
  SettingsFormState,
  updateSiteSettings,
} from '@/lib/actions/settings-actions'

import type { SiteSettings } from '@/lib/queries/settings'

type SettingsFormProps = {
  settings: SiteSettings | null
}

const initialState: SettingsFormState = {
  success: false,
  message: '',
}

function FieldError({
  message,
}: {
  message?: string
}) {
  if (!message) {
    return null
  }

  return (
    <p className="mt-2 text-sm font-medium text-red-600">
      {message}
    </p>
  )
}

export default function SettingsForm({
  settings,
}: SettingsFormProps) {
  const formRef = useRef<HTMLFormElement>(null)

  const [state, formAction, isPending] = useActionState(
    updateSiteSettings,
    initialState
  )

  useEffect(() => {
    if (!state.message) {
      return
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }, [state])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-8"
    >
      {state.message && (
        <div
          role="status"
          className={
            state.success
              ? 'rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800'
              : 'rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800'
          }
        >
          {state.message}
        </div>
      )}

      <Card>
        <div className="border-b border-gray-100 pb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Información institucional
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Datos principales que aparecerán en el sitio.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="club_name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre del club
            </label>

            <input
              id="club_name"
              name="club_name"
              required
              defaultValue={settings?.club_name ?? ''}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />

            <FieldError
              message={state.errors?.club_name}
            />
          </div>

          <div>
            <label
              htmlFor="short_description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción corta
            </label>

            <textarea
              id="short_description"
              name="short_description"
              rows={4}
              defaultValue={
                settings?.short_description ?? ''
              }
              placeholder="Una breve presentación del club."
              className="mt-2 w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />

            <p className="mt-2 text-xs text-gray-500">
              Puede utilizarse en la portada, el pie del sitio
              y las vistas previas.
            </p>
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Dirección
            </label>

            <input
              id="address"
              name="address"
              defaultValue={settings?.address ?? ''}
              placeholder="Calle, número, ciudad"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="border-b border-gray-100 pb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Identidad visual
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Logo principal e ícono del navegador.
          </p>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              Logo
            </p>

            <ImageUploader
              initialUrl={settings?.logo_url ?? ''}
            />

            <input
              type="hidden"
              name="logo_url"
              defaultValue={settings?.logo_url ?? ''}
            />

            <input
              type="hidden"
              name="logo_path"
              defaultValue={settings?.logo_path ?? ''}
            />

            <p className="mt-2 text-xs text-gray-500">
              Preferentemente PNG o WebP con fondo
              transparente.
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              Favicon
            </p>

            <ImageUploader
              initialUrl={settings?.favicon_url ?? ''}
            />

            <input
              type="hidden"
              name="favicon_url"
              defaultValue={settings?.favicon_url ?? ''}
            />

            <input
              type="hidden"
              name="favicon_path"
              defaultValue={settings?.favicon_path ?? ''}
            />

            <p className="mt-2 text-xs text-gray-500">
              Usá una imagen cuadrada y sencilla.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="border-b border-gray-100 pb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Contacto
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Información que podrán consultar los visitantes.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="contact_email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>

            <input
              id="contact_email"
              name="contact_email"
              type="email"
              defaultValue={
                settings?.contact_email ?? ''
              }
              placeholder="contacto@club.com"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />

            <FieldError
              message={state.errors?.contact_email}
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Teléfono
            </label>

            <input
              id="phone"
              name="phone"
              defaultValue={settings?.phone ?? ''}
              placeholder="+54 223..."
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </div>

          <div>
            <label
              htmlFor="whatsapp_number"
              className="block text-sm font-medium text-gray-700"
            >
              WhatsApp
            </label>

            <input
              id="whatsapp_number"
              name="whatsapp_number"
              defaultValue={
                settings?.whatsapp_number ?? ''
              }
              placeholder="549223..."
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />

            <p className="mt-2 text-xs text-gray-500">
              Guardalo con código de país y área, sin espacios
              ni símbolos.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="border-b border-gray-100 pb-5">
          <h2 className="text-lg font-bold text-gray-900">
            Redes sociales
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Pegá las direcciones completas de los perfiles.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="instagram_url"
              className="block text-sm font-medium text-gray-700"
            >
              Instagram
            </label>

            <input
              id="instagram_url"
              name="instagram_url"
              type="url"
              defaultValue={
                settings?.instagram_url ?? ''
              }
              placeholder="https://instagram.com/..."
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />

            <FieldError
              message={state.errors?.instagram_url}
            />
          </div>

          <div>
            <label
              htmlFor="facebook_url"
              className="block text-sm font-medium text-gray-700"
            >
              Facebook
            </label>

            <input
              id="facebook_url"
              name="facebook_url"
              type="url"
              defaultValue={
                settings?.facebook_url ?? ''
              }
              placeholder="https://facebook.com/..."
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />

            <FieldError
              message={state.errors?.facebook_url}
            />
          </div>

          <div>
            <label
              htmlFor="youtube_url"
              className="block text-sm font-medium text-gray-700"
            >
              YouTube
            </label>

            <input
              id="youtube_url"
              name="youtube_url"
              type="url"
              defaultValue={
                settings?.youtube_url ?? ''
              }
              placeholder="https://youtube.com/..."
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />

            <FieldError
              message={state.errors?.youtube_url}
            />
          </div>
        </div>
      </Card>

      <div className="sticky bottom-4 flex justify-end rounded-2xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? 'Guardando configuración...'
            : 'Guardar configuración'}
        </button>
      </div>
    </form>
  )
}