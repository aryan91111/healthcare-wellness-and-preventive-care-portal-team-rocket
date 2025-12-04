"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-light">
      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">
            HealthCare Portal
          </Link>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-neutral-dark">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: December 2025</p>
        </div>

        <div className="bg-white p-8 rounded-lg border border-border space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-neutral-dark mb-3">1. Information Collection</h2>
            <p className="text-gray-600 mb-3">We collect information you provide directly, including:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Name, email address, and date of birth</li>
              <li>Medical history and health information</li>
              <li>Wellness goals and preventive care reminders</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-dark mb-3">2. Data Protection</h2>
            <p className="text-gray-600">
              Your health data is protected with industry-standard security measures including encryption and secure
              authentication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-dark mb-3">3. Data Usage</h2>
            <p className="text-gray-600">We use your information to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Provide wellness tracking features</li>
              <li>Send reminders and health tips</li>
              <li>Enable provider-patient communication</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-dark mb-3">4. Your Rights</h2>
            <p className="text-gray-600">
              You have the right to access, update, or delete your personal information at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-dark mb-3">5. Contact Us</h2>
            <p className="text-gray-600">For privacy concerns, contact us at privacy@healthcareportal.com</p>
          </section>
        </div>
      </div>
    </main>
  )
}
