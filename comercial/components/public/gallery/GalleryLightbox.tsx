'use client'

import { useEffect, useState } from 'react'

type GalleryImage = {
  id: string
  image_url: string
  title: string | null
  description: string | null
  alt_text: string | null
}

type GalleryLightboxProps = {
  images: GalleryImage[]
  albumTitle: string
}

export default function GalleryLightbox({
  images,
  albumTitle,
}: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const isOpen = selectedIndex !== null
  const selectedImage =
    selectedIndex !== null ? images[selectedIndex] : null

  function closeLightbox() {
    setSelectedIndex(null)
  }

  function showPrevious() {
    if (selectedIndex === null || images.length <= 1) {
      return
    }

    setSelectedIndex(
      selectedIndex === 0
        ? images.length - 1
        : selectedIndex - 1
    )
  }

  function showNext() {
    if (selectedIndex === null || images.length <= 1) {
      return
    }

    setSelectedIndex(
      selectedIndex === images.length - 1
        ? 0
        : selectedIndex + 1
    )
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox()
      }

      if (event.key === 'ArrowLeft') {
        showPrevious()
      }

      if (event.key === 'ArrowRight') {
        showNext()
      }
    }

    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, selectedIndex])

  if (images.length === 0) {
    return (
      <div className="rounded-3xl bg-slate-50 px-6 py-20 text-center">
        <p className="text-lg font-bold text-gray-950">
          Este álbum todavía no tiene fotos.
        </p>

        <p className="mt-2 text-gray-500">
          Las imágenes aparecerán acá cuando sean publicadas.
        </p>
      </div>
    )
  }

  return (
    <>
      {/* MOSAICO */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={[
              'group relative overflow-hidden bg-slate-100',
              index === 0
                ? 'col-span-2 row-span-2'
                : '',
            ].join(' ')}
            aria-label={`Abrir foto ${index + 1} de ${images.length}`}
          >
            <img
              src={image.image_url}
              alt={
                image.alt_text ||
                image.title ||
                `${albumTitle} - Foto ${index + 1}`
              }
              className={[
                'h-full w-full object-cover transition duration-500 group-hover:scale-105',
                index === 0
                  ? 'aspect-square'
                  : 'aspect-square',
              ].join(' ')}
            />

            <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/15" />

            <div className="absolute bottom-3 right-3 translate-y-2 rounded-full bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white opacity-0 backdrop-blur-sm transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              Ver foto
            </div>
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {isOpen && selectedImage && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${selectedIndex + 1} de ${images.length}`}
        >
          {/* BARRA SUPERIOR */}
          <div className="relative z-20 flex h-20 shrink-0 items-center justify-between px-5 sm:px-8">
            <div>
              <p className="text-sm font-bold text-white">
                {albumTitle}
              </p>

              <p className="mt-1 text-xs text-white/60">
                {selectedIndex + 1} / {images.length}
              </p>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>

          {/* IMAGEN */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-5 sm:px-20"
            onClick={closeLightbox}
          >
            {images.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  showPrevious()
                }}
                className="absolute left-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/20 sm:left-6"
                aria-label="Foto anterior"
              >
                ‹
              </button>
            )}

            <img
              src={selectedImage.image_url}
              alt={
                selectedImage.alt_text ||
                selectedImage.title ||
                `${albumTitle} - Foto ${selectedIndex + 1}`
              }
              onClick={(event) => event.stopPropagation()}
              className="max-h-full max-w-full object-contain"
            />

            {images.length > 1 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  showNext()
                }}
                className="absolute right-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/20 sm:right-6"
                aria-label="Foto siguiente"
              >
                ›
              </button>
            )}
          </div>

          {/* INFORMACIÓN DE FOTO */}
          {(selectedImage.title || selectedImage.description) && (
            <div className="shrink-0 border-t border-white/10 px-6 py-5 text-center sm:px-8">
              {selectedImage.title && (
                <p className="font-bold text-white">
                  {selectedImage.title}
                </p>
              )}

              {selectedImage.description && (
                <p className="mx-auto mt-1 max-w-2xl text-sm leading-6 text-white/60">
                  {selectedImage.description}
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}