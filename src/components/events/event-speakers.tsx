"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const speakerSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  image: z.string().url().optional(),
  topics: z.string().min(2, {
    message: "At least one topic is required.",
  }),
})

type SpeakerValues = z.infer<typeof speakerSchema>

interface EventSpeakersProps {
  id: string
}

// This would normally come from an API
const speakers = [
  {
    id: "1",
    name: "John Smith",
    bio: "Industry expert with 15+ years of experience",
    company: "Global Trade Solutions",
    role: "CEO",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=John",
    topics: ["International Trade", "Market Strategy"],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    bio: "Leading expert in regulatory compliance",
    company: "Trade Compliance Inc",
    role: "Director of Compliance",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Sarah",
    topics: ["Regulatory Compliance", "Risk Management"],
  },
  {
    id: "3",
    name: "Michael Brown",
    bio: "Digital transformation specialist",
    company: "Tech Innovations Ltd",
    role: "CTO",
    image: "https://api.dicebear.com/7.x/avatars/svg?seed=Michael",
    topics: ["Digital Trade", "Innovation"],
  },
]

export function EventSpeakers({ id }: EventSpeakersProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<SpeakerValues>({
    resolver: zodResolver(speakerSchema),
    defaultValues: {
      name: "",
      bio: "",
      company: "",
      role: "",
      topics: "",
    },
  })

  async function onSubmit(data: SpeakerValues) {
    try {
      setIsLoading(true)
      // Here you would normally save the speaker to your API
      // const response = await fetch("/api/events/${id}/speakers", {
      //   method: "POST",
      //   body: JSON.stringify(data),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Speaker added successfully!")
      setIsAdding(false)
      form.reset()
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <div
            key={speaker.id}
            className="flex flex-col gap-4 p-6 border rounded-lg"
          >
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={speaker.image} alt={speaker.name} />
                <AvatarFallback>
                  {speaker.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <h3 className="font-medium">{speaker.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {speaker.role} at {speaker.company}
                </p>
              </div>
            </div>
            <p className="text-sm">{speaker.bio}</p>
            <div className="flex flex-wrap gap-2">
              {speaker.topics.map((topic) => (
                <Badge key={topic} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="border rounded-lg p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormDescription>
                      Full name of the speaker.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Brief professional biography..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A short professional biography.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Current company or organization.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="Job Title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Current position or title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      URL to the speaker's profile image.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="topics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topics</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="International Trade, Market Strategy"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Comma-separated list of topics.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Speaker"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <Button onClick={() => setIsAdding(true)}>Add Speaker</Button>
      )}
    </div>
  )
}
