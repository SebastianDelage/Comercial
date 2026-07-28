import Link from 'next/link'
import { getAdminPosts } from '@/lib/queries/posts'
import DeletePostButton from '@/components/admin/DeletePostButton'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import PageHeader from '@/components/ui/PageHeader'

export default async function AdminPostsPage() {
  const posts = await getAdminPosts()

  return (
    <section>
      <PageHeader
        title="Noticias"
        description="Creá, editá y administrá las publicaciones del sitio."
        action={
          <Button href="/admin/posts/new">
            Nueva noticia
          </Button>
        }
      />

      <Card>
        {posts.length === 0 ? (
          <div className="py-12 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Todavía no hay noticias
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Creá la primera publicación para comenzar.
            </p>

            <div className="mt-6">
              <Button href="/admin/posts/new">
                Crear noticia
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="px-4 py-3 font-medium">Título</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Creación</th>
                  <th className="px-4 py-3 text-right font-medium">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {post.title}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          /noticias/{post.slug}
                        </p>
                      </div>
                    </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-4">
                          {post.cover_image_url ? (
                            <img
                              src={post.cover_image_url}
                              alt={post.title}
                              className="h-14 w-20 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                              Sin imagen
                            </div>
                          )}

                          <div>
                            <p className="font-semibold text-gray-900">
                              {post.title}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              /noticias/{post.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                    <td className="px-4 py-4 text-gray-600">
                      {new Date(post.created_at).toLocaleDateString('es-AR')}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        {post.status === 'published' && (
                          <Link
                            href={`/noticias/${post.slug}`}
                            target="_blank"
                            className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Ver
                          </Link>
                        )}

                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-medium text-cyan-700 hover:bg-cyan-100"
                        >
                          Editar
                        </Link>

                        <DeletePostButton
                          postId={post.id}
                          postTitle={post.title}
                         />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </section>
  )
}