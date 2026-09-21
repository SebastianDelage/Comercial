import {
  createAlbum,
  updateAlbum,
} from '@/lib/actions/gallery-actions'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ImageUploader from '@/components/admin/ImageUploader'


type AlbumFormProps = {
  album?: {
    id: string
    title: string
    slug: string
    description: string | null
    cover_image_url: string | null
    cover_image_path: string | null
    event_date: string | null
    status: 'draft' | 'published'
    display_order: number
  }
}


const inputClass = `
  mt-2
  w-full
  rounded-xl
  border
  border-gray-300
  px-4
  py-3
  text-base
  text-gray-900
  outline-none
  transition
  focus:border-cyan-500
  focus:ring-4
  focus:ring-cyan-100
`


export default function AlbumForm({
  album,
}: AlbumFormProps) {


  const action = album
    ? updateAlbum.bind(null, album.id)
    : createAlbum


  return (

    <form action={action}>

      <Card>


        <div className="
          grid
          gap-8

          lg:grid-cols-[1fr_360px]
        ">


          {/* INFORMACIÓN */}

          <div className="space-y-6">


            {/* TITULO */}

            <div>

              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700"
              >
                Título
              </label>


              <input
                id="title"
                name="title"
                required
                defaultValue={album?.title ?? ''}
                placeholder="Ej.: Torneo Apertura 2026"
                className={inputClass}
              />

            </div>





            {/* URL PUBLICA */}

            {album?.slug && (

              <div>

                <p className="text-sm font-semibold text-gray-700">
                  Dirección pública actual
                </p>


                <p className="
                  mt-2
                  overflow-hidden
                  rounded-xl
                  bg-gray-50
                  px-4
                  py-3
                  text-sm
                  text-gray-600
                  break-all
                ">
                  /galeria/{album.slug}
                </p>


              </div>

            )}






            {/* DESCRIPCIÓN */}

            <div>

              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Descripción
              </label>


              <textarea
                id="description"
                name="description"
                rows={5}
                defaultValue={album?.description ?? ''}
                placeholder="Contá brevemente qué muestran las fotografías."
                className={`
                  ${inputClass}
                  resize-y
                `}
              />


            </div>







            {/* FECHA + ORDEN */}

            <div className="
              grid
              gap-6

              sm:grid-cols-2
            ">


              <div>

                <label
                  htmlFor="event_date"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Fecha del evento
                </label>


                <input
                  id="event_date"
                  name="event_date"
                  type="date"
                  defaultValue={album?.event_date ?? ''}
                  className={inputClass}
                />


              </div>





              <div>

                <label
                  htmlFor="display_order"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Orden
                </label>


                <input
                  id="display_order"
                  name="display_order"
                  type="number"
                  min="0"
                  defaultValue={album?.display_order ?? 0}
                  className={inputClass}
                />


                <p className="
                  mt-2
                  text-xs
                  text-gray-500
                ">
                  Los números más bajos aparecen primero.
                </p>


              </div>


            </div>







            {/* ESTADO */}

            <div>


              <label
                htmlFor="status"
                className="block text-sm font-semibold text-gray-700"
              >
                Estado
              </label>



              <select
                id="status"
                name="status"
                defaultValue={album?.status ?? 'draft'}
                className={`
                  ${inputClass}
                  bg-white
                `}
              >

                <option value="draft">
                  Borrador
                </option>


                <option value="published">
                  Publicado
                </option>


              </select>


            </div>


          </div>








          {/* PORTADA */}

          <div className="
            rounded-2xl
            border
            border-gray-100
            bg-gray-50
            p-4

            sm:p-5
          ">


            <p className="
              mb-3
              text-sm
              font-semibold
              text-gray-700
            ">
              Portada del álbum
            </p>



            <ImageUploader
              name="cover_image_url"
              pathName="cover_image_path"
              defaultValue={album?.cover_image_url}
              defaultPath={album?.cover_image_path}
              folder="gallery"
              label="Imagen de portada"
              description="Recomendado: imagen horizontal JPG, PNG o WebP."
            />



            <p className="
              mt-3
              text-xs
              leading-5
              text-gray-500
            ">
              Podrás cambiar la portada posteriormente por una fotografía
              del álbum.
            </p>


          </div>


        </div>








        {/* BOTONES */}

        <div
          className="
            mt-8
            flex
            flex-col-reverse
            gap-3
            border-t
            border-gray-100
            pt-6

            sm:flex-row
            sm:justify-end
          "
        >


          <Button
            href="/admin/gallery"
            variant="secondary"
          >
            Cancelar
          </Button>



          <Button type="submit">

            {album
              ? 'Actualizar álbum'
              : 'Crear álbum'}

          </Button>


        </div>



      </Card>


    </form>

  )
}