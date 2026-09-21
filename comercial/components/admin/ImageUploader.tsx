'use client'

import { ChangeEvent, useState } from 'react'

import { createClient } from '@/lib/supabase/client'


type ImageUploaderProps = {
  name: string
  pathName?: string
  defaultValue?: string | null
  defaultPath?: string | null
  folder?: string
  label?: string
  description?: string
}


export default function ImageUploader({
  name,
  pathName,
  defaultValue = null,
  defaultPath = null,
  folder = 'uploads',
  label = 'Imagen',
  description = 'JPG, PNG o WebP. Máximo 5 MB.',
}: ImageUploaderProps) {


  const supabase = createClient()


  const [imageUrl, setImageUrl] = useState(
    defaultValue ?? ''
  )

  const [imagePath, setImagePath] = useState(
    defaultPath ?? ''
  )

  const [uploading, setUploading] = useState(false)

  const [error, setError] = useState('')



  async function handleUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {

    const file = event.target.files?.[0]


    if (!file) {
      return
    }


    setError('')


    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
    ]


    if (!allowedTypes.includes(file.type)) {

      setError(
        'Solo se permiten imágenes JPG, PNG o WebP.'
      )

      return
    }


    if (file.size > 5 * 1024 * 1024) {

      setError(
        'La imagen no puede superar los 5 MB.'
      )

      return
    }



    setUploading(true)



    try {

      const extension =
        file.name.split('.').pop()?.toLowerCase() ?? 'jpg'


      const fileName =
        `${Date.now()}-${crypto.randomUUID()}.${extension}`


      const storagePath =
        `${folder}/${fileName}`




      const {
        error: uploadError,
      } = await supabase.storage
        .from('site-assets')
        .upload(
          storagePath,
          file,
          {
            cacheControl: '3600',
            upsert: false,
          }
        )



      if (uploadError) {

        throw uploadError

      }





      const {
        data,
      } = supabase.storage
        .from('site-assets')
        .getPublicUrl(storagePath)



      setImageUrl(data.publicUrl)

      setImagePath(storagePath)



    } catch (err) {

      console.error(err)

      setError(
        'No se pudo subir la imagen.'
      )


    } finally {

      setUploading(false)

      event.target.value = ''

    }

  }




  function removeImage() {

    setImageUrl('')
    setImagePath('')

  }




  return (

    <div>


      <p className="mb-3 text-sm font-semibold text-gray-900">
        {label}
      </p>




      <input
        type="hidden"
        name={name}
        value={imageUrl}
      />



      {pathName && (

        <input
          type="hidden"
          name={pathName}
          value={imagePath}
        />

      )}




      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-dashed
          border-gray-300
          bg-gray-50
        "
      >


        {imageUrl ? (

          <div className="p-4 sm:p-5">


            <img
              src={imageUrl}
              alt={label}
              className="
                h-40
                w-full
                rounded-xl
                object-cover
                sm:h-52
              "
            />



            <div
              className="
                mt-4
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >



              <label
                className="
                  cursor-pointer
                  rounded-xl
                  bg-cyan-600
                  px-4
                  py-3
                  text-center
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-cyan-700
                "
              >

                {uploading
                  ? 'Subiendo...'
                  : 'Cambiar imagen'}


                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  disabled={uploading}
                  onChange={handleUpload}
                />


              </label>





              <button
                type="button"
                onClick={removeImage}
                className="
                  rounded-xl
                  border
                  border-red-200
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-red-600
                  transition
                  hover:bg-red-50
                "
              >
                Quitar
              </button>


            </div>


          </div>



        ) : (


          <label
            className="
              flex
              min-h-44
              cursor-pointer
              flex-col
              items-center
              justify-center
              p-6
              text-center
            "
          >


            <p className="font-semibold text-gray-900">
              Seleccioná una imagen
            </p>



            <p className="mt-2 text-sm text-gray-500">
              {description}
            </p>



            <span
              className="
                mt-5
                rounded-xl
                bg-cyan-600
                px-5
                py-3
                text-sm
                font-bold
                text-white
              "
            >

              {uploading
                ? 'Subiendo...'
                : 'Elegir imagen'}

            </span>



            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              disabled={uploading}
              onChange={handleUpload}
            />


          </label>


        )}



      </div>





      {error && (

        <p className="mt-3 text-sm font-medium text-red-600">
          {error}
        </p>

      )}


    </div>

  )
}