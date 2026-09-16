import Link from 'next/link'

import { getPublicHomeData } from '@/lib/queries/public-home'

const CLUB_NAME = 'Comercial Rugby Club'

const CLUB_DESCRIPTION =
  'Un club donde el deporte, la formación y el sentido de pertenencia se viven dentro y fuera de la cancha.'

const HISTORY_TEXT =
  'Una institución construida alrededor del deporte, la amistad, la formación y el sentido de pertenencia.'

function formatDate(date: string | null) {
  if (!date) return null

  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export default async function HomePage() {
  const { posts, albums } = await getPublicHomeData()

  const mainPost = posts[0]
  const secondaryPosts = posts.slice(1, 3)

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[720px] overflow-hidden bg-slate-950">
        <img
          src="/images/home/hero.jpg"
          alt={`Actividad deportiva en ${CLUB_NAME}`}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
              Comercial Rugby Club
            </p>

            <h1 className="mt-6 text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Rugby.
              <span className="block text-cyan-400">
                Hockey.
              </span>
              <span className="block">
                Comunidad.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              {CLUB_DESCRIPTION}
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/institucional/historia-del-club"
                className="rounded-xl bg-cyan-600 px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-500"
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

      {/* RUGBY Y HOCKEY */}
      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
            Nuestros deportes
          </p>

          <h2 className="mt-3 text-4xl font-black text-gray-950 sm:text-5xl">
            Dos disciplinas.
            <span className="block text-cyan-700">
              Una misma identidad.
            </span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Rugby y hockey comparten los mismos valores: compromiso,
            compañerismo, respeto y formación.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* RUGBY */}
          <Link
            href="/rugby"
            className="group relative min-h-[560px] overflow-hidden rounded-[2rem] bg-slate-950"
          >
            <img
              src="/images/home/rugby.jpg"
              alt="Rugby de Comercial Rugby Club"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-300">
                Comercial
              </p>

              <h3 className="mt-2 text-5xl font-black text-white">
                Rugby
              </h3>

              <p className="mt-4 max-w-md text-base leading-7 text-slate-200">
                Categorías, entrenamientos, competencia y formación.
              </p>

              <span className="mt-6 inline-flex font-bold text-white">
                Conocé Rugby →
              </span>
            </div>
          </Link>

          {/* HOCKEY */}
          <Link
            href="/hockey"
            className="group relative min-h-[560px] overflow-hidden rounded-[2rem] bg-slate-950"
          >
            <img
              src="/images/home/hockey.jpg"
              alt="Hockey de Comercial Rugby Club"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-300">
                Comercial
              </p>

              <h3 className="mt-2 text-5xl font-black text-white">
                Hockey
              </h3>

              <p className="mt-4 max-w-md text-base leading-7 text-slate-200">
                Divisiones, entrenamientos, competencia y crecimiento.
              </p>

              <span className="mt-6 inline-flex font-bold text-white">
                Conocé Hockey →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* NOTICIAS */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-400">
                Actualidad
              </p>

              <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                Últimas noticias
              </h2>
            </div>

            <Link
              href="/noticias"
              className="font-bold text-cyan-400 transition hover:text-cyan-300"
            >
              Ver todas las noticias →
            </Link>
          </div>

          {!mainPost ? (
            <div className="mt-12 border-t border-white/15 py-16 text-slate-400">
              Todavía no hay noticias publicadas.
            </div>
          ) : (
            <div className="mt-12 grid gap-5 lg:grid-cols-[1.65fr_1fr]">
              {/* NOTICIA PRINCIPAL */}
              <Link
                href={`/noticias/${mainPost.slug}`}
                className="group relative min-h-[560px] overflow-hidden rounded-[2rem] bg-slate-900"
              >
                {mainPost.cover_image_url ? (
                  <img
                    src={mainPost.cover_image_url}
                    alt={mainPost.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-800" />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />

                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-10 lg:p-12">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                      Actualidad
                    </span>

                    {mainPost.published_at && (
                      <>
                        <span className="text-white/30">
                          •
                        </span>

                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-white/70">
                          {formatDate(mainPost.published_at)}
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-white transition group-hover:text-cyan-200 sm:text-4xl lg:text-5xl">
                    {mainPost.title}
                  </h3>

                  {mainPost.excerpt && (
                    <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                      {mainPost.excerpt}
                    </p>
                  )}
                </div>
              </Link>

              {/* NOTICIAS SECUNDARIAS */}
              {secondaryPosts.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  {secondaryPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/noticias/${post.slug}`}
                      className="group relative min-h-[270px] overflow-hidden rounded-[2rem] bg-slate-900"
                    >
                      {post.cover_image_url ? (
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-slate-800" />
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/5" />

                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                        {post.published_at && (
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">
                            {formatDate(post.published_at)}
                          </p>
                        )}

                        <h3 className="mt-3 text-2xl font-black leading-tight text-white transition group-hover:text-cyan-200">
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* INSTITUCIONAL */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-cyan-100">
          <img
            src="/images/home/club.jpg"
            alt={`Historia de ${CLUB_NAME}`}
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
            {HISTORY_TEXT}
          </p>

          <Link
            href="/institucional/historia-del-club"
            className="mt-8 inline-flex rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white transition hover:bg-cyan-700"
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
              className="font-bold text-cyan-400 transition hover:text-cyan-300"
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

                      {album.event_date && (
                        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                          {new Date(
                            `${album.event_date}T00:00:00Z`
                          ).toLocaleDateString('es-AR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            timeZone: 'UTC',
                          })}
                        </p>
                      )}

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
    </>
  )
}