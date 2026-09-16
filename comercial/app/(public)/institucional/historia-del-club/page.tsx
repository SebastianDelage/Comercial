import Link from 'next/link'

export default function HistoriaDelClubPage() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-400">
            Comercial Rugby Club
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-black sm:text-6xl">
            Nuestra historia
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Una historia construida alrededor del deporte, la amistad,
            la formación y el sentido de pertenencia.
          </p>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="overflow-hidden rounded-3xl bg-cyan-100">
            <img
              src="/images/home/club.jpg"
              alt="Comercial Rugby Club"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
              El Club
            </p>

            <h2 className="mt-3 text-4xl font-black text-gray-950">
              Comercial Rugby Club
            </h2>

            <div className="mt-7 space-y-6 text-base leading-8 text-gray-600">
              <p>
                Comercial Rugby Club es una institución construida
                alrededor del deporte, el compañerismo y la vida de club.
              </p>

              <p>
                A través del rugby y el hockey, generaciones de jugadores,
                familias, entrenadores y colaboradores forman parte de una
                comunidad unida por los mismos colores y valores.
              </p>

              <p>
                La formación deportiva es también una herramienta para
                transmitir compromiso, respeto, esfuerzo, amistad y sentido
                de pertenencia dentro y fuera de la cancha.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/rugby"
                className="rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white transition hover:bg-cyan-700"
              >
                Conocé Rugby
              </Link>

              <Link
                href="/hockey"
                className="rounded-xl border border-gray-300 px-5 py-3 font-bold text-gray-800 transition hover:bg-gray-50"
              >
                Conocé Hockey
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}