import { notFound } from 'next/navigation'

import PageForm from '@/components/admin/PageForm'
import PageHeader from '@/components/ui/PageHeader'
import { getPageById } from '@/lib/queries/pages'

type EditPageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function EditPage({
  params,
}: EditPageProps) {
  const { id } = await params
  const page = await getPageById(id)

  if (!page) {
    notFound()
  }

  return (
    <section>
      <PageHeader
        title="Editar página"
        description="Actualizá la información institucional."
      />

      <PageForm page={page} />
    </section>
  )
}