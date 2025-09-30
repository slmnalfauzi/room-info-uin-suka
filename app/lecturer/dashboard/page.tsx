"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, CheckSquare, AlertCircle, BookOpen, FileText, TrendingUp } from "lucide-react"
import { getLecturerStats, getPendingReservations, getWeeklySchedule } from "@/lib/lecturer"

export default function LecturerDashboard() {
  const stats = getLecturerStats()
  const pendingReservations = getPendingReservations().slice(0, 3) // Show latest 3
  const weeklySchedule = getWeeklySchedule().slice(0, 4) // Show next 4

  const getScheduleTypeBadge = (type: string) => {
    switch (type) {
      case "lecture":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Kuliah</Badge>
      case "lab":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Praktikum</Badge>
      case "exam":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Ujian</Badge>
      case "meeting":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Meeting</Badge>
      default:
        return <Badge variant="secondary">{type}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
  }

  return (
    <DashboardLayout role="dosen">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Dosen</h1>
          <p className="text-muted-foreground">Kelola persetujuan reservasi dan jadwal ruangan</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingApprovals}</p>
                  <p className="text-sm text-muted-foreground">Menunggu Persetujuan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.approvedToday}</p>
                  <p className="text-sm text-muted-foreground">Disetujui Hari Ini</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalThisWeek}</p>
                  <p className="text-sm text-muted-foreground">Total Minggu Ini</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.rejectedThisWeek}</p>
                  <p className="text-sm text-muted-foreground">Ditolak Minggu Ini</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => (window.location.href = "/lecturer/approvals")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CheckSquare className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Persetujuan</h3>
                  <p className="text-sm text-muted-foreground">Review reservasi ruangan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => (window.location.href = "/lecturer/schedule")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Jadwal Ruangan</h3>
                  <p className="text-sm text-muted-foreground">Lihat jadwal penggunaan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => (window.location.href = "/lecturer/reports")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Laporan</h3>
                  <p className="text-sm text-muted-foreground">Lihat laporan penggunaan</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Approvals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Persetujuan Tertunda
              </CardTitle>
              <CardDescription>Reservasi yang memerlukan persetujuan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReservations.length > 0 ? (
                  pendingReservations.map((reservation) => (
                    <div key={reservation.id} className="border border-border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium text-foreground">{reservation.roomName}</h4>
                          <p className="text-sm text-muted-foreground">oleh {reservation.userName}</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Menunggu
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(reservation.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {reservation.startTime} - {reservation.endTime}
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{reservation.purpose}</p>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => (window.location.href = `/lecturer/approvals?id=${reservation.id}`)}
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <CheckSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Tidak ada persetujuan tertunda</p>
                  </div>
                )}
              </div>
              {pendingReservations.length > 0 && (
                <Button
                  variant="outline"
                  className="w-full mt-4 bg-transparent"
                  onClick={() => (window.location.href = "/lecturer/approvals")}
                >
                  Lihat Semua Persetujuan
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Weekly Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Jadwal Minggu Ini
              </CardTitle>
              <CardDescription>Jadwal perkuliahan dan kegiatan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklySchedule.map((schedule) => (
                  <div key={schedule.id} className="border border-border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-foreground">{schedule.course}</h4>
                        <p className="text-sm text-muted-foreground">{schedule.roomName}</p>
                      </div>
                      {getScheduleTypeBadge(schedule.type)}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(schedule.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {schedule.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {schedule.students} mahasiswa
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 bg-transparent"
                onClick={() => (window.location.href = "/lecturer/schedule")}
              >
                Lihat Jadwal Lengkap
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
