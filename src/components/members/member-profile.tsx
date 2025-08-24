"use client"

import { useMembers } from "@/hooks/use-members"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Pencil, Mail, Phone, Building, Calendar } from "lucide-react"
import { format } from "date-fns"

interface MemberProfileProps {
  id: string
}

  const { members, isLoading, error } = useMembers()
  const member = members?.find((m: any) => m.id === id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error || !member) {
    return <div>Error loading member profile</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Profile Information</CardTitle>
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={member.profileImage}
                alt={`${member.firstName} ${member.lastName}`}
              />
              <AvatarFallback className="text-lg">
                {member.firstName[0]}
                {member.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-2xl font-bold">
                {member.firstName} {member.lastName}
              </h3>
              <div className="flex items-center gap-2">
                <Badge variant={member.role === "admin" ? "default" : "secondary"}>
                  {member.role}
                </Badge>
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
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{member.email}</span>
            </div>
            {member.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{member.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span>{member.membershipType} Membership</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                Member since {format(new Date(member.memberSince), "MMMM yyyy")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Specializations & Committees</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="mb-2 font-medium">Specializations</h4>
            <div className="flex flex-wrap gap-2">
              {member.specializations.map((spec) => (
                <Badge key={spec} variant="secondary">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Committee Memberships</h4>
            <div className="flex flex-wrap gap-2">
              {member.committees.map((committee) => (
                <Badge key={committee} variant="outline">
                  {committee}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
