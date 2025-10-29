"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // API
    console.log("Login attempt:", formData)

    // Successful login
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: formData.email,
        userType: formData.userType,
        isAuthenticated: true,
      }),
    )

    // Redirect
    switch (formData.userType) {
      case "homeless":
        router.push("/shelters")
        break
      case "chef":
        router.push("/chef")
        break
      case "donor":
        router.push("/donors")
        break
      default:
        router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4 rounded-sm px-1 py-0.5 bg-[rgba(207,228,232,1)]">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Home className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">ShelterConnect</h1>
          </div>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Login form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input className="my-0"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType">I am a</Label>
                <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homeless">Person seeking help</SelectItem>
                    <SelectItem value="chef">Food donor</SelectItem>
                    <SelectItem value="donor">Financial supporter</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-primary hover:text-primary/80 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-muted/30">
          <CardContent className="p-4 py-0">
            <p className="text-sm font-medium mb-2">Example Account:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Email: first.last@gmail.com</p>
              <p>Password: example123</p>
              <p>Choose any role and explore the app!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
