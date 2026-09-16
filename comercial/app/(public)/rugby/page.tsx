import Link from 'next/link'

const rugbyGroups = [
  {
    title: 'Infantiles',
    age: '5 a 10 años',
    schedule: 'Martes y jueves · 18:30 hs',
    location: 'Club',
  },
  {
    title: 'M6, M7 y M8',
    age: null,
    schedule: 'Martes y jueves · 18:30 hs',
    location: 'Sede AZTK Arena',
  },
  {
    title: 'M9 y M10',
    age: null,
    schedule: 'Lunes y jueves · 18:00 hs',
    location: 'Sede AZTK Arena',
  },
  {
    title: 'Juveniles',
    age: '11 a 17 años',
    schedule: 'Martes y jueves · 18:30 hs',
    location: 'Club',
  },
  {
    title: 'M19 y Plantel Superior',
    age: null,
    schedule: 'Lunes, martes y jueves · 20:00 hs',
    location: 'Club',
  },
  {
    title: 'Rugby Femenino',
    age: null,
    schedule: 'Martes y jueves · 18:30 hs',
    location: 'Club',
  },
]

export default function RugbyPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[620px] overflow-hidden bg-slate-950">
        <img
          src="/images/rugby/hero.jpg"
          alt="Rugby de Comercial Rugby Club"
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
              Rugby
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Formación, competencia, compañerismo y sentido de pertenencia.
              Viví el rugby de Comercial dentro y fuera de la cancha.
            </p>

            <Link
              href="/contacto"
              className="mt-8 inline-flex rounded-xl bg-cyan-600 px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-500"
            >
              Quiero sumarme
            </Link>
          </div>
        </div>
      </section>

      {/* PRESENTACIÓN */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
              Nuestro Rugby
            </p>

            <h2 className="mt-3 text-4xl font-black text-gray-950 sm:text-5xl">
              Mucho más que un deporte
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              En Comercial entendemos al rugby como una herramienta de
              formación. El objetivo no es solamente competir, sino también
              transmitir valores, crear vínculos y formar personas dentro y
              fuera de la cancha.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Desde los primeros pasos hasta el Plantel Superior, cada jugador
              forma parte de una misma identidad y de la comunidad de
              Comercial.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-slate-100">
            <img
              src="/images/rugby/training.jpg"
              alt="Entrenamiento de rugby de Comercial Rugby Club"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CATEGORÍAS Y HORARIOS */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
              Categorías y entrenamientos
            </p>

            <h2 className="mt-3 text-4xl font-black text-gray-950 sm:text-5xl">
              Encontrá tu lugar en la cancha
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Conocé las categorías, días, horarios y sedes de entrenamiento
              del rugby de Comercial.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rugbyGroups.map((group) => (
              <article
                key={group.title}
                className="flex flex-col rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
                  CRC Rugby
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

          {/* SÁBADOS */}
          <div className="mt-6 rounded-3xl bg-cyan-600 p-7 text-white sm:flex sm:items-center sm:justify-between sm:gap-8 lg:p-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">
                Sábados
              </p>

              <h3 className="mt-2 text-2xl font-black">
                Todas las divisiones
              </h3>
            </div>

            <div className="mt-5 sm:mt-0 sm:text-right">
              <p className="text-lg font-black">
                10:00 hs
              </p>

              <p className="mt-1 text-sm font-medium text-cyan-50">
                En el Club
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEDES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
              Dónde entrenamos
            </p>

            <h2 className="mt-3 text-4xl font-black text-gray-950 sm:text-5xl">
              Nuestras sedes
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Los entrenamientos se desarrollan entre nuestra sede principal
              y AZTK Arena, según la categoría.
            </p>

            <Link
              href="/contacto"
              className="mt-8 inline-flex rounded-xl bg-cyan-600 px-6 py-3.5 font-bold text-white transition hover:bg-cyan-700"
            >
              Consultar por Rugby
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* CLUB */}
            <div className="rounded-3xl border border-gray-200 bg-white p-7">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
                Sede principal
              </p>

              <h3 className="mt-3 text-2xl font-black text-gray-950">
                Comercial Rugby Club
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Ruta 226, km 17,5
              </p>

              <p className="text-gray-600">
                Sierra de los Padres
              </p>

              <a
                href="https://www.google.com/maps/place/Comercial+Rugby+Club/@-37.9126182,-57.7524213,16z/data=!4m6!3m5!1s0x95852ebcbf3e7a17:0x26cf1a163a8de9bf!8m2!3d-37.9116532!4d-57.7529363!16s%2Fg%2F11bzv0q6d1"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex font-bold text-cyan-700 transition hover:text-cyan-800"
              >
                Cómo llegar →
              </a>
            </div>

            {/* AZTK */}
            <div className="rounded-3xl border border-gray-200 bg-white p-7">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
                Sede AZTK Arena
              </p>

              <h3 className="mt-3 text-2xl font-black text-gray-950">
                AZTK Arena
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                San Martín 5521
              </p>

              <p className="text-gray-600">
                Mar del Plata
              </p>
            </div>
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
              Tu lugar en el rugby de Comercial puede empezar hoy.
            </h2>

            <p className="mt-4 max-w-xl text-lg leading-8 text-cyan-50">
              Si tenés dudas sobre qué categoría te corresponde, comunicate
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