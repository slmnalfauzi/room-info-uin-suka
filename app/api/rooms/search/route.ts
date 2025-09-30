import { type NextRequest, NextResponse } from "next/server"
import { getAllRooms } from "@/lib/rooms"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const capacity = searchParams.get("capacity")
    const location = searchParams.get("location")
    const facilities = searchParams.get("facilities")?.split(",") || []
    const date = searchParams.get("date")
    const startTime = searchParams.get("startTime")
    const endTime = searchParams.get("endTime")

    let rooms = getAllRooms()

    // Filter by capacity
    if (capacity) {
      rooms = rooms.filter((room) => room.capacity >= Number.parseInt(capacity))
    }

    // Filter by location
    if (location && location !== "all") {
      rooms = rooms.filter((room) => room.location.toLowerCase().includes(location.toLowerCase()))
    }

    // Filter by facilities
    if (facilities.length > 0) {
      rooms = rooms.filter((room) => facilities.every((facility) => room.facilities.includes(facility)))
    }

    // Filter by availability (mock implementation)
    if (date && startTime && endTime) {
      // In a real implementation, this would check against actual bookings
      rooms = rooms.filter((room) => {
        // Mock: randomly make some rooms unavailable
        return Math.random() > 0.3
      })
    }

    return NextResponse.json({
      success: true,
      data: rooms,
      total: rooms.length,
    })
  } catch (error) {
    console.error("Error searching rooms:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to search rooms",
      },
      { status: 500 },
    )
  }
}
