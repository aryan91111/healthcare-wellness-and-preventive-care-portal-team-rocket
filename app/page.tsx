import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-primary">HealthCare Portal</div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-5xl font-bold text-neutral-dark">Your Health, Our Priority</h1>
          <p className="text-xl text-gray-600">
            Manage your wellness goals, track preventive care reminders, and stay connected with your healthcare
            providers.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/health-tips">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-border rounded-lg">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Wellness Goals</h3>
              <p className="text-gray-600">Set and track your personal health goals with daily progress monitoring.</p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <div className="text-3xl mb-4">🔔</div>
              <h3 className="text-lg font-semibold mb-2">Smart Reminders</h3>
              <p className="text-gray-600">Get timely preventive care reminders tailored to your health needs.</p>
            </div>
            <div className="p-6 border border-border rounded-lg">
              <div className="text-3xl mb-4">👨‍⚕️</div>
              <h3 className="text-lg font-semibold mb-2">Provider Connection</h3>
              <p className="text-gray-600">
                Share your progress with healthcare providers for better care coordination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold">Start Your Wellness Journey Today</h2>
          <p className="text-lg opacity-90">Join thousands taking control of their health</p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-dark text-white py-8 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>© 2025 Healthcare Wellness Portal. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="/health-tips" className="hover:text-primary">
              Health Tips
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
