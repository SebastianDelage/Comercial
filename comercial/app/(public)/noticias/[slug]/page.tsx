import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPostBySlug } from '@/lib/queries/posts'


type PostPageProps = {
  params: Promise<{
    slug: string
  }>
}



export async function generateMetadata({
  params,
}: PostPageProps) {

  const { slug } = await params

  const post = await getPostBySlug(slug)


  if (!post) {
    return {}
  }


  return {
    title: `${post.title} | Comercial Rugby Club`,

    description:
      post.excerpt ??
      'Noticias y novedades de Comercial Rugby Club.',


    openGraph: {

      type: 'article',

      title: post.title,

      description:
        post.excerpt ??
        'Noticias y novedades de Comercial Rugby Club.',


      images: post.cover_image_url
        ? [
            {
              url: post.cover_image_url,
              alt: post.title,
            },
          ]
        : [],

    },


    twitter: {

      card: 'summary_large_image',

      title: post.title,

      description:
        post.excerpt ??
        'Noticias y novedades de Comercial Rugby Club.',

      images: post.cover_image_url
        ? [post.cover_image_url]
        : [],

    },
  }
}





function formatDate(date: string | null) {

  if (!date) return null


  return new Intl.DateTimeFormat(
    'es-AR',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
  ).format(new Date(date))
}






export default async function PostPage({
  params,
}: PostPageProps) {


  const { slug } = await params


  const post = await getPostBySlug(slug)



  if (!post) {
    notFound()
  }



  const formattedDate =
    formatDate(post.published_at)





  return (
    <>


      {/* CABECERA */}

      <header className="bg-slate-950 text-white">

        <div className="mx-auto max-w-5xl px-6 py-16 text-center lg:px-8 lg:py-24">


          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-white"
          >

            <span aria-hidden="true">
              ←
            </span>

            Noticias

          </Link>





          <div className="mt-10">


            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-400">

              Comercial Rugby Club


              {formattedDate && (

                <>

                  <span className="mx-3 text-slate-600">
                    •
                  </span>


                  {formattedDate}

                </>

              )}


            </p>





            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.05] sm:text-5xl lg:text-6xl">

              {post.title}

            </h1>





            {post.excerpt && (

              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">

                {post.excerpt}

              </p>

            )}


          </div>


        </div>


      </header>







      {/* PORTADA */}


      {post.cover_image_url && (

        <section className="bg-slate-950">


          <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8">


            <div className="overflow-hidden sm:rounded-t-[2rem]">


              <img

                src={post.cover_image_url}

                alt={`Imagen de portada: ${post.title}`}

                loading="eager"

                decoding="async"

                sizes="100vw"

                className="max-h-[760px] w-full object-cover"

              />


            </div>


          </div>


        </section>

      )}







      {/* ARTÍCULO */}


      <main className="bg-white">


        <article className="mx-auto max-w-[780px] px-6 py-16 sm:py-20 lg:py-24">


          <div

            className="rich-content text-[17px] leading-8 text-gray-800 sm:text-lg"

            dangerouslySetInnerHTML={{
              __html: post.content,
            }}

          />





          <div className="mt-16 border-t border-gray-200 pt-8">


            <Link

              href="/noticias"

              className="inline-flex items-center gap-2 font-bold text-cyan-700 transition hover:text-cyan-800"

            >

              <span aria-hidden="true">
                ←
              </span>


              Volver a Noticias


            </Link>


          </div>



        </article>


      </main>


    </>
  )
}