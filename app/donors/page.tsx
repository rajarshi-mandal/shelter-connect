"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Heart,
  DollarSign,
  TrendingUp,
  Users,
  MapPin,
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"
import DonationCheckout from "@/components/donation-checkout"

// Unmet funding gaps
const fundingOpportunities = [
  {
    id: 1,
    name: "ServiceNet Shelter",
    location: "21 Pearl St, Pittsfield",
    condition: "Critical",
    fundingGap: 10000,
    goalAmount: 40000,
    raised: 30000,
    urgentNeeds: ["Showers & Laundry Build-out", "Lockers/Storage", "Kitchen & Meal Service"],
    description: "New 40-bed shelter plus day-center build-out (showers, laundry, lockers, kitchen) need support.",
    lastInspection: "2025-09-30",
    capacity: 40,
  },
  {
    id: 2,
    name: "Y2Y Harvard Square",
    location: "1 Church St, Cambridge",
    condition: "Critical",
    fundingGap: 35000,
    goalAmount: 50000,
    raised: 15000,
    urgentNeeds: ["Hygiene Kits", "Blankets & Towels", "Meals & Snacks"],
    description: "Seasonal 22-bed youth shelter needs supplies and funds to stay open nightly through winter.",
    lastInspection: "2025-10-01",
    capacity: 60,
  },
  {
    id: 3,
    name: "St. Francis House",
    location: "39 Boylston St, Boston",
    condition: "Fair",
    fundingGap: 4000,
    goalAmount: 20000,
    raised: 16000,
    urgentNeeds: ["Winter Gear & Clothing", "Socks & Underwear", "Meal Program Supplies"],
    description: "Scaling clothing and daily breakfast/lunch service for up to ~300 guests each day.",
    lastInspection: "2025-09-05",
    capacity: 300,
  },
  {
    id: 4,
    name: "Abby’s House",
    location: "21–23 Crown St, Worcester",
    condition: "Fair",
    fundingGap: 7000,
    goalAmount: 10000,
    raised: 3000,
    urgentNeeds: ["Shelter Bedding", "Household Essentials", "Food & Gift Cards"],
    description: "Shelter and supportive housing rely on in-kind and monetary gifts to meet basic needs.",
    lastInspection: "2025-08-14",
    capacity: 50,
  },
  {
    id: 5,
    name: "Father Bill’s & MainSpring",
    location: "124 Manley St, Brockton",
    condition: "Good",
    fundingGap: 50000,
    goalAmount: 60000,
    raised: 10000,
    urgentNeeds: ["Bedding & Linens", "Commercial Kitchen Equipment", "Clinic & Hygiene Supplies"],
    description: "New 24/7, 128-bed center needs to outfit kitchen/health clinic and cover expanded operations.",
    lastInspection: "2025-09-20",
    capacity: 180,
  },
  {
    id: 6,
    name: "Lazarus House Ministries",
    location: "48 Holly St, Lawrence",
    condition: "Good",
    fundingGap: 2000,
    goalAmount: 10000,
    raised: 8000,
    urgentNeeds: ["Food Pantry Staples", "Personal Care Items", "Children’s Clothing"],
    description: "Up to 25 people in private family suites; donations meet urgent guest needs across programs.",
    lastInspection: "2025-07-29",
    capacity: 25,
  },
]

// Financial donations
const donationHistory = [
  {
    id: 1,
    date: "2025-10-12",
    amount: 750,
    shelter: "Y2Y Harvard Square",
    purpose: "Hygiene Kits & Meals",
    impact: "Supplied 35 hygiene kits and two nights of snacks for 22 youth.",
  },
  {
    id: 2,
    date: "2025-09-28",
    amount: 1200,
    shelter: "ServiceNet Shelter",
    purpose: "Showers & Laundry Build-out",
    impact: "Funded plumbing fixtures and 1 commercial washer, enabling 50 loads/week.",
  },
  {
    id: 3,
    date: "2025-08-15",
    amount: 500,
    shelter: "Lazarus House Ministries",
    purpose: "Food Pantry Staples",
    impact: "Provided weekly groceries and beds for 40 families across Lawrence.",
  },
]

export default function DonorsPage() {
  const [selectedAmounts, setSelectedAmounts] = useState<{ [key: number]: number | null }>({})
  const [checkoutDialog, setCheckoutDialog] = useState<{
    open: boolean
    shelterName: string
    amount: number
  }>({
    open: false,
    shelterName: "",
    amount: 0,
  })

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "Fair":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Good":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case "Critical":
        return <AlertTriangle className="h-4 w-4" />
      case "Fair":
        return <Clock className="h-4 w-4" />
      case "Good":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleDonateClick = (shelterName: string, shelterId: number) => {
    const amount = selectedAmounts[shelterId] || 25 // Default to $25 if no amount selected
    setCheckoutDialog({
      open: true,
      shelterName,
      amount,
    })
  }

  const totalDonated = donationHistory.reduce((sum, donation) => sum + donation.amount, 0)
  const sheltersSupported = new Set(donationHistory.map((d) => d.shelter)).size

  return (
    <div className="min-h-screen bg-background">
      {/* Header bar */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button className="bg-[rgba(195,219,222,1)]" variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-accent" />
              <h1 className="text-xl font-bold text-foreground">Donor Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome info */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Make a Difference Today</h2>
          <p className="text-muted-foreground">
            Support local shelters across Massachusetts with full transparency about how your donation will be used.
          </p>
        </div>

        {/* Impact */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <DollarSign className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">${totalDonated.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Donated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{sheltersSupported}</p>
                  <p className="text-sm text-muted-foreground">Shelters Supported</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">141</p>
                  <p className="text-sm text-muted-foreground">Lives Impacted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[rgba(232,-26,9,0.10869565217391304)]">
                  <Heart className="h-6 w-6 text-chart-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Donations This Year</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Three options */}
        <Tabs defaultValue="opportunities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="opportunities">Funding Opportunities</TabsTrigger>
            <TabsTrigger value="impact">My Impact</TabsTrigger>
            <TabsTrigger value="history">Donation History</TabsTrigger>
          </TabsList>

          {/* Funding Opportunities */}
          <TabsContent value="opportunities">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Shelters are ranked by urgency and funding gaps with critical conditions needing the most immediate attention.
                </p>
              </div>

              {fundingOpportunities.map((shelter) => (
                <Card key={shelter.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{shelter.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {shelter.location} • Capacity: {shelter.capacity} people
                        </CardDescription>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getConditionColor(shelter.condition)} flex items-center gap-1`}
                      >
                        {getConditionIcon(shelter.condition)}
                        {shelter.condition}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{shelter.description}</p>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Funding Progress</span>
                        <span className="text-muted-foreground">
                          ${shelter.raised.toLocaleString()} / ${shelter.goalAmount.toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={(shelter.raised / shelter.goalAmount) * 100}
                        className="h-2 bg-gray-300"
                        indicatorClassName="bg-green-600"
                      />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-destructive">
                          ${shelter.fundingGap.toLocaleString()} funding gap
                        </span>{" "}
                        remaining to reach goal
                      </p>
                    </div>

                    {/* Why its needed */}
                    <div>
                      <p className="text-sm font-medium mb-2">Urgent Needs:</p>
                      <div className="flex flex-wrap gap-2">
                        {shelter.urgentNeeds.map((need, index) => (
                          <Badge key={index} variant="secondary">
                            {need}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Quick donate */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium">Quick Donate:</p>
                      <div className="grid grid-cols-4 gap-2">
                        {[25, 50, 100, 250].map((amount) => (
                          <Button
                            key={amount}
                            variant={selectedAmounts[shelter.id] === amount ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedAmounts({ ...selectedAmounts, [shelter.id]: amount })}
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1 bg-green-700 hover:bg-green-800"
                        onClick={() => handleDonateClick(shelter.name, shelter.id)}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Donate Now
                      </Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Impact */}
          <TabsContent value="impact">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Impact This Year</CardTitle>
                  <CardDescription>See how your donations have made a difference in the community.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">People Helped</span>
                      <span className="font-bold">141</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Meals Funded</span>
                      <span className="font-bold">124</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">New Beds</span>
                      <span className="font-bold">80</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Children Supported</span>
                      <span className="font-bold">36</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recognition</CardTitle>
                  <CardDescription>Your contributions have earned you these achievements.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Community Champion</p>
                        <p className="text-xs text-muted-foreground">Supported 3+ shelters</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Consistent Supporter</p>
                        <p className="text-xs text-muted-foreground">3 donations this year</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Donation History */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Your Donation History</CardTitle>
                <CardDescription>Track all your contributions and their impact on the community.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationHistory.map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">${donation.amount}</p>
                          <Badge variant="outline" className="text-xs">
                            {donation.purpose}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{donation.shelter}</p>
                        <p className="text-xs text-muted-foreground">{donation.impact}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{donation.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Stripe checkout */}
      <Dialog open={checkoutDialog.open} onOpenChange={(open) => setCheckoutDialog({ ...checkoutDialog, open })}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Donation</DialogTitle>
            <DialogDescription>
              You're donating ${checkoutDialog.amount} to {checkoutDialog.shelterName}
            </DialogDescription>
          </DialogHeader>
          <DonationCheckout shelterName={checkoutDialog.shelterName} amount={checkoutDialog.amount} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
