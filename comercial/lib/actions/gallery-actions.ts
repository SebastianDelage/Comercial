'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { generateSlug } from '@/lib/utils/slug'


type AlbumStatus = 'draft' | 'published'


function getAlbumFormData(formData: FormData) {
  const title = String(
    formData.get('title') ?? ''
  ).trim()

  const description = String(
    formData.get('description') ?? ''
  ).trim()


  const coverImageUrl = String(
    formData.get('cover_image_url') ?? ''
  ).trim()


  const coverImagePath = String(
    formData.get('cover_image_path') ?? ''
  ).trim()


  const eventDate = String(
    formData.get('event_date') ?? ''
  ).trim()


  const rawStatus = String(
    formData.get('status') ?? 'draft'
  )


  const rawDisplayOrder = Number(
    formData.get('display_order') ?? 0
  )


  if (!title) {
    throw new Error(
      'El título del álbum es obligatorio.'
    )
  }


  const status: AlbumStatus =
    rawStatus === 'published'
      ? 'published'
      : 'draft'


  const displayOrder =
    Number.isFinite(rawDisplayOrder)
      ? Math.max(
          0,
          Math.trunc(rawDisplayOrder)
        )
      : 0


  return {
    title,
    slug: generateSlug(title),
    description: description || null,
    cover_image_url:
      coverImageUrl || null,
    cover_image_path:
      coverImagePath || null,
    event_date:
      eventDate || null,
    status,
    display_order:
      displayOrder,
  }
}



async function requireUser() {
  const supabase = await createClient()


  const {
    data: {
      user,
    },
  } = await supabase.auth.getUser()


  if (!user) {
    redirect('/admin/login')
  }


  return {
    supabase,
    user,
  }
}




export async function createAlbum(
  formData: FormData
) {
  const {
    supabase,
    user,
  } = await requireUser()


  const album =
    getAlbumFormData(formData)


  const {
    data,
    error,
  } = await supabase
    .from('gallery_albums')
    .insert({
      ...album,
      created_by: user.id,
    })
    .select(
      'id, slug'
    )
    .single()



  if (error) {

    if (error.code === '23505') {
      throw new Error(
        'Ya existe un álbum con ese título o dirección.'
      )
    }

    throw new Error(
      error.message
    )
  }



  revalidatePath(
    '/admin/gallery'
  )

  revalidatePath(
    '/galeria'
  )


  redirect(
    `/admin/gallery/${data.id}/images`
  )
}




export async function updateAlbum(
  id: string,
  formData: FormData
) {
  const {
    supabase,
  } = await requireUser()



  const album =
    getAlbumFormData(formData)



  const {
    data: currentAlbum,
    error: currentError,
  } =
    await supabase
      .from('gallery_albums')
      .select(
        `
        slug,
        cover_image_url,
        cover_image_path
        `
      )
      .eq(
        'id',
        id
      )
      .single()



  if (
    currentError ||
    !currentAlbum
  ) {
    throw new Error(
      'No se encontró el álbum.'
    )
  }



  const updatedAlbum = {

    ...album,


    cover_image_url:
      album.cover_image_url ??
      currentAlbum.cover_image_url,


    cover_image_path:
      album.cover_image_path ??
      currentAlbum.cover_image_path,

  }



  const {
    error,
  } =
    await supabase
      .from('gallery_albums')
      .update(updatedAlbum)
      .eq(
        'id',
        id
      )



  if (error) {

    if (error.code === '23505') {
      throw new Error(
        'Ya existe un álbum con ese título o dirección.'
      )
    }


    throw new Error(
      error.message
    )
  }



  revalidatePath(
    '/admin/gallery'
  )

  revalidatePath(
    '/galeria'
  )

  revalidatePath(
    `/galeria/${currentAlbum.slug}`
  )

  revalidatePath(
    `/galeria/${album.slug}`
  )


  redirect(
    '/admin/gallery'
  )
}






export async function createGalleryImages(
  albumId: string,
  images: {
    imageUrl: string
    imagePath: string
    altText?: string
  }[]
) {

  const {
    supabase,
  } = await requireUser()



  if (!images.length) {
    throw new Error(
      'No se recibieron imágenes.'
    )
  }


  if (images.length > 100) {
    throw new Error(
      'No se pueden subir más de 100 fotografías por vez.'
    )
  }




  const {
    data: album,
    error: albumError,
  } =
    await supabase
      .from('gallery_albums')
      .select(
        'slug'
      )
      .eq(
        'id',
        albumId
      )
      .single()



  if (
    albumError ||
    !album
  ) {
    throw new Error(
      'No se encontró el álbum.'
    )
  }




  const {
    data: currentImages,
    error: currentImagesError,
  } =
    await supabase
      .from('gallery_images')
      .select(
        'display_order'
      )
      .eq(
        'album_id',
        albumId
      )
      .order(
        'display_order',
        {
          ascending:false,
        }
      )
      .limit(1)



  if (currentImagesError) {
    throw new Error(
      currentImagesError.message
    )
  }




  const initialOrder =
    currentImages?.[0]?.display_order !== undefined
      ? currentImages[0].display_order + 1
      : 0




  const rows =
    images.map(
      (
        image,
        index
      ) => ({
        album_id:
          albumId,

        image_url:
          image.imageUrl,

        image_path:
          image.imagePath,

        alt_text:
          image.altText || null,

        display_order:
          initialOrder + index,
      })
    )




  const {
    error,
  } =
    await supabase
      .from('gallery_images')
      .insert(rows)



  if (error) {
    throw new Error(
      error.message
    )
  }




  revalidatePath(
    `/admin/gallery/${albumId}/images`
  )

  revalidatePath(
    '/admin/gallery'
  )

  revalidatePath(
    '/galeria'
  )

  revalidatePath(
    `/galeria/${album.slug}`
  )
}







export async function deleteGalleryImage(
  imageId: string
) {

  const {
    supabase,
  } = await requireUser()



  const {
    data: image,
    error:imageError,
  } =
    await supabase
      .from('gallery_images')
      .select(
        `
        image_path,
        album_id,
        gallery_albums (
          slug
        )
        `
      )
      .eq(
        'id',
        imageId
      )
      .single()



  if (
    imageError ||
    !image
  ) {
    throw new Error(
      'No se encontró la fotografía.'
    )
  }





  const {
    error:deleteError,
  } =
    await supabase
      .from('gallery_images')
      .delete()
      .eq(
        'id',
        imageId
      )



  if (deleteError) {
    throw new Error(
      deleteError.message
    )
  }





  if (image.image_path) {

    const {
      error:storageError,
    } =
      await supabase.storage
        .from(
          'site-assets'
        )
        .remove([
          image.image_path,
        ])



    if (storageError) {
      console.error(
        'No se pudo limpiar Storage:',
        storageError
      )
    }
  }





  const albumRelation =
    Array.isArray(
      image.gallery_albums
    )
      ? image.gallery_albums[0]
      : image.gallery_albums





  revalidatePath(
    `/admin/gallery/${image.album_id}/images`
  )

  revalidatePath(
    '/admin/gallery'
  )

  revalidatePath(
    '/galeria'
  )



  if (albumRelation?.slug) {

    revalidatePath(
      `/galeria/${albumRelation.slug}`
    )

  }

}








export async function deleteAlbum(
  id:string
): Promise<{
  success?:true
  error?:string
}> {

  const {
    supabase,
  } = await requireUser()



  const {
    data:album,
    error:albumError,
  } =
    await supabase
      .from('gallery_albums')
      .select(
        `
        id,
        slug,
        cover_image_path,
        gallery_images (
          image_path
        )
        `
      )
      .eq(
        'id',
        id
      )
      .single()



  if (
    albumError ||
    !album
  ) {

    return {
      error:
        'No se encontró el álbum que intentás eliminar.',
    }

  }





  const imagePaths =
    (album.gallery_images ?? [])
      .map(
        image =>
          image.image_path
      )
      .filter(Boolean)




  const storagePaths =
    [
      ...imagePaths,
      album.cover_image_path,
    ]
    .filter(
      (
        path
      ): path is string =>
        typeof path === 'string' &&
        path.length > 0
    )





  const {
    error:deleteError,
  } =
    await supabase
      .from('gallery_albums')
      .delete()
      .eq(
        'id',
        id
      )



  if (deleteError) {

    return {
      error:
        'No se pudo eliminar el álbum.',
    }

  }





  if(storagePaths.length){

    const {
      error:storageError,
    } =
      await supabase.storage
        .from(
          'site-assets'
        )
        .remove(
          storagePaths
        )


    if(storageError){

      console.error(
        'Error limpiando Storage:',
        storageError
      )

    }

  }





  revalidatePath(
    '/admin/gallery'
  )

  revalidatePath(
    '/galeria'
  )

  revalidatePath(
    `/galeria/${album.slug}`
  )




  return {
    success:true,
  }

}