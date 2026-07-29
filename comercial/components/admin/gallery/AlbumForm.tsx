import {
  createAlbum,
  updateAlbum,
} from '@/lib/actions/gallery-actions'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ImageUploader from '@/components/admin/ImageUploader'

type AlbumFormProps = {
  album?: {
    id: string
    title: string
    slug: string
    description: string | null
    cover_image_url: string | null
    cover_image_path: string | null
    event_date: string | null
    status: string
    display_order: number
  }
}

export default function AlbumForm({
  album,
}: AlbumFormProps) {
  const action = album
    ? updateAlbum.bind(null, album.id)
    : createAlbum

  return (
    <form action={action}>
      <Card>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Título
              </label>

              <input
                id="title"
                name="title"
                required
                defaultValue={album?.title ?? ''}
                placeholder="Ej.: Torneo Apertura 2026"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            {album?.slug && (
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Dirección pública actual
                </p>

                <p className="mt-2 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  /galeria/{album.slug}
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción
              </label>

              <textarea
                id="description"
                name="description"
                rows={7}
                defaultValue={album?.description ?? ''}
                placeholder="Contá brevemente qué muestran las fotografías."
                className="mt-2 w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="event_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha del evento
                </label>

                <input
                  id="event_date"
                  name="event_date"
                  type="date"
                  defaultValue={album?.event_date ?? ''}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                />
              </div>

              <div>
                <label
                  htmlFor="display_order"
                  className="block text-sm font-medium text-gray-700"
                >
                  Orden
                </label>

                <input
                  id="display_order"
                  name="display_order"
                  type="number"
                  min="0"
                  defaultValue={album?.display_order ?? 0}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Los números más bajos aparecen primero.
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Estado
              </label>

              <select
                id="status"
                name="status"
                defaultValue={album?.status ?? 'draft'}
                className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
              </select>
            </div>
          </div>

          <div>
            <p className="mb-2 block text-sm font-medium text-gray-700">
              Portada
            </p>

            <ImageUploader
            name="cover_image_url"
            initialUrl={album?.cover_image_url ?? ''}
            />

            <input
              type="hidden"
              name="cover_image_path"
              value={album?.cover_image_path ?? ''}
            />

            <p className="mt-3 text-xs leading-5 text-gray-500">
              Usá una imagen horizontal. Después podremos elegir como portada
              una de las fotografías del propio álbum.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">
          <Button
            href="/admin/gallery"
            variant="secondary"
          >
            Cancelar
          </Button>

          <Button type="submit">
            {album ? 'Actualizar álbum' : 'Crear álbum'}
          </Button>
        </div>
      </Card>
    </form>
  )
}