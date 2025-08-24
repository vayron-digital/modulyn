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

export function ContactFilters() {
  const [tags, setTags] = useState<string[]>([])

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contacts..."
          className="w-[300px] pl-8"
        />
      </div>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Contact Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Contact Type</SelectLabel>
            <SelectItem value="all">All Contacts</SelectItem>
            <SelectItem value="client">Clients</SelectItem>
            <SelectItem value="lead">Leads</SelectItem>
            <SelectItem value="vendor">Vendors</SelectItem>
            <SelectItem value="partner">Partners</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
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
            checked={tags.includes("agent")}
            onCheckedChange={(checked) =>
              setTags(
                checked
                  ? [...tags, "agent"]
                  : tags.filter((tag) => tag !== "agent")
              )
            }
          >
            Agent
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={tags.includes("vip")}
            onCheckedChange={(checked) =>
              setTags(
                checked
                  ? [...tags, "vip"]
                  : tags.filter((tag) => tag !== "vip")
              )
            }
          >
            VIP
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
