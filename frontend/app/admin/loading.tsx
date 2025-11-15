/**
 * Admin Page Loading State
 *
 * Architecture Reference: HW3 Section 4.1
 * - Admin route loading UI
 * - Aurora Blue theme
 */

export default function AdminLoading() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="h-8 w-64 rounded mb-2" style={{ backgroundColor: '#E2E8F0' }} />
          <div className="h-4 w-96 rounded" style={{ backgroundColor: '#F1F5F9' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-6 rounded-lg animate-pulse"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}
            >
              <div className="h-4 w-24 rounded mb-4" style={{ backgroundColor: '#E2E8F0' }} />
              <div className="h-8 w-16 rounded" style={{ backgroundColor: '#EAF3FF' }} />
            </div>
          ))}
        </div>

        <div
          className="p-6 rounded-lg animate-pulse"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}
        >
          <div className="h-6 w-48 rounded mb-4" style={{ backgroundColor: '#E2E8F0' }} />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 rounded" style={{ backgroundColor: '#F1F5F9' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
