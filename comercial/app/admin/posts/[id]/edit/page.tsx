import { notFound } from 'next/navigation'
import PostForm from '@/components/admin/PostForm'
import { getPostById } from '@/lib/queries/posts'

type EditPostPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params

  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return (
    <section>
      <h1 className="text-3xl font-bold">Editar noticia</h1>

      <div className="mt-6">
        <PostForm post={post} />
      </div>
    </section>
  )
}