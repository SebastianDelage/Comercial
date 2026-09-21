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

          <>

            {/* ================= DESKTOP ================= */}

            <div className="hidden overflow-x-auto md:block">

              <table className="w-full text-left text-sm">

                <thead>

                  <tr className="border-b border-gray-200 text-gray-500">

                    <th className="px-4 py-3 font-medium">
                      Noticia
                    </th>


                    <th className="px-4 py-3 font-medium">
                      Estado
                    </th>


                    <th className="px-4 py-3 font-medium">
                      Creación
                    </th>


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



                      <td className="px-4 py-4">

                        <Badge
                          variant={
                            post.status === 'published'
                              ? 'success'
                              : 'draft'
                          }
                        >

                          {post.status === 'published'
                            ? 'Publicado'
                            : 'Borrador'}

                        </Badge>

                      </td>



                      <td className="px-4 py-4 text-gray-600">

                        {new Date(
                          post.created_at
                        ).toLocaleDateString('es-AR')}

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





            {/* ================= MOBILE ================= */}


            <div className="space-y-4 md:hidden">


              {posts.map((post) => (

                <article
                  key={post.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4"
                >


                  <div className="flex gap-4">


                    {post.cover_image_url ? (

                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="h-20 w-24 shrink-0 rounded-xl object-cover"
                      />

                    ) : (

                      <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-xs text-gray-400">
                        Sin imagen
                      </div>

                    )}



                    <div className="min-w-0">

                      <h3 className="font-bold text-gray-900">
                        {post.title}
                      </h3>


                      <p className="mt-1 break-all text-xs text-gray-500">
                        /noticias/{post.slug}
                      </p>


                      <div className="mt-2">

                        <Badge
                          variant={
                            post.status === 'published'
                              ? 'success'
                              : 'draft'
                          }
                        >

                          {post.status === 'published'
                            ? 'Publicado'
                            : 'Borrador'}

                        </Badge>

                      </div>

                    </div>


                  </div>




                  <div className="mt-4 border-t border-gray-100 pt-4">


                    <p className="text-xs text-gray-500">

                      Creada:
                      {' '}
                      {new Date(
                        post.created_at
                      ).toLocaleDateString('es-AR')}

                    </p>



                    <div className="mt-4 grid grid-cols-2 gap-2">


                      {post.status === 'published' && (

                        <Link
                          href={`/noticias/${post.slug}`}
                          target="_blank"
                          className="rounded-lg border border-gray-300 px-3 py-2 text-center text-xs font-semibold text-gray-700"
                        >
                          Ver
                        </Link>

                      )}



                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="rounded-lg bg-cyan-50 px-3 py-2 text-center text-xs font-semibold text-cyan-700"
                      >
                        Editar
                      </Link>


                    </div>


                    <div className="mt-2">

                      <DeletePostButton
                        postId={post.id}
                        postTitle={post.title}
                      />

                    </div>


                  </div>


                </article>

              ))}


            </div>


          </>

        )}

      </Card>

    </section>
  )
}