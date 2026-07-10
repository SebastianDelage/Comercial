'use client'

import { ChangeEvent, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type ImageUploaderProps = {
  initialUrl?: string | null
}

export default function ImageUploader({
  initialUrl,
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState(initialUrl ?? '')
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setErrorMessage('')

    if (!file.type.startsWith('image/')) {
      setErrorMessage('El archivo seleccionado debe ser una imagen.')
      event.target.value = ''
      return
    }

    const maxSize = 5 * 1024 * 1024

    if (file.size > maxSize) {
      setErrorMessage('La imagen no puede superar los 5 MB.')
      event.target.value = ''
      return
    }

    setIsUploading(true)

    try {
      const supabase = createClient()

      const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
      const fileName = `${crypto.randomUUID()}.${extension}`
      const filePath = `posts/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage
        .from('site-assets')
        .getPublicUrl(filePath)

      setImageUrl(data.publicUrl)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'No se pudo subir la imagen.'

      setErrorMessage(message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div>
      <label
        htmlFor="cover-image"
        className="block text-sm font-medium text-gray-700"
      >
        Imagen de portada
      </label>

      <input
        type="hidden"
        name="cover_image_url"
        value={imageUrl}
      />

      <div className="mt-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5">
        {imageUrl ? (
          <div>
            <img
              src={imageUrl}
              alt="Vista previa de la portada"
              className="h-56 w-full rounded-xl object-cover"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <label
                htmlFor="cover-image"
                className="cursor-pointer rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
              >
                Cambiar imagen
              </label>

              <button
                type="button"
                onClick={() => setImageUrl('')}
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
              >
                Quitar imagen
              </button>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center">
            <p className="font-medium text-gray-800">
              Seleccioná una imagen de portada
            </p>

            <p className="mt-1 text-sm text-gray-500">
              JPG, PNG o WebP. Máximo 5 MB.
            </p>

            <label
              htmlFor="cover-image"
              className="mt-4 inline-block cursor-pointer rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
            >
              Elegir imagen
            </label>
          </div>
        )}

        <input
          id="cover-image"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />

        {isUploading && (
          <p className="mt-3 text-sm font-medium text-cyan-700">
            Subiendo imagen...
          </p>
        )}

        {errorMessage && (
          <p className="mt-3 text-sm font-medium text-red-600">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  )
}