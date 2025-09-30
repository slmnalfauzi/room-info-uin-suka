// Lecturer-specific functions and data
import { mockReservations, type Reservation } from "@/lib/rooms"

export interface LecturerStats {
  pendingApprovals: number
  approvedToday: number
  totalThisWeek: number
  rejectedThisWeek: number
}

export function getPendingReservations(): Reservation[] {
  return mockReservations.filter((reservation) => reservation.status === "pending")
}

export function getLecturerStats(): LecturerStats {
  const now = new Date()
  const today = now.toISOString().split("T")[0]
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))

  return {
    pendingApprovals: mockReservations.filter((r) => r.status === "pending").length,
    approvedToday: mockReservations.filter((r) => r.status === "approved" && r.date === today).length,
    totalThisWeek: mockReservations.filter((r) => new Date(r.date) >= weekStart).length,
    rejectedThisWeek: mockReservations.filter((r) => r.status === "rejected" && new Date(r.date) >= weekStart).length,
  }
}

export async function approveReservation(reservationId: string, lecturerName: string): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))

  const reservation = mockReservations.find((r) => r.id === reservationId)
  if (reservation) {
    reservation.status = "approved"
    reservation.approvedBy = lecturerName
    return true
  }
  return false
}

export async function rejectReservation(reservationId: string, reason: string): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))

  const reservation = mockReservations.find((r) => r.id === reservationId)
  if (reservation) {
    reservation.status = "rejected"
    reservation.rejectedReason = reason
    return true
  }
  return false
}

// Mock schedule data
export interface ScheduleItem {
  id: string
  roomName: string
  course: string
  time: string
  date: string
  instructor: string
  students: number
  type: "lecture" | "lab" | "exam" | "meeting"
}

export const mockSchedule: ScheduleItem[] = [
  {
    id: "1",
    roomName: "Lab Komputer 1",
    course: "Pemrograman Web",
    time: "08:00 - 10:00",
    date: "2024-01-15",
    instructor: "Dr. Siti Nurhaliza",
    students: 35,
    type: "lab",
  },
  {
    id: "2",
    roomName: "Ruang Kelas 301",
    course: "Basis Data",
    time: "10:00 - 12:00",
    date: "2024-01-15",
    instructor: "Dr. Siti Nurhaliza",
    students: 45,
    type: "lecture",
  },
  {
    id: "3",
    roomName: "Ruang Seminar A",
    course: "Ujian Tengah Semester",
    time: "13:00 - 15:00",
    date: "2024-01-16",
    instructor: "Dr. Siti Nurhaliza",
    students: 80,
    type: "exam",
  },
  {
    id: "4",
    roomName: "Lab Software",
    course: "Rekayasa Perangkat Lunak",
    time: "08:00 - 10:00",
    date: "2024-01-17",
    instructor: "Dr. Siti Nurhaliza",
    students: 30,
    type: "lab",
  },
]

export function getWeeklySchedule(): ScheduleItem[] {
  return mockSchedule
}
