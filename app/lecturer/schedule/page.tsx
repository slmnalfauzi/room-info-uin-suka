import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, MapPin, BookOpen } from "lucide-react"
import { getWeeklySchedule } from "@/lib/lecturer"

export default function SchedulePage() {
  const schedule = getWeeklySchedule()

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
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const groupByDate = (scheduleItems: typeof schedule) => {
    const grouped = scheduleItems.reduce(
      (acc, item) => {
        const date = item.date
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(item)
        return acc
      },
      {} as Record<string, typeof schedule>,
    )

    // Sort by date
    return Object.keys(grouped)
      .sort()
      .reduce(
        (acc, date) => {
          acc[date] = grouped[date].sort((a, b) => a.time.localeCompare(b.time))
          return acc
        },
        {} as Record<string, typeof schedule>,
      )
  }

  const groupedSchedule = groupByDate(schedule)

  return (
    <DashboardLayout role="dosen">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Jadwal Ruangan</h1>
          <p className="text-muted-foreground">Jadwal perkuliahan dan kegiatan Anda</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {schedule.filter((s) => s.type === "lecture").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Kuliah</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {schedule.filter((s) => s.type === "lab").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Praktikum</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {schedule.filter((s) => s.type === "exam").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Ujian</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {schedule.reduce((sum, s) => sum + s.students, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Mahasiswa</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule by Date */}
        <div className="space-y-6">
          {Object.entries(groupedSchedule).map(([date, scheduleItems]) => (
            <Card key={date}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {formatDate(date)}
                </CardTitle>
                <CardDescription>{scheduleItems.length} kegiatan dijadwalkan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {scheduleItems.map((item) => (
                    <Card key={item.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-foreground">{item.course}</h4>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                {item.roomName}
                              </div>
                            </div>
                            {getScheduleTypeBadge(item.type)}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.time}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {item.students} mahasiswa
                            </div>
                          </div>

                          <div className="text-xs text-muted-foreground">Pengajar: {item.instructor}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {schedule.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Tidak Ada Jadwal</h3>
              <p className="text-muted-foreground">Belum ada jadwal yang terdaftar untuk minggu ini.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
