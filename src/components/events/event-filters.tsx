"use client"

import { useFiltersStore } from "@/store/use-filters-store"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Search, X } from "lucide-react"

export function EventFilters() {
  const { eventFilters, setEventFilters, resetFilters } = useFiltersStore()

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          className="pl-8"
          onChange={(e) =>
            setEventFilters({ searchTerm: e.target.value })
          }
        />
      </div>
      <Select
        value={eventFilters.type[0]}
        onValueChange={(value) =>
          setEventFilters({ type: [value] })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Event Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="conference">Conference</SelectItem>
          <SelectItem value="workshop">Workshop</SelectItem>
          <SelectItem value="webinar">Webinar</SelectItem>
          <SelectItem value="networking">Networking</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={eventFilters.status[0]}
        onValueChange={(value) =>
          setEventFilters({ status: [value] })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="upcoming">Upcoming</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>
      <DatePickerWithRange
        value={{
          from: eventFilters.dateRange[0] || undefined,
          to: eventFilters.dateRange[1] || undefined,
        }}
        onChange={(value) =>
          setEventFilters({
            dateRange: [value?.from || null, value?.to || null],
          })
        }
      />
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => resetFilters("event")}
      >
        <X className="h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  )
}
