"use client"

import { ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function SortButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="border-timberwolf text-black_olive hover:bg-timberwolf/20"
        >
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-floral_white border-timberwolf">
        <DropdownMenuItem className="hover:bg-timberwolf/20 hover:text-black_olive">
          Name (A-Z)
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-timberwolf/20 hover:text-black_olive">
          Name (Z-A)
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-timberwolf/20 hover:text-black_olive">
          Recently Added
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-timberwolf/20 hover:text-black_olive">
          Last Modified
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-timberwolf/20 hover:text-black_olive">
          Last Contacted
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
