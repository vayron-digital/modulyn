"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Archive,
  Trash2,
  MoreHorizontal,
  Mail,
  MailOpen,
  Star,
  Tag,
  AlertOctagon,
  MoveRight,
  RefreshCcw,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Filter,
  Calendar,
  Users,
  Settings,
} from "lucide-react"

import type { EmailFilter } from "@/app/(dashboard)/dashboard/email/page"

interface EmailToolbarProps {
  view: string
  filter: EmailFilter
  onFilterChange: (filter: EmailFilter) => void
}

export function EmailToolbar({
  view,
  filter,
  onFilterChange,
}: EmailToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <Select value={filter} onValueChange={onFilterChange}>
        <SelectTrigger className="h-9 w-[130px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>View</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="attachments">With Attachments</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refresh</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Archive className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <AlertOctagon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mark as Spam</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <MailOpen className="mr-2 h-4 w-4" />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Mark as Unread
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Star className="mr-2 h-4 w-4" />
              Flag Message
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Tag className="mr-2 h-4 w-4" />
              Apply Label
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MoveRight className="mr-2 h-4 w-4" />
              Move to Folder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Select defaultValue="newest">
          <SelectTrigger className="h-9 w-[130px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort By</SelectLabel>
              <SelectItem value="newest">
                <div className="flex items-center">
                  <ArrowDownWideNarrow className="mr-2 h-4 w-4" />
                  Newest
                </div>
              </SelectItem>
              <SelectItem value="oldest">
                <div className="flex items-center">
                  <ArrowUpWideNarrow className="mr-2 h-4 w-4" />
                  Oldest
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Filter By</DropdownMenuLabel>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              Email Type
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Tag className="mr-2 h-4 w-4" />
              Labels
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              Sender
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Filter Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}