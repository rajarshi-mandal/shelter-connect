import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, ChefHat, Heart, DogIcon, Home } from "lucide-react"
import { AuthHeader } from "@/components/auth-header"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header bar */}
      <header className="border-b border-border bg-[rgba(241,245,252,1)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">ShelterConnect</h1>
            </div>
            <AuthHeader />
          </div>
        </div>
      </header>

      {/* About section */}
      <section className="px-4 py-4 my-2">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl text-balance leading-[3.5rem] mb-4 text-[rgba(0,92,57,1)] mt-0.5 font-bold">
            Hope Starts Here
          </h2>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed mt-2.5 mb-2">
            ShelterConnect brings together homeless individuals, generous chefs, caring donors, and rescue animals
            across Massachusetts to build a stronger, more supportive community.
          </p>
        </div>
      </section>

      {/* Options for subpages */}
      <section className="px-4 py-4 bg-[rgba(225,237,255,0.3)] my-0">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl text-center text-foreground mt-2 mb-2 font-semibold">How Can We Help You Today? </h3>
          <p className="text-center text-muted-foreground text-lg mb-2.5">
            Choose your role to access our helpful resources:
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Homeless Shelter */}
            <Link href="/shelters" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group my-2 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors bg-[rgba(0,140,89,0.1)]">
                    <MapPin className="h-8 w-8 text-[rgba(0,92,57,1)]" />
                  </div>
                  <CardTitle className="text-xl">Need Temporary Shelter?</CardTitle>
                  <CardDescription className="text-base">
                    Find nearby homeless shelters and other essential services in your area
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Interactive shelter map
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Filter by offered services
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      Capacity and availability
                    </li>
                  </ul>
                  <Button className="w-full text-background bg-[rgba(0,92,57,1)]" size="lg">
                    Find Resources
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Food Donor */}
            <Link href="/chef" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group my-2 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                    <ChefHat className="h-8 w-8 text-[rgba(0,139,86,1)]" />
                  </div>
                  <CardTitle className="text-xl">Want to Donate Food?</CardTitle>
                  <CardDescription className="text-base">
                    Share meals and snacks with shelters and food pantries that need them most
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[rgba(0,129,80,1)]"></div>
                      Meal information entry
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[rgba(0,129,80,1)]"></div>
                      Automatic shelter matching
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[rgba(0,129,80,1)]"></div>
                      Food pantry information
                    </li>
                  </ul>
                  <Button className="w-full bg-[rgba(0,129,80,1)]" variant="secondary" size="lg">
                    Start Donating
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Financial Supporter */}
            <Link href="/donors" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group my-2 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Heart className="h-8 w-8 text-[rgba(0,165,102,1)]" />
                  </div>
                  <CardTitle className="text-xl">Ready to Support?</CardTitle>
                  <CardDescription className="text-base">
                    Fund specific shelters that are making a tangible impact in our community
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      Transparent accountability
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      Shelter condition reports
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      Direct impact metrics
                    </li>
                  </ul>
                  <Button className="w-full text-background bg-[rgba(0,165,102,1)]" variant="outline" size="lg">
                    View Opportunities
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2 text-[rgba(0,92,57,1)]">30+</div>
              <div className="text-sm text-muted-foreground">Shelters Connected</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-[rgba(0,129,80,1)]">2,100+</div>
              <div className="text-sm text-muted-foreground">Meals Donated</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-[rgba(0,166,102,1)]">$60K+</div>
              <div className="text-sm text-muted-foreground">Funds Raised</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-[rgba(56,56,56,1)]">800+</div>
              <div className="text-sm text-muted-foreground">Lives Impacted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Rescue Animals */}
      <section className="py-16 px-4 bg-[rgba(246,250,255,1)]">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <DogIcon className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Animal Shelters</h3>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            Discover adorable pets and support animal shelters across Massachusetts!
          </p>
          <Button className="bg-[rgba(0,92,57,1)] text-background" variant="outline" size="lg" asChild>
            <a href="/animals">Explore Animal Shelters</a>
          </Button>
        </div>
      </section>

      {/* Footer bar */}
      <footer className="border-t border-border py-8 px-4 bg-[rgba(241,245,252,1)]">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-semibold text-foreground">ShelterConnect </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Building a robust support system for vulnerable people and animals in transition.
          </p>
        </div>
      </footer>
    </div>
  )
}
