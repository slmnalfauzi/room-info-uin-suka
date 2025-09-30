"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { UserCheck, UserX, Shield, GraduationCap, User } from "lucide-react"
import { getAllUsers, updateUserStatus, deleteUser, type SystemUser } from "@/lib/admin"

export default function UsersManagementPage() {
  const [users, setUsers] = useState<SystemUser[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setUsers(getAllUsers())
  }, [])

  const handleStatusChange = async (userId: string, newStatus: SystemUser["status"]) => {
    setIsLoading(true)

    try {
      const success = await updateUserStatus(userId, newStatus)
      if (success) {
        setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
        alert(`Status pengguna berhasil diubah menjadi ${newStatus}`)
      }
    } catch (error) {
      alert("Terjadi kesalahan saat mengubah status pengguna.")
    }

    setIsLoading(false)
  }

  const handleDeleteUser = async (userId: string) => {
    setIsLoading(true)

    try {
      const success = await deleteUser(userId)
      if (success) {
        setUsers((prev) => prev.filter((user) => user.id !== userId))
        alert("Pengguna berhasil dihapus!")
      }
    } catch (error) {
      alert("Terjadi kesalahan saat menghapus pengguna.")
    }

    setIsLoading(false)
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            <Shield className="w-3 h-3 mr-1" />
            Admin
          </Badge>
        )
      case "dosen":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <GraduationCap className="w-3 h-3 mr-1" />
            Dosen
          </Badge>
        )
      case "mahasiswa":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <User className="w-3 h-3 mr-1" />
            Mahasiswa
          </Badge>
        )
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <UserCheck className="w-3 h-3 mr-1" />
            Aktif
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <UserX className="w-3 h-3 mr-1" />
            Tidak Aktif
          </Badge>
        )
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <UserX className="w-3 h-3 mr-1" />
            Ditangguhkan
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Pengguna</h1>
        <p className="text-muted-foreground">Kelola pengguna sistem dan status akun mereka</p>
      </div>

      <div className="bg-card rounded-lg border p-6">
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getRoleBadge(user.role)}
                    {getStatusBadge(user.status)}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={user.status}
                  onChange={(e) => handleStatusChange(user.id, e.target.value as SystemUser["status"])}
                  disabled={isLoading}
                  className="px-3 py-1 border rounded-md text-sm bg-background"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                  <option value="suspended">Ditangguhkan</option>
                </select>
                <button
                  onClick={() => {
                    if (confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
                      handleDeleteUser(user.id)
                    }
                  }}
                  disabled={isLoading}
                  className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 disabled:opacity-50"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
