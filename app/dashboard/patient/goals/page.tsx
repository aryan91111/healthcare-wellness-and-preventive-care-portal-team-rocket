"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

export default function GoalsPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [goals, setGoals] = useState<Goal[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "fitness",
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null")
    if (!user || user.userType !== "patient") {
      router.push("/login")
      return
    }
    setCurrentUser(user)

    const storedGoals = JSON.parse(localStorage.getItem(`goals-${user.id}`) || "[]")
    setGoals(storedGoals)
  }, [router])

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) return

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      progress: 0,
      createdAt: new Date().toISOString(),
    }

    const updated = [...goals, newGoal]
    setGoals(updated)
    if (currentUser) {
      localStorage.setItem(`goals-${currentUser.id}`, JSON.stringify(updated))
    }

    setFormData({ title: "", description: "", category: "fitness" })
    setShowForm(false)
  }

  const handleUpdateProgress = (goalId: string, newProgress: number) => {
    const updated = goals.map((g) => (g.id === goalId ? { ...g, progress: newProgress } : g))
    setGoals(updated)
    if (currentUser) {
      localStorage.setItem(`goals-${currentUser.id}`, JSON.stringify(updated))
    }
  }

  const handleDeleteGoal = (goalId: string) => {
    const updated = goals.filter((g) => g.id !== goalId)
    setGoals(updated)
    if (currentUser) {
      localStorage.setItem(`goals-${currentUser.id}`, JSON.stringify(updated))
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
          <h1 className="text-3xl font-bold text-neutral-dark">Wellness Goals</h1>
          <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Add Goal"}</Button>
        </div>

        {showForm && (
          <Card className="p-6">
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Goal Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Exercise 30 minutes daily"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Why is this goal important to you?"
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                >
                  <option value="fitness">Fitness</option>
                  <option value="nutrition">Nutrition</option>
                  <option value="mental">Mental Health</option>
                  <option value="sleep">Sleep</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <Button type="submit">Create Goal</Button>
            </form>
          </Card>
        )}

        {goals.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600 text-lg">No goals yet. Create your first wellness goal to get started!</p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {goals.map((goal) => (
              <Card key={goal.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-dark">{goal.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-primary bg-opacity-10 text-primary text-xs rounded-full">
                        {goal.category}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="text-danger"
                    >
                      Delete
                    </Button>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-semibold text-primary">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full transition-all"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={goal.progress}
                    onChange={(e) => handleUpdateProgress(goal.id, Number.parseInt(e.target.value))}
                    className="w-full cursor-pointer"
                  />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
