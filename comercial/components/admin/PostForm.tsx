import { createPost, updatePost } from '@/lib/actions/post-actions'

type PostFormProps = {
  post?: {
    id: string
    title: string
    excerpt: string | null
    content: string
    status: 'draft' | 'published'
  }
}

export default function PostForm({ post }: PostFormProps) {
  const action = post
    ? updatePost.bind(null, post.id)
    : createPost

  return (
    <form action={action} className="max-w-3xl space-y-5">
      <div>
        <label className="block text-sm font-medium">Título</label>
        <input
          name="title"
          required
          defaultValue={post?.title ?? ''}
          className="mt-1 w-full rounded border px-3 py-2"
          placeholder="Título de la noticia"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Resumen</label>
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt ?? ''}
          className="mt-1 w-full rounded border px-3 py-2"
          placeholder="Resumen breve"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Contenido</label>
        <textarea
          name="content"
          required
          defaultValue={post?.content ?? ''}
          className="mt-1 w-full rounded border px-3 py-2"
          placeholder="Contenido completo de la noticia"
          rows={10}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Estado</label>
        <select
          name="status"
          className="mt-1 w-full rounded border px-3 py-2"
          defaultValue={post?.status ?? 'draft'}
        >
          <option value="draft">Borrador</option>
          <option value="published">Publicado</option>
        </select>
      </div>

      <button
        type="submit"
        className="rounded bg-black px-5 py-2 text-white"
      >
        {post ? 'Actualizar noticia' : 'Guardar noticia'}
      </button>
    </form>
  )
}