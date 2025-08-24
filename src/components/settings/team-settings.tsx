"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertTriangle,
  Building,
  Check,
  Copy,
  Edit,
  Loader2,
  Lock,
  Mail,
  MoreHorizontal,
  Plus,
  Settings,
  Shield,
  Trash,
  User,
  UserPlus,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const teamFormSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().max(500).optional(),
  settings: z.object({
    allowMemberInvites: z.boolean(),
    requireApproval: z.boolean(),
    defaultRole: z.enum(["member", "admin"]),
    maxMembers: z.number().min(1),
  }),
  roles: z.array(
    z.object({
      name: z.string(),
      permissions: z.array(z.string()),
    })
  ),
})

type TeamFormValues = z.infer<typeof teamFormSchema>

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Owner",
    status: "active",
    avatar: "/avatars/01.png",
    lastActive: "2024-03-20 14:30:00",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "active",
    avatar: "/avatars/02.png",
    lastActive: "2024-03-20 13:45:00",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Member",
    status: "invited",
    avatar: "/avatars/03.png",
    lastActive: null,
  },
]

// Mock data for roles and permissions
const roles = [
  {
    id: 1,
    name: "Owner",
    description: "Full access to all features",
    permissions: ["manage_team", "manage_billing", "manage_settings", "manage_integrations"],
    isDefault: false,
    isSystem: true,
  },
  {
    id: 2,
    name: "Admin",
    description: "Administrative access with some restrictions",
    permissions: ["manage_team", "manage_settings", "manage_integrations"],
    isDefault: true,
    isSystem: true,
  },
  {
    id: 3,
    name: "Member",
    description: "Standard access to features",
    permissions: ["view_team", "view_settings"],
    isDefault: false,
    isSystem: true,
  },
  {
    id: 4,
    name: "Custom Role",
    description: "Custom permissions set",
    permissions: ["view_team", "manage_integrations"],
    isDefault: false,
    isSystem: false,
  },
]

// Mock data for permissions
const permissions = [
  {
    id: "manage_team",
    name: "Manage Team",
    description: "Add, remove, and manage team members",
  },
  {
    id: "manage_billing",
    name: "Manage Billing",
    description: "Access to billing and subscription settings",
  },
  {
    id: "manage_settings",
    name: "Manage Settings",
    description: "Modify team and application settings",
  },
  {
    id: "manage_integrations",
    name: "Manage Integrations",
    description: "Configure and manage integrations",
  },
  {
    id: "view_team",
    name: "View Team",
    description: "View team members and their roles",
  },
  {
    id: "view_settings",
    name: "View Settings",
    description: "View team and application settings",
  },
]

const defaultValues: Partial<TeamFormValues> = {
  settings: {
    allowMemberInvites: false,
    requireApproval: true,
    defaultRole: "member",
    maxMembers: 10,
  },
}

export function TeamSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [showInviteMembers, setShowInviteMembers] = useState(false)
  const [showAddRole, setShowAddRole] = useState(false)
  const [showEditRole, setShowEditRole] = useState(false)
  const [selectedRole, setSelectedRole] = useState<typeof roles[0] | null>(null)

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamFormSchema),
    defaultValues,
  })

  function onSubmit(data: TeamFormValues) {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log(data)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Team Members</h4>
            <p className="text-sm text-muted-foreground">
              Manage your team members and their roles
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h5 className="text-sm font-medium leading-none">
                Active Members ({teamMembers.length})
              </h5>
              <p className="text-sm text-muted-foreground">
                {teamMembers.filter((m) => m.status === "active").length} active,{" "}
                {teamMembers.filter((m) => m.status === "invited").length} invited
              </p>
            </div>
            <Button onClick={() => setShowInviteMembers(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite members
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            member.status === "active"
                              ? "outline"
                              : "secondary"
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {member.lastActive || "Never logged in"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Resend invite
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash className="mr-2 h-4 w-4" />
                              Remove member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Dialog open={showInviteMembers} onOpenChange={setShowInviteMembers}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Members</DialogTitle>
                <DialogDescription>
                  Invite new members to join your team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Addresses</Label>
                  <Textarea
                    placeholder="Enter email addresses (one per line)"
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter multiple email addresses separated by new lines
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Custom Message (Optional)</Label>
                  <Textarea
                    placeholder="Add a personal message to the invitation email"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowInviteMembers(false)}>
                  Cancel
                </Button>
                <Button>Send invites</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Roles & Permissions</h4>
            <p className="text-sm text-muted-foreground">
              Manage roles and their associated permissions
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h5 className="text-sm font-medium leading-none">
                Available Roles ({roles.length})
              </h5>
              <p className="text-sm text-muted-foreground">
                {roles.filter((r) => r.isSystem).length} system roles,{" "}
                {roles.filter((r) => !r.isSystem).length} custom roles
              </p>
            </div>
            <Button onClick={() => setShowAddRole(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add role
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h6 className="text-sm font-medium">{role.name}</h6>
                        {role.isDefault && (
                          <Badge variant="secondary">Default</Badge>
                        )}
                        {role.isSystem && (
                          <Badge variant="outline">System</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((permission) => (
                          <Badge
                            key={permission}
                            variant="secondary"
                            className="text-xs"
                          >
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {!role.isSystem && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedRole(role)
                            setShowEditRole(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Dialog open={showAddRole} onOpenChange={setShowAddRole}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Role</DialogTitle>
                <DialogDescription>
                  Create a new role with custom permissions
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Role Name</Label>
                  <Input placeholder="Enter role name" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe the purpose of this role"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="space-y-2">
                    {permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-start space-x-3"
                      >
                        <Switch id={permission.id} />
                        <div className="space-y-1">
                          <Label
                            htmlFor={permission.id}
                            className="text-sm font-medium"
                          >
                            {permission.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddRole(false)}>
                  Cancel
                </Button>
                <Button>Create role</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={showEditRole} onOpenChange={setShowEditRole}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Role</DialogTitle>
                <DialogDescription>
                  Modify role details and permissions
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Role Name</Label>
                  <Input
                    placeholder="Enter role name"
                    defaultValue={selectedRole?.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe the purpose of this role"
                    rows={3}
                    defaultValue={selectedRole?.description}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="space-y-2">
                    {permissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-start space-x-3"
                      >
                        <Switch
                          id={permission.id}
                          defaultChecked={selectedRole?.permissions.includes(
                            permission.id
                          )}
                        />
                        <div className="space-y-1">
                          <Label
                            htmlFor={permission.id}
                            className="text-sm font-medium"
                          >
                            {permission.name}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditRole(false)}>
                  Cancel
                </Button>
                <Button>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Team Settings</h4>
            <p className="text-sm text-muted-foreground">
              Configure team-wide settings and preferences
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="settings.allowMemberInvites"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Allow Member Invites</FormLabel>
                        <FormDescription>
                          Let team members invite new members
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="settings.requireApproval"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel>Require Approval</FormLabel>
                        <FormDescription>
                          Require admin approval for new members
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="settings.defaultRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select default role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Role assigned to new team members
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="settings.maxMembers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Members</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum number of team members allowed
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save team settings
        </Button>
      </form>
    </Form>
  )
}
