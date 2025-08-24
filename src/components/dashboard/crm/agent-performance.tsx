"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const agents = [
  {
    id: "1",
    name: "Sarah Johnson",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    deals: 12,
    revenue: 2500000,
    conversion: 68,
    status: "trending-up",
  },
  {
    id: "2",
    name: "Michael Brown",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
    deals: 10,
    revenue: 2100000,
    conversion: 62,
    status: "stable",
  },
  {
    id: "3",
    name: "Emily Davis",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emily",
    deals: 8,
    revenue: 1800000,
    conversion: 58,
    status: "trending-up",
  },
  {
    id: "4",
    name: "John Wilson",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
    deals: 7,
    revenue: 1500000,
    conversion: 52,
    status: "trending-down",
  },
]

export function AgentPerformance() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Agent</TableHead>
          <TableHead className="text-right">Deals</TableHead>
          <TableHead className="text-right">Revenue</TableHead>
          <TableHead className="text-right">Conversion</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map((agent) => (
          <TableRow key={agent.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={agent.image} alt={agent.name} />
                  <AvatarFallback>
                    {agent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{agent.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">{agent.deals}</TableCell>
            <TableCell className="text-right">
              ${(agent.revenue / 1000000).toFixed(1)}M
            </TableCell>
            <TableCell className="text-right">{agent.conversion}%</TableCell>
            <TableCell className="text-right">
              <Badge
                variant={
                  agent.status === "trending-up"
                    ? "success"
                    : agent.status === "stable"
                    ? "secondary"
                    : "destructive"
                }
              >
                {agent.status === "trending-up"
                  ? "↑ Up"
                  : agent.status === "stable"
                  ? "→ Stable"
                  : "↓ Down"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
