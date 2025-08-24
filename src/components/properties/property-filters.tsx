"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function PropertyFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter])
    }
  }

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            className="pl-8"
          />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="single-family">Single Family</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
            <SelectItem value="townhouse">Townhouse</SelectItem>
            <SelectItem value="multi-family">Multi Family</SelectItem>
            <SelectItem value="land">Land</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
            <SelectItem value="off-market">Off Market</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[180px]">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Price Range</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    ${priceRange[0].toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ${priceRange[1].toLocaleString()}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 1000000]}
                  max={1000000}
                  step={50000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Bedrooms</h4>
                <div className="flex gap-2">
                  {["Any", "1+", "2+", "3+", "4+", "5+"].map((beds) => (
                    <Button
                      key={beds}
                      variant="outline"
                      size="sm"
                      onClick={() => addFilter(`${beds} beds`)}
                    >
                      {beds}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Bathrooms</h4>
                <div className="flex gap-2">
                  {["Any", "1+", "2+", "3+", "4+"].map((baths) => (
                    <Button
                      key={baths}
                      variant="outline"
                      size="sm"
                      onClick={() => addFilter(`${baths} baths`)}
                    >
                      {baths}
                    </Button>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Pool",
                    "Garage",
                    "Garden",
                    "Waterfront",
                    "Fireplace",
                    "AC",
                  ].map((feature) => (
                    <Button
                      key={feature}
                      variant="outline"
                      size="sm"
                      onClick={() => addFilter(feature)}
                    >
                      {feature}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge
              key={filter}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => removeFilter(filter)}
            >
              {filter}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveFilters([])}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
