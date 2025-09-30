import { type NextRequest, NextResponse } from "next/server"
import { getNotificationsByUserId, markAllNotificationsAsRead } from "@/lib/notifications"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "User ID is required",
        },
        { status: 400 },
      )
    }

    const notifications = getNotificationsByUserId(userId)

    return NextResponse.json({
      success: true,
      data: notifications,
    })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch notifications",
      },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, action } = body

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "User ID is required",
        },
        { status: 400 },
      )
    }

    if (action === "mark_all_read") {
      const success = markAllNotificationsAsRead(userId)
      if (success) {
        return NextResponse.json({
          success: true,
          message: "All notifications marked as read",
        })
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "Invalid action",
      },
      { status: 400 },
    )
  } catch (error) {
    console.error("Error updating notifications:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update notifications",
      },
      { status: 500 },
    )
  }
}
