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

          <div>
            <label
              htmlFor="excerpt"
              className="block text-sm font-medium text-gray-700"
            >
              Resumen
            </label>

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
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Contenido
            </label>

            <textarea
              id="content"
              name="content"
              required
              defaultValue={post?.content ?? ''}
              placeholder="Escribí el contenido completo de la noticia."
              rows={14}
              className="mt-2 w-full resize-y rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </div>

          <ImageUploader initialUrl={post?.cover_image_url} />

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
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
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
            {post ? 'Actualizar noticia' : 'Guardar noticia'}
          </Button>
        </div>
      </Card>
    </form>
  )
}