'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { createClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils/slug'


type PostStatus = 'draft' | 'published'


export async function createPost(
  formData: FormData
) {
  const supabase = await createClient()


  const title = String(
    formData.get('title') ?? ''
  ).trim()

  const excerpt = String(
    formData.get('excerpt') ?? ''
  ).trim()

  const content = String(
    formData.get('content') ?? ''
  )


  const status = String(
    formData.get('status') ?? 'draft'
  ) as PostStatus


  const slug = generateSlug(title)


  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser()


  if (!user) {
    redirect('/admin/login')
  }


  const coverImageUrl = String(
    formData.get('cover_image_url') ?? ''
  ).trim()


  const coverImagePath = String(
    formData.get('cover_image_path') ?? ''
  ).trim()



  const { error } = await supabase
    .from('posts')
    .insert({
      title,
      slug,
      excerpt: excerpt || null,
      content,
      status,
      author_id: user.id,

      cover_image_url:
        coverImageUrl || null,

      cover_image_path:
        coverImagePath || null,

      published_at:
        status === 'published'
          ? new Date().toISOString()
          : null,
    })


  if (error) {
    throw new Error(error.message)
  }


  revalidatePath('/admin/posts')
  revalidatePath('/noticias')


  redirect('/admin/posts')
}




export async function updatePost(
  id: string,
  formData: FormData
) {
  const supabase = await createClient()


  const title = String(
    formData.get('title') ?? ''
  ).trim()

  const excerpt = String(
    formData.get('excerpt') ?? ''
  ).trim()

  const content = String(
    formData.get('content') ?? ''
  )


  const status = String(
    formData.get('status') ?? 'draft'
  ) as PostStatus


  const slug = generateSlug(title)



  const {
    data: currentPost,
    error: currentError,
  } = await supabase
    .from('posts')
    .select(`
      status,
      published_at,
      cover_image_url,
      cover_image_path
    `)
    .eq('id', id)
    .single()



  if (currentError || !currentPost) {
    throw new Error(
      'No se encontró la noticia.'
    )
  }



  const shouldSetPublishedAt =
    status === 'published' &&
    !currentPost.published_at



  const coverImageUrl = String(
    formData.get('cover_image_url') ?? ''
  ).trim()


  const coverImagePath = String(
    formData.get('cover_image_path') ?? ''
  ).trim()



  const updatedPost = {

    title,
    slug,
    excerpt: excerpt || null,
    content,
    status,


    cover_image_url:
      coverImageUrl ||
      currentPost.cover_image_url ||
      null,


    cover_image_path:
      coverImagePath ||
      currentPost.cover_image_path ||
      null,


    published_at:
      shouldSetPublishedAt
        ? new Date().toISOString()
        : currentPost.published_at ?? null,

  }



  const { error } = await supabase
    .from('posts')
    .update(updatedPost)
    .eq('id', id)



  if (error) {
    throw new Error(error.message)
  }



  revalidatePath('/admin/posts')
  revalidatePath('/noticias')
  revalidatePath(`/noticias/${slug}`)


  redirect('/admin/posts')
}





export async function deletePost(
  id: string
) {
  const supabase = await createClient()


  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)



  if (error) {
    throw new Error(error.message)
  }



  revalidatePath('/admin/posts')
  revalidatePath('/noticias')


  redirect('/admin/posts')
}