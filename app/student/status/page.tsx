"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, User, MessageSquare, RefreshCw } from "lucide-react"
import { getUserReservations, type Reservation } from "@/lib/rooms"
import { getCurrentUser } from "@/lib/auth"

export default function ReservationStatusPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      const userReservations = getUserReservations(user.id)
      setReservations(userReservations)
    }
    setIsLoading(false)
  }, [])

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filterReservations = (status: string) => {
    if (status === "all") return reservations
    return reservations.filter((reservation) => reservation.status === status)
  }

  const ReservationCard = ({ reservation }: { reservation: Reservation }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground text-lg">{reservation.roomName}</h3>
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
          </div>
          {getStatusBadge(reservation.status)}
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Tujuan Penggunaan:</h4>
            <p className="text-sm text-muted-foreground">{reservation.purpose}</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Diajukan: {formatDateTime(reservation.createdAt)}</span>
            {reservation.approvedBy && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                Disetujui oleh: {reservation.approvedBy}
              </div>
            )}
          </div>

          {reservation.status === "rejected" && reservation.rejectedReason && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 text-red-600 mt-0.5" />
                <div>
                  <h5 className="text-sm font-medium text-red-800">Alasan Penolakan:</h5>
                  <p className="text-sm text-red-700">{reservation.rejectedReason}</p>
                </div>
              </div>
            </div>
          )}

          {reservation.status === "approved" && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">
                  Reservasi disetujui! Silakan gunakan ruangan sesuai jadwal.
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <DashboardLayout role="mahasiswa">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Memuat data...</span>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="mahasiswa">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Status Reservasi</h1>
            <p className="text-muted-foreground">Pantau status pengajuan reservasi ruangan Anda</p>
          </div>
          <Button onClick={() => (window.location.href = "/student/search")}>Buat Reservasi Baru</Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{reservations.length}</p>
                  <p className="text-sm text-muted-foreground">Total Reservasi</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{filterReservations("approved").length}</p>
                  <p className="text-sm text-muted-foreground">Disetujui</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{filterReservations("pending").length}</p>
                  <p className="text-sm text-muted-foreground">Menunggu</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{filterReservations("rejected").length}</p>
                  <p className="text-sm text-muted-foreground">Ditolak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reservations List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Semua ({reservations.length})</TabsTrigger>
            <TabsTrigger value="pending">Menunggu ({filterReservations("pending").length})</TabsTrigger>
            <TabsTrigger value="approved">Disetujui ({filterReservations("approved").length})</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak ({filterReservations("rejected").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {reservations.length > 0 ? (
              reservations.map((reservation) => <ReservationCard key={reservation.id} reservation={reservation} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Belum Ada Reservasi</h3>
                  <p className="text-muted-foreground mb-4">Anda belum memiliki reservasi ruangan.</p>
                  <Button onClick={() => (window.location.href = "/student/search")}>Buat Reservasi Pertama</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filterReservations("pending").map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {filterReservations("approved").map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {filterReservations("rejected").map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
