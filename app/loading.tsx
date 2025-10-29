import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-12 w-12 text-primary" />
        <p className="text-sm text-muted-foreground">Loading homepage...</p>
      </div>
    </div>
  )
}
