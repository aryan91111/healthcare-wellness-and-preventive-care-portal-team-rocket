"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import PatientNav from "@/components/patient-nav"

interface Reminder {
  id: string
  title: string
  description: string
  dueDate: string
  completed: boolean
}

export default function RemindersPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null")
    if (!user || user.userType !== "patient") {
      router.push("/login")
      return
    }
    setCurrentUser(user)

    const storedReminders = JSON.parse(localStorage.getItem(`reminders-${user.id}`) || "[]")
    setReminders(storedReminders)
  }, [router])

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.dueDate) return

    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      completed: false,
    }

    const updated = [...reminders, newReminder]
    setReminders(updated)
    if (currentUser) {
      localStorage.setItem(`reminders-${currentUser.id}`, JSON.stringify(updated))
    }

    setFormData({ title: "", description: "", dueDate: "" })
    setShowForm(false)
  }

  const handleToggleComplete = (reminderId: string) => {
    const updated = reminders.map((r) => (r.id === reminderId ? { ...r, completed: !r.completed } : r))
    setReminders(updated)
    if (currentUser) {
      localStorage.setItem(`reminders-${currentUser.id}`, JSON.stringify(updated))
    }
  }

  const handleDeleteReminder = (reminderId: string) => {
    const updated = reminders.filter((r) => r.id !== reminderId)
    setReminders(updated)
    if (currentUser) {
      localStorage.setItem(`reminders-${currentUser.id}`, JSON.stringify(updated))
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  if (!currentUser) return <div>Loading...</div>

  return (
    <main className="min-h-screen bg-neutral-light">
      <PatientNav user={currentUser} onLogout={handleLogout} />

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-neutral-dark">Preventive Care Reminders</h1>
          <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Add Reminder"}</Button>
        </div>

        {showForm && (
          <Card className="p-6">
            <form onSubmit={handleAddReminder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Reminder Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Doctor's Appointment"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Additional details about this reminder"
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Due Date</label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
                  required
                />
              </div>

              <Button type="submit">Create Reminder</Button>
            </form>
          </Card>
        )}

        {reminders.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600 text-lg">
              No reminders yet. Create one to stay on top of your preventive care!
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {reminders.map((reminder) => (
              <Card key={reminder.id} className={`p-6 ${reminder.completed ? "bg-neutral-light opacity-60" : ""}`}>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        checked={reminder.completed}
                        onChange={() => handleToggleComplete(reminder.id)}
                        className="w-5 h-5 text-primary cursor-pointer"
                      />
                      <h3
                        className={`text-lg font-semibold ${reminder.completed ? "line-through text-gray-600" : "text-neutral-dark"}`}
                      >
                        {reminder.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 ml-8 mb-2">{reminder.description}</p>
                    <p className="text-sm text-gray-500 ml-8">Due: {new Date(reminder.dueDate).toLocaleDateString()}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="text-danger"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
