"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ProviderNav from "@/components/provider-nav"

export default function PatientDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const patientId = params.id as string
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [patient, setPatient] = useState<any>(null)
  const [goals, setGoals] = useState<any[]>([])
  const [reminders, setReminders] = useState<any[]>([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null")
    if (!user || user.userType !== "provider") {
      router.push("/login")
      return
    }
    setCurrentUser(user)

    // Get patient data
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const patientData = users.find((u: any) => u.id === patientId)
    if (patientData) {
      setPatient(patientData)

      // Get patient goals and reminders
      const storedGoals = JSON.parse(localStorage.getItem(`goals-${patientId}`) || "[]")
      const storedReminders = JSON.parse(localStorage.getItem(`reminders-${patientId}`) || "[]")
      setGoals(storedGoals)
      setReminders(storedReminders)
    }
  }, [patientId, router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  if (!currentUser || !patient) return <div>Loading...</div>

  const completedGoals = goals.filter((g) => g.progress === 100).length
  const completedReminders = reminders.filter((r) => r.completed).length

  return (
    <main className="min-h-screen bg-neutral-light">
      <ProviderNav user={currentUser} onLogout={handleLogout} />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Patient Header */}
        <Card className="p-6 border-2 border-primary">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-neutral-dark">{patient.fullName}</h1>
              <p className="text-gray-600 mt-1">{patient.email}</p>
              <p className="text-sm text-gray-500 mt-1">DOB: {patient.dateOfBirth || "N/A"}</p>
            </div>
            <Button onClick={() => router.back()}>Back</Button>
          </div>
        </Card>

        {/* Medical History */}
        {patient.medicalHistory && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-3 text-neutral-dark">Medical History</h2>
            <p className="text-gray-600">{patient.medicalHistory}</p>
          </Card>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-neutral-dark">Wellness Goals</h3>
            <div className="space-y-3">
              {goals.length === 0 ? (
                <p className="text-gray-600 text-sm">No goals set</p>
              ) : (
                <>
                  <div className="p-3 bg-neutral-light rounded">
                    <p className="text-sm text-gray-600">
                      Total Goals: <span className="font-semibold text-neutral-dark">{goals.length}</span>
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-light rounded">
                    <p className="text-sm text-gray-600">
                      Completed: <span className="font-semibold text-success">{completedGoals}</span>
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-light rounded">
                    <p className="text-sm text-gray-600">
                      Avg. Progress:{" "}
                      <span className="font-semibold text-primary">
                        {Math.round(goals.reduce((a: number, g: any) => a + g.progress, 0) / goals.length || 0)}%
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-neutral-dark">Preventive Care</h3>
            <div className="space-y-3">
              {reminders.length === 0 ? (
                <p className="text-gray-600 text-sm">No reminders set</p>
              ) : (
                <>
                  <div className="p-3 bg-neutral-light rounded">
                    <p className="text-sm text-gray-600">
                      Total Reminders: <span className="font-semibold text-neutral-dark">{reminders.length}</span>
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-light rounded">
                    <p className="text-sm text-gray-600">
                      Completed: <span className="font-semibold text-success">{completedReminders}</span>
                    </p>
                  </div>
                  <div className="p-3 bg-neutral-light rounded">
                    <p className="text-sm text-gray-600">
                      Compliance:{" "}
                      <span className="font-semibold text-warning">
                        {Math.round((completedReminders / reminders.length) * 100 || 0)}%
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Goals Details */}
        {goals.length > 0 && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-neutral-dark">Goal Breakdown</h2>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-neutral-dark">{goal.title}</h3>
                    <span className="text-xs bg-primary text-white px-2 py-1 rounded">{goal.progress}%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{goal.description}</p>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${goal.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Reminders Details */}
        {reminders.length > 0 && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-neutral-dark">Preventive Care Reminders</h2>
            <div className="space-y-3">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${reminder.completed ? "bg-success" : "bg-warning"}`} />
                        <h4 className="font-medium text-neutral-dark">{reminder.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Due: {new Date(reminder.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded ${reminder.completed ? "bg-success bg-opacity-10 text-success" : "bg-warning bg-opacity-10 text-warning"}`}
                    >
                      {reminder.completed ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}
