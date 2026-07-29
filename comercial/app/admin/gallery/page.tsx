import Link from 'next/link'

import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

import DeleteAlbumButton from '@/components/admin/gallery/DeleteAlbumButton'
import { getAdminAlbums } from '@/lib/queries/gallery'

export default async function AdminGalleryPage() {
  const albums = await getAdminAlbums()

  const publishedCount = albums.filter(
    (album) => album.status === 'published'
  ).length

  const draftCount = albums.filter(
    (album) => album.status === 'draft'
  ).length

  const totalImages = albums.reduce(
    (total, album) =>
      total + (album.gallery_images?.length ?? 0),
    0
  )

  return (
    <section>
      <PageHeader
        title="Galería"
        description="Administrá los álbumes y fotografías del club."
        action={
          <Button href="/admin/gallery/new">
            Crear álbum
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm font-medium text-gray-500">
            Álbumes
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {albums.length}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-medium text-gray-500">
            Publicados
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {publishedCount}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-medium text-gray-500">
            Borradores
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {draftCount}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-medium text-gray-500">
            Fotografías
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {totalImages}
          </p>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Álbumes
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Editá la información, cargá fotografías o eliminá
                álbumes.
              </p>
            </div>

            {albums.length > 0 && (
              <Link
                href="/galeria"
                target="_blank"
                className="text-sm font-semibold text-cyan-700 hover:text-cyan-800"
              >
                Ver galería pública
              </Link>
            )}
          </div>

          {albums.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-2xl">
                📷
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                Todavía no hay álbumes
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Creá el primer álbum para comenzar a subir y
                organizar las fotografías del club.
              </p>

              <div className="mt-6">
                <Button href="/admin/gallery/new">
                  Crear primer álbum
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {albums.map((album) => {
                const imageCount =
                  album.gallery_images?.length ?? 0

                return (
                  <article
                    key={album.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative bg-gray-100">
                      {album.cover_image_url ? (
                        <img
                          src={album.cover_image_url}
                          alt={album.title}
                          className="aspect-[16/9] w-full object-cover"
                        />
                      ) : (
                        <div className="flex aspect-[16/9] items-center justify-center text-sm font-medium text-gray-400">
                          Sin portada
                        </div>
                      )}

                      <div className="absolute left-3 top-3">
                        <Badge
                          variant={
                            album.status === 'published'
                              ? 'success'
                              : 'warning'
                          }
                        >
                          {album.status === 'published'
                            ? 'Publicado'
                            : 'Borrador'}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900">
                        {album.title}
                      </h3>

                      {album.description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
                          {album.description}
                        </p>
                      )}

                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-gray-500">
                        <span>
                          {imageCount}{' '}
                          {imageCount === 1
                            ? 'fotografía'
                            : 'fotografías'}
                        </span>

                        {album.event_date && (
                          <span>
                            {new Intl.DateTimeFormat('es-AR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              timeZone: 'UTC',
                            }).format(
                              new Date(
                                `${album.event_date}T00:00:00Z`
                              )
                            )}
                          </span>
                        )}

                        <span>
                          Orden: {album.display_order}
                        </span>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                        <Button
                          href={`/admin/gallery/${album.id}/images`}
                        >
                          Fotografías
                        </Button>

                        <Button
                          href={`/admin/gallery/${album.id}/edit`}
                          variant="secondary"
                        >
                          Editar
                        </Button>

                        {album.status === 'published' && (
                          <Button
                            href={`/galeria/${album.slug}`}
                            variant="secondary"
                          >
                            Ver
                          </Button>
                        )}

                        <DeleteAlbumButton
                          albumId={album.id}
                          albumTitle={album.title}
                        />
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}