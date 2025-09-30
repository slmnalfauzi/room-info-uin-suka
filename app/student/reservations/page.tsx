"use client"

import { useEffect } from "react"

export default function StudentReservationsPage() {
  useEffect(() => {
    // Redirect to status page since they serve the same purpose
    window.location.href = "/student/status"
  }, [])

  return null
}
