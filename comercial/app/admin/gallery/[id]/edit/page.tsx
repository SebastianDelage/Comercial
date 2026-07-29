import { notFound } from 'next/navigation'

import AlbumForm from '@/components/admin/gallery/AlbumForm'
import PageHeader from '@/components/ui/PageHeader'
import { getAlbumById } from '@/lib/queries/gallery'

type EditGalleryAlbumPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditGalleryAlbumPage({
  params,
}: EditGalleryAlbumPageProps) {
  const { id } = await params
  const album = await getAlbumById(id)

  if (!album) {
    notFound()
  }

  return (
    <section>
      <PageHeader
        title="Editar álbum"
        description="Modificá la información general del álbum."
      />

      <AlbumForm album={album} />
    </section>
  )
}