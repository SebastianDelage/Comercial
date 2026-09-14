import Link from 'next/link'

export default function RugbyPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[620px] overflow-hidden bg-slate-950">
        <img
          src="/images/rugby.jpg"
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

            <div className="mt-8">
              <Link
                href="/contacto"
                className="inline-flex rounded-xl bg-cyan-600 px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-500"
              >
                Quiero sumarme
              </Link>
            </div>
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
              Desde las categorías formativas hasta los planteles superiores,
              cada jugador forma parte de una misma identidad.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-slate-100">
            <img
              src="/images/rugby.jpg"
              alt="Entrenamiento de Rugby en Comercial"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
              Categorías
            </p>

            <h2 className="mt-3 text-4xl font-black text-gray-950">
              Rugby para todas las etapas
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Desde los primeros pasos hasta la competencia de plantel superior.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Infantiles',
                description:
                  'Primeros pasos en el rugby, aprendizaje y formación.',
              },
              {
                title: 'Juveniles',
                description:
                  'Desarrollo deportivo, técnico y competitivo.',
              },
              {
                title: 'Plantel Superior',
                description:
                  'Competencia, preparación y representación del club.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"
              >
                <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
                  CRC Rugby
                </span>

                <h3 className="mt-3 text-2xl font-black text-gray-950">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENTRENAMIENTOS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
              Entrenamientos
            </p>

            <h2 className="mt-3 text-4xl font-black text-gray-950">
              Horarios
            </h2>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Los horarios pueden variar según la categoría y la época del año.
              Contactanos para conocer la información actualizada.
            </p>

            <Link
              href="/contacto"
              className="mt-7 inline-flex font-bold text-cyan-700 hover:text-cyan-800"
            >
              Consultar por una categoría →
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {[
              {
                category: 'Infantiles',
                schedule: 'Consultar días y horarios',
              },
              {
                category: 'Juveniles',
                schedule: 'Consultar días y horarios',
              },
              {
                category: 'Plantel Superior',
                schedule: 'Consultar días y horarios',
              },
            ].map((item, index) => (
              <div
                key={item.category}
                className={`flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between ${
                  index !== 2 ? 'border-b border-gray-100' : ''
                }`}
              >
                <p className="font-black text-gray-950">
                  {item.category}
                </p>

                <p className="text-sm font-medium text-gray-500">
                  {item.schedule}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-400">
              Nuestra identidad
            </p>

            <h2 className="mt-3 text-4xl font-black sm:text-5xl">
              Lo que aprendemos en la cancha
              <span className="block text-cyan-400">
                lo llevamos afuera.
              </span>
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Compromiso',
              'Respeto',
              'Compañerismo',
              'Pertenencia',
            ].map((value) => (
              <div
                key={value}
                className="rounded-2xl border border-white/10 bg-white/5 p-7"
              >
                <p className="text-xl font-black">
                  {value}
                </p>
              </div>
            ))}
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
              Escribinos y te contamos qué categoría te corresponde y cómo
              empezar.
            </p>
          </div>

          <Link
            href="/contacto"
            className="inline-flex w-fit rounded-xl bg-white px-6 py-3.5 font-bold text-cyan-800 hover:bg-cyan-50"
          >
            Quiero sumarme
          </Link>
        </div>
      </section>
    </>
  )
}