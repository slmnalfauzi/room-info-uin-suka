// Mock authentication system for demonstration
export interface User {
  id: string
  name: string
  email: string
  role: "mahasiswa" | "dosen" | "admin"
  studentId?: string
  avatar?: string
}

// Mock user data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Ahmad Rizki",
    email: "ahmad.rizki@student.univ.ac.id",
    role: "mahasiswa",
    studentId: "2021001001",
    avatar: "/diverse-students-studying.png",
  },
  {
    id: "2",
    name: "Dr. Siti Nurhaliza",
    email: "siti.nurhaliza@univ.ac.id",
    role: "dosen",
    avatar: "/lecturer.jpg",
  },
  {
    id: "3",
    name: "Budi Santoso",
    email: "budi.santoso@admin.univ.ac.id",
    role: "admin",
    avatar: "/admin-interface.png",
  },
]

export async function authenticate(email: string, password: string, role: string): Promise<User | null> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((u) => u.email === email && u.role === role)
  return user || null
}

export function getCurrentUser(): User | null {
  // In a real app, this would check session/token
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("currentUser")
    return userData ? JSON.parse(userData) : null
  }
  return null
}

export function setCurrentUser(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("currentUser", JSON.stringify(user))
  }
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}
