import Card from '@/components/ui/Card'
import PageHeader from '@/components/ui/PageHeader'

type ComingSoonProps = {
  title: string
  description: string
}

export default function ComingSoon({
  title,
  description,
}: ComingSoonProps) {
  return (
    <section>
      <PageHeader
        title={title}
        description={description}
      />

      <Card>
        <div className="py-14 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-2xl text-cyan-700">
            CRC
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Módulo en desarrollo
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            Esta sección ya forma parte del panel y se implementará en una
            próxima etapa.
          </p>
        </div>
      </Card>
    </section>
  )
}