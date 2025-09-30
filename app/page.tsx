import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Calendar, Users, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">RoomInfo</h1>
              <p className="text-sm text-muted-foreground">Sistem Informasi Ruangan</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left side - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-card p-8 flex-col justify-center">
          <div className="max-w-md mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4 text-balance">
                Kelola Ruangan Kampus dengan Mudah
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sistem informasi ruangan terintegrasi untuk mahasiswa, dosen, dan admin dengan fitur reservasi online
                dan persetujuan berjenjang.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Reservasi Online</h3>
                  <p className="text-sm text-muted-foreground">
                    Ajukan peminjaman ruangan dengan sistem persetujuan otomatis
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Multi-Role Access</h3>
                  <p className="text-sm text-muted-foreground">
                    Dashboard khusus untuk mahasiswa, dosen, dan administrator
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Keamanan Terjamin</h3>
                  <p className="text-sm text-muted-foreground">
                    Sistem autentikasi yang aman dengan kontrol akses berbasis peran
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth Forms */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Masuk</TabsTrigger>
                <TabsTrigger value="register">Daftar</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle>Masuk ke Akun</CardTitle>
                    <CardDescription>Masukkan email dan password untuk mengakses sistem</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LoginForm />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="register">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle>Buat Akun Baru</CardTitle>
                    <CardDescription>Daftarkan diri Anda untuk menggunakan sistem</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RegisterForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
