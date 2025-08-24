"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function DealFilters() {
  const [tags, setTags] = useState<string[]>([])

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search deals..."
          className="w-[300px] pl-8"
        />
      </div>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Deal Stage" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Deal Stage</SelectLabel>
            <SelectItem value="all">All Stages</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="negotiation">Negotiation</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Deal Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Deal Type</SelectLabel>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="purchase">Purchase</SelectItem>
            <SelectItem value="sale">Sale</SelectItem>
            <SelectItem value="lease">Lease</SelectItem>
            <SelectItem value="investment">Investment</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Assigned To" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Assigned To</SelectLabel>
            <SelectItem value="all">All Agents</SelectItem>
            <SelectItem value="sarah">Sarah Johnson</SelectItem>
            <SelectItem value="michael">Michael Brown</SelectItem>
            <SelectItem value="emily">Emily Davis</SelectItem>
            <SelectItem value="john">John Wilson</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuLabel>Filter by Tags</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={tags.includes("hot")}
            onCheckedChange={(checked) =>
              setTags(
                checked
                  ? [...tags, "hot"]
                  : tags.filter((tag) => tag !== "hot")
              )
            }
          >
            Hot Deal
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={tags.includes("priority")}
            onCheckedChange={(checked) =>
              setTags(
                checked
                  ? [...tags, "priority"]
                  : tags.filter((tag) => tag !== "priority")
              )
            }
          >
            Priority
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={tags.includes("financing")}
            onCheckedChange={(checked) =>
              setTags(
                checked
                  ? [...tags, "financing"]
                  : tags.filter((tag) => tag !== "financing")
              )
            }
          >
            Financing
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={tags.includes("inspection")}
            onCheckedChange={(checked) =>
              setTags(
                checked
                  ? [...tags, "inspection"]
                  : tags.filter((tag) => tag !== "inspection")
              )
            }
          >
            Inspection
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={tags.includes("negotiation")}
            onCheckedChange={(checked) =>
              setTags(
                checked
                  ? [...tags, "negotiation"]
                  : tags.filter((tag) => tag !== "negotiation")
              )
            }
          >
            Negotiation
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
