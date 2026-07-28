import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPageBySlug } from '@/lib/queries/pages'

type InstitutionalPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function InstitutionalPage({
  params,
}: InstitutionalPageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/"
        className="text-sm font-medium text-cyan-700 hover:text-cyan-800"
      >
        ← Volver al inicio
      </Link>

      <article className="mt-8">
        <h1 className="text-4xl font-bold text-gray-900">
          {page.title}
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Actualizado el{' '}
          {new Date(page.updated_at).toLocaleDateString(
            'es-AR'
          )}
        </p>

      <div
        className="rich-content mt-10 text-base leading-8 text-gray-800"
        dangerouslySetInnerHTML={{
            __html: page.content,
        }}
        />
      </article>
    </main>
  )
}