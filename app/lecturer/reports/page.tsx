import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { FileText, TrendingUp, Calendar, Building2 } from "lucide-react"

export default function ReportsPage() {
  // Mock data for charts
  const weeklyUsageData = [
    { day: "Sen", reservations: 12, approved: 10, rejected: 2 },
    { day: "Sel", reservations: 15, approved: 13, rejected: 2 },
    { day: "Rab", reservations: 18, approved: 15, rejected: 3 },
    { day: "Kam", reservations: 14, approved: 12, rejected: 2 },
    { day: "Jum", reservations: 16, approved: 14, rejected: 2 },
    { day: "Sab", reservations: 8, approved: 7, rejected: 1 },
    { day: "Min", reservations: 5, approved: 5, rejected: 0 },
  ]

  const roomUsageData = [
    { name: "Lab Komputer", value: 35, color: "#3b82f6" },
    { name: "Ruang Kelas", value: 28, color: "#10b981" },
    { name: "Ruang Seminar", value: 20, color: "#f59e0b" },
    { name: "Aula", value: 12, color: "#ef4444" },
    { name: "Lab Fisika", value: 5, color: "#8b5cf6" },
  ]

  const monthlyStats = {
    totalReservations: 156,
    approvedReservations: 142,
    rejectedReservations: 14,
    approvalRate: 91.0,
    mostUsedRoom: "Lab Komputer 1",
    peakDay: "Rabu",
    averagePerDay: 22.3,
  }

  return (
    <DashboardLayout role="dosen">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Laporan Penggunaan</h1>
          <p className="text-muted-foreground">Analisis dan statistik penggunaan ruangan</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{monthlyStats.totalReservations}</p>
                  <p className="text-sm text-muted-foreground">Total Reservasi</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{monthlyStats.approvalRate}%</p>
                  <p className="text-sm text-muted-foreground">Tingkat Persetujuan</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{monthlyStats.averagePerDay}</p>
                  <p className="text-sm text-muted-foreground">Rata-rata per Hari</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{monthlyStats.mostUsedRoom}</p>
                  <p className="text-sm text-muted-foreground">Ruangan Terpopuler</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Usage Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Penggunaan Mingguan</CardTitle>
              <CardDescription>Statistik reservasi per hari dalam seminggu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="approved" fill="#10b981" name="Disetujui" />
                    <Bar dataKey="rejected" fill="#ef4444" name="Ditolak" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Room Usage Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribusi Penggunaan Ruangan</CardTitle>
              <CardDescription>Persentase penggunaan berdasarkan jenis ruangan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roomUsageData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {roomUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistik Persetujuan</CardTitle>
              <CardDescription>Rincian status reservasi bulan ini</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-green-800">Disetujui</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-800">{monthlyStats.approvedReservations}</p>
                  <p className="text-sm text-green-600">
                    {((monthlyStats.approvedReservations / monthlyStats.totalReservations) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="font-medium text-red-800">Ditolak</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-800">{monthlyStats.rejectedReservations}</p>
                  <p className="text-sm text-red-600">
                    {((monthlyStats.rejectedReservations / monthlyStats.totalReservations) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">Total Reservasi</span>
                  <span className="font-bold text-foreground">{monthlyStats.totalReservations}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insight Penggunaan</CardTitle>
              <CardDescription>Analisis pola penggunaan ruangan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Hari Tersibuk</span>
                  <Badge variant="secondary">{monthlyStats.peakDay}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Ruangan Terpopuler</span>
                  <Badge variant="secondary">{monthlyStats.mostUsedRoom}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Rata-rata Harian</span>
                  <Badge variant="secondary">{monthlyStats.averagePerDay} reservasi</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tingkat Persetujuan</span>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{monthlyStats.approvalRate}%</Badge>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <h4 className="font-medium text-foreground mb-2">Rekomendasi</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Lab Komputer memiliki utilisasi tertinggi</li>
                  <li>• Rabu adalah hari dengan permintaan terbanyak</li>
                  <li>• Tingkat persetujuan sangat baik (91%)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
