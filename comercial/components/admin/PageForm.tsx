import {
  createPage,
  updatePage,
} from '@/lib/actions/page-actions'

import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import RichTextEditor from '@/components/admin/RichTextEditor'

type PageFormProps = {
  page?: {
    id: string
    title: string
    slug: string
    content: string
  }
}

export default function PageForm({
  page,
}: PageFormProps) {
  const action = page
    ? updatePage.bind(null, page.id)
    : createPage

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
              defaultValue={page?.title ?? ''}
              placeholder="Ej.: Historia del club"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />

            <p className="mt-2 text-xs text-gray-500">
              La URL se generará automáticamente a partir del título.
            </p>
          </div>

          {page?.slug && (
            <div>
              <p className="text-sm font-medium text-gray-700">
                URL pública actual
              </p>

              <p className="mt-2 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
                /institucional/{page.slug}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contenido
            </label>

            <div className="mt-2">
              <RichTextEditor
                name="content"
                initialContent={page?.content ?? ''}
                placeholder="Escribí el contenido institucional."
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">
          <Button
            href="/admin/pages"
            variant="secondary"
          >
            Cancelar
          </Button>

          <Button type="submit">
            {page ? 'Actualizar página' : 'Guardar página'}
          </Button>
        </div>
      </Card>
    </form>
  )
}