import {
  createPost,
  updatePost,
} from '@/lib/actions/post-actions'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import ImageUploader from '@/components/admin/ImageUploader'
import RichTextEditor from '@/components/admin/RichTextEditor'


type PostFormProps = {
  post?: {
    id: string
    title: string
    excerpt: string | null
    content: string
    cover_image_url: string | null
    cover_image_path: string | null
    status: 'draft' | 'published'
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


export default function PostForm({
  post,
}: PostFormProps) {


  const action = post
    ? updatePost.bind(null, post.id)
    : createPost


  return (

    <form action={action}>

      <Card>

        <div className="space-y-7">


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
              defaultValue={post?.title ?? ''}
              placeholder="Ej.: Gran victoria del equipo de primera"
              className={inputClass}
            />

          </div>



          {/* RESUMEN */}

          <div>

            <label
              htmlFor="excerpt"
              className="block text-sm font-semibold text-gray-700"
            >
              Resumen
            </label>


            <textarea
              id="excerpt"
              name="excerpt"
              rows={4}
              defaultValue={post?.excerpt ?? ''}
              placeholder="Breve resumen de la noticia."
              className={`
                ${inputClass}
                resize-none
              `}
            />


            <p className="
              mt-2
              text-xs
              leading-5
              text-gray-500
            ">
              Aparece como introducción en listados y portada.
            </p>


          </div>




          {/* CONTENIDO */}

          <div>

            <label
              className="block text-sm font-semibold text-gray-700"
            >
              Contenido
            </label>


            <div className="mt-2">

              <RichTextEditor
                name="content"
                initialContent={post?.content ?? ''}
                placeholder="Escribí el contenido completo de la noticia."
              />

            </div>


          </div>





          {/* IMAGEN */}

          <div className="
            rounded-2xl
            border
            border-gray-100
            bg-gray-50
            p-4
            sm:p-5
          ">


            <ImageUploader
              name="cover_image_url"
              pathName="cover_image_path"
              defaultValue={post?.cover_image_url}
              defaultPath={post?.cover_image_path}
              folder="posts"
              label="Imagen de portada"
              description="JPG, PNG o WebP. Máximo 5 MB."
            />


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
              defaultValue={post?.status ?? 'draft'}
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





        {/* ACCIONES */}

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
            href="/admin/posts"
            variant="secondary"
          >
            Cancelar
          </Button>



          <Button type="submit">

            {post
              ? 'Actualizar noticia'
              : 'Guardar noticia'}

          </Button>


        </div>



      </Card>


    </form>

  )
}