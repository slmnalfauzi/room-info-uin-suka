"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, ArrowLeft, Send } from "lucide-react"
import { getRoomById, createReservation, type Room } from "@/lib/rooms"
import { getCurrentUser } from "@/lib/auth"

export default function ReservationPage() {
  const searchParams = useSearchParams()
  const roomId = searchParams.get("roomId")
  const [room, setRoom] = useState<Room | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
  })

  useEffect(() => {
    if (roomId) {
      const foundRoom = getRoomById(roomId)
      setRoom(foundRoom || null)
    }
  }, [roomId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const user = getCurrentUser()
    if (!user || !room) {
      setIsLoading(false)
      return
    }

    try {
      await createReservation({
        roomId: room.id,
        roomName: room.name,
        userId: user.id,
        userName: user.name,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        purpose: formData.purpose,
      })

      alert("Reservasi berhasil diajukan! Status: Menunggu persetujuan dosen.")
      window.location.href = "/student/status"
    } catch (error) {
      alert("Terjadi kesalahan saat mengajukan reservasi.")
    }

    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!room) {
    return (
      <DashboardLayout role="mahasiswa">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-4">Ruangan Tidak Ditemukan</h1>
          <Button onClick={() => (window.location.href = "/student/search")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Pencarian
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="mahasiswa">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => (window.location.href = "/student/search")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Ajukan Reservasi</h1>
            <p className="text-muted-foreground">Isi form untuk mengajukan peminjaman ruangan</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Room Details */}
          <Card>
            <CardHeader>
              <CardTitle>Detail Ruangan</CardTitle>
              <CardDescription>Informasi ruangan yang akan direservasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <img src={room.image || "/placeholder.svg"} alt={room.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Tersedia</Badge>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-foreground">{room.name}</h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{room.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Kapasitas: {room.capacity} orang</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{room.description}</p>

                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Fasilitas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {room.facilities.map((facility) => (
                      <Badge key={facility} variant="secondary">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reservation Form */}
          <Card>
            <CardHeader>
              <CardTitle>Form Reservasi</CardTitle>
              <CardDescription>Lengkapi informasi reservasi Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Tanggal</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      className="pl-10"
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Jam Mulai</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => handleInputChange("startTime", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime">Jam Selesai</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => handleInputChange("endTime", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Tujuan Penggunaan</Label>
                  <Textarea
                    id="purpose"
                    placeholder="Jelaskan tujuan penggunaan ruangan (contoh: Praktikum Pemrograman Web, Presentasi Tugas Akhir, dll.)"
                    value={formData.purpose}
                    onChange={(e) => handleInputChange("purpose", e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-foreground mb-2">Catatan:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Reservasi akan diproses dalam 1-2 hari kerja</li>
                    <li>• Status awal: Menunggu persetujuan dosen</li>
                    <li>• Anda akan mendapat notifikasi via email</li>
                    <li>• Pastikan waktu tidak bentrok dengan jadwal lain</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Mengajukan...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Ajukan Reservasi
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
