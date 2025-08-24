import { useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLoadingStore } from "@/store/use-loading-store"
import { usePathname } from "next/navigation"

export function useNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const { setIsLoading } = useLoadingStore()

  // Auto-hide loading after route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // Hide loading after 1 second

    return () => clearTimeout(timer)
  }, [pathname, setIsLoading])

  const navigate = useCallback((href: string) => {
    setIsLoading(true)
    router.push(href)
  }, [router, setIsLoading])

  const handleNavigation = useCallback(() => {
    setIsLoading(true)
  }, [setIsLoading])

  const navigateWithDelay = useCallback((href: string, delay: number = 100) => {
    setIsLoading(true)
    setTimeout(() => {
      router.push(href)
    }, delay)
  }, [router, setIsLoading])

  return { 
    navigate, 
    handleNavigation, 
    navigateWithDelay,
    router 
  }
}
