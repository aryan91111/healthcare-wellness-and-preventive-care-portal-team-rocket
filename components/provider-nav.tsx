"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ProviderNavProps {
  user: any
  onLogout: () => void
}

export default function ProviderNav({ user, onLogout }: ProviderNavProps) {
  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard/provider" className="text-xl font-bold text-primary">
          HealthCare Portal
        </Link>

        <div className="flex gap-6 items-center">
          <Link href="/dashboard/provider" className="text-sm font-medium hover:text-primary">
            Patients
          </Link>
          <Link href="/health-tips" className="text-sm font-medium hover:text-primary">
            Health Tips
          </Link>

          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-600">{user.fullName}</span>
            <Button onClick={onLogout} variant="outline" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
