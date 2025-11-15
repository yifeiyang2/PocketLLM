/**
 * History Page Loading State
 *
 * Architecture Reference: HW3 Section 4.1
 * - History route loading UI
 * - Aurora Blue theme
 */

export default function HistoryLoading() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="h-8 w-48 rounded" style={{ backgroundColor: '#E2E8F0' }} />
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="p-4 rounded-lg animate-pulse"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0' }}
            >
              <div className="h-5 w-3/4 rounded mb-2" style={{ backgroundColor: '#E2E8F0' }} />
              <div className="h-4 w-1/2 rounded" style={{ backgroundColor: '#F1F5F9' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
