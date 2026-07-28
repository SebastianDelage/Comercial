import PageForm from '@/components/admin/PageForm'
import PageHeader from '@/components/ui/PageHeader'

export default function NewPagePage() {
  return (
    <section>
      <PageHeader
        title="Nueva página"
        description="Creá una nueva sección institucional."
      />

      <PageForm />
    </section>
  )
}