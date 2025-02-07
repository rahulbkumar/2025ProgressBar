import "./globals.css"
import type { Metadata } from "next"
import { Orbitron, Share_Tech_Mono } from "next/font/google"
import type React from "react"

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })
const shareTechMono = Share_Tech_Mono({ weight: "400", subsets: ["latin"], variable: "--font-share-tech-mono" })

export const metadata: Metadata = {
  title: "2025 Progress Bar",
  description: "Track the progress of the year 2025 with a futuristic animated progress bar",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${shareTechMono.variable} font-sans`}>{children}</body>
    </html>
  )
}

