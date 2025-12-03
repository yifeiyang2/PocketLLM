'use client'

import { useAuth } from '@/hooks/useAuth'
import ChatInterface from '@/components/ChatInterface'

/**
 * ChatPage Component
 *
 * Architecture Reference: HW3 Class Diagram - ChatPage extends PageComponent
 * - Page-level component for chat functionality
 * - Protected route (requires authentication via middleware)
 * - Renders ChatInterface component
 *
 * Note: Authentication is handled by Next.js middleware (middleware.ts)
 * No need for client-side auth checks as middleware protects the route
 *
 * Attributes:
 * - chatService: ChatService
 *
 * Methods:
 * - handleSubmit(message): Promise<void>
 */

export default function ChatPage() {
  const { isLoading } = useAuth()

  // Show loading state while AuthContext initializes
  // Middleware ensures only authenticated users can access this page
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-4rem)]">
      <ChatInterface />
    </div>
  )
}
