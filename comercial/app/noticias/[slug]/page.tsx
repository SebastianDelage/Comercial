import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/queries/posts'

type PostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function PostPage({
  params,
}: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <article>
        <h1 className="text-4xl font-bold text-gray-900">
          {post.title}
        </h1>

        {post.published_at && (
          <p className="mt-3 text-sm text-gray-500">
            {new Date(post.published_at).toLocaleDateString('es-AR')}
          </p>
        )}

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="mt-8 max-h-[520px] w-full rounded-2xl object-cover"
          />
        )}

        {post.excerpt && (
          <p className="mt-8 text-xl leading-8 text-gray-600">
            {post.excerpt}
          </p>
        )}

        <div className="mt-8 whitespace-pre-line text-base leading-8 text-gray-800">
          {post.content}
        </div>
      </article>
    </main>
  )
}