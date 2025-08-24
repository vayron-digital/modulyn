"use client"

import Link, { LinkProps } from "next/link"
import { useNavigation } from "@/hooks/use-navigation"
import React from "react"

interface NavLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
  prefetch?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function NavLink({ 
  href, 
  children, 
  className, 
  prefetch = true,
  onClick,
  ...props 
}: NavLinkProps) {
  const { handleNavigation } = useNavigation()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Always trigger loading animation
    handleNavigation()
    
    // Call custom onClick if provided
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <Link 
      href={href} 
      onClick={handleClick} 
      className={className} 
      prefetch={prefetch}
      {...props}
    >
      {children}
    </Link>
  )
}
