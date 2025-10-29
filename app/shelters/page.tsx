"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Script from "next/script"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Shirt,
  BookHeart,
  ScrollText,
  GraduationCap,
  Briefcase,
  Mouse as House,
  WashingMachine,
  Scale,
  Utensils,
  Stethoscope,
  Church,
  Bus,
  ArrowLeft,
  MapPin,
  Search,
  Filter,
  Phone,
  Clock,
  Users,
  Navigation,
} from "lucide-react"
import Link from "next/link"

const GOOGLE_MAPS_KEY = "REDACTED"

// Shelter data for Massachusetts
// https://www.gps-coordinates.net/
const shelters = [
  {
    id: 1,
    name: "Women's Lunch Place",
    address: "67 Newbury St, Boston",
    phone: "(617) 267-0200",
    coordinates: { lat: 42.35068, lng: -71.0785 },
    availability: "Available",
    capacity: "50 beds",
    services: ["clothing", "housing", "laundry", "meals", "medical", "transportation"],
    hours: "7:00 AM - 2:00 PM",
    description: "Community-centered nonprofit with professional staff, trusted advocacy, and active volunteers.",
  },
  {
    id: 2,
    name: "Friends of the Unborn Maternity Home",
    address: "38 Edgemere Rd, Quincy",
    phone: "(617) 786-7903",
    coordinates: { lat: 42.25587, lng: -71.00222 },
    availability: "Limited",
    capacity: "20 beds",
    services: ["counseling", "education", "housing", "laundry", "legal", "meals", "medical", "spiritual"],
    hours: "9:00 AM - 4:00 PM",
    description: "Faith-based maternity home offering housing through baby's first year.",
  },
  {
    id: 3,
    name: "Bridge Over Troubled Waters",
    address: "47 West St, Boston",
    phone: "(617) 423-9575",
    coordinates: { lat: 42.3551, lng: -71.063 },
    availability: "Available",
    capacity: "60 beds",
    services: ["clothing", "counseling", "documentation", "education", "employment", "housing", "laundry", "meals", "medical"],
    hours: "9:00 AM - 5:00 PM",
    description: "Has caring staff, a safe space, and one-on-one help for ages 14 to 24.",
  },
  {
    id: 4,
    name: "The Samaritan House",
    address: "59 Ingell St, Taunton",
    phone: "(508) 824-6497",
    coordinates: { lat: 41.88955, lng: -71.08477 },
    availability: "Limited",
    capacity: "18 beds",
    services: ["counseling", "education", "employment", "housing", "meals", "medical", "spiritual"],
    hours: "9:00 AM - 5:00 PM",
    description: "Sober community with game nights, quilting group, and outdoor walks.",
  },
  {
    id: 5,
    name: "Friends of the Homeless",
    address: "755 Worthington St, Springfield",
    phone: "(413) 732-3069",
    coordinates: { lat: 42.10987, lng: -72.58494 },
    availability: "Available",
    capacity: "110 beds",
    services: ["counseling", "documentation", "education", "employment", "housing", "laundry", "meals", "medical"],
    hours: "8:15 AM - 4:00 PM",
    description: "Serving adults with walk-ins accepted and staff known for kindness and respect.",
  },
  {
    id: 6,
    name: "Craig's Doors",
    address: "434 North Pleasant St, Amherst",
    phone: "(413) 256-0704",
    coordinates: { lat: 42.38515, lng: -72.52232 },
    availability: "Limited",
    capacity: "60 beds",
    services: ["counseling", "documentation", "housing", "meals", "medical", "transportation", "spiritual"],
    hours: "8:30 AM - 4:30 PM",
    description: "Trauma-informed case managers known for fast follow-ups and a dignified culture.",
  },
  {
    id: 7,
    name: "Grove Street Inn",
    address: "91 Grove St, Northampton",
    phone: "(413) 586-6001",
    coordinates: { lat: 42.30815, lng: -72.6466 },
    availability: "Full",
    capacity: "20 beds",
    services: ["counseling", "employment", "housing", "meals", "medical"],
    hours: "4:00 PM - 7:00 AM",
    description: "Open days for job and housing search with case managers, shared chores, and bilingual staff.",
  },
  {
    id: 8,
    name: "Lowell Transitional Living Center",
    address: "193 Middlesex St, Lowell",
    phone: "(978) 458-9888",
    coordinates: { lat: 42.64097, lng: -71.31194 },
    availability: "Available",
    capacity: "90 beds",
    services: ["counseling", "documentation", "employment", "housing", "laundry", "meals", "medical"],
    hours: "10:00 AM - 5:00 PM",
    description: "Diligent staff and welcoming community vibe with morale-boosting events like ice cream social.",
  },
  {
    id: 9,
    name: "CHD Family Housing & Shelters",
    address: "1013 Pleasant St, Palmer",
    phone: "(413) 737-2679",
    coordinates: { lat: 42.15812, lng: -72.329 },
    availability: "Limited",
    capacity: "20 beds",
    services: ["counseling", "documentation", "education", "employment", "housing", "transportation"],
    hours: "7:00 AM - 11:00 PM",
    description: "Parents say staff stick with families by patiently handling paperwork, school routines, and follow-through after moving in.",
  },
  {
    id: 10,
    name: "Our Father’s House",
    address: "199 Summer St, Fitchburg",
    phone: "(978) 345-2256",
    coordinates: { lat: 42.57463, lng: -71.78354 },
    availability: "Full",
    capacity: "20 beds",
    services: ["housing", "counseling", "employment", "meals", "clothing"],
    hours: "1:00 PM - 4:00 PM",
    description: "Works on permanent solutions to homelessness through emergency shelter, transitional housing, and a food pantry."
  },
  {
    id: 11,
    name: "In the Hour of Need Family Shelter",
    address: "91 June St, Worcester",
    phone: "(508) 755-2212",
    coordinates: { lat: 42.26579, lng: -71.83172 },
    availability: "Available",
    capacity: "26 beds",
    services: ["housing", "counseling", "education", "employment", "medical", "spiritual"],
    hours: "9:00 AM - 5:00 PM",
    description: "Partnering with faith groups and accepts families regardless of income or structure."
  },
  {
    id: 12,
    name: "Somerville Homeless Coalition Adult Shelter",
    address: "14 Chapel St, Somerville",
    phone: "(617) 623-2546",
    coordinates: { lat: 42.39876, lng: -71.12085 },
    availability: "Limited",
    capacity: "16 beds",
    services: ["counseling", "documentation", "housing", "meals", "medical"],
    hours: "10:00 AM - 3:00 PM",
    description: "Transitional living community with case management with access to detox services."
  }
]

const serviceIcons = {
  clothing: Shirt,
  counseling: BookHeart,
  documentation: ScrollText,
  education: GraduationCap,
  employment: Briefcase,
  housing: House,
  laundry: WashingMachine,
  legal: Scale,
  meals: Utensils,
  medical: Stethoscope,
  spiritual: Church,
  transportation: Bus,
}

const serviceLabels = {
  clothing: "Clothing",
  counseling: "Counseling",
  documentation: "Documentation",
  education: "Education",
  employment: "Employment",
  housing: "Housing",
  laundry: "Laundry",
  legal: "Legal",
  meals: "Meals",
  medical: "Medical",
  spiritual: "Spiritual",
  transportation: "Transportation",
}

export default function SheltersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const filteredShelters = useMemo(() => {
    return shelters.filter((shelter) => {
      const matchesSearch =
        shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shelter.address.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesServices =
        selectedServices.length === 0 || selectedServices.every((service) => shelter.services.includes(service))

      return matchesSearch && matchesServices
    })
  }, [searchTerm, selectedServices])

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "Available":
        return "bg-green-100 text-green-800 border-green-200"
      case "Limited":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Full":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // -------- Google Maps JS API ----------
  const mapDivRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<any | null>(null)
  const markersRef = useRef<any[]>([])
  const infoRef = useRef<any | null>(null)

  // Initialize map after script loaded
  const initMap = () => {
    if (!mapDivRef.current || !window.google) return

    // Skip if initialized
    if (!mapRef.current) {
      // Centered at MA
      mapRef.current = new window.google.maps.Map(mapDivRef.current, {
        center: { lat: 42.4072, lng: -71.3824 },
        zoom: 7,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      })
      infoRef.current = new window.google.maps.InfoWindow()
    }

    // Render markers for the filtered shelters
    renderMarkers()
  }

  const clearMarkers = () => {
    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []
  }

  const renderMarkers = () => {
    if (!mapRef.current || !window.google) return

    clearMarkers()

    if (filteredShelters.length === 0) {
      // Recenter on MA
      mapRef.current.setCenter({ lat: 42.4072, lng: -71.3824 })
      mapRef.current.setZoom(7)
      return
    }

    const bounds = new window.google.maps.LatLngBounds()

    filteredShelters.forEach((shelter) => {
      const position = new window.google.maps.LatLng(shelter.coordinates.lat, shelter.coordinates.lng)
      bounds.extend(position)

      const label =
        shelter.name
          .charAt(0)
          .toUpperCase()
          .replace(/[^A-Z0-9]/g, "") || "S"

      const marker = new window.google.maps.Marker({
        position,
        map: mapRef.current!,
        label,
        title: shelter.name,
      })

      marker.addListener("click", () => {
        if (!infoRef.current) return
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${shelter.coordinates.lat},${shelter.coordinates.lng}`
        infoRef.current.setContent(
          `
            <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto; max-width: 240px">
              <div style="font-weight:600;margin-bottom:4px">${shelter.name}</div>
              <div style="color:#6b7280; font-size:12px; margin-bottom:6px">${shelter.address}</div>
              <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:6px 10px;border:1px solid #e5e7eb;border-radius:8px;text-decoration:none;font-size:12px">
                Open Directions
              </a>
            </div>
          `,
        )
        infoRef.current.open({
          map: mapRef.current,
          anchor: marker,
        })
      })

      markersRef.current.push(marker)
    })

    // Fit to markers
    if (filteredShelters.length === 1) {
      mapRef.current.setCenter(bounds.getCenter())
      mapRef.current.setZoom(13)
    } else {
      mapRef.current.fitBounds(bounds)
    }
  }

  // Conditional rerender
  useEffect(() => {
    if (window.google && mapRef.current) {
      renderMarkers()
    }
  }, [filteredShelters])

  return (
    <>
      {/* Load interactivemap only on the page */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&v=weekly`}
        strategy="afterInteractive"
        onLoad={initMap}
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
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
                <MapPin className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Find Shelters</h1>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6">
          {/* Search and filter */}
          <div className="mb-6 space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search shelters by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-[rgba(207,228,232,1)]"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
              <Button
                variant="outline"
                size="icon"
                title="Recenter on Massachusetts"
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.setCenter({ lat: 42.4072, lng: -71.3824 })
                    mapRef.current.setZoom(7)
                  }
                }}
              >
                <Navigation className="h-4 w-4" />
              </Button>
            </div>

            {/* Filter options */}
            {showFilters && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Filter by Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(serviceLabels).map(([service, label]) => {
                      const Icon = serviceIcons[service as keyof typeof serviceIcons]
                      return (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={selectedServices.includes(service)}
                            onCheckedChange={() => handleServiceToggle(service)}
                          />
                          <label
                            htmlFor={service}
                            className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            <Icon className="h-4 w-4" />
                            {label}
                          </label>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Found {filteredShelters.length} vetted shelter{filteredShelters.length !== 1 ? "s" : ""} in Massachusetts.
            </p>
          </div>

          {/* Interactive map */}
          <Card className="mb-6">
            <CardContent className="p-0">
              {/* Map size initially h-120 or h-[500px]*/}
              <div className="h-140 rounded-lg overflow-hidden">
                <div ref={mapDivRef} className="w-full h-full" />
              </div>
            </CardContent>
          </Card>

          {/* Shelter list */}
          <div className="space-y-4">
            {filteredShelters.map((shelter) => (
              <Card key={shelter.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{shelter.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {shelter.address}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={getAvailabilityColor(shelter.availability)}>
                      {shelter.availability}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{shelter.description}</p>

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
                        <span>{shelter.capacity}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Available Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {shelter.services.map((service) => {
                          const Icon = serviceIcons[service as keyof typeof serviceIcons]
                          const label = serviceLabels[service as keyof typeof serviceLabels]
                          return (
                            <Badge key={service} variant="secondary" className="flex items-center gap-1">
                              <Icon className="h-3 w-3" />
                              {label}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1" asChild>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                          shelter.address,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Directions
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`tel:${shelter.phone.replace(/[^\d+]/g, "")}`}>Contact Now</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredShelters.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No shelters found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find more results.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
