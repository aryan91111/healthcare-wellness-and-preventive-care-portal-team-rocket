import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Health Wellness App',
  description: 'Healthcare Wellness & Preventive Care Web Portal',
  icons: {
    icon: [
      {
        url: 'https://static.vecteezy.com/system/resources/thumbnails/027/374/615/small/digital-health-logo-png.png',
      }
    ],
    apple: 'https://static.vecteezy.com/system/resources/thumbnails/027/374/615/small/digital-health-logo-png.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
