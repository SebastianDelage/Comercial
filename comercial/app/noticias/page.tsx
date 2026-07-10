import Link from 'next/link'
import { getPublishedPosts } from '@/lib/queries/posts'

export default async function NoticiasPage() {
  const posts = await getPublishedPosts()

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Noticias
        </h1>

        <p className="mt-2 text-gray-600">
          Últimas novedades de la institución.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-500">
            Todavía no hay noticias publicadas.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
              {post.cover_image_url && (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="h-52 w-full object-cover"
                />
              )}

              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-900">
                  {post.title}
                </h2>

                {post.excerpt && (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.excerpt}
                  </p>
                )}

                {post.published_at && (
                  <p className="mt-4 text-xs text-gray-400">
                    {new Date(post.published_at).toLocaleDateString('es-AR')}
                  </p>
                )}

                <Link
                  href={`/noticias/${post.slug}`}
                  className="mt-5 inline-block rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
                >
                  Leer noticia
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}