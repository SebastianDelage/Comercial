type BadgeProps = {
  children: React.ReactNode
  variant?: 'success' | 'draft'
}

export default function Badge({ children, variant = 'draft' }: BadgeProps) {
  const styles = {
    success: 'bg-green-100 text-green-700',
    draft: 'bg-gray-100 text-gray-700',
  }

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}