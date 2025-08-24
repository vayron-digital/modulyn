"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ImportMembersDialog } from "@/components/members/import-members-dialog"
import { Plus, Upload, Download, MoreVertical } from "lucide-react"
import { useMembers } from "@/hooks/use-members"

export function MemberActions() {
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const { data } = useMembers()

  const handleExport = async () => {
    if (!data?.data) return

    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Role",
      "Membership Type",
      "Status",
      "Member Since",
    ]

    const csvContent = [
      headers.join(","),
      ...data.data.map((member) => [
        member.firstName,
        member.lastName,
        member.email,
        member.role,
        member.membershipType,
        member.subscriptionStatus,
        new Date(member.memberSince).toISOString().split("T")[0],
      ].join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `members_${new Date().toISOString()}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Member
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <MoreVertical className="h-4 w-4" />
              More Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="gap-2"
              onClick={() => setImportDialogOpen(true)}
            >
              <Upload className="h-4 w-4" />
              Import Members
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export Members
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ImportMembersDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
      />
    </>
  )
}