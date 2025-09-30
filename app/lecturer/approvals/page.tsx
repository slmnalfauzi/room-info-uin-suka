"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, MessageSquare } from "lucide-react"
import { approveReservation, rejectReservation, type Reservation } from "@/lib/lecturer"
import { mockReservations } from "@/lib/rooms"
import { getCurrentUser } from "@/lib/auth"

export default function ApprovalsPage() {
  const searchParams = useSearchParams()
  const highlightId = searchParams.get("id")
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  useEffect(() => {
    setReservations(mockReservations)
  }, [])

  const handleApprove = async (reservation: Reservation) => {
    setIsProcessing(true)
    const user = getCurrentUser()

    if (user) {
      const success = await approveReservation(reservation.id, user.name)
      if (success) {
        setReservations((prev) =>
          prev.map((r) => (r.id === reservation.id ? { ...r, status: "approved" as const, approvedBy: user.name } : r)),
        )
        alert("Reservasi berhasil disetujui!")
      }
    }
    setIsProcessing(false)
  }

  const handleReject = async () => {
    if (!selectedReservation || !rejectReason.trim()) return

    setIsProcessing(true)
    const success = await rejectReservation(selectedReservation.id, rejectReason)

    if (success) {
      setReservations((prev) =>
        prev.map((r) =>
          r.id === selectedReservation.id ? { ...r, status: "rejected" as const, rejectedReason: rejectReason } : r,
        ),
      )
      setShowRejectDialog(false)
      setRejectReason("")
      setSelectedReservation(null)
      alert("Reservasi berhasil ditolak!")
    }
    setIsProcessing(false)
  }

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
    <Card
      className={`hover:shadow-md transition-shadow ${highlightId === reservation.id ? "ring-2 ring-primary" : ""}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground text-lg">{reservation.roomName}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <User className="w-3 h-3" />
              Diajukan oleh: {reservation.userName}
            </div>
          </div>
          {getStatusBadge(reservation.status)}
        </div>

        <div className="space-y-3">
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

          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Tujuan Penggunaan:</h4>
            <p className="text-sm text-muted-foreground">{reservation.purpose}</p>
          </div>

          <div className="text-xs text-muted-foreground">Diajukan: {formatDateTime(reservation.createdAt)}</div>

          {reservation.status === "approved" && reservation.approvedBy && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Disetujui oleh: {reservation.approvedBy}</span>
              </div>
            </div>
          )}

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

          {reservation.status === "pending" && (
            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1" onClick={() => handleApprove(reservation)} disabled={isProcessing}>
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Memproses...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    Setujui
                  </div>
                )}
              </Button>

              <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="flex-1"
                    onClick={() => setSelectedReservation(reservation)}
                  >
                    <XCircle className="w-3 h-3 mr-2" />
                    Tolak
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tolak Reservasi</DialogTitle>
                    <DialogDescription>
                      Berikan alasan penolakan untuk reservasi {reservation.roomName} oleh {reservation.userName}.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reason">Alasan Penolakan</Label>
                      <Textarea
                        id="reason"
                        placeholder="Jelaskan alasan penolakan reservasi ini..."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                      Batal
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleReject}
                      disabled={!rejectReason.trim() || isProcessing}
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Memproses...
                        </div>
                      ) : (
                        "Tolak Reservasi"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <DashboardLayout role="dosen">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Persetujuan Reservasi</h1>
          <p className="text-muted-foreground">Review dan kelola persetujuan reservasi ruangan</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
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
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Menunggu ({filterReservations("pending").length})</TabsTrigger>
            <TabsTrigger value="approved">Disetujui ({filterReservations("approved").length})</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak ({filterReservations("rejected").length})</TabsTrigger>
            <TabsTrigger value="all">Semua ({reservations.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {filterReservations("pending").length > 0 ? (
              filterReservations("pending").map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Tidak Ada Persetujuan Tertunda</h3>
                  <p className="text-muted-foreground">Semua reservasi telah diproses.</p>
                </CardContent>
              </Card>
            )}
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

          <TabsContent value="all" className="space-y-4">
            {reservations.map((reservation) => (
              <ReservationCard key={reservation.id} reservation={reservation} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
