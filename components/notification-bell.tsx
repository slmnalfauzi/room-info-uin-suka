"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getUnreadNotifications } from "@/lib/notifications"
import NotificationCenter from "./notification-center"

interface NotificationBellProps {
  userId: string
}

export default function NotificationBell({ userId }: NotificationBellProps) {
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const updateUnreadCount = () => {
      const unreadNotifications = getUnreadNotifications(userId)
      setUnreadCount(unreadNotifications.length)
    }

    updateUnreadCount()
    // In a real app, you'd set up real-time updates here
    const interval = setInterval(updateUnreadCount, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [userId])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </button>

      <NotificationCenter userId={userId} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
