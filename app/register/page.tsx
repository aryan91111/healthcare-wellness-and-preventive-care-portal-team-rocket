"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    dateOfBirth: "",
    medicalHistory: "",
    userType: "patient" as "patient" | "provider",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Basic validation
    if (!formData.email || !formData.password || !formData.fullName) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      // Store user data in localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]")

      if (users.some((u: any) => u.email === formData.email)) {
        setError("User already exists")
        setLoading(false)
        return
      }

      const newUser = {
        id: Date.now().toString(),
        email: formData.email,
        password: formData.password, // In production, this would be hashed
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        medicalHistory: formData.medicalHistory,
        userType: formData.userType,
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ id: newUser.id, email: newUser.email, userType: newUser.userType }),
      )

      router.push(formData.userType === "patient" ? "/dashboard/patient" : "/dashboard/provider")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-sky-50 to-white">
      <Card className="w-full max-w-md">
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-neutral-dark">Create Account</h1>
            <p className="text-gray-600 mt-2">Join our healthcare community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Account Type</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg"
              >
                <option value="patient">Patient</option>
                <option value="provider">Healthcare Provider</option>
              </select>
            </div>

            {formData.userType === "patient" && (
              <div>
                <label className="block text-sm font-medium mb-2">Medical History (Optional)</label>
                <textarea
                  name="medicalHistory"
                  placeholder="Any relevant medical history..."
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-lg"
                  rows={3}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="p-3 bg-danger bg-opacity-10 text-danger rounded-lg text-sm">{error}</div>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold">
              Sign in
            </Link>
          </div>
        </div>
      </Card>
    </main>
  )
}
