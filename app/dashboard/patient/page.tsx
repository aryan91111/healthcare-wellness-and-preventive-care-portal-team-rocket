"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PatientNav from "@/components/patient-nav"

interface Goal {
  id: string
  title: string
  description: string
  category: string
  progress: number
  createdAt: string
}

interface Reminder {
  id: string
  title: string
  description: string
  dueDate: string
  completed: boolean
}

export default function PatientDashboard() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [goals, setGoals] = useState<Goal[]>([])
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [todayTip, setTodayTip] = useState("")

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null")
    if (!user || user.userType !== "patient") {
      router.push("/login")
      return
    }
    setCurrentUser(user)

    // Load goals
    const storedGoals = JSON.parse(localStorage.getItem(`goals-${user.id}`) || "[]")
    setGoals(storedGoals)

    // Load reminders
    const storedReminders = JSON.parse(localStorage.getItem(`reminders-${user.id}`) || "[]")
    setReminders(storedReminders)

    // Set random health tip
    const tips = [
      "Drink at least 8 glasses of water daily for optimal hydration.",
      "Aim for 150 minutes of moderate exercise per week.",
      "Get 7-9 hours of quality sleep each night.",
      "Eat a variety of colorful fruits and vegetables daily.",
      "Practice stress management techniques like meditation or deep breathing.",
      "Regular health check-ups can catch issues early.",
      "Limit sugar intake to maintain healthy weight and energy levels.",
      "Stay connected with friends and family for mental wellbeing.",
    ]
    setTodayTip(tips[Math.floor(Math.random() * tips.length)])
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  const markReminderComplete = (reminderId: string) => {
    const updated = reminders.map((r) => (r.id === reminderId ? { ...r, completed: !r.completed } : r))
    setReminders(updated)
    if (currentUser) {
      localStorage.setItem(`reminders-${currentUser.id}`, JSON.stringify(updated))
    }
  }

  if (!currentUser) return <div>Loading...</div>

  const completedGoals = goals.filter((g) => g.progress === 100).length
  const completedReminders = reminders.filter((r) => r.completed).length

  return (
    <main className="min-h-screen bg-neutral-light">
      <PatientNav user={currentUser} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg p-8 border border-border">
          <h1 className="text-4xl font-bold text-neutral-dark">Welcome, {currentUser.fullName}!</h1>
          <p className="text-gray-600 mt-2">Stay on top of your wellness journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4">
            <div className="text-3xl font-bold text-primary">{goals.length}</div>
            <div className="text-gray-600">Active Wellness Goals</div>
            <Link href="/dashboard/patient/goals">
              <Button variant="outline" size="sm">
                View Goals
              </Button>
            </Link>
          </Card>
          <Card className="p-6 space-y-4">
            <div className="text-3xl font-bold text-success">
              {completedReminders} / {reminders.length}
            </div>
            <div className="text-gray-600">Reminders Completed Today</div>
            <Link href="/dashboard/patient/reminders">
              <Button variant="outline" size="sm">
                View Reminders
              </Button>
            </Link>
          </Card>
          <Card className="p-6 space-y-4">
            <div className="text-3xl font-bold text-warning">{completedGoals}</div>
            <div className="text-gray-600">Completed Goals</div>
          </Card>
        </div>

        {/* Health Tip */}
        <Card className="p-6 bg-gradient-to-r from-sky-50 to-blue-50 border-primary">
          <div className="flex gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="font-semibold text-neutral-dark mb-1">Health Tip of the Day</h3>
              <p className="text-gray-600">{todayTip}</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Goals</h3>
            {goals.length === 0 ? (
              <p className="text-gray-600">No goals yet. Create your first goal to get started!</p>
            ) : (
              <div className="space-y-3">
                {goals.slice(0, 3).map((goal) => (
                  <div key={goal.id} className="p-3 bg-neutral-light rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium">{goal.title}</p>
                      <span className="text-xs bg-primary text-white px-2 py-1 rounded">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: `${goal.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <Link href="/dashboard/patient/goals" className="mt-4 block">
              <Button variant="outline" className="w-full bg-transparent">
                Create New Goal
              </Button>
            </Link>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Reminders</h3>
            {reminders.length === 0 ? (
              <p className="text-gray-600">No reminders set. Create one to stay on track!</p>
            ) : (
              <div className="space-y-3">
                {reminders.slice(0, 3).map((reminder) => (
                  <div key={reminder.id} className="p-3 bg-neutral-light rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium">{reminder.title}</p>
                      <p className="text-xs text-gray-600">{new Date(reminder.dueDate).toLocaleDateString()}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={reminder.completed}
                      onChange={() => markReminderComplete(reminder.id)}
                      className="w-5 h-5 text-primary"
                    />
                  </div>
                ))}
              </div>
            )}
            <Link href="/dashboard/patient/reminders" className="mt-4 block">
              <Button variant="outline" className="w-full bg-transparent">
                Add Reminder
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </main>
  )
}
