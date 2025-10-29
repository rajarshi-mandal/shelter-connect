"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Search, MapPin, ArrowLeft, Users, Phone, Clock } from "lucide-react"
import Link from "next/link"

// Animal shelters
const animalShelters = [
  {
    id: 1,
    name: "Dakin Humane Society", // 1300
    location: "171 Union St, Springfield",
    coordinates: { lat: 42.09967, lng: -72.58254 },
    phone: "(413) 781-4000",
    hours: "12:30 PM - 3:00 PM",
    website: "dakinhumane.org",
    availableAnimals: 41,
    specialties: ["Cats", "Small Animals", "Dogs"],
  },
  {
    id: 2,
    name: "MSPCA Adoption Center", // 1277
    location: "350 S Huntington Ave, Jamaica Plain",
    coordinates: { lat: 42.32291, lng: -71.11106 },
    phone: "(617) 522-5055",
    hours: "12:00 PM - 3:00 PM",
    website: "mspca.org",
    availableAnimals: 76,
    specialties: ["Small Animals", "Cats", "Dogs"],
  },
  {
    id: 3,
    name: "Worcester Animal Rescue League", // 741
    location: "139 Holden St, Worcester",
    coordinates: { lat: 42.31039, lng: -71.82038 },
    phone: "(508) 853-0030",
    hours: "12:00 PM - 4:00 PM",
    website: "worcesterarl.org",
    availableAnimals: 8,
    specialties: ["Dogs", "Cats"],
  },
  {
    id: 4,
    name: "Thomas J O'Connor Adoption Center", // 578
    location: "627 Cottage St, Springfield",
    coordinates: { lat: 42.14182, lng: -72.53069 },
    phone: "(413) 781-1484",
    hours: "12:00 PM - 3:30 PM",
    website: "www.tjoconnoradoptioncenter.com",
    availableAnimals: 10,
    specialties: ["Cats", "Dogs"],
  },
  {
    id: 5,
    name: "Sterling Animal Shelter", // 433
    location: "17 Laurelwood Rd, Sterling",
    coordinates: { lat: 42.44573, lng: -71.75267 },
    phone: "(978) 422-8585",
    hours: "11:00 AM - 5:00 PM",
    website: "sterlingshelter.org",
    availableAnimals: 12,
    specialties: ["Cats", "Dogs", "Rabbits"],
  },
  {
    id: 6,
    name: "Animal Rescue League of Boston", // 423
    location: "10 Chandler St, Boston",
    coordinates: { lat: 42.34707, lng: -71.0697 },
    phone: "(617) 426-9170",
    hours: "1:00 PM - 6:00 PM",
    website: "arlboston.org",
    availableAnimals: 85,
    specialties: ["Cats", "Birds", "Dogs", "Small Animals"],
  },
  {
    id: 7,
    name: "Lowell Humane Society", // 395
    location: "951 Broadway St, Lowell",
    coordinates: { lat: 42.64118, lng: -71.33775 },
    phone: "(978) 452-7781",
    hours: "12:00 PM - 4:00 PM",
    website: "lowellhumanesociety.org",
    availableAnimals: 49,
    specialties: ["Small Animals", "Cats", "Dogs"],
  },
  {
    id: 8,
    name: "Baypath Humane Society", // 375
    location: "500 Legacy Farms N, Hopkinton",
    coordinates: { lat: 42.24727, lng: -71.52511 },
    phone: "(508) 435-6938",
    hours: "9:00 AM - 5:00 PM",
    website: "baypathhumane.org",
    availableAnimals: 55,
    specialties: ["Cats", "Dogs"],
  },
  {
    id: 9,
    name: "Second Chance Animal Services", // 364
    location: "111 Young Rd, East Brookfield",
    coordinates: { lat: 42.22321, lng: -72.03705 },
    phone: "(508) 867-5525",
    hours: "10:00 AM - 3:00 PM",
    website: "secondchanceanimals.org",
    availableAnimals: 19,
    specialties: ["Cats", "Dogs", "Guinea Pigs"],
  },
  {
    id: 10,
    name: "Berkshire Humane Society", // 349
    location: "214 Barker Rd, Pittsfield",
    coordinates: { lat: 42.43854, lng: -73.27713 },
    phone: "(413) 447-7878",
    hours: "10:00 AM - 4:00 PM",
    website: "berkshirehumane.org",
    availableAnimals: 43,
    specialties: ["Cats", "Dogs", "Small Animals"],
  },
]

const adoptablePets = [
  {
    id: 1,
    name: "Amelia Bedelia",
    type: "Dog",
    breed: "Husky",
    age: "2 years 4 months",
    gender: "Female",
    shelter: "Baypath Humane Society",
    description:
      "Shy but sweet 55-lb Husky who thrives in a quiet, predictable home with a fenced yard. She needs a confident, friendly dog in the household to model new routines and would do best with experienced adopters who can use high-value treats (chicken/cheese) and gentle, consistent training. Daily nature walks and playtime with chew and chase toys help her relax and open up.",
    image: "/animal1.png",
    extraCare: false,
    goodWith: ["Dogs", "Adults"],
    url: "https://baypathhumane.org/adopt/available-dogs/#sl_embed&page=shelterluv_wrap_1731590160%2Fembed%2Fanimal%2FBPHS-A-16269",
  },
  {
    id: 2,
    name: "Oliver",
    type: "Cat",
    breed: "Domestic Shorthair Mix",
    age: "8 years 6 months",
    gender: "Male",
    shelter: "Worcester Animal Rescue League",
    description:
      "Calm, mature companion who does best as the only pet in a quiet home where he can be the center of attention. Give him slow introductions, cozy napping spots, and daily enrichment (a catnip toy session goes a long way). Low-maintenance affection once settled, with steady routines and gentle company.",
    image: "/animal2.jpg",
    extraCare: false,
    goodWith: ["Adults"],
    url: "https://worcesterarl.org/cats-for-adoption/pp59586413/Oliver",
  },
  {
    id: 3,
    name: "Riley",
    type: "Rabbit",
    breed: "American",
    age: "4 months",
    gender: "Male",
    shelter: "Berkshire Humane Society",
    description:
      "Friendly young rabbit who needs a roomy x-pen or C&C enclosure (no tiny cages) and daily out-of-pen exercise. Provide a hay-based diet with measured pellets/leafy greens, chew toys, and a bunny-proofed area to keep cords and wood safe. Gentle, consistent handling and litter training will help him grow into a confident, easy-to-handle companion.",
    image: "/animal3.jpg",
    extraCare: true,
    goodWith: ["Children", "Adults"],
    url: "https://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimalDetails.aspx?id=59586835&css=%20https://berkshirehumane.org/wp-content/themes/charity-life-child/cppointstyle.css&authkey=m5f4qrenyy648tprlc5scl27dxk7x6yvqe2n02m8hsgf62guuw",
  },
  {
    id: 4,
    name: "Neptune",
    type: "Bird",
    breed: "Budgerigar",
    age: "2 years",
    gender: "Male",
    shelter: "Animal Rescue League of Boston",
    description:
      "Chatty budgie who enjoys mirrors and singing; set him up with a spacious cage, natural perches, and daily out-of-cage interaction time. Go slow with hand-taming using treats and soft talk to build confidence, and offer a balanced diet of pellets, seeds, and leafy veggies. Best in a calm home that provides gentle routines and enrichment toys for foraging and play.",
    image: "/animal4.jpg",
    extraCare: true,
    goodWith: ["Adults"],
    url: "https://www.petfinder.com/bird/neptune-78796443/ma/boston/animal-rescue-league-of-boston-ma13/",
  },
  {
    id: 5,
    name: "Holly",
    type: "Dog",
    breed: "Chihuahua",
    age: "3 years",
    gender: "Female",
    shelter: "Thomas J O'Connor Adoption Center",
    description:
      "Small, confident dog who needs a patient adopter that respects her boundaries and uses positive reinforcement. Plan for slow introductions, management around high-value items (feed in a quiet space, supervise bones), and regular walks plus mental enrichment. Best in an adult/teen home; could live with a calm dog after a successful meet-and-greet.",
    image: "/animal5.jpg",
    extraCare: false,
    goodWith: ["Dogs", "Adults"],
    url: "https://www.petfinder.com/dog/holly-78167062/ma/springfield/thomas-j-oconnor-animal-control-and-adoption-center-ma136/",
  },
  {
    id: 6,
    name: "Ollie",
    type: "Cat",
    breed: "Domestic Shorthair Mix",
    age: "2 years 9 months",
    gender: "Female",
    shelter: "Second Chance Animal Shelter",
    description:
      "Gentle, affectionate cat who enjoys curling up with her person after playtime. Set her up with slow introductions, cozy resting spots, and daily interactive play (wand toys/catnip). Likely happiest with another calm, friendly cat and a predictable routine for meals and enrichment.",
    image: "/animal6.jpg",
    extraCare: false,
    goodWith: ["Children", "Cats", "Adults"],
    url: "https://www.petfinder.com/cat/ollie-penelope-bonded-pair-78869870/ma/east-brookfield/second-chance-animal-shelter-inc-ma30/",
  },
]

const successStories = [
  {
    id: 1,
    petName: "Trinny",
    adopter: "Benny",
    story:
      "Trinny, a sweet-natured stray brought to Dakin with serious injuries, began a long road to recovery. With Cat Pawsitive Pro training, she learned endearing tricks like a high-five even after an emergency front-leg amputation. Her fearless spirit shone when the Jackson Galaxy Project crowned her National High Five Day winner. Soon after, she was adopted by Benny in Connecticut and settled into a life of love and luxury. A favorite at the Happy Cat Hotel & Spa, she even starred in their promo video—proof that Trinny's star power still shines.",
    image: "/success1.png",
    adoptionDate: "July 2022",
  },
  {
    id: 2,
    petName: "Freddie",
    adopter: "Coleman & Margarida",
    story:
      "Freddie, a shy puppy from Lowell Humane Society, as a shy little puppy grew into a confident companion who brings joy to his family with love, patience, and positive training. He now serves as a Psychiatric Service Dog (PSD). From his home in Lowell, MA to their second home in Portugal, Freddie has become a seasoned traveler across the U.S. and Europe and charms everyone he meets. Freddie's discipline and preparation make even 16-hour journeys manageable. Once a timid pup, Freddie is now an invaluable travel companion, a world explorer, and a steadfast friend.",
    image: "/success2.png",
    adoptionDate: "February 2019",
  },
  {
    id: 3,
    petName: "Jack Pawkins",
    adopter: "Rhonda Jackson",
    story:
      "Rhonda adopted Jack Pawkins, a guinea pig, at the MSPCA's Adoption Center in Massachusetts and a year after the adoption, the two got Jack Pawkins certified to be a therapy animal. For many years, Rhonda and Jack have traveled all around Massachusetts, from the New England Home for the Deaf in Danvers, to Worcester Recovery Center, to Reading Public Library, and more, bringing joy to many people of all ages.",
    image: "/success3.jpg",
    adoptionDate: "April 2015",
  },
]

export default function AnimalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [ageFilter, setAgeFilter] = useState("all")

  const filteredPets = adoptablePets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || pet.type.toLowerCase() === typeFilter
    const matchesAge =
      ageFilter === "all" ||
      (ageFilter === "young" && Number.parseInt(pet.age) <= 2) ||
      (ageFilter === "adult" && Number.parseInt(pet.age) > 2 && Number.parseInt(pet.age) <= 7) ||
      (ageFilter === "senior" && Number.parseInt(pet.age) > 7)

    return matchesSearch && matchesType && matchesAge
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
              <Heart className="h-6 w-6 text-chart-3" />
              <h1 className="text-xl font-bold text-foreground">Animal Shelters</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome info */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Find Your Perfect Companion</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover loving animals waiting patiently at animal shelters. Every adoption saves a life and makes room for
            another animal in need.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-chart-3 mb-2">398</div>
              <div className="text-sm text-muted-foreground">Animals Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">10</div>
              <div className="text-sm text-muted-foreground">Partner Shelters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2 text-primary">257</div>
              <div className="text-sm text-muted-foreground">Successful Adoptions</div>
            </CardContent>
          </Card>
        </div>

        {/* Three options */}
        <Tabs defaultValue="adopt" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="adopt">Adopt a Pet</TabsTrigger>
            <TabsTrigger value="shelters">Shelters</TabsTrigger>
            <TabsTrigger value="stories">Success Stories</TabsTrigger>
          </TabsList>

          {/* Adopt a Pet */}
          <TabsContent value="adopt">
            {/* Search and filter */}
            <div className="mb-6 space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or breed..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="dog">Dogs</SelectItem>
                    <SelectItem value="cat">Cats</SelectItem>
                    <SelectItem value="rabbit">Rabbits</SelectItem>
                    <SelectItem value="bird">Birds</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={ageFilter} onValueChange={setAgeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="young">Young (0-2)</SelectItem>
                    <SelectItem value="adult">Adult (3-7)</SelectItem>
                    <SelectItem value="senior">Senior (8+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pet grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPets.map((pet) => (
                <Card key={pet.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative">
                    <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-full object-cover" />
                    {pet.extraCare && <Badge className="absolute top-2 right-2 bg-chart-3">Extra Care</Badge>}
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{pet.name}</CardTitle>
                        <CardDescription>
                          {pet.breed} • {pet.age} • {pet.gender}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{pet.description}</p>

                    <div>
                      <p className="text-sm font-medium mb-2">Good with:</p>
                      <div className="flex flex-wrap gap-1">
                        {pet.goodWith.map((trait, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 inline mr-1" />
                      {pet.shelter}
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-green-700" asChild>
                        <a href={pet.url} target="_blank" rel="noopener noreferrer">
                          <Heart className="h-4 w-4 mr-2" />
                          Adopt {pet.name}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPets.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No pets found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms or filters to find more pets.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Shelters */}
          <TabsContent value="shelters">
            <div className="space-y-6">
              {animalShelters.map((shelter) => (
                <Card key={shelter.id}>
                  <CardHeader>
                    <CardTitle className="text-xl">{shelter.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {shelter.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{shelter.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{shelter.hours}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{shelter.availableAnimals} animals available</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">Specializes in:</p>
                        <div className="flex flex-wrap gap-2">
                          {shelter.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button asChild>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                            shelter.location,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit Shelter
                        </a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href={`https://${shelter.website}`} target="_blank" rel="noopener noreferrer">
                          View Website
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Success Stories */}
          <TabsContent value="stories">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Happy Endings</h3>
                <p className="text-muted-foreground">
                  Read heartwarming stories of pets who found their forever homes!
                </p>
              </div>

              {successStories.map((story) => (
                <Card key={story.id} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={story.image || "/placeholder.svg"}
                        alt={`${story.petName} with ${story.adopter}`}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <CardTitle className="text-xl">{story.petName}'s Story</CardTitle>
                        <CardDescription>
                          Adopted by {story.adopter} • {story.adoptionDate}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed my-2.5">{story.story}</p>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}

              <Card className="text-center">
                <CardContent className="py-8">
                  <Heart className="h-12 w-12 text-chart-3 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Share Your Story</h3>
                  <p className="text-muted-foreground mb-4">
                    Did you adopt a pet from one of our partner shelters? We'd love to hear about it!
                  </p>
                  <Button>Submit Your Story</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
