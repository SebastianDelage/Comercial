'use client'

import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { createGalleryImages } from '@/lib/actions/gallery-actions'

type GalleryImageUploaderProps = {
  albumId: string
}

type PendingImage = {
  id: string
  file: File
  previewUrl: string
}

const MAX_FILE_SIZE = 6 * 1024 * 1024

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
]


function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
}



export default function GalleryImageUploader({
  albumId,
}: GalleryImageUploaderProps) {

  const supabase = createClient()
  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)


  const [images, setImages] = useState<PendingImage[]>([])
  const [error, setError] = useState('')
  const [progressText, setProgressText] = useState('')
  const [isPending, startTransition] = useTransition()



  useEffect(() => {

    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl)
      })
    }

  }, [images])




  function handleFiles(
    event: ChangeEvent<HTMLInputElement>
  ) {

    setError('')


    const selectedFiles =
      Array.from(event.target.files ?? [])



    const validFiles: PendingImage[] = []



    for (const file of selectedFiles) {


      if (!ALLOWED_TYPES.includes(file.type)) {

        setError(
          'Solo se permiten imágenes JPG, PNG o WebP.'
        )

        continue
      }



      if (file.size > MAX_FILE_SIZE) {

        setError(
          `La imagen "${file.name}" supera el límite de 6 MB.`
        )

        continue
      }



      validFiles.push({

        id: crypto.randomUUID(),

        file,

        previewUrl:
          URL.createObjectURL(file),

      })

    }



    setImages((current) => [
      ...current,
      ...validFiles,
    ])



    event.target.value = ''

  }





  function removePendingImage(id: string) {


    setImages((current) => {


      const image =
        current.find(
          (item) => item.id === id
        )


      if(image){
        URL.revokeObjectURL(
          image.previewUrl
        )
      }


      return current.filter(
        (item)=>item.id !== id
      )

    })

  }





  function clearImages(){

    images.forEach((image)=>{

      URL.revokeObjectURL(
        image.previewUrl
      )

    })


    setImages([])

  }





  function handleUpload(){


    if(!images.length){

      setError(
        'Seleccioná al menos una fotografía.'
      )

      return

    }



    setError('')



    startTransition(async()=>{


      const uploadedPaths:string[]=[]



      try{


        const uploadedImages:{
          imageUrl:string
          imagePath:string
          altText:string
        }[]=[]




        for(
          let index=0;
          index<images.length;
          index++
        ){


          const image=images[index]



          setProgressText(
            `Subiendo fotografía ${index+1} de ${images.length}`
          )



          const extension =
            image.file.name
              .split('.')
              .pop()
              ?.toLowerCase() ?? 'jpg'



          const safeName =
            sanitizeFileName(
              image.file.name.replace(
                /\.[^/.]+$/,
                ''
              )
            )



          const imagePath=[
            'gallery',
            albumId,
            `${Date.now()}-${crypto.randomUUID()}-${safeName}.${extension}`,
          ].join('/')



          const {error:uploadError} =
            await supabase.storage
              .from('site-assets')
              .upload(
                imagePath,
                image.file,
                {
                  cacheControl:'3600',
                  upsert:false,
                  contentType:image.file.type,
                }
              )



          if(uploadError){

            throw new Error(
              `No se pudo subir "${image.file.name}": ${uploadError.message}`
            )

          }



          uploadedPaths.push(imagePath)



          const {
            data:{
              publicUrl
            }
          } =
            supabase.storage
              .from('site-assets')
              .getPublicUrl(imagePath)



          uploadedImages.push({

            imageUrl:publicUrl,

            imagePath,

            altText:
              image.file.name
                .replace(
                  /\.[^/.]+$/,
                  ''
                )
                .replace(
                  /[-_]/g,
                  ' '
                ),

          })


        }




        setProgressText(
          'Guardando fotografías...'
        )



        await createGalleryImages(
          albumId,
          uploadedImages
        )



        clearImages()

        setProgressText('')

        router.refresh()



      }catch(uploadFailure){


        if(uploadedPaths.length){

          await supabase.storage
            .from('site-assets')
            .remove(uploadedPaths)

        }



        setProgressText('')



        setError(
          uploadFailure instanceof Error
            ? uploadFailure.message
            : 'Ocurrió un error al subir las fotografías.'
        )

      }


    })


  }






  return (

    <div className="
      rounded-2xl
      border
      border-dashed
      border-gray-300
      bg-gray-50
      p-4
      sm:p-6
    ">


      <input

        ref={inputRef}

        type="file"

        accept="image/jpeg,image/png,image/webp"

        multiple

        onChange={handleFiles}

        className="hidden"

      />



      <div className="text-center">


        <h2 className="text-lg font-semibold text-gray-900">

          Agregar fotografías

        </h2>



        <p className="
          mt-2
          text-sm
          leading-6
          text-gray-500
        ">

          Seleccioná una o varias imágenes para agregarlas al álbum.

        </p>




        <button

          type="button"

          disabled={isPending}

          onClick={() =>
            inputRef.current?.click()
          }

          className="
            mt-5
            w-full
            rounded-xl
            bg-cyan-600
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-cyan-700
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:w-auto
          "

        >

          Seleccionar imágenes

        </button>


      </div>





      {images.length>0 && (

        <div className="mt-6">


          <div className="
            mb-4
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          ">


            <p className="
              text-sm
              font-medium
              text-gray-700
            ">

              {images.length}{' '}

              {
                images.length===1
                ? 'imagen seleccionada'
                : 'imágenes seleccionadas'
              }

            </p>



            <button

              type="button"

              disabled={isPending}

              onClick={clearImages}

              className="
                text-left
                text-sm
                font-medium
                text-red-600
                hover:text-red-700
                disabled:opacity-50
              "

            >

              Quitar todas

            </button>


          </div>





          <div className="
            grid
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
          ">


            {images.map((image)=>(


              <div

                key={image.id}

                className="
                  overflow-hidden
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                "

              >


                <img

                  src={image.previewUrl}

                  alt={image.file.name}

                  className="
                    aspect-[4/3]
                    w-full
                    object-cover
                  "

                />



                <div className="p-3">


                  <p className="
                    truncate
                    text-sm
                    font-medium
                    text-gray-800
                  ">

                    {image.file.name}

                  </p>



                  <p className="
                    mt-1
                    text-xs
                    text-gray-500
                  ">

                    {(image.file.size / 1024 / 1024).toFixed(2)} MB

                  </p>




                  <button

                    type="button"

                    disabled={isPending}

                    onClick={() =>
                      removePendingImage(image.id)
                    }

                    className="
                      mt-3
                      text-xs
                      font-semibold
                      text-red-600
                      hover:text-red-700
                      disabled:opacity-50
                    "

                  >

                    Quitar

                  </button>


                </div>


              </div>


            ))}


          </div>





          <div className="
            mt-6
            flex
            justify-stretch
            sm:justify-end
          ">


            <button

              type="button"

              disabled={isPending}

              onClick={handleUpload}

              className="
                w-full
                rounded-xl
                bg-cyan-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-cyan-700
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "

            >

              {
                isPending
                ? 'Subiendo...'
                : `Subir ${images.length} ${
                    images.length===1
                    ? 'fotografía'
                    : 'fotografías'
                  }`
              }


            </button>


          </div>


        </div>

      )}






      {progressText && (

        <p className="
          mt-4
          text-center
          text-sm
          font-medium
          text-cyan-700
        ">

          {progressText}

        </p>

      )}





      {error && (

        <p className="
          mt-4
          rounded-xl
          bg-red-50
          px-4
          py-3
          text-sm
          font-medium
          text-red-700
        ">

          {error}

        </p>

      )}



    </div>

  )

}