"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChefHat,
  Plus,
  Clock,
  Users,
  MapPin,
  ArrowLeft,
  Calendar,
  Utensils,
  AlertCircle,
  Mail,
  Copy,
  Check,
} from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Shelter food demand
const shelterNeeds = [
  {
    id: 1,
    name: "Boston Rescue Mission",
    location: "39 Kingston St, Boston",
    urgency: "High",
    needed: ["Hot meals", "Fresh produce", "Breakfast items"],
    serves: 120,
    nextMeal: "Today 6:00 PM",
    contact: "info@brm.org",
  },
  {
    id: 2,
    name: "Father Bill’s & MainSpring House",
    location: "54 N Main St, Brockton",
    urgency: "High",
    needed: ["Hearty casseroles", "Breakfast burritos", "Gluten-free options"],
    serves: 180,
    nextMeal: "Today 5:00 PM",
    contact: "info@helpfbms.org",
  },
  {
    id: 3,
    name: "Interfaith Social Services",
    location: "105 Adams St, Quincy",
    urgency: "Medium",
    needed: ["Kid-friendly snacks", "Low-sodium items", "Fresh produce"],
    serves: 100,
    nextMeal: "Tomorrow 10:00 AM",
    contact: "ekelly@interfaithsocialservices.org",
  },
  {
    id: 4,
    name: "Pearl Street Cupboard & Café",
    location: "46 Park St, Framingham",
    urgency: "Low",
    needed: ["Breakfast staples", "Protein trays", "Dairy"],
    serves: 250,
    nextMeal: "Today 5:30 PM",
    contact: "joe.mina@uwotc.org",
  },
  {
    id: 5,
    name: "Y2Y Harvard Square",
    location: "1 Church St, Cambridge",
    urgency: "Medium",
    needed: ["Individually packed meals", "Vegetarian options", "Healthy snacks"],
    serves: 60,
    nextMeal: "Today 7:30 PM",
    contact: "volunteer@y2yharvardsquare.org",
  },
  {
    id: 6,
    name: "Lowell Transitional Living Center",
    location: "193 Middlesex St, Lowell",
    urgency: "High",
    needed: ["Grab-and-go dinners", "Fresh fruit", "Coffee supplies"],
    serves: 180,
    nextMeal: "Today 6:30 PM",
    contact: "info@ltlc.org",
  },
  {
    id: 7,
    name: "Abby’s House",
    location: "52 High St, Worcester",
    urgency: "Medium",
    needed: ["Nonperishable staples", "Dairy", "Diapers & wipes"],
    serves: 50,
    nextMeal: "Tomorrow 12:00 PM",
    contact: "info@abbyshouse.org",
  },
  {
    id: 8,
    name: "MANNA Community Kitchen",
    location: "48 Elm St, Northampton",
    urgency: "Low",
    needed: ["Hot meal trays", "Fresh vegetables", "Desserts"],
    serves: 120,
    nextMeal: "Today 5:30 PM",
    contact: "lee@mannanorthampton.org",
  },
  {
    id: 9,
    name: "Loaves & Fishes Community Kitchen",
    location: "35 Chestnut St, Springfield",
    urgency: "High",
    needed: ["Bulk proteins", "Prepared sandwiches", "Produce boxes"],
    serves: 300,
    nextMeal: "Today 5:00 PM",
    contact: "Darleen@openpantry.org",
  },
  {
    id: 10,
    name: "Pine Street Inn",
    location: "444 Harrison Ave, Boston",
    urgency: "Medium",
    needed: ["Lunch portions", "Vegetarian options", "Snacks"],
    serves: 200,
    nextMeal: "Tomorrow 12:00 PM",
    contact: "info@pinestreetinn.org",
  },
  {
    id: 11,
    name: "Rosie’s Place",
    location: "889 Harrison Ave, Boston",
    urgency: "High",
    needed: ["Women's hygiene kits", "Fresh fruit", "Shelf-stable proteins"],
    serves: 150,
    nextMeal: "Today 5:30 PM",
    contact: "info@rosiesplace.org",
  },
  {
    id: 12,
    name: "St. Francis House",
    location: "39 Boylston St, Boston",
    urgency: "Medium",
    needed: ["Ready-to-serve salads", "Coffee/tea", "To-go containers"],
    serves: 300,
    nextMeal: "Tomorrow 7:30 AM",
    contact: "info@stfrancishouse.org",
  },
]

// Past donations
const donationHistory = [
  {
    id: 1,
    date: "2025-10-29",
    meal: "Chicken Fingers",
    portions: 50,
    shelter: "Loaves & Fishes Community Kitchen",
    status: "Scheduled",
  },
  {
    id: 2,
    date: "2025-08-31",
    meal: "French Toast",
    portions: 150,
    shelter: "St. Francis House",
    status: "Delivered",
  },
  {
    id: 3,
    date: "2025-04-15",
    meal: "Fettuccine Alfredo",
    portions: 75,
    shelter: "Rosie’s Place",
    status: "Delivered",
  },
  {
    id: 4,
    date: "2025-02-12",
    meal: "Broiled Lobster",
    portions: 100,
    shelter: "Pearl Street Cupboard & Café",
    status: "Delivered",
  },
]

export default function ChefPage() {
  const [mealForm, setMealForm] = useState({
    mealName: "",
    description: "",
    portions: "",
    mealType: "",
    pickupTime: "",
    specialInstructions: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setMealForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission
    console.log("Meal donation submitted:", mealForm)
    // Reset form
    setMealForm({
      mealName: "",
      description: "",
      portions: "",
      mealType: "",
      pickupTime: "",
      specialInstructions: "",
    })
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const [priorityFilter, setPriorityFilter] = useState("all")

  const [contactDialogOpen, setContactDialogOpen] = useState(false)
  const [selectedShelter, setSelectedShelter] = useState<(typeof shelterNeeds)[0] | null>(null)
  const [emailCopied, setEmailCopied] = useState(false)

  const handleContactShelter = (shelter: (typeof shelterNeeds)[0]) => {
    setSelectedShelter(shelter)
    setContactDialogOpen(true)
    setEmailCopied(false)
  }

  const handleCopyEmail = () => {
    if (selectedShelter?.contact) {
      navigator.clipboard.writeText(selectedShelter.contact)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 2000)
    }
  }

  const filteredShelters = shelterNeeds.filter((shelter) => {
    if (priorityFilter === "all") return true
    return shelter.urgency.toLowerCase() === priorityFilter.toLowerCase()
  })

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
              <ChefHat className="h-6 w-6 text-secondary" />
              <h1 className="text-xl font-bold text-foreground">Chef Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome info */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome Chef!</h2>
          <p className="text-muted-foreground">
            Use your culinary skills to help feed those in need across Massachusetts.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary/10 rounded-full">
                  <Utensils className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">375</p>
                  <p className="text-sm text-muted-foreground">Total Portions Donated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4</p>
                  <p className="text-sm text-muted-foreground">Shelters Helped</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1</p>
                  <p className="text-sm text-muted-foreground">Donations This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Three options */}
        <Tabs defaultValue="donate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="donate">Donate Meal</TabsTrigger>
            <TabsTrigger value="needs">Shelter Needs</TabsTrigger>
            <TabsTrigger value="history">My Donations</TabsTrigger>
          </TabsList>

          {/* Donate Meal */}
          <TabsContent value="donate">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Donate a Meal
                </CardTitle>
                <CardDescription>
                  Fill out the details below to offer a meal donation to local shelters.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="mealName">Meal Name *</Label>
                      <Input
                        id="mealName"
                        placeholder="i.e. Caesar Salad"
                        value={mealForm.mealName}
                        onChange={(e) => handleInputChange("mealName", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="portions">Number of Portions *</Label>
                      <Input
                        id="portions"
                        type="number"
                        placeholder="i.e. 60"
                        value={mealForm.portions}
                        onChange={(e) => handleInputChange("portions", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Meal Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the meal, ingredients, dietary considerations"
                      value={mealForm.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="mealType">Meal Type *</Label>
                      <Select value={mealForm.mealType} onValueChange={(value) => handleInputChange("mealType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select meal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="breakfast">Breakfast</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="dinner">Dinner</SelectItem>
                          <SelectItem value="snack">Snack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pickupTime">Available for Pickup</Label>
                      <Input
                        id="pickupTime"
                        type="datetime-local"
                        value={mealForm.pickupTime}
                        onChange={(e) => handleInputChange("pickupTime", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      placeholder="Storage requirements, heating instructions, allergen information"
                      value={mealForm.specialInstructions}
                      onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Meal Donation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Shelter Needs */}
          <TabsContent value="needs">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Current shelter needs across Massachusetts so you can help where it&#39;s needed most!
                </p>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Label htmlFor="priority-filter" className="text-sm font-medium whitespace-nowrap">
                    Filter by Priority:
                  </Label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger id="priority-filter" className="w-[200px]">
                      <SelectValue placeholder="All Priorities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <span className="text-sm text-muted-foreground">
                  Showing {filteredShelters.length} of {shelterNeeds.length} shelters
                </span>
              </div>

              {filteredShelters.map((shelter) => (
                <Card key={shelter.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{shelter.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {shelter.location}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className={getUrgencyColor(shelter.urgency)}>
                        {shelter.urgency} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>Serves {shelter.serves} people</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Next meal: {shelter.nextMeal}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Currently Needed:</p>
                        <div className="flex flex-wrap gap-2">
                          {shelter.needed.map((item, index) => (
                            <Badge key={index} variant="secondary">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1 bg-green-700">
                        Offer Donation
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleContactShelter(shelter)}>
                        Contact Shelter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Donation History */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Your Donation History</CardTitle>
                <CardDescription>Track your meals and see how you have impacted the community.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donationHistory.map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{donation.meal}</p>
                        <p className="text-sm text-muted-foreground">
                          {donation.portions} portions • {donation.shelter}
                        </p>
                        <p className="text-xs text-muted-foreground">{donation.date}</p>
                      </div>
                      <Badge variant={donation.status === "Delivered" ? "default" : "tertiary"}>
                        {donation.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Contact dialog popup */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Contact {selectedShelter?.name}
            </DialogTitle>
            <DialogDescription>Reach out to this shelter via email to coordinate your meal donation.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
              <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm font-mono flex-1 break-all">{selectedShelter?.contact}</span>
              <Button size="sm" variant="ghost" onClick={handleCopyEmail} className="flex-shrink-0">
                {emailCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setContactDialogOpen(false)}>
                Close
              </Button>
              <Button className="flex-1" onClick={handleCopyEmail}>
                {emailCopied ? "Copied!" : "Copy Email"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
