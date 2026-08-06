import Link from 'next/link'

import { getPublicHomeData } from '@/lib/queries/public-home'

function cleanHtmlText(html: string) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export default async function HomePage() {
  const {
    settings,
    posts,
    albums,
    history,
  } = await getPublicHomeData()

  const clubName =
    settings?.club_name || 'Comercial Rugby Club'

  const historyText = history?.content
    ? cleanHtmlText(history.content).slice(0, 330)
    : 'Una institución construida alrededor del deporte, la amistad, la formación y el sentido de pertenencia.'

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[680px] overflow-hidden bg-slate-950">
        <img
          src="/images/hero-club.jpg"
          alt={`Actividad deportiva en ${clubName}`}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />

        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
              Rugby · Hockey · Comunidad
            </p>

            <h1 className="mt-6 text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl">
              Comercial
              <span className="block text-cyan-400">
                Rugby Club
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              {settings?.short_description ||
                'Pasión, formación y sentido de pertenencia dentro y fuera de la cancha.'}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/institucional/historia-del-club"
                className="rounded-xl bg-cyan-600 px-6 py-3.5 font-bold text-white shadow-lg transition hover:bg-cyan-500"
              >
                Conocé el club
              </Link>

              <Link
                href="/contacto"
                className="rounded-xl border border-white/40 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Sumate a Comercial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ACCESOS RÁPIDOS */}
      <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Rugby',
              description: 'Categorías y actividad',
              href: '/rugby',
            },
            {
              title: 'Hockey',
              description: 'Divisiones y entrenamientos',
              href: '/hockey',
            },
            {
              title: 'Noticias',
              description: 'Novedades del club',
              href: '/noticias',
            },
            {
              title: 'Contacto',
              description: 'Cómo llegar y sumarte',
              href: '/contacto',
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group border-b border-gray-100 p-6 transition hover:bg-cyan-50 sm:border-r lg:border-b-0"
            >
              <p className="text-lg font-black text-gray-950 group-hover:text-cyan-700">
                {item.title}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {item.description}
              </p>

              <span className="mt-4 inline-block font-bold text-cyan-700">
                Ver más →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* RUGBY Y HOCKEY */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
            Nuestros deportes
          </p>

          <h2 className="mt-3 text-4xl font-black text-gray-950">
            Dos disciplinas, una misma identidad
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Rugby y hockey comparten los valores que definen a
            Comercial: compromiso, compañerismo y formación.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <article className="group relative min-h-[500px] overflow-hidden rounded-3xl bg-slate-950">
            <img
              src="/images/rugby.jpg"
              alt="Rugby de Comercial Rugby Club"
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
                Comercial
              </p>

              <h3 className="mt-2 text-4xl font-black text-white">
                Rugby
              </h3>

              <p className="mt-4 max-w-lg leading-7 text-slate-200">
                Conocé nuestras categorías, entrenamientos y la
                actividad de rugby del club.
              </p>

              <Link
                href="/rugby"
                className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-cyan-800 transition hover:bg-cyan-50"
              >
                Conocé Rugby
              </Link>
            </div>
          </article>

          <article className="group relative min-h-[500px] overflow-hidden rounded-3xl bg-slate-950">
            <img
              src="/images/hockey.jpg"
              alt="Hockey de Comercial Rugby Club"
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
                Comercial
              </p>

              <h3 className="mt-2 text-4xl font-black text-white">
                Hockey
              </h3>

              <p className="mt-4 max-w-lg leading-7 text-slate-200">
                Descubrí nuestras divisiones, entrenamientos y toda
                la actividad de hockey.
              </p>

              <Link
                href="/hockey"
                className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-cyan-800 transition hover:bg-cyan-50"
              >
                Conocé Hockey
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* NOTICIAS */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
                Actualidad
              </p>

              <h2 className="mt-3 text-4xl font-black text-gray-950">
                Últimas noticias
              </h2>
            </div>

            <Link
              href="/noticias"
              className="font-bold text-cyan-700 hover:text-cyan-800"
            >
              Ver todas las noticias →
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
              Todavía no hay noticias publicadas.
            </div>
          ) : (
            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {post.cover_image_url ? (
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="aspect-[16/10] w-full object-cover"
                    />
                  ) : (
                    <div className="aspect-[16/10] bg-cyan-100" />
                  )}

                  <div className="p-6">
                    {post.published_at && (
                      <p className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                        {new Date(
                          post.published_at
                        ).toLocaleDateString('es-AR')}
                      </p>
                    )}

                    <h3 className="mt-3 text-xl font-black text-gray-950">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                        {post.excerpt}
                      </p>
                    )}

                    <Link
                      href={`/noticias/${post.slug}`}
                      className="mt-5 inline-flex font-bold text-cyan-700 hover:text-cyan-800"
                    >
                      Leer noticia →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* INSTITUCIONAL */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-cyan-100">
          <img
            src="/images/hero-club.jpg"
            alt={`Comunidad de ${clubName}`}
            className="aspect-[4/3] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
            Nuestra identidad
          </p>

          <h2 className="mt-3 text-4xl font-black text-gray-950">
            Más que un club
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            {historyText}
            {history?.content &&
              cleanHtmlText(history.content).length > 330 &&
              '...'}
          </p>

          <Link
            href="/institucional/historia-del-club"
            className="mt-8 inline-flex rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white hover:bg-cyan-700"
          >
            Conocé nuestra historia
          </Link>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-400">
                Momentos del club
              </p>

              <h2 className="mt-3 text-4xl font-black">
                Viví Comercial
              </h2>
            </div>

            <Link
              href="/galeria"
              className="font-bold text-cyan-400 hover:text-cyan-300"
            >
              Ver galería completa →
            </Link>
          </div>

          {albums.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-white/15 p-10 text-center text-slate-400">
              Todavía no hay álbumes publicados.
            </div>
          ) : (
            <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {albums.map((album) => {
                const imageCount =
                  album.gallery_images?.length ?? 0

                return (
                  <Link
                    key={album.id}
                    href={`/galeria/${album.slug}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                  >
                    {album.cover_image_url ? (
                      <img
                        src={album.cover_image_url}
                        alt={album.title}
                        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="aspect-[4/3] bg-cyan-950" />
                    )}

                    <div className="p-5">
                      <h3 className="text-xl font-black">
                        {album.title}
                      </h3>

                      <p className="mt-2 text-sm text-slate-400">
                        {imageCount}{' '}
                        {imageCount === 1
                          ? 'fotografía'
                          : 'fotografías'}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-cyan-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-16 text-white lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">
              Formá parte
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              ¿Querés sumarte a Comercial?
            </h2>

            <p className="mt-3 max-w-2xl text-cyan-50">
              Comunicate con nosotros para conocer categorías,
              horarios y formas de inscripción.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/rugby"
              className="rounded-xl bg-white px-5 py-3 font-bold text-cyan-800 hover:bg-cyan-50"
            >
              Quiero jugar Rugby
            </Link>

            <Link
              href="/hockey"
              className="rounded-xl border border-white/50 px-5 py-3 font-bold text-white hover:bg-white/10"
            >
              Quiero jugar Hockey
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}