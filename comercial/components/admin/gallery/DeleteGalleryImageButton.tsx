'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

import { deleteGalleryImage } from '@/lib/actions/gallery-actions'


type DeleteGalleryImageButtonProps = {
  imageId: string
}


export default function DeleteGalleryImageButton({
  imageId,
}: DeleteGalleryImageButtonProps) {

  const router = useRouter()

  const [confirming, setConfirming] = useState(false)
  const [error, setError] = useState('')

  const [isPending, startTransition] =
    useTransition()



  function handleDelete() {

    setError('')


    startTransition(async()=>{

      try {

        await deleteGalleryImage(imageId)

        setConfirming(false)

        router.refresh()


      } catch(deleteError){


        setError(
          deleteError instanceof Error
            ? deleteError.message
            : 'No se pudo eliminar la fotografía.'
        )


      }


    })

  }




  if(confirming){

    return (

      <div className="
        rounded-xl
        bg-red-50
        p-3
      ">


        <p className="
          text-sm
          font-semibold
          text-red-700
        ">

          ¿Eliminar esta fotografía?

        </p>



        <p className="
          mt-1
          text-xs
          text-red-600
        ">

          Esta acción no se puede deshacer.

        </p>




        <div className="
          mt-3
          flex
          flex-col
          gap-2
          sm:flex-row
        ">


          <button

            type="button"

            disabled={isPending}

            onClick={handleDelete}

            className="
              w-full
              rounded-lg
              bg-red-600
              px-3
              py-2
              text-xs
              font-bold
              text-white
              transition
              hover:bg-red-700
              disabled:opacity-50
              sm:w-auto
            "

          >

            {
              isPending
              ? 'Eliminando...'
              : 'Confirmar eliminación'
            }

          </button>




          <button

            type="button"

            disabled={isPending}

            onClick={()=>{
              setConfirming(false)
              setError('')
            }}

            className="
              w-full
              rounded-lg
              border
              border-gray-300
              bg-white
              px-3
              py-2
              text-xs
              font-bold
              text-gray-700
              transition
              hover:bg-gray-50
              disabled:opacity-50
              sm:w-auto
            "

          >

            Cancelar

          </button>


        </div>





        {error && (

          <p className="
            mt-3
            text-xs
            font-medium
            text-red-600
          ">

            {error}

          </p>

        )}


      </div>

    )

  }





  return (

    <button

      type="button"

      onClick={()=>{
        setError('')
        setConfirming(true)
      }}

      className="
        w-full
        rounded-lg
        border
        border-red-200
        bg-red-50
        px-3
        py-2
        text-xs
        font-bold
        text-red-600
        transition
        hover:bg-red-100
        sm:w-auto
      "

    >

      Eliminar fotografía

    </button>

  )

}