"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Plus, CheckCircle, XCircle, AlertCircle, Search, BookOpen } from "lucide-react"

export default function StudentDashboard() {
  const recentReservations = [
    {
      id: 1,
      room: "Lab Komputer 1",
      date: "2024-01-15",
      time: "09:00 - 11:00",
      status: "approved",
      purpose: "Praktikum Pemrograman",
    },
    {
      id: 2,
      room: "Ruang Seminar A",
      date: "2024-01-18",
      time: "13:00 - 15:00",
      status: "pending",
      purpose: "Presentasi Tugas Akhir",
    },
    {
      id: 3,
      room: "Aula Utama",
      date: "2024-01-20",
      time: "08:00 - 12:00",
      status: "rejected",
      purpose: "Acara Organisasi",
    },
  ]

  const upcomingSchedule = [
    {
      course: "Algoritma dan Struktur Data",
      room: "Lab Komputer 2",
      time: "08:00 - 10:00",
      date: "Senin, 15 Jan",
    },
    {
      course: "Basis Data",
      room: "Ruang Kelas 301",
      time: "10:00 - 12:00",
      date: "Selasa, 16 Jan",
    },
    {
      course: "Rekayasa Perangkat Lunak",
      room: "Lab Software",
      time: "13:00 - 15:00",
      date: "Rabu, 17 Jan",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Disetujui
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            Menunggu
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Ditolak
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <DashboardLayout role="mahasiswa">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Mahasiswa</h1>
          <p className="text-muted-foreground">Selamat datang kembali! Kelola reservasi ruangan Anda.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => (window.location.href = "/student/search")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Cari Ruangan</h3>
                  <p className="text-sm text-muted-foreground">Temukan ruangan yang tersedia</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => (window.location.href = "/student/reservations")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Buat Reservasi</h3>
                  <p className="text-sm text-muted-foreground">Ajukan peminjaman ruangan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => (window.location.href = "/student/status")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Status Reservasi</h3>
                  <p className="text-sm text-muted-foreground">Lihat status pengajuan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Reservations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Reservasi Terbaru
              </CardTitle>
              <CardDescription>Status reservasi ruangan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{reservation.room}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {reservation.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {reservation.time}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{reservation.purpose}</p>
                    </div>
                    <div>{getStatusBadge(reservation.status)}</div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 bg-transparent"
                onClick={() => (window.location.href = "/student/reservations")}
              >
                Lihat Semua Reservasi
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Jadwal Kuliah
              </CardTitle>
              <CardDescription>Jadwal perkuliahan minggu ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSchedule.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="space-y-1">
                      <h4 className="font-medium text-foreground">{schedule.course}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {schedule.room}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {schedule.time}
                        </div>
                        <span>{schedule.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
