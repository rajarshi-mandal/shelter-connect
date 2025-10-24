import type React from "react"
import { LoaderIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return <LoaderIcon className={cn("animate-spin", className)} {...props} />
}

export { Spinner }
