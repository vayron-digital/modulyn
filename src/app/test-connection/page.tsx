'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnectionPage() {
  const [testResults, setTestResults] = useState<string[]>([])
  const [isTesting, setIsTesting] = useState(false)

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`])
  }

  const testConnection = async () => {
    setIsTesting(true)
    setTestResults([])
    
    try {
      addResult('Starting connection tests...')
      
      // Test 1: Basic Supabase client
      addResult('Testing Supabase client initialization...')
      if (supabase) {
        addResult('✅ Supabase client initialized successfully')
      } else {
        addResult('❌ Supabase client failed to initialize')
        return
      }
      
      // Test 2: Environment variables
      addResult('Testing environment variables...')
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (url && key) {
        addResult(`✅ Environment variables found`)
        addResult(`   URL: ${url}`)
        addResult(`   Key: ${key.substring(0, 20)}...`)
      } else {
        addResult('❌ Environment variables missing')
        return
      }
      
      // Test 3: Network connectivity
      addResult('Testing network connectivity...')
      try {
        const response = await fetch(`${url}/auth/v1/health`)
        if (response.ok) {
          addResult('✅ Network connectivity successful')
        } else {
          addResult(`⚠️ Network response: ${response.status} ${response.statusText}`)
        }
      } catch (error: any) {
        addResult(`❌ Network error: ${error.message}`)
        if (error.message.includes('ERR_NAME_NOT_RESOLVED')) {
          addResult('   This suggests a DNS resolution issue')
        }
      }
      
      // Test 4: Supabase auth
      addResult('Testing Supabase auth...')
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          addResult(`⚠️ Auth test: ${error.message}`)
        } else {
          addResult('✅ Supabase auth working')
        }
      } catch (error: any) {
        addResult(`❌ Auth error: ${error.message}`)
      }
      
      // Test 5: Database connection
      addResult('Testing database connection...')
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1)
        
        if (error) {
          addResult(`⚠️ Database test: ${error.message}`)
        } else {
          addResult('✅ Database connection working')
        }
      } catch (error: any) {
        addResult(`❌ Database error: ${error.message}`)
      }
      
      addResult('Connection tests completed!')
      
    } catch (error: any) {
      addResult(`❌ Test failed: ${error.message}`)
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">
            Supabase Connection Test
          </h1>
          
          <div className="mb-6">
            <button
              onClick={testConnection}
              disabled={isTesting}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isTesting ? 'Testing...' : 'Run Connection Tests'}
            </button>
          </div>
          
          <div className="bg-slate-100 rounded-md p-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Test Results:</h2>
            {testResults.length === 0 ? (
              <p className="text-slate-600">Click the button above to run tests</p>
            ) : (
              <div className="space-y-1">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono">
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold text-blue-900 mb-2">Troubleshooting Tips:</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Check if your Supabase project is active and not suspended</li>
              <li>• Verify environment variables are correct</li>
              <li>• Try from a different network (mobile hotspot)</li>
              <li>• Check browser extensions that might block requests</li>
              <li>• Verify the project URL in your Supabase dashboard</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
