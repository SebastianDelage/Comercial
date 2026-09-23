import Link from 'next/link'

import { getPublishedPosts } from '@/lib/queries/posts'


export async function generateMetadata() {
  return {
    title: 'Noticias | Comercial Rugby Club',
    description:
      'Novedades, actividades y todo lo que pasa en Comercial Rugby Club dentro y fuera de la cancha.',
    openGraph: {
      title: 'Noticias | Comercial Rugby Club',
      description:
        'Últimas noticias y novedades de Comercial Rugby Club.',
    },
  }
}



function formatDate(date: string | null) {
  if (!date) return null

  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}



export default async function NoticiasPage() {

  const posts = await getPublishedPosts()


  return (
    <>

      {/* HERO */}

      <section className="bg-slate-950 text-white">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

          <div className="max-w-3xl">

            <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-400">
              Comercial Rugby Club
            </p>


            <h1 className="mt-4 text-5xl font-black sm:text-6xl lg:text-7xl">
              Noticias
            </h1>


            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Novedades, actividades y todo lo que pasa en Comercial dentro y
              fuera de la cancha.
            </p>


          </div>

        </div>

      </section>






      {/* ARCHIVO */}

      <main className="bg-white">

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">


          <div className="flex items-end justify-between gap-6 border-b border-gray-200 pb-8">


            <div>

              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
                Actualidad
              </p>


              <h2 className="mt-2 text-3xl font-black text-gray-950 sm:text-4xl">
                Últimas publicaciones
              </h2>


            </div>




            {posts.length > 0 && (

              <p className="hidden text-sm font-medium text-gray-400 sm:block">

                {posts.length}{' '}

                {posts.length === 1
                  ? 'publicación'
                  : 'publicaciones'}

              </p>

            )}


          </div>







          {posts.length === 0 ? (

            <div className="py-24 text-center">

              <p className="text-xl font-black text-gray-950">
                Todavía no hay noticias publicadas.
              </p>


              <p className="mt-2 text-gray-500">
                Las novedades del club aparecerán acá.
              </p>


            </div>



          ) : (


            <div>


              {posts.map((post, index) => {


                const formattedDate =
                  formatDate(post.published_at)



                return (

                  <Link

                    key={post.id}

                    href={`/noticias/${post.slug}`}

                    className="group block border-b border-gray-200"

                  >



                    <article className="grid gap-6 py-8 sm:grid-cols-[220px_1fr] sm:items-center sm:gap-8 lg:grid-cols-[300px_1fr_56px] lg:gap-12 lg:py-10">



                      {/* IMAGEN */}


                      <div className="relative overflow-hidden bg-slate-100">


                        {post.cover_image_url ? (

                          <img

                            src={post.cover_image_url}

                            alt={`Imagen de la noticia: ${post.title}`}

                            loading={
                              index === 0
                                ? 'eager'
                                : 'lazy'
                            }

                            decoding="async"

                            className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.04]"

                          />

                        ) : (


                          <div className="flex aspect-[16/10] items-center justify-center bg-slate-100">

                            <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                              CRC
                            </span>

                          </div>


                        )}




                        <span className="absolute left-3 top-3 flex h-8 min-w-8 items-center justify-center bg-slate-950/85 px-2 text-xs font-black text-white backdrop-blur-sm">

                          {String(index + 1).padStart(2, '0')}

                        </span>


                      </div>







                      {/* INFORMACIÓN */}


                      <div className="min-w-0">


                        {formattedDate && (

                          <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700">

                            {formattedDate}

                          </p>

                        )}





                        <h2 className="mt-3 max-w-3xl text-2xl font-black leading-tight text-gray-950 transition duration-200 group-hover:text-cyan-700 sm:text-3xl lg:text-[2rem]">

                          {post.title}

                        </h2>





                        {post.excerpt && (

                          <p className="mt-4 max-w-3xl line-clamp-2 text-base leading-7 text-gray-600">

                            {post.excerpt}

                          </p>

                        )}







                        <div className="mt-5 flex items-center gap-2 text-sm font-bold text-cyan-700 lg:hidden">

                          Ver noticia

                          <span
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-1"
                          >
                            →
                          </span>


                        </div>


                      </div>








                      {/* DESKTOP */}

                      <div className="hidden items-center justify-end lg:flex">

                        <span
                          aria-hidden="true"
                          className="text-3xl font-light text-gray-300 transition duration-200 group-hover:translate-x-1 group-hover:text-cyan-600"
                        >
                          →
                        </span>


                      </div>




                    </article>


                  </Link>


                )

              })}


            </div>


          )}


        </section>

      </main>

    </>
  )
}