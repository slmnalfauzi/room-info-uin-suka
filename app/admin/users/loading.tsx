export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 bg-muted rounded w-64 animate-pulse" />
        <div className="h-4 bg-muted rounded w-96 mt-2 animate-pulse" />
      </div>
      <div className="bg-card rounded-lg border p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-muted rounded-full animate-pulse" />
                <div>
                  <div className="h-4 bg-muted rounded w-32 animate-pulse" />
                  <div className="h-3 bg-muted rounded w-48 mt-1 animate-pulse" />
                  <div className="flex space-x-2 mt-2">
                    <div className="h-5 bg-muted rounded w-16 animate-pulse" />
                    <div className="h-5 bg-muted rounded w-12 animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 bg-muted rounded w-24 animate-pulse" />
                <div className="h-8 bg-muted rounded w-16 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
