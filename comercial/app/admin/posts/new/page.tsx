import PostForm from '@/components/admin/PostForm'

export default function NewPostPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Nueva noticia</h1>
      <div className="mt-6">
        <PostForm />
      </div>
    </section>
  )
}