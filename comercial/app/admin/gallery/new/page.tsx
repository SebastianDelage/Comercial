import AlbumForm from '@/components/admin/gallery/AlbumForm'
import PageHeader from '@/components/ui/PageHeader'

export default function NewGalleryAlbumPage() {
  return (
    <section>
      <PageHeader
        title="Nuevo álbum"
        description="Creá el álbum y después agregá sus fotografías."
      />

      <AlbumForm />
    </section>
  )
}