import { type NextRequest, NextResponse } from "next/server"
import { updateReservationStatus, getReservationById } from "@/lib/reservations"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { status, rejectionReason } = body
    const reservationId = params.id

    if (!status) {
      return NextResponse.json(
        {
          success: false,
          error: "Status is required",
        },
        { status: 400 },
      )
    }

    const updatedReservation = await updateReservationStatus(reservationId, status, rejectionReason)

    if (!updatedReservation) {
      return NextResponse.json(
        {
          success: false,
          error: "Reservation not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedReservation,
      message: `Reservasi berhasil ${status === "approved" ? "disetujui" : "ditolak"}`,
    })
  } catch (error) {
    console.error("Error updating reservation:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update reservation",
      },
      { status: 500 },
    )
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const reservation = getReservationById(params.id)

    if (!reservation) {
      return NextResponse.json(
        {
          success: false,
          error: "Reservation not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: reservation,
    })
  } catch (error) {
    console.error("Error fetching reservation:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch reservation",
      },
      { status: 500 },
    )
  }
}
