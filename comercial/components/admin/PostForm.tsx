import { createPost, updatePost } from '@/lib/actions/post-actions'
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
    status: 'draft' | 'published'
  }
}

export default function PostForm({ post }: PostFormProps) {
  const action = post
    ? updatePost.bind(null, post.id)
    : createPost

  return (
    <form action={action}>
      <Card>
        <div className="space-y-6">
          {/* TÍTULO */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Título
            </label>

            <input
              id="title"
              name="title"
              required
              defaultValue={post?.title ?? ''}
              placeholder="Ej.: Gran victoria del equipo de primera"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </div>

          {/* RESUMEN */}
          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700"
            >
              Resumen
            </label>

            <textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              defaultValue={post?.excerpt ?? ''}
              placeholder="Breve resumen de la noticia para mostrar en listados y portada."
              className="mt-2 w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />

            <p className="mt-2 text-xs text-gray-500">
              Este texto se utiliza como introducción en la portada y en el
              listado de noticias.
            </p>
          </div>

          {/* CONTENIDO */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
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

          {/* IMAGEN DE PORTADA */}
          <ImageUploader
            name="cover_image_url"
            defaultValue={post?.cover_image_url}
            folder="posts"
            label="Imagen de portada"
            description="JPG, PNG o WebP. Máximo 5 MB."
          />

          {/* ESTADO */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Estado
            </label>

            <select
              id="status"
              name="status"
              defaultValue={post?.status ?? 'draft'}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
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

        <div className="mt-8 flex items-center justify-end gap-3 border-t border-gray-100 pt-6">
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