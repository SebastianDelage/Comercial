type BadgeProps = {
  children: React.ReactNode
  variant?: 'success' | 'draft'
  className?: string
}


export default function Badge({
  children,
  variant = 'draft',
  className = '',
}: BadgeProps) {

  const styles = {
    success:
      'bg-green-100 text-green-700',

    draft:
      'bg-gray-100 text-gray-700',
  }


  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        styles[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}