import Link from 'next/link'


type ButtonProps = {
  children: React.ReactNode
  href?: string
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
  className?: string
}


export default function Button({
  children,
  href,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {


  const styles = {
    primary:
      'bg-cyan-600 text-white hover:bg-cyan-700',

    secondary:
      'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50',

    danger:
      'bg-red-600 text-white hover:bg-red-700',
  }



  const baseStyles =
    'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50'


  const buttonClassName = [
    baseStyles,
    styles[variant],
    className,
  ].join(' ')



  if (href) {
    return (
      <Link
        href={href}
        className={buttonClassName}
      >
        {children}
      </Link>
    )
  }



  return (
    <button
      type={type}
      disabled={disabled}
      className={buttonClassName}
    >
      {children}
    </button>
  )
}