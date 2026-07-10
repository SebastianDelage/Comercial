import PostForm from '@/components/admin/PostForm'
import PageHeader from '@/components/ui/PageHeader'

export default function NewPostPage() {
  return (
    <section>
      <PageHeader
        title="Nueva noticia"
        description="Completá los datos para crear una publicación."
      />

      <PostForm />
    </section>
  )
}