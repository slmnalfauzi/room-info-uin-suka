export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  category: "reservation" | "system" | "reminder"
  isRead: boolean
  createdAt: string
  actionUrl?: string
}

// Mock notifications data
const notifications: Notification[] = [
  {
    id: "1",
    userId: "student1",
    title: "Reservasi Disetujui",
    message: "Reservasi Anda untuk Ruang Kuliah A101 pada 15 Jan 2024 telah disetujui",
    type: "success",
    category: "reservation",
    isRead: false,
    createdAt: "2024-01-10T08:00:00Z",
    actionUrl: "/student/reservations",
  },
  {
    id: "2",
    userId: "student1",
    title: "Pengingat Jadwal",
    message: "Anda memiliki reservasi ruangan dalam 1 jam (Ruang Kuliah A101)",
    type: "info",
    category: "reminder",
    isRead: false,
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "3",
    userId: "student1",
    title: "Reservasi Ditolak",
    message: "Reservasi untuk Lab Komputer B201 ditolak: Ruangan sudah dibooking",
    type: "error",
    category: "reservation",
    isRead: true,
    createdAt: "2024-01-09T14:00:00Z",
    actionUrl: "/student/reservations",
  },
  {
    id: "4",
    userId: "lecturer1",
    title: "Permintaan Reservasi Baru",
    message: "Ada 3 permintaan reservasi baru yang menunggu persetujuan Anda",
    type: "warning",
    category: "reservation",
    isRead: false,
    createdAt: "2024-01-10T10:30:00Z",
    actionUrl: "/lecturer/approvals",
  },
  {
    id: "5",
    userId: "admin1",
    title: "Laporan Sistem",
    message: "Laporan penggunaan ruangan bulan ini telah tersedia",
    type: "info",
    category: "system",
    isRead: false,
    createdAt: "2024-01-10T09:00:00Z",
    actionUrl: "/admin/reports",
  },
]

export function getNotificationsByUserId(userId: string): Notification[] {
  return notifications.filter((notification) => notification.userId === userId)
}

export function getUnreadNotifications(userId: string): Notification[] {
  return notifications.filter((notification) => notification.userId === userId && !notification.isRead)
}

export function markNotificationAsRead(notificationId: string): boolean {
  const notification = notifications.find((n) => n.id === notificationId)
  if (notification) {
    notification.isRead = true
    return true
  }
  return false
}

export function markAllNotificationsAsRead(userId: string): boolean {
  const userNotifications = notifications.filter((n) => n.userId === userId)
  userNotifications.forEach((notification) => {
    notification.isRead = true
  })
  return true
}

export function createNotification(data: Omit<Notification, "id" | "createdAt">): Notification {
  const newNotification: Notification = {
    id: (notifications.length + 1).toString(),
    createdAt: new Date().toISOString(),
    ...data,
  }
  notifications.push(newNotification)
  return newNotification
}

export function getNotificationStats(userId: string) {
  const userNotifications = getNotificationsByUserId(userId)
  const unread = userNotifications.filter((n) => !n.isRead).length
  const total = userNotifications.length

  return {
    total,
    unread,
    byCategory: {
      reservation: userNotifications.filter((n) => n.category === "reservation").length,
      system: userNotifications.filter((n) => n.category === "system").length,
      reminder: userNotifications.filter((n) => n.category === "reminder").length,
    },
  }
}
