'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { deleteGalleryImage } from '@/lib/actions/gallery-actions'

type DeleteGalleryImageButtonProps = {
  imageId: string
}

export default function DeleteGalleryImageButton({
  imageId,
}: DeleteGalleryImageButtonProps) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    setError('')

    startTransition(async () => {
      try {
        await deleteGalleryImage(imageId)
        setConfirming(false)
        router.refresh()
      } catch (deleteError) {
        setError(
          deleteError instanceof Error
            ? deleteError.message
            : 'No se pudo eliminar la fotografía.'
        )
      }
    })
  }

  if (confirming) {
    return (
      <div className="space-y-2">
        <p className="text-xs font-medium text-red-700">
          ¿Eliminar definitivamente?
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={isPending}
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {isPending ? 'Eliminando...' : 'Confirmar'}
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={() => setConfirming(false)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>

        {error && (
          <p className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-xs font-semibold text-red-600 hover:text-red-700"
    >
      Eliminar
    </button>
  )
}