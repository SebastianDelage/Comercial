import Link from 'next/link'
import { notFound } from 'next/navigation'

import GalleryLightbox from '@/components/public/gallery/GalleryLightbox'
import { getPublishedAlbumBySlug } from '@/lib/queries/gallery'


type GaleriaAlbumPageProps = {
  params: Promise<{
    slug: string
  }>
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



export async function generateMetadata({
  params,
}: GaleriaAlbumPageProps) {

  const { slug } = await params

  const album = await getPublishedAlbumBySlug(slug)


  if (!album) {
    return {
      title: 'Álbum no encontrado | Comercial Rugby Club',
    }
  }


  return {
    title: `${album.title} | Galería | Comercial Rugby Club`,

    description:
      album.description ??
      `Fotografías de ${album.title} en Comercial Rugby Club.`,

    openGraph: {
      title: `${album.title} | Comercial Rugby Club`,

      description:
        album.description ??
        `Galería fotográfica de ${album.title}.`,

      images: album.cover_image_url
        ? [
            {
              url: album.cover_image_url,
            },
          ]
        : [],
    },
  }
}




export default async function GaleriaAlbumPage({
  params,
}: GaleriaAlbumPageProps) {


  const { slug } = await params


  const album =
    await getPublishedAlbumBySlug(slug)



  if (!album) {
    notFound()
  }



  const images =
    album.gallery_images ?? []



  const formattedDate =
    formatDate(album.event_date)



  return (
    <>


      {/* CABECERA */}

      <section className="bg-slate-950 text-white">


        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">


          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition hover:text-white"
          >

            <span aria-hidden="true">
              ←
            </span>

            Volver a Galería

          </Link>




          <div className="mt-12 max-w-4xl">


            <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-400">

              Galería · Comercial Rugby Club

            </p>



            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">

              {album.title}

            </h1>




            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-slate-300">


              {formattedDate && (

                <span>
                  {formattedDate}
                </span>

              )}




              <span
                className="text-slate-600"
                aria-hidden="true"
              >
                •
              </span>



              <span>

                {images.length}{' '}

                {images.length === 1
                  ? 'foto'
                  : 'fotos'}

              </span>


            </div>





            {album.description && (

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">

                {album.description}

              </p>

            )}



          </div>


        </div>


      </section>






      {/* FOTOS */}


      <main className="mx-auto max-w-7xl px-3 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">


        <GalleryLightbox

          images={images}

          albumTitle={album.title}

        />


      </main>






      {/* VOLVER */}


      <section className="border-t border-gray-200">


        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">


          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 font-bold text-cyan-700 transition hover:text-cyan-800"
          >

            <span aria-hidden="true">
              ←
            </span>

            Ver todos los álbumes

          </Link>


        </div>


      </section>



    </>
  )
}