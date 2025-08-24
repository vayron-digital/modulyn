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

export function LeadFilters() {
  const [tags, setTags] = useState<string[]>([])

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search leads..."
          className="w-[300px] pl-8"
        />
      </div>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Lead Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Lead Status</SelectLabel>
            <SelectItem value="all">All Leads</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="proposal">Proposal</SelectItem>
            <SelectItem value="negotiation">Negotiation</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Lead Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Lead Source</SelectLabel>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="referral">Referral</SelectItem>
            <SelectItem value="zillow">Zillow</SelectItem>
            <SelectItem value="social">Social Media</SelectItem>
            <SelectItem value="open-house">Open House</SelectItem>
            <SelectItem value="other">Other</SelectItem>
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
            <SelectItem value="unassigned">Unassigned</SelectItem>
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
            Hot Lead
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={tags.includes("buyer")}
            onCheckedChange={(checked) =>
              setTags(
                checked
                  ? [...tags, "buyer"]
                  : tags.filter((tag) => tag !== "buyer")
              )
            }
          >
            Buyer
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={tags.includes("seller")}
            onCheckedChange={(checked) =>
              setTags(
                checked
                  ? [...tags, "seller"]
                  : tags.filter((tag) => tag !== "seller")
              )
            }
          >
            Seller
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={tags.includes("investor")}
            onCheckedChange={(checked) =>
              setTags(
                checked
                  ? [...tags, "investor"]
                  : tags.filter((tag) => tag !== "investor")
              )
            }
          >
            Investor
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={tags.includes("first-time")}
            onCheckedChange={(checked) =>
              setTags(
                checked
                  ? [...tags, "first-time"]
                  : tags.filter((tag) => tag !== "first-time")
              )
            }
          >
            First-time Buyer
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={tags.includes("pre-approved")}
            onCheckedChange={(checked) =>
              setTags(
                checked
                  ? [...tags, "pre-approved"]
                  : tags.filter((tag) => tag !== "pre-approved")
              )
            }
          >
            Pre-approved
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
