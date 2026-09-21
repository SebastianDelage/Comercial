import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminMobileMenu from '@/components/admin/AdminMobileMenu'


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const supabase = await createClient()


  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser()


  if (!user) {
    redirect('/admin/login')
  }



  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .single()



  if (!profile) {
    redirect('/admin/login')
  }



  return (

    <div className="min-h-screen bg-slate-50 lg:flex">


      {/* SIDEBAR DESKTOP */}
      <AdminSidebar />



      <div className="min-w-0 flex-1">



        {/* HEADER */}
        <header className="border-b border-slate-200 bg-white">

          <div className="
            flex
            h-20
            items-center
            justify-between
            gap-4
            px-4
            sm:px-6
            lg:px-10
          ">



            {/* IDENTIDAD */}
            <div className="min-w-0">

              <p className="
                truncate
                text-xs
                font-black
                uppercase
                tracking-[0.16em]
                text-cyan-700
              ">
                Comercial Rugby Club
              </p>


              <p className="
                mt-1
                truncate
                text-sm
                text-slate-500
              ">
                Panel de administración
              </p>

            </div>





            <div className="flex items-center gap-3">


              {/* MENU MOBILE */}
              <div className="lg:hidden">
                <AdminMobileMenu />
              </div>




              {/* VER SITIO */}
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="
                  hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  text-slate-700
                  transition
                  hover:border-cyan-200
                  hover:bg-cyan-50
                  hover:text-cyan-800
                  sm:inline-flex
                "
              >

                Ver sitio

                <span
                  className="ml-2"
                  aria-hidden="true"
                >
                  ↗
                </span>

              </a>




              {/* USUARIO */}
              <div className="
                hidden
                rounded-full
                bg-cyan-50
                px-4
                py-2
                text-sm
                font-bold
                text-cyan-800
                sm:block
              ">

                Administrador

              </div>



            </div>

          </div>

        </header>





        {/* CONTENIDO */}
        <main className="
          px-4
          py-6
          sm:px-6
          lg:px-10
          lg:py-10
        ">

          <div className="
            mx-auto
            w-full
            max-w-[1400px]
          ">

            {children}

          </div>

        </main>



      </div>



    </div>

  )
}