import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select('id, title, status')
    .limit(5)

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Test Supabase</h1>

      {error && (
        <pre className="mt-4 text-red-600">
          {error.message}
        </pre>
      )}

      <pre className="mt-4">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  )
}