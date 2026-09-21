import Link from 'next/link'

import { getAdminPosts } from '@/lib/queries/posts'
import { getAdminAlbums } from '@/lib/queries/gallery'


function formatDate(date: string | null) {
  if (!date) return 'Sin fecha'

  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}


export default async function AdminPage() {
  const [posts, albums] = await Promise.all([
    getAdminPosts(),
    getAdminAlbums(),
  ])


  const publishedPosts = posts.filter(
    (post) => post.status === 'published'
  ).length


  const draftPosts = posts.filter(
    (post) => post.status === 'draft'
  ).length


  const publishedAlbums = albums.filter(
    (album) => album.status === 'published'
  ).length


  const recentPosts = posts.slice(0, 4)


  return (
    <div className="space-y-10">


      {/* BIENVENIDA */}
      <section>

        <p className="text-sm font-bold text-cyan-700">
          Panel de administración
        </p>


        <div className="
          mt-2
          flex
          flex-col
          gap-6
          xl:flex-row
          xl:items-end
          xl:justify-between
        ">


          <div>

            <h1 className="
              text-3xl
              font-black
              tracking-tight
              text-slate-950
              sm:text-4xl
            ">
              ¿Qué querés hacer?
            </h1>


            <p className="
              mt-3
              max-w-2xl
              text-base
              leading-7
              text-slate-500
            ">
              Desde acá podés publicar las novedades del club y mantener
              actualizada la galería de fotos.
            </p>

          </div>



          {/* ACCIONES */}
          <div className="
            flex
            flex-col
            gap-3
            sm:flex-row
          ">


            <Link
              href="/admin/posts/new"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-cyan-600
                px-5
                py-3
                text-sm
                font-bold
                text-white
                shadow-sm
                transition
                hover:bg-cyan-700
              "
            >
              <PlusIcon className="h-4 w-4" />
              Nueva noticia
            </Link>



            <Link
              href="/admin/gallery/new"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-5
                py-3
                text-sm
                font-bold
                text-slate-700
                shadow-sm
                transition
                hover:border-cyan-200
                hover:bg-cyan-50
                hover:text-cyan-800
              "
            >
              <PlusIcon className="h-4 w-4" />
              Nuevo álbum
            </Link>


          </div>

        </div>

      </section>





      {/* ÁREAS PRINCIPALES */}
      <section>


        <div className="mb-5">

          <h2 className="text-lg font-black text-slate-950">
            Gestioná el contenido
          </h2>


          <p className="mt-1 text-sm text-slate-500">
            Elegí qué parte del sitio querés actualizar.
          </p>

        </div>



        <div className="
          grid
          gap-5
          lg:grid-cols-2
        ">


          {/* NOTICIAS */}

          <Link
            href="/admin/posts"
            className="
              group
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:border-cyan-200
              hover:shadow-md
              sm:p-7
            "
          >

            <div className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-start
              sm:justify-between
            ">


              <div className="
                flex
                min-w-0
                gap-4
              ">

                <div className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-cyan-50
                  text-cyan-700
                ">
                  <NewsIcon className="h-7 w-7" />
                </div>



                <div>

                  <h3 className="
                    text-xl
                    font-black
                    text-slate-950
                  ">
                    Noticias
                  </h3>


                  <p className="
                    mt-1
                    text-sm
                    leading-6
                    text-slate-500
                  ">
                    Creá, editá y publicá las novedades del club.
                  </p>

                </div>

              </div>



              <span className="
                text-2xl
                text-slate-300
                transition
                group-hover:translate-x-1
                group-hover:text-cyan-600
              ">
                →
              </span>


            </div>



            <div className="
              mt-7
              flex
              flex-wrap
              gap-2
              border-t
              border-slate-100
              pt-5
            ">

              <StatusBadge>
                {publishedPosts}{' '}
                {publishedPosts === 1
                  ? 'publicada'
                  : 'publicadas'}
              </StatusBadge>


              {draftPosts > 0 && (
                <StatusBadge>
                  {draftPosts}{' '}
                  {draftPosts === 1
                    ? 'borrador'
                    : 'borradores'}
                </StatusBadge>
              )}


              <span className="
                px-2
                py-1
                text-xs
                font-semibold
                text-slate-400
              ">
                {posts.length} en total
              </span>

            </div>


          </Link>





          {/* GALERÍA */}

          <Link
            href="/admin/gallery"
            className="
              group
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              transition
              hover:-translate-y-0.5
              hover:border-cyan-200
              hover:shadow-md
              sm:p-7
            "
          >

            <div className="
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-start
              sm:justify-between
            ">


              <div className="
                flex
                min-w-0
                gap-4
              ">

                <div className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-cyan-50
                  text-cyan-700
                ">
                  <GalleryIcon className="h-7 w-7" />
                </div>


                <div>

                  <h3 className="
                    text-xl
                    font-black
                    text-slate-950
                  ">
                    Galería
                  </h3>


                  <p className="
                    mt-1
                    text-sm
                    leading-6
                    text-slate-500
                  ">
                    Organizá los álbumes y subí fotografías del club.
                  </p>

                </div>


              </div>



              <span className="
                text-2xl
                text-slate-300
                transition
                group-hover:translate-x-1
                group-hover:text-cyan-600
              ">
                →
              </span>


            </div>



            <div className="
              mt-7
              flex
              flex-wrap
              gap-2
              border-t
              border-slate-100
              pt-5
            ">

              <StatusBadge>
                {publishedAlbums}{' '}
                {publishedAlbums === 1
                  ? 'álbum publicado'
                  : 'álbumes publicados'}
              </StatusBadge>


              <span className="
                px-2
                py-1
                text-xs
                font-semibold
                text-slate-400
              ">
                {albums.length}{' '}
                {albums.length === 1
                  ? 'álbum'
                  : 'álbumes'} en total
              </span>

            </div>


          </Link>


        </div>


      </section>





      {/* ACTIVIDAD RECIENTE */}

      <section className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      ">


        <div className="
          flex
          flex-col
          gap-3
          border-b
          border-slate-100
          px-6
          py-5
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-7
        ">


          <div>

            <h2 className="font-black text-slate-950">
              Noticias recientes
            </h2>


            <p className="
              mt-1
              text-sm
              text-slate-500
            ">
              Últimas publicaciones creadas en el sitio.
            </p>


          </div>



          <Link
            href="/admin/posts"
            className="
              text-sm
              font-bold
              text-cyan-700
              transition
              hover:text-cyan-800
            "
          >
            Ver todas →
          </Link>


        </div>



        {recentPosts.length === 0 ? (

          <div className="
            px-6
            py-12
            text-center
            sm:px-7
          ">

            <p className="font-bold text-slate-900">
              Todavía no hay noticias
            </p>

          </div>


        ) : (

          <div>

            {recentPosts.map((post) => (

              <div
                key={post.id}
                className="
                  flex
                  flex-col
                  gap-4
                  border-b
                  border-slate-100
                  px-6
                  py-5
                  last:border-b-0
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                  sm:px-7
                "
              >


                <div className="
                  flex
                  min-w-0
                  items-center
                  gap-4
                ">


                  <div className="
                    h-14
                    w-20
                    shrink-0
                    overflow-hidden
                    rounded-xl
                    bg-slate-100
                  ">

                    {post.cover_image_url ? (

                      <img
                        src={post.cover_image_url}
                        alt=""
                        className="h-full w-full object-cover"
                      />

                    ) : (

                      <div className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        text-slate-300
                      ">
                        <NewsIcon className="h-5 w-5" />
                      </div>

                    )}

                  </div>



                  <div className="min-w-0">

                    <p className="
                      truncate
                      font-bold
                      text-slate-900
                    ">
                      {post.title}
                    </p>


                    <span className="
                      text-xs
                      text-slate-400
                    ">
                      {formatDate(
                        post.published_at ?? post.created_at
                      )}
                    </span>


                  </div>


                </div>




                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    px-4
                    py-2
                    text-center
                    text-sm
                    font-bold
                    text-slate-600
                    transition
                    hover:border-cyan-200
                    hover:bg-cyan-50
                    hover:text-cyan-800
                    sm:w-auto
                  "
                >
                  Editar
                </Link>


              </div>

            ))}


          </div>

        )}


      </section>


    </div>
  )
}




function StatusBadge({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <span className="
      rounded-lg
      bg-slate-100
      px-3
      py-1
      text-xs
      font-bold
      text-slate-600
    ">
      {children}
    </span>
  )

}





function PlusIcon({
  className,
}: {
  className?: string
}) {

  return (

    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>

  )

}





function NewsIcon({
  className,
}: {
  className?: string
}) {

  return (

    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
      <path d="M7 7h10M7 11h10M7 15h6" />
    </svg>

  )

}





function GalleryIcon({
  className,
}: {
  className?: string
}) {

  return (

    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >

      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2"
      />

      <circle
        cx="8.5"
        cy="9"
        r="1.5"
      />

      <path d="m5 18 4.5-4.5 3 3 2-2L19 18" />

    </svg>

  )

}