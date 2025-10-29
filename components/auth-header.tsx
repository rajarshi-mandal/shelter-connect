"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface AuthUser {
  email: string
  firstName?: string
  lastName?: string
  userType: string
  isAuthenticated: boolean
}

export function AuthHeader() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    // Check for user
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        if (parsedUser.isAuthenticated) {
          setUser(parsedUser)
        }
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  const getUserTypeLabel = (userType: string) => {
    switch (userType) {
      case "homeless":
        return "Seeking Help"
      case "chef":
        return "Chef"
      case "donor":
        return "Donor"
      default:
        return "User"
    }
  }

  const getUserTypeColor = (userType: string) => {
    switch (userType) {
      case "homeless":
        return "bg-primary/10 text-primary"
      case "chef":
        return "bg-secondary/10 text-secondary"
      case "donor":
        return "bg-accent/10 text-accent"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/auth/login">
          <Button className="bg-[rgba(197,220,223,1)]" variant="ghost" size="sm">
            Sign In
          </Button>
        </Link>
        <Link href="/auth/signup">
          <Button size="sm">Sign Up</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Badge variant="outline" className={getUserTypeColor(user.userType)}>
        {getUserTypeLabel(user.userType)}
      </Badge>

      <DropdownMenu>
        <DropdownMenuTrigger className="bg-[rgba(195,219,222,1)]" asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            {/* User icon */}
            {user.firstName ? `${user.firstName} ${user.lastName}` : user.email}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
