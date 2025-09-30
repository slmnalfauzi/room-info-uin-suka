import { type NextRequest, NextResponse } from "next/server"
import { createReservation, getAllReservations } from "@/lib/reservations"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { roomId, date, startTime, endTime, purpose, attendees } = body

    // Validate required fields
    if (!roomId || !date || !startTime || !endTime || !purpose) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Create reservation
    const reservation = await createReservation({
      roomId,
      date,
      startTime,
      endTime,
      purpose,
      attendees: attendees || 1,
      userId: "current-user-id", // In real app, get from auth
      userName: "Current User", // In real app, get from auth
    })

    return NextResponse.json({
      success: true,
      data: reservation,
      message: "Reservasi berhasil dibuat dan menunggu persetujuan",
    })
  } catch (error) {
    console.error("Error creating reservation:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create reservation",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const reservations = getAllReservations()
    return NextResponse.json({
      success: true,
      data: reservations,
    })
  } catch (error) {
    console.error("Error fetching reservations:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch reservations",
      },
      { status: 500 },
    )
  }
}
