import Link from 'next/link'

export default function HockeyPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
        Comercial Rugby Club
      </p>

      <h1 className="mt-4 text-5xl font-black text-gray-950">
        Hockey
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
        Conocé nuestras divisiones, entrenamientos y toda la actividad de
        hockey del club.
      </p>

      <Link
        href="/contacto"
        className="mt-8 inline-flex rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white hover:bg-cyan-700"
      >
        Quiero jugar hockey
      </Link>
    </section>
  )
}