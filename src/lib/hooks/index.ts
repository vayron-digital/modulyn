import { useEffect, useState } from 'react'
import { useAuthStore } from '@/lib/store'

export function useRequireAuth() {
  const user = useAuthStore((state) => state.user)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      window.location.href = '/login'
    }
    setIsLoading(false)
  }, [user])

  return { isLoading, user }
}

export function useRequireAdmin() {
  const user = useAuthStore((state) => state.user)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      window.location.href = '/dashboard'
    }
    setIsLoading(false)
  }, [user])

  return { isLoading, user }
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}
