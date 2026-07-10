import Card from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'
import { getAdminPosts } from '@/lib/queries/posts'

export default async function AdminPage() {
  const posts = await getAdminPosts()

  const published = posts.filter((post) => post.status === 'published').length
  const drafts = posts.filter((post) => post.status === 'draft').length

  return (
    <section>
      <PageHeader
        title="Dashboard"
        description="Resumen general del sitio institucional."
      />

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <p className="text-sm font-medium text-gray-500">Noticias totales</p>
          <p className="mt-3 text-4xl font-bold text-gray-900">
            {posts.length}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-medium text-gray-500">Publicadas</p>
          <p className="mt-3 text-4xl font-bold text-cyan-600">
            {published}
          </p>
        </Card>

        <Card>
          <p className="text-sm font-medium text-gray-500">Borradores</p>
          <p className="mt-3 text-4xl font-bold text-gray-700">
            {drafts}
          </p>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-bold text-gray-900">
            Próximos módulos
          </h2>

          <div className="mt-4 grid gap-3 text-sm text-gray-600">
            <p>Galería de imágenes</p>
            <p>Páginas institucionales</p>
            <p>Configuración del sitio</p>
            <p>Deportes y disciplinas</p>
          </div>
        </Card>
      </div>
    </section>
  )
}