import { notFound } from 'next/navigation'
import PostForm from '@/components/admin/PostForm'
import PageHeader from '@/components/ui/PageHeader'
import { getPostById } from '@/lib/queries/posts'

type EditPostPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditPostPage({
  params,
}: EditPostPageProps) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return (
    <section>
      <PageHeader
        title="Editar noticia"
        description="Actualizá el contenido o cambiá su estado."
      />

      <PostForm post={post} />
    </section>
  )
}