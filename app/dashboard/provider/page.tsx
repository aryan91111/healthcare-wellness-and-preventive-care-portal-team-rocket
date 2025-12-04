"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ProviderNav from "@/components/provider-nav"

export default function ProviderDashboard() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [patients, setPatients] = useState<any[]>([])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "null")
    if (!user || user.userType !== "provider") {
      router.push("/login")
      return
    }
    setCurrentUser(user)

    // Get all registered patients
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const patientList = users.filter((u: any) => u.userType === "patient")
    setPatients(patientList)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  if (!currentUser) return <div>Loading...</div>

  return (
    <main className="min-h-screen bg-neutral-light">
      <ProviderNav user={currentUser} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-neutral-dark">Provider Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor your patients' wellness progress</p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="text-3xl font-bold text-primary">{patients.length}</div>
            <div className="text-gray-600 mt-2">Total Patients</div>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-success">{Math.floor(patients.length * 0.8)}</div>
            <div className="text-gray-600 mt-2">Active Today</div>
          </Card>
          <Card className="p-6">
            <div className="text-3xl font-bold text-warning">85%</div>
            <div className="text-gray-600 mt-2">Avg. Compliance Rate</div>
          </Card>
        </div>

        {/* Patients List */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold text-neutral-dark mb-6">Your Patients</h2>
          {patients.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No patients registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-2 border-border">
                  <tr>
                    <th className="text-left py-3 font-semibold text-neutral-dark">Name</th>
                    <th className="text-left py-3 font-semibold text-neutral-dark">Email</th>
                    <th className="text-left py-3 font-semibold text-neutral-dark">DOB</th>
                    <th className="text-left py-3 font-semibold text-neutral-dark">Medical History</th>
                    <th className="text-left py-3 font-semibold text-neutral-dark">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient: any) => (
                    <tr key={patient.id} className="border-b border-border hover:bg-neutral-light">
                      <td className="py-4 font-medium">{patient.fullName}</td>
                      <td className="py-4">{patient.email}</td>
                      <td className="py-4">{patient.dateOfBirth || "N/A"}</td>
                      <td className="py-4 text-sm text-gray-600">{patient.medicalHistory || "N/A"}</td>
                      <td className="py-4">
                        <Link href={`/dashboard/provider/patient/${patient.id}`}>
                          <Button size="sm">View Details</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </main>
  )
}
