export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 bg-muted rounded w-64 animate-pulse" />
        <div className="h-4 bg-muted rounded w-96 mt-2 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg border p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="h-4 bg-muted rounded w-24 animate-pulse" />
              <div className="h-4 w-4 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-8 bg-muted rounded w-16 animate-pulse mb-1" />
            <div className="h-3 bg-muted rounded w-32 animate-pulse" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg border p-6">
            <div className="mb-4">
              <div className="h-6 bg-muted rounded w-48 animate-pulse mb-2" />
              <div className="h-4 bg-muted rounded w-64 animate-pulse" />
            </div>
            <div className="h-64 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
