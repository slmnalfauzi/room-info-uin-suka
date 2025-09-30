"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogIn, Mail, Lock, User } from "lucide-react"
import { authenticate, setCurrentUser } from "@/lib/auth"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const user = await authenticate(email, password, role)

      if (user) {
        setCurrentUser(user)
        // Redirect based on role
        if (role === "mahasiswa") {
          window.location.href = "/student/dashboard"
        } else if (role === "dosen") {
          window.location.href = "/lecturer/dashboard"
        } else if (role === "admin") {
          window.location.href = "/admin/dashboard"
        }
      } else {
        setError("Email, password, atau peran tidak valid")
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login")
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="nama@universitas.ac.id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Peran</Label>
        <Select value={role} onValueChange={setRole} required>
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Pilih peran Anda" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
            <SelectItem value="dosen">Dosen</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Memproses...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            Masuk
          </div>
        )}
      </Button>

      <div className="text-xs text-muted-foreground text-center">
        <p>Demo credentials:</p>
        <p>Mahasiswa: ahmad.rizki@student.univ.ac.id</p>
        <p>Dosen: siti.nurhaliza@univ.ac.id</p>
        <p>Admin: budi.santoso@admin.univ.ac.id</p>
        <p>Password: any</p>
      </div>
    </form>
  )
}
