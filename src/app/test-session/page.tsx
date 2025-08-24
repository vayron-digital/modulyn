'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestSession() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Test page - session:', session)
      setSession(session)
      setLoading(false)
    }
    checkSession()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-8">
      <h1>Session Test</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button 
        onClick={() => window.location.href = '/dashboard'}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try Dashboard
      </button>
    </div>
  )
}
