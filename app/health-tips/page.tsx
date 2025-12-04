"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HealthTipsPage() {
  const tips = [
    {
      title: "Stay Hydrated",
      category: "Nutrition",
      description:
        "Drink at least 8 glasses of water daily. Proper hydration improves energy levels, supports kidney function, and aids in digestion.",
      tips: [
        "Start your day with a glass of water",
        "Keep a water bottle with you throughout the day",
        "Drink water before, during, and after exercise",
      ],
    },
    {
      title: "Regular Exercise",
      category: "Fitness",
      description:
        "Aim for 150 minutes of moderate-intensity aerobic exercise per week to maintain cardiovascular health.",
      tips: [
        "Choose activities you enjoy",
        "Start slowly and gradually increase intensity",
        "Exercise with a friend for motivation",
      ],
    },
    {
      title: "Quality Sleep",
      category: "Sleep",
      description: "Adults need 7-9 hours of sleep each night for optimal physical and mental health.",
      tips: [
        "Maintain a consistent sleep schedule",
        "Keep your bedroom cool and dark",
        "Avoid screens 1 hour before bed",
      ],
    },
    {
      title: "Balanced Nutrition",
      category: "Nutrition",
      description: "Eat a variety of colorful fruits, vegetables, whole grains, and lean proteins daily.",
      tips: [
        "Fill half your plate with vegetables",
        "Choose whole grains over refined carbs",
        "Limit sugary drinks and processed foods",
      ],
    },
    {
      title: "Stress Management",
      category: "Mental Health",
      description: "Practice meditation, deep breathing, or yoga to reduce stress and improve mental wellbeing.",
      tips: ["Try 10 minutes of meditation daily", "Practice deep breathing exercises", "Spend time in nature"],
    },
    {
      title: "Regular Check-ups",
      category: "Preventive Care",
      description: "Schedule annual health check-ups to catch potential health issues early.",
      tips: [
        "Schedule preventive health screenings",
        "Track your vital signs regularly",
        "Discuss family health history with your doctor",
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-neutral-light">
      {/* Navigation */}
      <nav className="bg-white border-b border-border sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">
            HealthCare Portal
          </Link>
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

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-neutral-dark">Health Tips & Wellness Guide</h1>
          <p className="text-lg text-gray-600">Evidence-based tips for living a healthier life</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-primary bg-opacity-10 text-primary text-xs rounded-full mb-2">
                    {tip.category}
                  </span>
                  <h2 className="text-xl font-semibold text-neutral-dark">{tip.title}</h2>
                </div>

                <p className="text-gray-600">{tip.description}</p>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-neutral-dark">Key Tips:</p>
                  <ul className="space-y-1">
                    {tip.tips.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-2">
                        <span className="text-primary">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="p-8 bg-gradient-to-r from-sky-50 to-blue-50 border-primary text-center">
          <h2 className="text-2xl font-bold text-neutral-dark mb-4">Ready to Start Your Wellness Journey?</h2>
          <p className="text-gray-600 mb-6">Join our community and start tracking your health goals today</p>
          <Link href="/register">
            <Button size="lg">Create Free Account</Button>
          </Link>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-dark text-white py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>© 2025 Healthcare Wellness Portal. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
