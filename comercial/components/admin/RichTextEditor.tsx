'use client'

import { useEffect, useState } from 'react'

import {
  EditorContent,
  useEditor,
  useEditorState,
} from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'


type RichTextEditorProps = {
  name: string
  initialContent?: string
  placeholder?: string
}


export default function RichTextEditor({
  name,
  initialContent = '',
  placeholder = 'Escribí el contenido...',
}: RichTextEditorProps) {


  const [html, setHtml] = useState(initialContent)

  const [linkError, setLinkError] = useState('')



  const editor = useEditor({

    immediatelyRender: false,


    extensions: [

      StarterKit,


      Link.configure({

        openOnClick:false,

        autolink:true,

        defaultProtocol:'https',

        HTMLAttributes:{
          class:
          'text-cyan-700 underline decoration-cyan-300 underline-offset-2',
        },

      }),

    ],


    content:initialContent,


    onUpdate({editor}){

      setHtml(editor.getHTML())

    },


    editorProps:{

      attributes:{

        class:
        'ProseMirror min-h-[260px] sm:min-h-[320px] px-4 py-4 text-gray-900 outline-none',

        'aria-label':placeholder,

      },

    },

  })





  const editorState = useEditorState({

    editor,


    selector:({editor})=>({

      isBold:editor?.isActive('bold') ?? false,

      isItalic:editor?.isActive('italic') ?? false,

      isHeading:
      editor?.isActive('heading',{level:2}) ?? false,

      isBulletList:
      editor?.isActive('bulletList') ?? false,

      isOrderedList:
      editor?.isActive('orderedList') ?? false,

      isBlockquote:
      editor?.isActive('blockquote') ?? false,

      isLink:
      editor?.isActive('link') ?? false,


      canBold:
      editor?.can().chain().focus().toggleBold().run() ?? false,


      canItalic:
      editor?.can().chain().focus().toggleItalic().run() ?? false,


      canUndo:
      editor?.can().chain().focus().undo().run() ?? false,


      canRedo:
      editor?.can().chain().focus().redo().run() ?? false,


    }),

  })





  useEffect(()=>{

    if(!editor){
      return
    }


    if(editor.getHTML() !== initialContent){

      editor.commands.setContent(initialContent)

      setHtml(initialContent)

    }


  },[editor,initialContent])





  function buttonClass(active=false){

    return [

      'flex-shrink-0 rounded-lg border px-3 py-2 text-sm font-medium transition',

      'disabled:cursor-not-allowed disabled:opacity-40',

      active

      ? 'border-cyan-500 bg-cyan-600 text-white'

      : 'border-gray-200 bg-white text-gray-700 hover:border-cyan-300 hover:bg-cyan-50'


    ].join(' ')

  }





  if(!editor){

    return (

      <div className="
        min-h-[320px]
        rounded-xl
        border
        bg-gray-50
        p-4
        text-sm
        text-gray-500
      ">

        Cargando editor...

      </div>

    )

  }





  return (

    <div>


      <input
        type="hidden"
        name={name}
        value={html}
        readOnly
      />



      <div
        className="
          overflow-hidden
          rounded-xl
          border
          border-gray-300
          bg-white
        "
      >


        <div
          className="
            flex
            gap-2
            overflow-x-auto
            border-b
            border-gray-200
            bg-gray-50
            p-3
          "
        >


          <button
            type="button"
            className={buttonClass(editorState?.isBold)}
            onClick={()=>
              editor.chain().focus().toggleBold().run()
            }
          >
            <strong>B</strong>
          </button>



          <button
            type="button"
            className={buttonClass(editorState?.isItalic)}
            onClick={()=>
              editor.chain().focus().toggleItalic().run()
            }
          >
            <em>I</em>
          </button>



          <button
            type="button"
            className={buttonClass(editorState?.isHeading)}
            onClick={()=>
              editor.chain()
              .focus()
              .toggleHeading({level:2})
              .run()
            }
          >
            H2
          </button>



          <button
            type="button"
            className={buttonClass(editorState?.isBulletList)}
            onClick={()=>
              editor.chain().focus().toggleBulletList().run()
            }
          >
            • Lista
          </button>



          <button
            type="button"
            className={buttonClass(editorState?.isOrderedList)}
            onClick={()=>
              editor.chain().focus().toggleOrderedList().run()
            }
          >
            1.
          </button>



          <button
            type="button"
            className={buttonClass(editorState?.isBlockquote)}
            onClick={()=>
              editor.chain().focus().toggleBlockquote().run()
            }
          >
            “
          </button>



          <button
            type="button"
            className={buttonClass()}
          >
            Enlace
          </button>



          <button
            type="button"
            className={buttonClass()}
            onClick={()=>
              editor.chain().focus().undo().run()
            }
          >
            ↶
          </button>



          <button
            type="button"
            className={buttonClass()}
            onClick={()=>
              editor.chain().focus().redo().run()
            }
          >
            ↷
          </button>


        </div>



        <EditorContent editor={editor}/>


      </div>


      {linkError && (

        <p className="mt-2 text-sm text-red-600">
          {linkError}
        </p>

      )}


    </div>

  )
}