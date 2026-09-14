'use client'

import { ChangeEvent, useState } from 'react'

import { createClient } from '@/lib/supabase/client'

type ImageUploaderProps = {
  name: string
  pathName?: string
  defaultValue?: string | null
  defaultPath?: string | null
  folder?: string
  label?: string
  description?: string
}

export default function ImageUploader({
  name,
  pathName,
  defaultValue = null,
  defaultPath = null,
  folder = 'uploads',
  label = 'Imagen',
  description = 'JPG, PNG o WebP. Máximo 5 MB.',
}: ImageUploaderProps) {
  const supabase = createClient()

  const [imageUrl, setImageUrl] = useState(defaultValue ?? '')
  const [imagePath, setImagePath] = useState(defaultPath ?? '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    setError('')

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ]

    if (!allowedTypes.includes(file.type)) {
      setError('Solo se permiten imágenes JPG, PNG o WebP.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar los 5 MB.')
      return
    }

    setUploading(true)

    try {
      const extension =
        file.name.split('.').pop()?.toLowerCase() || 'jpg'

      const safeName = `${Date.now()}-${crypto.randomUUID()}.${extension}`

      const storagePath = `${folder}/${safeName}`

      const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage
        .from('site-assets')
        .getPublicUrl(storagePath)

      setImageUrl(data.publicUrl)
      setImagePath(storagePath)
    } catch (err) {
      console.error(err)
      setError('No se pudo subir la imagen.')
    } finally {
      setUploading(false)

      event.target.value = ''
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-gray-900">
        {label}
      </p>

      <input
        type="hidden"
        name={name}
        value={imageUrl}
      />

      {pathName && (
        <input
          type="hidden"
          name={pathName}
          value={imagePath}
        />
      )}

      <div className="overflow-hidden rounded-2xl border border-dashed border-gray-300 bg-gray-50">
        {imageUrl ? (
          <div className="p-5">
            <img
              src={imageUrl}
              alt={label}
              className="h-52 w-full rounded-xl object-cover"
            />

            <div className="mt-4 flex items-center gap-3">
              <label className="cursor-pointer rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-700">
                {uploading
                  ? 'Subiendo...'
                  : 'Cambiar imagen'}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  disabled={uploading}
                  onChange={handleUpload}
                />
              </label>

              <button
                type="button"
                onClick={() => {
                  setImageUrl('')
                  setImagePath('')
                }}
                className="text-sm font-semibold text-red-600 hover:text-red-700"
              >
                Quitar
              </button>
            </div>
          </div>
        ) : (
          <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center p-8 text-center">
            <p className="font-semibold text-gray-900">
              Seleccioná una imagen
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {description}
            </p>

            <span className="mt-5 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-bold text-white">
              {uploading
                ? 'Subiendo...'
                : 'Elegir imagen'}
            </span>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              disabled={uploading}
              onChange={handleUpload}
            />
          </label>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}