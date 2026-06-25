import LoginForm from '@/components/admin/LoginForm'

type LoginPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="w-full max-w-md rounded border p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold">Panel administrador</h1>

        <LoginForm error={params.error} />
      </section>
    </main>
  )
}