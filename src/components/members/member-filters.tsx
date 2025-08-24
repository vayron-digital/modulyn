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
import { Search, X } from "lucide-react"

export function MemberFilters() {
  const { memberFilters, setMemberFilters, resetFilters } = useFiltersStore()

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search members..."
          className="pl-8"
          onChange={(e) =>
            setMemberFilters({ searchTerm: e.target.value })
          }
        />
      </div>
      <Select
        value={memberFilters.membershipType[0]}
        onValueChange={(value) =>
          setMemberFilters({ membershipType: [value] })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Membership Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="basic">Basic</SelectItem>
          <SelectItem value="professional">Professional</SelectItem>
          <SelectItem value="enterprise">Enterprise</SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={memberFilters.status[0]}
        onValueChange={(value) =>
          setMemberFilters({ status: [value] })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="expired">Expired</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => resetFilters("member")}
      >
        <X className="h-4 w-4" />
        Reset Filters
      </Button>
    </div>
  )
}
