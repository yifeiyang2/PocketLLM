'use client'

/**
 * History Page Error Boundary
 *
 * Architecture Reference: HW3 Section 4.1
 * - History route error handling
 * - Aurora Blue theme
 */

import { useEffect } from 'react'
import Link from 'next/link'

export default function HistoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('History page error:', error)
  }, [error])

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#FEF2F2' }}>
            <svg
              className="w-8 h-8"
              style={{ color: '#DC2626' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2" style={{ color: '#1E293B' }}>
            Failed to load history
          </h2>
          <p className="mb-6" style={{ color: '#64748B' }}>
            {error.message || 'Unable to retrieve chat history'}
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={reset}
              className="px-6 py-2.5 text-white rounded-md font-medium transition-colors"
              style={{ backgroundColor: '#4A90E2' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3276C7'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4A90E2'}
            >
              Try again
            </button>
            <Link
              href="/"
              className="px-6 py-2.5 rounded-md font-medium transition-colors"
              style={{ color: '#475569', border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F2F4F7'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
            >
              Back to Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
