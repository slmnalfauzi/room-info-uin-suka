"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, MapPin, Users, Calendar } from "lucide-react"

interface SearchFilters {
  capacity: string
  location: string
  facilities: string[]
  date: string
  startTime: string
  endTime: string
}

interface RoomSearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void
  isLoading?: boolean
}

export default function RoomSearchFilters({ onFiltersChange, isLoading = false }: RoomSearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    capacity: "",
    location: "all",
    facilities: [],
    date: "",
    startTime: "",
    endTime: "",
  })

  const facilities = ["Proyektor", "AC", "WiFi", "Whiteboard", "Sound System", "Komputer", "Microphone", "CCTV"]

  const locations = [
    { value: "all", label: "Semua Lokasi" },
    { value: "gedung-a", label: "Gedung A" },
    { value: "gedung-b", label: "Gedung B" },
    { value: "gedung-c", label: "Gedung C" },
    { value: "gedung-d", label: "Gedung D" },
  ]

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleFacilityToggle = (facility: string) => {
    const newFacilities = filters.facilities.includes(facility)
      ? filters.facilities.filter((f) => f !== facility)
      : [...filters.facilities, facility]

    handleFilterChange("facilities", newFacilities)
  }

  const clearFilters = () => {
    const emptyFilters: SearchFilters = {
      capacity: "",
      location: "all",
      facilities: [],
      date: "",
      startTime: "",
      endTime: "",
    }
    setFilters(emptyFilters)
    onFiltersChange(emptyFilters)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filter Pencarian
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Capacity */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Kapasitas Minimum
          </label>
          <input
            type="number"
            placeholder="Masukkan jumlah orang"
            value={filters.capacity}
            onChange={(e) => handleFilterChange("capacity", e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-background"
            disabled={isLoading}
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Lokasi
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
            className="w-full px-3 py-2 border rounded-md bg-background"
            disabled={isLoading}
          >
            {locations.map((location) => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date and Time */}
        <div>
          <label className="block text-sm font-medium mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Tanggal & Waktu
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="date"
              value={filters.date}
              onChange={(e) => handleFilterChange("date", e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
              disabled={isLoading}
            />
            <input
              type="time"
              value={filters.startTime}
              onChange={(e) => handleFilterChange("startTime", e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
              disabled={isLoading}
            />
            <input
              type="time"
              value={filters.endTime}
              onChange={(e) => handleFilterChange("endTime", e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Facilities */}
        <div>
          <label className="block text-sm font-medium mb-3">Fasilitas</label>
          <div className="flex flex-wrap gap-2">
            {facilities.map((facility) => (
              <Badge
                key={facility}
                variant={filters.facilities.includes(facility) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80"
                onClick={() => !isLoading && handleFacilityToggle(facility)}
              >
                {facility}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <button
          onClick={clearFilters}
          disabled={isLoading}
          className="w-full px-4 py-2 text-sm border border-muted-foreground/20 rounded-md hover:bg-muted/50 disabled:opacity-50"
        >
          Bersihkan Filter
        </button>
      </CardContent>
    </Card>
  )
}
