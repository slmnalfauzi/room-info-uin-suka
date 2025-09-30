import { type NextRequest, NextResponse } from "next/server"
import { markNotificationAsRead } from "@/lib/notifications"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const notificationId = params.id

    const success = markNotificationAsRead(notificationId)

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: "Notification not found",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: "Notification marked as read",
    })
  } catch (error) {
    console.error("Error updating notification:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update notification",
      },
      { status: 500 },
    )
  }
}
