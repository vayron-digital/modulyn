"use client"

import { Building2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

// Sample data - replace with real data
const properties = [
  {
    id: 1,
    name: "Luxury Downtown Condo",
    views: 1245,
    inquiries: 45,
    conversion: 3.6,
    trend: 12
  },
  {
    id: 2,
    name: "Modern Suburban House",
    views: 980,
    inquiries: 38,
    conversion: 3.9,
    trend: 8
  },
  {
    id: 3,
    name: "Waterfront Villa",
    views: 1560,
    inquiries: 62,
    conversion: 4.0,
    trend: 15
  },
  {
    id: 4,
    name: "City Center Apartment",
    views: 890,
    inquiries: 32,
    conversion: 3.6,
    trend: -5
  },
  {
    id: 5,
    name: "Garden Townhouse",
    views: 760,
    inquiries: 28,
    conversion: 3.7,
    trend: 6
  }
]

export function PropertyPerformance() {
  const maxViews = Math.max(...properties.map(p => p.views))
  
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-black_olive">Property</TableHead>
            <TableHead className="text-black_olive text-right">Views</TableHead>
            <TableHead className="text-black_olive text-right">Inquiries</TableHead>
            <TableHead className="text-black_olive text-right">Conversion</TableHead>
            <TableHead className="text-black_olive text-right">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id} className="hover:bg-timberwolf/10">
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-md bg-flame/10">
                    <Building2 className="h-4 w-4 text-flame" />
                  </div>
                  <span className="font-medium text-black_olive">
                    {property.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="space-y-1">
                  <span className="text-black_olive">{property.views}</span>
                  <Progress 
                    value={(property.views / maxViews) * 100} 
                    className="h-1 w-24 ml-auto bg-timberwolf"
                    indicatorClassName="bg-flame"
                  />
                </div>
              </TableCell>
              <TableCell className="text-right text-black_olive">
                {property.inquiries}
              </TableCell>
              <TableCell className="text-right text-black_olive">
                {property.conversion}%
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={
                    property.trend >= 0
                      ? "text-green-600"
                      : "text-flame"
                  }
                >
                  {property.trend >= 0 ? "+" : ""}
                  {property.trend}%
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
