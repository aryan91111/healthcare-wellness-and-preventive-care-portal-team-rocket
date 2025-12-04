"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-neutral-dark">Terms of Service</h1>
          <p className="text-gray-600">Last updated: December 2025</p>
        </div>

        <div className="bg-white p-8 rounded-lg border border-border space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-neutral-dark mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-600">
              By using the Healthcare Wellness Portal, you agree to these terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-dark mb-3">2. User Accounts</h2>
            <p className="text-gray-600">
              You are responsible for maintaining the confidentiality of your account credentials and all activities
              under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-dark mb-3">3. Medical Disclaimer</h2>
            <p className="text-gray-600">
              This platform is for informational purposes only and does not replace professional medical advice. Always
              consult with a healthcare provider for medical concerns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-dark mb-3">4. User Responsibilities</h2>
            <p className="text-gray-600">You agree to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>Provide accurate information</li>
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to gain unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-dark mb-3">5. Limitation of Liability</h2>
            <p className="text-gray-600">
              We are not liable for any indirect or consequential damages related to your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-neutral-dark mb-3">6. Contact</h2>
            <p className="text-gray-600">For questions about these terms, contact us at legal@healthcareportal.com</p>
          </section>
        </div>
      </div>
    </main>
  )
}
