"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Building2, Plus, Edit, Trash2, MapPin, Users, Settings } from "lucide-react"
import { getAllRooms, createRoom, updateRoom, deleteRoom, type Room } from "@/lib/admin"

export default function RoomsManagementPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    location: "",
    facilities: [] as string[],
    description: "",
    status: "available" as Room["status"],
  })

  useEffect(() => {
    setRooms(getAllRooms())
  }, [])

  const resetForm = () => {
    setFormData({
      name: "",
      capacity: "",
      location: "",
      facilities: [],
      description: "",
      status: "available",
    })
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const newRoom = await createRoom({
        name: formData.name,
        capacity: Number.parseInt(formData.capacity),
        location: formData.location,
        facilities: formData.facilities,
        description: formData.description,
        status: formData.status,
      })

      setRooms((prev) => [...prev, newRoom])
      setShowCreateDialog(false)
      resetForm()
      alert("Ruangan berhasil ditambahkan!")
    } catch (error) {
      alert("Terjadi kesalahan saat menambahkan ruangan.")
    }

    setIsLoading(false)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRoom) return

    setIsLoading(true)

    try {
      const success = await updateRoom(selectedRoom.id, {
        name: formData.name,
        capacity: Number.parseInt(formData.capacity),
        location: formData.location,
        facilities: formData.facilities,
        description: formData.description,
        status: formData.status,
      })

      if (success) {
        setRooms((prev) =>
          prev.map((room) =>
            room.id === selectedRoom.id ? { ...room, ...formData, capacity: Number.parseInt(formData.capacity) } : room,
          ),
        )
        setShowEditDialog(false)
        setSelectedRoom(null)
        resetForm()
        alert("Ruangan berhasil diperbarui!")
      }
    } catch (error) {
      alert("Terjadi kesalahan saat memperbarui ruangan.")
    }

    setIsLoading(false)
  }

  const handleDelete = async (roomId: string) => {
    setIsLoading(true)

    try {
      const success = await deleteRoom(roomId)
      if (success) {
        setRooms((prev) => prev.filter((room) => room.id !== roomId))
        alert("Ruangan berhasil dihapus!")
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus ruangan.")
    }

    setIsLoading(false)
  }

  const openEditDialog = (room: Room) => {
    setSelectedRoom(room)
    setFormData({
      name: room.name,
      capacity: room.capacity.toString(),
      location: room.location,
      facilities: room.facilities,
      description: room.description || "",
      status: room.status,
    })
    setShowEditDialog(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Tersedia</Badge>
      case "occupied":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Terisi</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Maintenance</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const facilityOptions = [
    "Komputer",
    "Proyektor",
    "AC",
    "Sound System",
    "Whiteboard",
    "WiFi",
    "TV",
    "Podium",
    "Stage",
    "Lighting",
  ]

  const handleFacilityChange = (facility: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      facilities: checked ? [...prev.facilities, facility] : prev.facilities.filter((f) => f !== facility),
    }))
  }

  const RoomForm = ({ onSubmit, title }: { onSubmit: (e: React.FormEvent) => void; title: string }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Ruangan</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Lab Komputer 1"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity">Kapasitas</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData((prev) => ({ ...prev, capacity: e.target.value }))}
            placeholder="40"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Lokasi</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
          placeholder="Gedung Teknik Lantai 2"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value: Room["status"]) => setFormData((prev) => ({ ...prev, status: value }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Tersedia</SelectItem>
            <SelectItem value="occupied">Terisi</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Fasilitas</Label>
        <div className="grid grid-cols-2 gap-2">
          {facilityOptions.map((facility) => (
            <div key={facility} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={facility}
                checked={formData.facilities.includes(facility)}
                onChange={(e) => handleFacilityChange(facility, e.target.checked)}
                className="rounded border-gray-300"
              />
              <Label htmlFor={facility} className="text-sm">
                {facility}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Deskripsi ruangan..."
          rows={3}
        />
      </div>

      <DialogFooter>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Menyimpan...
            </div>
          ) : (
            title
          )}
        </Button>
      </DialogFooter>
    </form>
  )

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kelola Ruangan</h1>
            <p className="text-muted-foreground">Tambah, edit, dan kelola ruangan kampus</p>
          </div>

          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Ruangan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Tambah Ruangan Baru</DialogTitle>
                <DialogDescription>Lengkapi informasi ruangan yang akan ditambahkan</DialogDescription>
              </DialogHeader>
              <RoomForm onSubmit={handleCreate} title="Tambah Ruangan" />
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{rooms.length}</p>
                  <p className="text-sm text-muted-foreground">Total Ruangan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {rooms.filter((r) => r.status === "available").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Tersedia</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {rooms.filter((r) => r.status === "occupied").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Terisi</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {rooms.filter((r) => r.status === "maintenance").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Maintenance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img src={room.image || "/placeholder.svg"} alt={room.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">{getStatusBadge(room.status)}</div>
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

                  {room.description && <p className="text-sm text-muted-foreground line-clamp-2">{room.description}</p>}

                  <div className="flex flex-wrap gap-1">
                    {room.facilities.slice(0, 3).map((facility) => (
                      <Badge key={facility} variant="secondary" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                    {room.facilities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{room.facilities.length - 3} lainnya
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => openEditDialog(room)}
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive" className="flex-1">
                          <Trash2 className="w-3 h-3 mr-1" />
                          Hapus
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Hapus Ruangan</AlertDialogTitle>
                          <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus ruangan "{room.name}"? Tindakan ini tidak dapat
                            dibatalkan.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Batal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(room.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Hapus
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Ruangan</DialogTitle>
              <DialogDescription>Perbarui informasi ruangan</DialogDescription>
            </DialogHeader>
            <RoomForm onSubmit={handleEdit} title="Simpan Perubahan" />
          </DialogContent>
        </Dialog>

        {rooms.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Belum Ada Ruangan</h3>
              <p className="text-muted-foreground mb-4">Mulai dengan menambahkan ruangan pertama.</p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Ruangan
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
