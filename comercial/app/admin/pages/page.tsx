import Link from 'next/link'

import { getAdminPages } from '@/lib/queries/pages'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import PageHeader from '@/components/ui/PageHeader'
import DeletePageButton from '@/components/admin/DeletePageButton'

export default async function AdminPagesPage() {
  const pages = await getAdminPages()

  return (
    <section>
      <PageHeader
        title="Páginas institucionales"
        description="Administrá las secciones fijas del sitio."
        action={
          <Button href="/admin/pages/new">
            Nueva página
          </Button>
        }
      />

      <Card>
        {pages.length === 0 ? (
          <div className="py-12 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Todavía no hay páginas
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Podés comenzar creando la historia del club.
            </p>

            <div className="mt-6">
              <Button href="/admin/pages/new">
                Crear página
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="px-4 py-3 font-medium">
                    Página
                  </th>

                  <th className="px-4 py-3 font-medium">
                    Última actualización
                  </th>

                  <th className="px-4 py-3 text-right font-medium">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {pages.map((page) => (
                  <tr
                    key={page.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">
                      <p className="font-semibold text-gray-900">
                        {page.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        /institucional/{page.slug}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {new Date(
                        page.updated_at
                      ).toLocaleDateString('es-AR')}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/institucional/${page.slug}`}
                          target="_blank"
                          className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Ver
                        </Link>

                        <Link
                          href={`/admin/pages/${page.id}/edit`}
                          className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs font-medium text-cyan-700 hover:bg-cyan-100"
                        >
                          Editar
                        </Link>

                        <DeletePageButton
                          pageId={page.id}
                          pageTitle={page.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </section>
  )
}