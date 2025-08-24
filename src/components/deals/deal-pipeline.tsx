"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd"
import {
  DollarSign,
  Calendar,
  MoreHorizontal,
  Home,
  Users,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// This would normally come from an API
const stages = [
  {
    id: "lead",
    name: "Lead",
    description: "Initial contact and qualification",
    value: 2500000,
    count: 12,
  },
  {
    id: "qualified",
    name: "Qualified",
    description: "Qualified prospects",
    value: 3500000,
    count: 8,
  },
  {
    id: "negotiation",
    name: "Negotiation",
    description: "Active negotiations",
    value: 4200000,
    count: 6,
  },
  {
    id: "contract",
    name: "Contract",
    description: "Under contract",
    value: 2800000,
    count: 4,
  },
]

const deals = [
  {
    id: "1",
    title: "123 Main Street",
    type: "Purchase",
    value: 750000,
    stage: "lead",
    client: {
      name: "John Smith",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
    },
    agent: {
      name: "Sarah Johnson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    },
    dueDate: new Date(2024, 3, 15),
    tags: ["hot", "financing"],
  },
  {
    id: "2",
    title: "456 Oak Avenue",
    type: "Sale",
    value: 850000,
    stage: "qualified",
    client: {
      name: "Emma Wilson",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Emma",
    },
    agent: {
      name: "Michael Brown",
      image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
    },
    dueDate: new Date(2024, 3, 20),
    tags: ["priority"],
  },
  // Add more deals...
]

export function DealPipeline() {
  const router = useRouter()
  const [items, setItems] = useState(deals)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newItems = Array.from(items)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, {
      ...reorderedItem,
      stage: result.destination.droppableId,
    })

    setItems(newItems)
  }

  if (!isClient) {
    return (
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-4">
          {stages.map((stage) => (
            <div key={stage.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{stage.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
                <Badge variant="secondary">
                  {stage.count} • ${(stage.value / 1000000).toFixed(1)}M
                </Badge>
              </div>
              <div className="space-y-4">
                {items
                  .filter((item) => item.stage === stage.id)
                  .map((deal) => (
                    <Card key={deal.id} className="cursor-grab active:cursor-grabbing">
                      <CardHeader className="p-4">
                        <div className="flex items-start justify-between space-y-0">
                          <div>
                            <CardTitle className="text-sm font-medium">
                              {deal.title}
                            </CardTitle>
                            <CardDescription>
                              <div className="flex items-center gap-1">
                                <Home className="h-3 w-3" />
                                <span>{deal.type}</span>
                              </div>
                            </CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              router.push(`/dashboard/deals/${deal.id}`)
                            }
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>
                              ${deal.value.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {formatDistanceToNow(deal.dueDate, {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex -space-x-2">
                            <Avatar className="h-6 w-6 border-2 border-background">
                              <AvatarImage
                                src={deal.client.image}
                                alt={deal.client.name}
                              />
                              <AvatarFallback>
                                {deal.client.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <Avatar className="h-6 w-6 border-2 border-background">
                              <AvatarImage
                                src={deal.agent.image}
                                alt={deal.agent.name}
                              />
                              <AvatarFallback>
                                {deal.agent.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex gap-1">
                            {deal.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!isClient) {
    return (
      <div className="p-6">
        <div className="grid gap-4 md:grid-cols-4">
          {stages.map((stage) => (
            <div key={stage.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{stage.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
                <Badge variant="secondary">
                  {stage.count} • ${(stage.value / 1000000).toFixed(1)}M
                </Badge>
              </div>
              <div className="space-y-4">
                {items
                  .filter((item) => item.stage === stage.id)
                  .map((deal) => (
                    <Card key={deal.id} className="cursor-grab active:cursor-grabbing">
                      <CardHeader className="p-4">
                        <div className="flex items-start justify-between space-y-0">
                          <div>
                            <CardTitle className="text-sm font-medium">
                              {deal.title}
                            </CardTitle>
                            <CardDescription>
                              <div className="flex items-center gap-1">
                                <Home className="h-3 w-3" />
                                <span>{deal.type}</span>
                              </div>
                            </CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              router.push(`/dashboard/deals/${deal.id}`)
                            }
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>
                              ${deal.value.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {formatDistanceToNow(deal.dueDate, {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex -space-x-2">
                            <Avatar className="h-6 w-6 border-2 border-background">
                              <AvatarImage
                                src={deal.client.image}
                                alt={deal.client.name}
                              />
                              <AvatarFallback>
                                {deal.client.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <Avatar className="h-6 w-6 border-2 border-background">
                              <AvatarImage
                                src={deal.agent.image}
                                alt={deal.agent.name}
                              />
                              <AvatarFallback>
                                {deal.agent.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex gap-1">
                            {deal.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid gap-4 md:grid-cols-4">
          {stages.map((stage) => (
            <div key={stage.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{stage.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
                <Badge variant="secondary">
                  {stage.count} • ${(stage.value / 1000000).toFixed(1)}M
                </Badge>
              </div>
              <Droppable droppableId={stage.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {items
                      .filter((item) => item.stage === stage.id)
                      .map((deal, index) => (
                        <Draggable
                          key={deal.id}
                          draggableId={deal.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Card className="cursor-grab active:cursor-grabbing">
                              <CardHeader className="p-4">
                                <div className="flex items-start justify-between space-y-0">
                                  <div>
                                    <CardTitle className="text-sm font-medium">
                                      {deal.title}
                                    </CardTitle>
                                    <CardDescription>
                                      <div className="flex items-center gap-1">
                                        <Home className="h-3 w-3" />
                                        <span>{deal.type}</span>
                                      </div>
                                    </CardDescription>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() =>
                                      router.push(`/dashboard/deals/${deal.id}`)
                                    }
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4 pt-0">
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      ${deal.value.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                      {formatDistanceToNow(deal.dueDate, {
                                        addSuffix: true,
                                      })}
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                  <div className="flex -space-x-2">
                                    <Avatar className="h-6 w-6 border-2 border-background">
                                      <AvatarImage
                                        src={deal.client.image}
                                        alt={deal.client.name}
                                      />
                                      <AvatarFallback>
                                        {deal.client.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <Avatar className="h-6 w-6 border-2 border-background">
                                      <AvatarImage
                                        src={deal.agent.image}
                                        alt={deal.agent.name}
                                      />
                                      <AvatarFallback>
                                        {deal.agent.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                  </div>
                                  <div className="flex gap-1">
                                    {deal.tags.map((tag) => (
                                      <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                                             </CardContent>
                             </Card>
                           </div>
                         )}
                       </Draggable>
                     ))}
                   {provided.placeholder}
                 </div>
               )}
             </Droppable>
           </div>
         ))}
       </div>
     </DragDropContext>
   </div>
 )
}
