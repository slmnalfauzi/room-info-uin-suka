// Mock room data and functions
export interface Room {
  id: string
  name: string
  capacity: number
  location: string
  facilities: string[]
  status: "available" | "occupied" | "maintenance"
  image?: string
  description?: string
}

export interface Reservation {
  id: string
  roomId: string
  roomName: string
  userId: string
  userName: string
  date: string
  startTime: string
  endTime: string
  purpose: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  approvedBy?: string
  rejectedReason?: string
}

// Mock room data
export const mockRooms: Room[] = [
  {
    id: "1",
    name: "Lab Komputer 1",
    capacity: 40,
    location: "Gedung Teknik Lantai 2",
    facilities: ["Komputer", "Proyektor", "AC", "Whiteboard"],
    status: "available",
    image: "/computer-lab.png",
    description: "Laboratorium komputer dengan 40 unit PC untuk praktikum pemrograman",
  },
  {
    id: "2",
    name: "Ruang Seminar A",
    capacity: 100,
    location: "Gedung Utama Lantai 3",
    facilities: ["Proyektor", "Sound System", "AC", "Podium"],
    status: "available",
    image: "/seminar-room.png",
    description: "Ruang seminar dengan kapasitas 100 orang untuk presentasi dan acara",
  },
  {
    id: "3",
    name: "Aula Utama",
    capacity: 500,
    location: "Gedung Utama Lantai 1",
    facilities: ["Sound System", "Lighting", "AC", "Stage"],
    status: "occupied",
    image: "/auditorium.jpg",
    description: "Aula besar untuk acara wisuda, seminar besar, dan kegiatan kampus",
  },
  {
    id: "4",
    name: "Lab Fisika",
    capacity: 30,
    location: "Gedung MIPA Lantai 1",
    facilities: ["Peralatan Lab", "Proyektor", "AC"],
    status: "maintenance",
    image: "/physics-lab.png",
    description: "Laboratorium fisika untuk praktikum dan penelitian",
  },
  {
    id: "5",
    name: "Ruang Kelas 301",
    capacity: 50,
    location: "Gedung Kuliah Lantai 3",
    facilities: ["Proyektor", "AC", "Whiteboard"],
    status: "available",
    image: "/diverse-classroom.png",
    description: "Ruang kelas standar untuk perkuliahan reguler",
  },
  {
    id: "6",
    name: "Ruang Meeting B",
    capacity: 20,
    location: "Gedung Rektorat Lantai 2",
    facilities: ["TV", "AC", "Meja Bundar"],
    status: "available",
    image: "/modern-meeting-room.png",
    description: "Ruang meeting kecil untuk diskusi dan rapat",
  },
]

// Mock reservations
export const mockReservations: Reservation[] = [
  {
    id: "1",
    roomId: "1",
    roomName: "Lab Komputer 1",
    userId: "1",
    userName: "Ahmad Rizki",
    date: "2024-01-15",
    startTime: "09:00",
    endTime: "11:00",
    purpose: "Praktikum Pemrograman Web",
    status: "approved",
    createdAt: "2024-01-10T10:00:00Z",
    approvedBy: "Dr. Siti Nurhaliza",
  },
  {
    id: "2",
    roomId: "2",
    roomName: "Ruang Seminar A",
    userId: "1",
    userName: "Ahmad Rizki",
    date: "2024-01-18",
    startTime: "13:00",
    endTime: "15:00",
    purpose: "Presentasi Tugas Akhir",
    status: "pending",
    createdAt: "2024-01-12T14:30:00Z",
  },
  {
    id: "3",
    roomId: "3",
    roomName: "Aula Utama",
    userId: "1",
    userName: "Ahmad Rizki",
    date: "2024-01-20",
    startTime: "08:00",
    endTime: "12:00",
    purpose: "Acara Organisasi Mahasiswa",
    status: "rejected",
    createdAt: "2024-01-11T16:00:00Z",
    rejectedReason: "Bentrok dengan acara resmi kampus",
  },
]

export function searchRooms(filters: {
  capacity?: number
  location?: string
  facilities?: string[]
  date?: string
  startTime?: string
  endTime?: string
}): Room[] {
  let filteredRooms = mockRooms.filter((room) => room.status !== "maintenance")

  if (filters.capacity) {
    filteredRooms = filteredRooms.filter((room) => room.capacity >= filters.capacity)
  }

  if (filters.location) {
    filteredRooms = filteredRooms.filter((room) =>
      room.location.toLowerCase().includes(filters.location!.toLowerCase()),
    )
  }

  if (filters.facilities && filters.facilities.length > 0) {
    filteredRooms = filteredRooms.filter((room) =>
      filters.facilities!.some((facility) =>
        room.facilities.some((roomFacility) => roomFacility.toLowerCase().includes(facility.toLowerCase())),
      ),
    )
  }

  return filteredRooms
}

export function getRoomById(id: string): Room | undefined {
  return mockRooms.find((room) => room.id === id)
}

export function getUserReservations(userId: string): Reservation[] {
  return mockReservations.filter((reservation) => reservation.userId === userId)
}

export async function createReservation(
  reservation: Omit<Reservation, "id" | "createdAt" | "status">,
): Promise<Reservation> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newReservation: Reservation = {
    ...reservation,
    id: Date.now().toString(),
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  mockReservations.push(newReservation)
  return newReservation
}

export function getAllRooms(): Room[] {
  return mockRooms
}
