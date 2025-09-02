"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export function DemographicMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-black text-white">Active</Badge>
          <Badge variant="secondary" className="bg-gray-200 text-gray-600">Inactive</Badge>
        </div>
      </div>
      <div className="relative w-full aspect-[4/3] bg-[#F8F8F8] rounded-lg overflow-hidden">
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full"
          style={{ filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))" }}
        >
          {/* World map paths would go here */}
          <path
            d="M 200,100 L 400,100 L 400,200 L 200,200 Z"
            className="fill-[#F85C3A] opacity-80 cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => setSelectedRegion("North America")}
          />
          <path
            d="M 450,150 L 550,150 L 550,250 L 450,250 Z"
            className="fill-[#F85C3A] opacity-80 cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => setSelectedRegion("Europe")}
          />
          <path
            d="M 600,200 L 700,200 L 700,300 L 600,300 Z"
            className="fill-[#F85C3A] opacity-80 cursor-pointer hover:opacity-100 transition-opacity"
            onClick={() => setSelectedRegion("Asia")}
          />
          {/* Add more regions as needed */}
        </svg>
        {selectedRegion && (
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border border-gray-100">
            <div className="text-sm font-medium text-gray-900">{selectedRegion}</div>
            <div className="text-xs text-gray-600">1,245 Active Users</div>
          </div>
        )}
      </div>
    </div>
  )
}
