"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { MemberList } from '@/components/members/member-list'
import { MemberForm } from '@/components/members/member-form'
import { Member } from '@/types'

// Mock data for demonstration
const mockMembers: Member[] = [
  {
    id: '1',
    organizationId: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'admin',
    membershipType: 'professional',
    memberSince: new Date('2023-01-01'),
    subscriptionStatus: 'active',
    certifications: ['Certified Professional', 'Advanced Leadership'],
    specializations: ['Strategic Planning', 'Team Management'],
    committees: ['Executive Board', 'Strategic Planning'],
  },
  {
    id: '2',
    organizationId: '1',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'member',
    membershipType: 'basic',
    memberSince: new Date('2023-02-15'),
    subscriptionStatus: 'active',
    certifications: ['Basic Certification'],
    specializations: ['Marketing', 'Communication'],
    committees: ['Marketing Committee'],
  },
  // Add more mock members as needed
]

export default function MembersPage() {
  const [members] = useState<Member[]>(mockMembers)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddMember = async (data: any) => {
    // TODO: Implement member creation
    console.log('Adding member:', data)
    setIsDialogOpen(false)
  }

  return (
    <div className="container space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Members</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
            </DialogHeader>
            <MemberForm
              onSubmit={handleAddMember}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <MemberList />
    </div>
  )
}
