"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Mail, UserCog, Trash } from "lucide-react"
import { useMembers } from "@/hooks/use-members"
import { formatDistanceToNow } from "date-fns"

export function MemberList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, error } = useMembers({
    page,
    limit: 10,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading members</div>
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Membership Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Member Since</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={member.profileImage}
                    alt={`${member.firstName} ${member.lastName}`}
                  />
                  <AvatarFallback>
                    {member.firstName[0]}
                    {member.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {member.email}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={member.role === "admin" ? "default" : "secondary"}>
                  {member.role}
                </Badge>
              </TableCell>
              <TableCell>{member.membershipType}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    member.subscriptionStatus === "active"
                      ? "success"
                      : member.subscriptionStatus === "pending"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {member.subscriptionStatus}
                </Badge>
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(member.memberSince), {
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <UserCog className="mr-2 h-4 w-4" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}