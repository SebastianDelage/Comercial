import Link from 'next/link'

const hockeyGroups = [
  {
    title: 'Infantiles',
    age: '5 a 9 años',
    schedule: 'Martes y jueves · 17:30 hs',
    location: 'CMH',
  },
  {
    title: 'Infantiles',
    age: '10 a 12 años',
    schedule: 'Martes y jueves · 17:00 hs',
    location: 'CMH',
  },
  {
    title: 'Sub 14',
    age: '13 a 14 años',
    schedule: 'Martes y jueves · 17:00 hs',
    location: 'CMH',
  },
  {
    title: 'Sub 16',
    age: '15 a 16 años',
    schedule: 'Martes y viernes · 17:00 hs',
    location: 'CMH',
  },
  {
    title: 'Sub 19 y Plantel Superior',
    age: null,
    schedule: 'Martes y jueves · 15:00 hs',
    location: 'CMH',
  },
]

export default function HockeyPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[620px] overflow-hidden bg-slate-950">
        <img
          src="/images/hockey/hero.jpg"
          alt="Hockey de Comercial Rugby Club"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-cyan-300">
              Comercial Rugby Club
            </p>

            <h1 className="mt-5 text-5xl font-black text-white sm:text-6xl lg:text-7xl">
              Hockey
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Formación, competencia, compañerismo y pasión por nuestros
              colores. Viví el hockey de Comercial.
            </p>

            <Link
              href="/contacto"
              className="mt-8 inline-flex rounded-xl bg-cyan-600 px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-500"
            >
              Quiero jugar hockey
            </Link>
          </div>
        </div>
      </section>

      {/* PRESENTACIÓN */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
              Nuestro Hockey
            </p>

            <h2 className="mt-3 text-4xl font-black text-gray-950 sm:text-5xl">
              Crecemos juntos dentro y fuera de la cancha
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              El hockey de Comercial es un espacio de formación deportiva,
              crecimiento y encuentro. Cada entrenamiento es una oportunidad
              para aprender, competir y compartir.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Desde Infantiles hasta el Plantel Superior, cada división forma
              parte de una misma comunidad y representa los colores de
              Comercial.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-slate-100">
            <img
              src="/images/hockey/training.jpg"
              alt="Entrenamiento de hockey de Comercial Rugby Club"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* DIVISIONES Y HORARIOS */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
              Divisiones y entrenamientos
            </p>

            <h2 className="mt-3 text-4xl font-black text-gray-950 sm:text-5xl">
              Encontrá tu lugar en la cancha
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Conocé las divisiones, edades y horarios de entrenamiento del
              hockey de Comercial.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {hockeyGroups.map((group) => (
              <article
                key={`${group.title}-${group.age ?? 'superior'}`}
                className="flex flex-col rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
                  CRC Hockey
                </p>

                <h3 className="mt-3 text-2xl font-black text-gray-950">
                  {group.title}
                </h3>

                {group.age && (
                  <p className="mt-1 font-semibold text-gray-500">
                    {group.age}
                  </p>
                )}

                <div className="mt-7 border-t border-gray-100 pt-6">
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-gray-400">
                    Entrenamiento
                  </p>

                  <p className="mt-2 font-bold text-gray-950">
                    {group.schedule}
                  </p>

                  <p className="mt-2 text-sm font-semibold text-cyan-700">
                    {group.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SEDE */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
              Dónde entrenamos
            </p>

            <h2 className="mt-3 text-4xl font-black text-gray-950 sm:text-5xl">
              Sede CMH
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Las divisiones de hockey desarrollan sus entrenamientos en la
              sede CMH.
            </p>

            <Link
              href="/contacto"
              className="mt-8 inline-flex rounded-xl bg-cyan-600 px-6 py-3.5 font-bold text-white transition hover:bg-cyan-700"
            >
              Consultar por Hockey
            </Link>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-slate-50 p-8 sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
              Sede CMH
            </p>

            <h3 className="mt-3 text-3xl font-black text-gray-950">
              Hockey Comercial
            </h3>

            <div className="mt-7 border-l-4 border-cyan-500 pl-6">
              <p className="text-lg font-bold text-gray-950">
                Av. Américo Canoza 289
              </p>

              <p className="mt-1 text-gray-600">
                Mar del Plata
              </p>
            </div>

            <p className="mt-7 max-w-xl leading-7 text-gray-600">
              Si necesitás información para incorporarte a una división,
              comunicate con Hockey desde nuestra sección de contacto.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cyan-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 text-white lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">
              Sumate
            </p>

            <h2 className="mt-3 max-w-2xl text-4xl font-black sm:text-5xl">
              Tu lugar en el hockey de Comercial puede empezar hoy.
            </h2>

            <p className="mt-4 max-w-xl text-lg leading-8 text-cyan-50">
              Si tenés dudas sobre qué división te corresponde, comunicate
              con nosotros y te orientamos.
            </p>
          </div>

          <Link
            href="/contacto"
            className="inline-flex w-fit shrink-0 rounded-xl bg-white px-6 py-3.5 font-bold text-cyan-800 transition hover:bg-cyan-50"
          >
            Quiero sumarme
          </Link>
        </div>
      </section>
    </>
  )
}