import { loginAdmin } from '@/lib/actions/auth-actions'

type LoginFormProps = {
  error?: string
}

export default function LoginForm({
  error,
}: LoginFormProps) {
  return (
    <form
      action={loginAdmin}
      className="w-full max-w-sm space-y-5"
    >

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="usuario@club.com"
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            text-gray-900
            outline-none
            transition
            focus:border-cyan-500
            focus:ring-4
            focus:ring-cyan-100
          "
        />
      </div>


      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-gray-700"
        >
          Contraseña
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          className="
            mt-2
            w-full
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            text-gray-900
            outline-none
            transition
            focus:border-cyan-500
            focus:ring-4
            focus:ring-cyan-100
          "
        />
      </div>


      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">
            Email o contraseña incorrectos.
          </p>
        </div>
      )}


      <button
        type="submit"
        className="
          w-full
          rounded-xl
          bg-cyan-600
          px-5
          py-3
          font-bold
          text-white
          transition
          hover:bg-cyan-700
        "
      >
        Ingresar al panel
      </button>

    </form>
  )
}