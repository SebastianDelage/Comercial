import Link from 'next/link'

type ButtonProps = {
  children: React.ReactNode
  href?: string
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'danger'
}

export default function Button({
  children,
  href,
  type = 'button',
  variant = 'primary',
}: ButtonProps) {
  const styles = {
    primary: 'bg-cyan-600 text-white hover:bg-cyan-700',
    secondary: 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  const className = `rounded-lg px-4 py-2 text-sm font-medium transition ${styles[variant]}`

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={className}>
      {children}
    </button>
  )
}