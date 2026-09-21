type PageHeaderProps = {
  title: string
  description?: string
  action?: React.ReactNode
}

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-3xl font-bold text-gray-900">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="w-full shrink-0 sm:w-auto">
          {action}
        </div>
      )}
    </div>
  )
}