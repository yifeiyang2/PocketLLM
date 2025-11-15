'use client'

/**
 * Root Error Boundary
 *
 * Architecture Reference: HW3 Section 4.1
 * - Route-level error handling
 * - Aurora Blue theme
 */

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="max-w-md w-full mx-auto px-4">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2" style={{ color: '#1E293B' }}>
            Something went wrong
          </h2>
          <p className="mb-6" style={{ color: '#64748B' }}>
            {error.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={reset}
            className="px-6 py-2.5 text-white rounded-md font-medium transition-colors"
            style={{ backgroundColor: '#4A90E2' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3276C7'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4A90E2'}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
