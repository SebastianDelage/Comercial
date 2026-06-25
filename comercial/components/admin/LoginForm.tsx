import { loginAdmin } from '@/lib/actions/auth-actions'

type LoginFormProps = {
  error?: string
}

export default function LoginForm({ error }: LoginFormProps) {
  return (
    <form action={loginAdmin} className="w-full max-w-sm space-y-4">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Contraseña</label>
        <input
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">
          Email o contraseña incorrectos.
        </p>
      )}

      <button
        type="submit"
        className="w-full rounded bg-black px-4 py-2 text-white"
      >
        Ingresar
      </button>
    </form>
  )
}