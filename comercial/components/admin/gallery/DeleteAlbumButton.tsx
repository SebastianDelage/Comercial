'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { deleteAlbum } from '@/lib/actions/gallery-actions'

type DeleteAlbumButtonProps = {
  albumId: string
  albumTitle: string
}

export default function DeleteAlbumButton({
  albumId,
  albumTitle,
}: DeleteAlbumButtonProps) {
  const router = useRouter()

  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    setError('')

    startTransition(async () => {
      try {
        const result = await deleteAlbum(albumId)

        if (result?.error) {
          setError(result.error)
          return
        }

        setConfirming(false)
        router.refresh()
      } catch (deleteError) {
        console.error(deleteError)

        setError(
          'No se pudo eliminar el álbum. Intentá nuevamente.'
        )
      }
    })
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-xl px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:text-red-700"
      >
        Eliminar
      </button>
    )
  }

  return (
    <div className="w-full rounded-xl border border-red-200 bg-red-50 p-3">
      <p className="text-sm font-semibold text-red-800">
        ¿Eliminar “{albumTitle}”?
      </p>

      <p className="mt-1 text-xs leading-5 text-red-700">
        También se eliminarán todas las fotografías del álbum.
      </p>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled={isPending}
          onClick={handleDelete}
          className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? 'Eliminando...' : 'Confirmar'}
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={() => {
            setConfirming(false)
            setError('')
          }}
          className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>

      {error && (
        <p className="mt-3 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}