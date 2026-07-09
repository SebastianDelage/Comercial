import Link from 'next/link'
import { getAdminPosts } from '@/lib/queries/posts'
import { deletePost } from '@/lib/actions/post-actions'

export default async function AdminPostsPage() {
  const posts = await getAdminPosts()

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Noticias</h1>

        <Link
          href="/admin/posts/new"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Nueva noticia
        </Link>
      </div>

      <div className="mt-6 rounded border bg-white">
        {posts.length === 0 ? (
          <p className="p-4 text-gray-500">Todavía no hay noticias cargadas.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="p-3">Título</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="p-3 font-medium">{post.title}</td>

                  <td className="p-3">
                    {post.status === 'published' ? 'Publicado' : 'Borrador'}
                  </td>

                  <td className="p-3">
                    {new Date(post.created_at).toLocaleDateString('es-AR')}
                  </td>

                  <td className="flex gap-2 p-3">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="rounded border px-3 py-1 hover:bg-gray-100"
                    >
                      Editar
                    </Link>

                    <form action={deletePost.bind(null, post.id)}>
                      <button
                        type="submit"
                        className="rounded bg-red-600 px-3 py-1 text-white"
                      >
                        Eliminar
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}