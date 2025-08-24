"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd"
import {
  Image as ImageIcon,
  Video,
  File,
  X,
  Move,
  Upload,
} from "lucide-react"
import { toast } from "sonner"

interface PropertyMediaFormProps {
  id: string
}

// This would normally come from an API
const media = [
  {
    id: "1",
    type: "image",
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    title: "Front View",
    category: "Exterior",
  },
  {
    id: "2",
    type: "image",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    title: "Living Room",
    category: "Interior",
  },
  {
    id: "3",
    type: "image",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    title: "Kitchen",
    category: "Interior",
  },
  {
    id: "4",
    type: "video",
    url: "https://example.com/video.mp4",
    title: "Property Tour",
    category: "Virtual Tour",
  },
  {
    id: "5",
    type: "document",
    url: "https://example.com/floorplan.pdf",
    title: "Floor Plan",
    category: "Documents",
  },
]

export function PropertyMediaForm({ id }: PropertyMediaFormProps) {
  const router = useRouter()
  const [items, setItems] = useState(media)
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const newItems = Array.from(items)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setItems(newItems)
  }

  const handleDelete = (itemId: string) => {
    setItems(items.filter((item) => item.id !== itemId))
    toast.success("Media item removed")
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)
      // Here you would normally save the data to your API
      // const response = await fetch("/api/properties/${id}/media", {
      //   method: "PUT",
      //   body: JSON.stringify({ items }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Property media saved successfully!")
      router.push(`/dashboard/properties/${id}`)
    } catch (error) {
      toast.error("Failed to save property media")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isClient) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Property Media</h3>
            <p className="text-sm text-muted-foreground">
              Manage photos, videos, and documents for this property.
            </p>
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Media Gallery</CardTitle>
              <CardDescription>
                Drag and drop to reorder. First image will be the featured image.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-lg border bg-card p-4"
                  >
                    <div className="cursor-move">
                      <Move className="h-5 w-5 text-muted-foreground" />
                    </div>

                    <div className="h-20 w-32 overflow-hidden rounded-md border bg-muted">
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      ) : item.type === "video" ? (
                        <div className="flex h-full items-center justify-center">
                          <Video className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <File className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <Input
                        value={item.title}
                        onChange={() => {}}
                        className="h-8"
                      />
                      <Select defaultValue={item.category}>
                        <SelectTrigger className="h-8 w-[180px]">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Exterior">Exterior</SelectItem>
                          <SelectItem value="Interior">Interior</SelectItem>
                          <SelectItem value="Virtual Tour">
                            Virtual Tour
                          </SelectItem>
                          <SelectItem value="Documents">
                            Documents
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/properties/${id}`)}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Property Media</h3>
          <p className="text-sm text-muted-foreground">
            Manage photos, videos, and documents for this property.
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </div>

      <Separator />

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Media Gallery</CardTitle>
            <CardDescription>
              Drag and drop to reorder. First image will be the featured image.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="media">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex items-center gap-4 rounded-lg border bg-card p-4"
                          >
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-move"
                            >
                              <Move className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <div className="h-20 w-32 overflow-hidden rounded-md border bg-muted">
                              {item.type === "image" ? (
                                <img
                                  src={item.url}
                                  alt={item.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : item.type === "video" ? (
                                <div className="flex h-full items-center justify-center">
                                  <Video className="h-8 w-8 text-muted-foreground" />
                                </div>
                              ) : (
                                <div className="flex h-full items-center justify-center">
                                  <File className="h-8 w-8 text-muted-foreground" />
                                </div>
                              )}
                            </div>

                            <div className="flex-1 space-y-1">
                              <Input
                                value={item.title}
                                onChange={() => {}}
                                className="h-8"
                              />
                              <Select defaultValue={item.category}>
                                <SelectTrigger className="h-8 w-[180px]">
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Exterior">Exterior</SelectItem>
                                  <SelectItem value="Interior">Interior</SelectItem>
                                  <SelectItem value="Virtual Tour">
                                    Virtual Tour
                                  </SelectItem>
                                  <SelectItem value="Documents">
                                    Documents
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Virtual Tour</CardTitle>
            <CardDescription>
              Add a virtual tour or 3D walkthrough of the property.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Embed Code</Label>
              <Input
                placeholder="Paste your virtual tour embed code here"
                className="font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label>Tour URL</Label>
              <Input placeholder="https://example.com/virtual-tour" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save & Continue"}
        </Button>
      </div>
    </div>
  )
}
