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
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        HTMLAttributes: {
          class:
            'text-cyan-700 underline decoration-cyan-300 underline-offset-2',
        },
      }),
    ],

    content: initialContent,

    onUpdate({ editor }) {
      setHtml(editor.getHTML())
    },

    editorProps: {
      attributes: {
        class:
          'ProseMirror min-h-[320px] px-4 py-4 text-gray-900 outline-none',
        'aria-label': placeholder,
      },
    },
  })

  const editorState = useEditorState({
    editor,

    selector: ({ editor }) => ({
      isBold: editor?.isActive('bold') ?? false,
      isItalic: editor?.isActive('italic') ?? false,
      isHeading: editor?.isActive('heading', { level: 2 }) ?? false,
      isBulletList: editor?.isActive('bulletList') ?? false,
      isOrderedList: editor?.isActive('orderedList') ?? false,
      isBlockquote: editor?.isActive('blockquote') ?? false,
      isLink: editor?.isActive('link') ?? false,

      canBold:
        editor?.can().chain().focus().toggleBold().run() ?? false,

      canItalic:
        editor?.can().chain().focus().toggleItalic().run() ?? false,

      canUndo:
        editor?.can().chain().focus().undo().run() ?? false,

      canRedo:
        editor?.can().chain().focus().redo().run() ?? false,

      hasSelection:
        editor
          ? editor.state.selection.from !== editor.state.selection.to
          : false,
    }),
  })

  useEffect(() => {
    if (!editor) {
      return
    }

    if (editor.getHTML() !== initialContent) {
      editor.commands.setContent(initialContent)
      setHtml(initialContent)
    }
  }, [editor, initialContent])

  if (!editor) {
    return (
      <div className="min-h-[380px] rounded-xl border border-gray-300 bg-gray-50 p-4 text-sm text-gray-500">
        Cargando editor...
      </div>
    )
  }

  function setLink() {
    setLinkError('')

    if (!editorState?.hasSelection) {
      setLinkError(
        'Primero seleccioná el texto que querés convertir en enlace.'
      )
      return
    }

    const previousUrl =
      editor.getAttributes('link').href as string | undefined

    const url = window.prompt(
      'Ingresá la dirección del enlace:',
      previousUrl ?? 'https://'
    )

    if (url === null) {
      return
    }

    const normalizedUrl = url.trim()

    if (!normalizedUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .unsetLink()
        .run()

      return
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({
        href: normalizedUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
      })
      .run()
  }

  function buttonClass(active = false) {
    return [
      'rounded-lg border px-3 py-2 text-sm font-medium transition',
      'disabled:cursor-not-allowed disabled:opacity-40',
      active
        ? 'border-cyan-500 bg-cyan-600 text-white shadow-sm'
        : 'border-gray-200 bg-white text-gray-700 hover:border-cyan-300 hover:bg-cyan-50',
    ].join(' ')
  }

  return (
    <div>
      <input
        type="hidden"
        name={name}
        value={html}
        readOnly
      />

      <div className="overflow-hidden rounded-xl border border-gray-300 bg-white focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-100">
        <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-gray-50 p-3">
          <button
            type="button"
            title="Negrita"
            onClick={() =>
              editor.chain().focus().toggleBold().run()
            }
            disabled={!editorState?.canBold}
            className={buttonClass(editorState?.isBold)}
          >
            <strong>B</strong>
          </button>

          <button
            type="button"
            title="Cursiva"
            onClick={() =>
              editor.chain().focus().toggleItalic().run()
            }
            disabled={!editorState?.canItalic}
            className={buttonClass(editorState?.isItalic)}
          >
            <em>I</em>
          </button>

          <button
            type="button"
            title="Título"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({ level: 2 })
                .run()
            }
            className={buttonClass(editorState?.isHeading)}
          >
            H2
          </button>

          <button
            type="button"
            title="Lista con viñetas"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }
            className={buttonClass(editorState?.isBulletList)}
          >
            • Lista
          </button>

          <button
            type="button"
            title="Lista numerada"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
            className={buttonClass(editorState?.isOrderedList)}
          >
            1. Lista
          </button>

          <button
            type="button"
            title="Cita"
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleBlockquote()
                .run()
            }
            className={buttonClass(editorState?.isBlockquote)}
          >
            “ Cita
          </button>

          <button
            type="button"
            title="Agregar enlace"
            onClick={setLink}
            className={buttonClass(editorState?.isLink)}
          >
            Enlace
          </button>

          <button
            type="button"
            title="Quitar enlace"
            onClick={() =>
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .unsetLink()
                .run()
            }
            disabled={!editorState?.isLink}
            className={buttonClass()}
          >
            Quitar enlace
          </button>

          <button
            type="button"
            title="Deshacer"
            onClick={() =>
              editor.chain().focus().undo().run()
            }
            disabled={!editorState?.canUndo}
            className={buttonClass()}
          >
            ↶
          </button>

          <button
            type="button"
            title="Rehacer"
            onClick={() =>
              editor.chain().focus().redo().run()
            }
            disabled={!editorState?.canRedo}
            className={buttonClass()}
          >
            ↷
          </button>
        </div>

        <EditorContent editor={editor} />
      </div>

      {linkError && (
        <p className="mt-2 text-sm font-medium text-red-600">
          {linkError}
        </p>
      )}

      <p className="mt-2 text-xs text-gray-500">
        Para aplicar formato, seleccioná texto o activá una opción antes de
        comenzar a escribir.
      </p>
    </div>
  )
}