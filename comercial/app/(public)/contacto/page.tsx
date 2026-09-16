const contacts = [
  {
    title: 'Secretaría',
    description:
      'Consultas generales, información institucional y atención del club.',
    href: 'https://wa.me/5492234494440',
    action: 'Contactar secretaría',
  },
  {
    title: 'Rugby',
    description:
      'Consultas sobre categorías, entrenamientos e incorporación a Rugby.',
    href: 'https://wa.me/542235930045',
    action: 'Consultar por Rugby',
  },
  {
    title: 'Hockey',
    description:
      'Consultas sobre divisiones, entrenamientos e incorporación a Hockey.',
    href: 'https://wa.me/5492235491539',
    action: 'Consultar por Hockey',
  },
]

export default function ContactoPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-28">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-400">
            Comercial Rugby Club
          </p>

          <h1 className="mt-4 max-w-4xl text-5xl font-black sm:text-6xl lg:text-7xl">
            Estamos para ayudarte.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            ¿Querés sumarte al club, empezar Rugby o Hockey, o realizar una
            consulta? Elegí el área correspondiente y comunicate directamente
            con nosotros.
          </p>
        </div>
      </section>

      {/* CONTACTOS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
            Contacto
          </p>

          <h2 className="mt-3 text-4xl font-black text-gray-950 sm:text-5xl">
            ¿Con quién necesitás hablar?
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Contactá directamente al área correspondiente para recibir la
            información que necesitás.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {contacts.map((contact) => (
            <article
              key={contact.title}
              className="flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
                Comercial Rugby Club
              </p>

              <h3 className="mt-4 text-3xl font-black text-gray-950">
                {contact.title}
              </h3>

              <p className="mt-4 flex-1 leading-7 text-gray-600">
                {contact.description}
              </p>

              <a
                href={contact.href}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-cyan-600 px-5 py-3.5 text-center font-bold text-white transition hover:bg-cyan-700"
              >
                {contact.action}
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* UBICACIÓN */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-700">
                Nuestra casa
              </p>

              <h2 className="mt-3 text-4xl font-black text-gray-950 sm:text-5xl">
                Encontranos en Comercial
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                Acercate al club para conocer nuestras instalaciones y formar
                parte de la comunidad de Comercial.
              </p>

              <div className="mt-8 border-l-4 border-cyan-500 pl-6">
                <p className="text-xl font-black text-gray-950">
                  Ruta 226, km 17,5
                </p>

                <p className="mt-1 text-gray-600">
                  Sierra de los Padres
                </p>
              </div>

              <a
                href="https://www.google.com/maps/place/Comercial+Rugby+Club/@-37.9126182,-57.7524213,16z/data=!4m6!3m5!1s0x95852ebcbf3e7a17:0x26cf1a163a8de9bf!8m2!3d-37.9116532!4d-57.7529363!16s%2Fg%2F11bzv0q6d1"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex rounded-xl bg-slate-950 px-6 py-3.5 font-bold text-white transition hover:bg-slate-800"
              >
                Abrir en Google Maps
              </a>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
              <iframe
                title="Ubicación de Comercial Rugby Club"
                src="https://www.google.com/maps?q=-37.9116532,-57.7529363&z=15&output=embed"
                className="h-[460px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cyan-600">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-20 text-white lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">
              Sumate a Comercial
            </p>

            <h2 className="mt-3 max-w-3xl text-4xl font-black sm:text-5xl">
              Hay un lugar para vos en el club.
            </h2>

            <p className="mt-4 max-w-xl text-lg leading-8 text-cyan-50">
              Si no sabés con quién comunicarte, Secretaría puede orientarte.
            </p>
          </div>

          <a
            href="https://wa.me/5492234494440"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit shrink-0 rounded-xl bg-white px-6 py-3.5 font-bold text-cyan-800 transition hover:bg-cyan-50"
          >
            Hablar con Secretaría
          </a>
        </div>
      </section>
    </>
  )
}