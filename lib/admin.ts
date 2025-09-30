// Admin-specific functions and data
import { mockRooms, mockReservations, type Room, type Reservation } from "@/lib/rooms"
import type { User } from "@/lib/auth"

export interface AdminStats {
  totalRooms: number
  totalUsers: number
  totalReservations: number
  activeReservations: number
  roomUtilization: number
  pendingApprovals: number
}

export interface SystemUser extends User {
  createdAt: string
  lastLogin: string
  status: "active" | "inactive" | "suspended"
}

// Mock user data for admin management
export const mockUsers: SystemUser[] = [
  {
    id: "1",
    name: "Ahmad Rizki",
    email: "ahmad.rizki@student.univ.ac.id",
    role: "mahasiswa",
    studentId: "2021001001",
    avatar: "/placeholder.svg?key=xdg1h",
    createdAt: "2024-01-01T00:00:00Z",
    lastLogin: "2024-01-14T10:30:00Z",
    status: "active",
  },
  {
    id: "2",
    name: "Dr. Siti Nurhaliza",
    email: "siti.nurhaliza@univ.ac.id",
    role: "dosen",
    avatar: "/placeholder.svg?key=tjgf5",
    createdAt: "2023-08-15T00:00:00Z",
    lastLogin: "2024-01-14T09:15:00Z",
    status: "active",
  },
  {
    id: "3",
    name: "Budi Santoso",
    email: "budi.santoso@admin.univ.ac.id",
    role: "admin",
    avatar: "/placeholder.svg?key=n43s3",
    createdAt: "2023-01-10T00:00:00Z",
    lastLogin: "2024-01-14T08:00:00Z",
    status: "active",
  },
  {
    id: "4",
    name: "Sari Dewi",
    email: "sari.dewi@student.univ.ac.id",
    role: "mahasiswa",
    studentId: "2021001002",
    avatar: "/placeholder.svg?key=abc123",
    createdAt: "2024-01-05T00:00:00Z",
    lastLogin: "2024-01-13T16:45:00Z",
    status: "active",
  },
  {
    id: "5",
    name: "Prof. Andi Wijaya",
    email: "andi.wijaya@univ.ac.id",
    role: "dosen",
    avatar: "/placeholder.svg?key=def456",
    createdAt: "2023-09-01T00:00:00Z",
    lastLogin: "2024-01-12T14:20:00Z",
    status: "inactive",
  },
]

export function getAdminStats(): AdminStats {
  const today = new Date().toISOString().split("T")[0]
  const activeReservations = mockReservations.filter((r) => r.status === "approved" && r.date >= today).length

  return {
    totalRooms: mockRooms.length,
    totalUsers: mockUsers.length,
    totalReservations: mockReservations.length,
    activeReservations,
    roomUtilization: Math.round((activeReservations / mockRooms.length) * 100),
    pendingApprovals: mockReservations.filter((r) => r.status === "pending").length,
  }
}

export function getAllUsers(): SystemUser[] {
  return mockUsers
}

export function getAllRooms(): Room[] {
  return mockRooms
}

export function getAllReservations(): Reservation[] {
  return mockReservations
}

export async function createRoom(room: Omit<Room, "id">): Promise<Room> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newRoom: Room = {
    ...room,
    id: Date.now().toString(),
  }

  mockRooms.push(newRoom)
  return newRoom
}

export async function updateRoom(id: string, updates: Partial<Room>): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const roomIndex = mockRooms.findIndex((r) => r.id === id)
  if (roomIndex !== -1) {
    mockRooms[roomIndex] = { ...mockRooms[roomIndex], ...updates }
    return true
  }
  return false
}

export async function deleteRoom(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const roomIndex = mockRooms.findIndex((r) => r.id === id)
  if (roomIndex !== -1) {
    mockRooms.splice(roomIndex, 1)
    return true
  }
  return false
}

export async function updateUserStatus(userId: string, status: SystemUser["status"]): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const userIndex = mockUsers.findIndex((u) => u.id === userId)
  if (userIndex !== -1) {
    mockUsers[userIndex].status = status
    return true
  }
  return false
}

export async function deleteUser(userId: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const userIndex = mockUsers.findIndex((u) => u.id === userId)
  if (userIndex !== -1) {
    mockUsers.splice(userIndex, 1)
    return true
  }
  return false
}

export interface SystemReport {
  overview: {
    totalReservations: number
    activeUsers: number
    availableRooms: number
    totalRooms: number
    averageUsage: number
  }
  monthlyUsage: Array<{
    month: string
    reservations: number
  }>
  roomTypeDistribution: Array<{
    name: string
    value: number
  }>
  popularRooms: Array<{
    id: string
    name: string
    location: string
    reservations: number
  }>
  peakHours: Array<{
    hour: string
    reservations: number
  }>
}

export async function getSystemReports(): Promise<SystemReport> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    overview: {
      totalReservations: mockReservations.length,
      activeUsers: mockUsers.filter((u) => u.status === "active").length,
      availableRooms: mockRooms.filter((r) => r.status === "available").length,
      totalRooms: mockRooms.length,
      averageUsage: 75,
    },
    monthlyUsage: [
      { month: "Jul", reservations: 45 },
      { month: "Aug", reservations: 52 },
      { month: "Sep", reservations: 48 },
      { month: "Oct", reservations: 61 },
      { month: "Nov", reservations: 55 },
      { month: "Dec", reservations: 67 },
    ],
    roomTypeDistribution: [
      { name: "Lab Komputer", value: 35 },
      { name: "Ruang Kelas", value: 40 },
      { name: "Ruang Seminar", value: 15 },
      { name: "Aula", value: 10 },
    ],
    popularRooms: mockRooms
      .map((room) => ({
        id: room.id,
        name: room.name,
        location: room.location,
        reservations: Math.floor(Math.random() * 50) + 10,
      }))
      .sort((a, b) => b.reservations - a.reservations)
      .slice(0, 10),
    peakHours: [
      { hour: "08:00", reservations: 12 },
      { hour: "09:00", reservations: 18 },
      { hour: "10:00", reservations: 25 },
      { hour: "11:00", reservations: 22 },
      { hour: "12:00", reservations: 8 },
      { hour: "13:00", reservations: 15 },
      { hour: "14:00", reservations: 28 },
      { hour: "15:00", reservations: 24 },
      { hour: "16:00", reservations: 19 },
      { hour: "17:00", reservations: 10 },
    ],
  }
}
