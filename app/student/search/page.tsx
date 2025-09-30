"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MapPin, Users, Wifi, Monitor, Snowflake, Volume2, Calendar } from "lucide-react"
import { searchRooms, type Room } from "@/lib/rooms"

export default function RoomSearchPage() {
  const [searchFilters, setSearchFilters] = useState({
    capacity: "",
    location: "Semua Lokasi",
    facilities: [] as string[],
    date: "",
    startTime: "",
    endTime: "",
  })
  const [searchResults, setSearchResults] = useState<Room[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const facilityOptions = [
    { id: "komputer", label: "Komputer", icon: Monitor },
    { id: "proyektor", label: "Proyektor", icon: Monitor },
    { id: "ac", label: "AC", icon: Snowflake },
    { id: "sound", label: "Sound System", icon: Volume2 },
    { id: "wifi", label: "WiFi", icon: Wifi },
  ]

  const handleSearch = async () => {
    setIsSearching(true)

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const results = searchRooms({
      capacity: searchFilters.capacity ? Number.parseInt(searchFilters.capacity) : undefined,
      location: searchFilters.location || undefined,
      facilities: searchFilters.facilities,
      date: searchFilters.date || undefined,
      startTime: searchFilters.startTime || undefined,
      endTime: searchFilters.endTime || undefined,
    })

    setSearchResults(results)
    setIsSearching(false)
  }

  const handleFacilityChange = (facilityId: string, checked: boolean) => {
    setSearchFilters((prev) => ({
      ...prev,
      facilities: checked ? [...prev.facilities, facilityId] : prev.facilities.filter((f) => f !== facilityId),
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "occupied":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Tersedia"
      case "occupied":
        return "Terisi"
      case "maintenance":
        return "Maintenance"
      default:
        return status
    }
  }

  return (
    <DashboardLayout role="mahasiswa">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cari Ruangan</h1>
          <p className="text-muted-foreground">Temukan ruangan yang sesuai dengan kebutuhan Anda</p>
        </div>

        {/* Search Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Filter Pencarian
            </CardTitle>
            <CardDescription>Gunakan filter untuk menemukan ruangan yang tepat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Kapasitas Minimum</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Jumlah orang"
                  value={searchFilters.capacity}
                  onChange={(e) => setSearchFilters((prev) => ({ ...prev, capacity: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Lokasi</Label>
                <Select
                  value={searchFilters.location}
                  onValueChange={(value) => setSearchFilters((prev) => ({ ...prev, location: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih lokasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Semua Lokasi">Semua Lokasi</SelectItem>
                    <SelectItem value="Gedung Teknik">Gedung Teknik</SelectItem>
                    <SelectItem value="Gedung Utama">Gedung Utama</SelectItem>
                    <SelectItem value="Gedung MIPA">Gedung MIPA</SelectItem>
                    <SelectItem value="Gedung Kuliah">Gedung Kuliah</SelectItem>
                    <SelectItem value="Gedung Rektorat">Gedung Rektorat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Tanggal</Label>
                <Input
                  id="date"
                  type="date"
                  value={searchFilters.date}
                  onChange={(e) => setSearchFilters((prev) => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startTime">Jam Mulai</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={searchFilters.startTime}
                  onChange={(e) => setSearchFilters((prev) => ({ ...prev, startTime: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Jam Selesai</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={searchFilters.endTime}
                  onChange={(e) => setSearchFilters((prev) => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Fasilitas yang Dibutuhkan</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {facilityOptions.map((facility) => (
                  <div key={facility.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={facility.id}
                      checked={searchFilters.facilities.includes(facility.id)}
                      onCheckedChange={(checked) => handleFacilityChange(facility.id, checked as boolean)}
                    />
                    <Label htmlFor={facility.id} className="flex items-center gap-2 cursor-pointer">
                      <facility.icon className="w-4 h-4" />
                      {facility.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleSearch} disabled={isSearching} className="w-full md:w-auto">
              {isSearching ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Mencari...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Cari Ruangan
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Hasil Pencarian ({searchResults.length} ruangan)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((room) => (
                <Card key={room.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <img
                      src={room.image || "/placeholder.svg"}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={getStatusColor(room.status)}>{getStatusText(room.status)}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{room.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {room.location}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-3 h-3" />
                        Kapasitas: {room.capacity} orang
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">{room.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {room.facilities.map((facility) => (
                            <Badge key={facility} variant="secondary" className="text-xs">
                              {facility}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        disabled={room.status !== "available"}
                        onClick={() => (window.location.href = `/student/reserve?roomId=${room.id}`)}
                      >
                        {room.status === "available" ? (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Reservasi
                          </div>
                        ) : (
                          "Tidak Tersedia"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {searchResults.length === 0 && !isSearching && (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Belum Ada Pencarian</h3>
              <p className="text-muted-foreground">
                Gunakan filter di atas untuk mencari ruangan yang sesuai dengan kebutuhan Anda.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
