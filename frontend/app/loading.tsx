/**
 * Root Loading State
 *
 * Architecture Reference: HW3 Section 4.1
 * - Route-level loading UI
 * - Aurora Blue theme
 */

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9FAFB' }}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ backgroundColor: '#EAF3FF' }}>
          <div
            className="w-8 h-8 rounded-full animate-spin"
            style={{
              border: '3px solid #D4E8FF',
              borderTopColor: '#4A90E2'
            }}
          />
        </div>
        <p className="text-sm" style={{ color: '#64748B' }}>Loading...</p>
      </div>
    </div>
  )
}
