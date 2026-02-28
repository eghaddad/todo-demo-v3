import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TODO Demo V3',
  description: 'Simple task management demo app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">{children}</body>
    </html>
  )
}
