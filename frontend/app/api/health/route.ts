/**
 * Health Check API Route
 *
 * Provides a simple health check endpoint for Docker health checks
 * and monitoring systems.
 */
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'pocketllm-frontend',
    },
    { status: 200 }
  )
}
