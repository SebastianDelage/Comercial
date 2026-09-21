import Link from 'next/link'
import { notFound } from 'next/navigation'

import PageHeader from '@/components/ui/PageHeader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

import GalleryImageUploader from '@/components/admin/gallery/GalleryImageUploader'
import DeleteGalleryImageButton from '@/components/admin/gallery/DeleteGalleryImageButton'

import { getAlbumWithImagesById } from '@/lib/queries/gallery'


type AlbumImagesPageProps = {
  params: Promise<{
    id: string
  }>
}


export default async function AlbumImagesPage({
  params,
}: AlbumImagesPageProps) {

  const { id } = await params

  const album = await getAlbumWithImagesById(id)


  if (!album) {
    notFound()
  }


  const images = album.gallery_images ?? []



  return (

    <section>


      <PageHeader
        title={`Fotografías: ${album.title}`}
        description="Subí y administrá las imágenes de este álbum."
        action={

          <div
            className="
              flex
              flex-col
              gap-3

              sm:flex-row
            "
          >

            <Button
              href={`/admin/gallery/${album.id}/edit`}
              variant="secondary"
            >
              Editar álbum
            </Button>


            <Button
              href="/admin/gallery"
            >
              Volver a galería
            </Button>

          </div>

        }
      />





      <GalleryImageUploader
        albumId={album.id}
      />







      <div className="mt-8">

        <Card>


          <div
            className="
              mb-6
              flex
              flex-col
              gap-4

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div className="min-w-0">


              <h2
                className="
                  truncate
                  text-lg
                  font-bold
                  text-gray-900
                "
              >
                Fotografías del álbum
              </h2>


              <p
                className="
                  mt-1
                  text-sm
                  text-gray-500
                "
              >
                {images.length}{' '}

                {images.length === 1
                  ? 'fotografía cargada'
                  : 'fotografías cargadas'}
              </p>


            </div>





            {album.status === 'published' && (

              <Link
                href={`/galeria/${album.slug}`}
                target="_blank"
                className="
                  shrink-0
                  text-sm
                  font-semibold
                  text-cyan-700
                  hover:text-cyan-800
                "
              >
                Ver álbum público ↗
              </Link>

            )}


          </div>









          {images.length === 0 ? (

            <div
              className="
                rounded-xl
                border
                border-dashed
                border-gray-300
                py-14
                text-center
              "
            >

              <p
                className="
                  font-medium
                  text-gray-700
                "
              >
                El álbum todavía no tiene fotografías
              </p>


              <p
                className="
                  mt-2
                  text-sm
                  text-gray-500
                "
              >
                Seleccioná imágenes desde el cargador superior.
              </p>


            </div>



          ) : (


            <div
              className="
                grid
                gap-5

                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >


              {images.map((image) => (

                <article
                  key={image.id}
                  className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                  "
                >


                  <img
                    src={image.image_url}
                    alt={
                      image.alt_text ||
                      image.title ||
                      album.title
                    }
                    loading="lazy"
                    className="
                      aspect-[4/3]
                      w-full
                      object-cover
                    "
                  />



                  <div className="p-4">


                    <p
                      className="
                        truncate
                        text-sm
                        font-semibold
                        text-gray-900
                      "
                    >
                      {
                        image.title ||
                        image.alt_text ||
                        'Fotografía sin título'
                      }
                    </p>



                    <p
                      className="
                        mt-1
                        text-xs
                        text-gray-500
                      "
                    >
                      Orden: {image.display_order}
                    </p>





                    <div
                      className="
                        mt-4
                        border-t
                        border-gray-100
                        pt-3
                      "
                    >

                      <DeleteGalleryImageButton
                        imageId={image.id}
                      />

                    </div>


                  </div>


                </article>


              ))}


            </div>


          )}


        </Card>


      </div>


    </section>

  )
}