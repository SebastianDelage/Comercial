import Link from 'next/link'

import { getPublishedAlbums } from '@/lib/queries/gallery'


export async function generateMetadata() {
  return {
    title: 'Galería | Comercial Rugby Club',
    description:
      'Partidos, encuentros y momentos que forman parte de la historia de Comercial Rugby Club.',
    openGraph: {
      title: 'Galería | Comercial Rugby Club',
      description:
        'Fotos y recuerdos de Comercial Rugby Club.',
    },
  }
}


function formatDate(date: string | null) {
  if (!date) {
    return null
  }

  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}


export default async function GaleriaPage() {

  const albums = await getPublishedAlbums()


  return (
    <>

      {/* HERO */}

      <section className="bg-slate-950 text-white">

        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">

          <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-400">
            Comercial Rugby Club
          </p>


          <h1 className="mt-4 max-w-4xl text-5xl font-black sm:text-6xl lg:text-7xl">
            Galería
          </h1>


          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Los partidos, encuentros y momentos que forman parte de la vida
            de Comercial.
          </p>

        </div>

      </section>





      {/* ÁLBUMES */}

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">


        <div className="flex flex-col gap-4 border-b border-gray-200 pb-8 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
              Archivo fotográfico
            </p>


            <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
              Últimos álbumes
            </h2>

          </div>



          {albums.length > 0 && (

            <p className="text-sm font-medium text-gray-500">

              {albums.length}{' '}

              {albums.length === 1
                ? 'álbum publicado'
                : 'álbumes publicados'}

            </p>

          )}

        </div>





        {albums.length === 0 ? (

          <div className="py-24 text-center">

            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
              Galería
            </p>


            <h2 className="mt-4 text-3xl font-black text-gray-950">
              Todavía no hay álbumes publicados.
            </h2>


            <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-600">
              Cuando publiquemos nuevas fotos de partidos, encuentros y
              actividades del club, vas a poder encontrarlas acá.
            </p>

          </div>


        ) : (


          <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">


            {albums.map((album, index) => {


              const imageCount =
                album.gallery_images?.length ?? 0


              const formattedDate =
                formatDate(album.event_date)



              return (

                <Link
                  key={album.id}
                  href={`/galeria/${album.slug}`}
                  className="group block"
                >


                  {/* PORTADA */}


                  <div className="relative overflow-hidden rounded-3xl bg-slate-100">


                    {album.cover_image_url ? (


                      <img

                        src={album.cover_image_url}

                        alt={`Fotografías de ${album.title}`}

                        loading={
                          index < 2
                            ? 'eager'
                            : 'lazy'
                        }

                        className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"

                      />


                    ) : (


                      <div className="flex aspect-[16/10] w-full items-center justify-center bg-slate-200">

                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                          Comercial Rugby Club
                        </p>

                      </div>


                    )}



                    <div className="absolute bottom-4 right-4 rounded-full bg-slate-950/80 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm">

                      {imageCount}{' '}

                      {imageCount === 1
                        ? 'foto'
                        : 'fotos'}

                    </div>


                  </div>





                  {/* INFORMACIÓN */}


                  <div className="mt-6">


                    {formattedDate && (

                      <p className="text-sm font-bold uppercase tracking-[0.15em] text-cyan-700">
                        {formattedDate}
                      </p>

                    )}



                    <div className="mt-2 flex items-start justify-between gap-6">


                      <h3 className="text-2xl font-black leading-tight text-gray-950 transition group-hover:text-cyan-700 sm:text-3xl">

                        {album.title}

                      </h3>



                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-2xl text-gray-400 transition group-hover:translate-x-1 group-hover:text-cyan-700"
                      >
                        →
                      </span>


                    </div>



                    {album.description && (

                      <p className="mt-3 line-clamp-2 max-w-2xl leading-7 text-gray-600">
                        {album.description}
                      </p>

                    )}


                  </div>


                </Link>

              )

            })}


          </div>


        )}

      </section>

    </>
  )
}