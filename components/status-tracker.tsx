"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react"

interface StatusStep {
  id: string
  title: string
  description: string
  status: "completed" | "current" | "pending" | "failed"
  timestamp?: string
}

interface StatusTrackerProps {
  title: string
  steps: StatusStep[]
  currentStatus: "pending" | "approved" | "rejected"
}

export default function StatusTracker({ title, steps, currentStatus }: StatusTrackerProps) {
  const getStatusIcon = (status: StatusStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "current":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusBadge = (status: typeof currentStatus) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Disetujui</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Ditolak</Badge>
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Menunggu</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {getStatusBadge(currentStatus)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                {getStatusIcon(step.status)}
                {index < steps.length - 1 && (
                  <div className={`w-px h-8 mt-2 ${step.status === "completed" ? "bg-green-500" : "bg-gray-200"}`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4
                  className={`font-medium ${
                    step.status === "completed"
                      ? "text-green-700"
                      : step.status === "current"
                        ? "text-blue-700"
                        : step.status === "failed"
                          ? "text-red-700"
                          : "text-gray-500"
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                {step.timestamp && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(step.timestamp).toLocaleString("id-ID")}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
