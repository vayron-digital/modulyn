"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowUpRight,
  Building2,
  Calendar,
  FileText,
  Globe,
  GraduationCap,
  HandshakeIcon,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Star,
  Users,
} from "lucide-react"

export function TradeHome() {
  const router = useRouter()
  const [timeOfDay, setTimeOfDay] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "morning"
    if (hour < 17) return "afternoon"
    return "evening"
  })

  const quickActions = [
    {
      title: "Add Member",
      icon: Users,
      description: "Register a new association member",
      href: "/dashboard/members/new",
      color: "bg-flame/10 text-flame",
    },
    {
      title: "Create Event",
      icon: Calendar,
      description: "Schedule a new association event",
      href: "/dashboard/events/new",
      color: "bg-black_olive/10 text-black_olive",
    },
    {
      title: "Send Newsletter",
      icon: Mail,
      description: "Compose and send member updates",
      href: "/dashboard/email/new",
      color: "bg-timberwolf/20 text-black_olive",
    },
    {
      title: "Add Resource",
      icon: FileText,
      description: "Upload new member resources",
      href: "/dashboard/resources/new",
      color: "bg-eerie_black/10 text-eerie_black",
    },
  ]

  const featuredLinks = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      description: "View association metrics",
      href: "/dashboard/metrics",
    },
    {
      title: "Members Directory",
      icon: Building2,
      description: "Browse all association members",
      href: "/dashboard/members",
    },
    {
      title: "Events Calendar",
      icon: Calendar,
      description: "View upcoming events",
      href: "/dashboard/events",
    },
    {
      title: "Resource Library",
      icon: GraduationCap,
      description: "Access member resources",
      href: "/dashboard/resources",
    },
    {
      title: "Global Network",
      icon: Globe,
      description: "Connect with global partners",
      href: "/dashboard/network",
    },
  ]

  return (
    <div className="min-h-[85vh] flex flex-col">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-flame to-flame-600 p-8 text-floral_white mb-6">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Good {timeOfDay}, Trade Association Admin
          </h1>
          <p className="text-floral_white/80 max-w-xl">
            Welcome to your association management hub. Empower your members and grow your network.
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-flame/90" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
            <HandshakeIcon className="h-64 w-64 text-floral_white/5" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {quickActions.map((action) => (
          <button
            key={action.title}
            onClick={() => router.push(action.href)}
            className="group relative overflow-hidden rounded-xl bg-white p-6 text-left shadow-sm ring-1 ring-timberwolf/10 transition-all duration-200 hover:shadow-md hover:ring-timberwolf/20"
          >
            <div className="space-y-3">
              <div className={cn("inline-flex rounded-lg p-3", action.color)}>
                <action.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-black_olive group-hover:text-flame transition-colors">
                  {action.title}
                </h3>
                <p className="mt-1 text-sm text-black_olive/60">
                  {action.description}
                </p>
              </div>
            </div>
            <Plus className="absolute bottom-4 right-4 h-5 w-5 text-black_olive/20 transition-all duration-200 group-hover:text-flame group-hover:rotate-90" />
          </button>
        ))}
      </div>

      {/* Featured Links & Recent Items */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-7">
        {/* Left Column - Featured Links */}
        <div className="md:col-span-3 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-black_olive mb-4">
              Quick Navigation
            </h2>
            <div className="space-y-1">
              {featuredLinks.map((link) => (
                <button
                  key={link.title}
                  onClick={() => router.push(link.href)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-black_olive/60 hover:text-black_olive hover:bg-timberwolf/10 transition-colors"
                >
                  <link.icon className="h-5 w-5" />
                  <div className="flex-1 text-left">
                    <p className="font-medium">{link.title}</p>
                    <p className="text-sm text-black_olive/40">{link.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-black_olive">Featured Resources</h2>
              <Button variant="ghost" size="sm" className="text-black_olive/60 hover:text-black_olive">
                <Star className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
            <div className="space-y-3">
              {[
                { title: "Industry Report 2024", type: "PDF Document", path: "/resources/report" },
                { title: "Member Benefits Guide", type: "Web Page", path: "/resources/benefits" },
                { title: "Trade Regulations", type: "Legal Document", path: "/resources/regulations" },
                { title: "Training Materials", type: "Course Library", path: "/resources/training" },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => router.push(item.path)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-timberwolf/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-flame" />
                    <div className="text-left">
                      <p className="font-medium text-black_olive">{item.title}</p>
                      <p className="text-sm text-black_olive/60">{item.type}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Events and Updates */}
        <div className="md:col-span-4 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black_olive">Upcoming Events</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push("/dashboard/events")}
                className="border-timberwolf text-black_olive hover:bg-timberwolf/20"
              >
                View Calendar
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { 
                  title: "Annual Trade Summit 2024",
                  date: "March 15-17, 2024",
                  location: "Convention Center",
                  attendees: 450,
                  type: "Conference"
                },
                { 
                  title: "Industry Networking Mixer",
                  date: "March 22, 2024",
                  location: "Grand Hotel",
                  attendees: 120,
                  type: "Networking"
                },
                { 
                  title: "Trade Policy Workshop",
                  date: "March 25, 2024",
                  location: "Virtual Event",
                  attendees: 200,
                  type: "Workshop"
                }
              ].map((event, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-timberwolf/10 transition-colors text-left"
                >
                  <div className="h-16 w-16 rounded-lg bg-flame/10 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-flame" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-black_olive">{event.title}</h3>
                    <p className="text-sm text-black_olive/60">{event.date}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-black_olive/60">{event.location}</span>
                      <span className="text-black_olive/40">•</span>
                      <span className="text-sm text-black_olive/60">{event.attendees} registered</span>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-timberwolf/20 text-black_olive/60">
                    {event.type}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black_olive">Recent Updates</h2>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-black_olive/60 hover:text-black_olive"
              >
                Filter
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { 
                  action: "New Member",
                  description: "TechCorp Solutions joined the association",
                  time: "2 hours ago",
                  icon: Users,
                  color: "bg-flame/10 text-flame"
                },
                { 
                  action: "Event Update",
                  description: "Trade Summit agenda finalized",
                  time: "4 hours ago",
                  icon: Calendar,
                  color: "bg-black_olive/10 text-black_olive"
                },
                { 
                  action: "Resource Added",
                  description: "New industry report published",
                  time: "Yesterday",
                  icon: FileText,
                  color: "bg-timberwolf/20 text-black_olive"
                },
                { 
                  action: "Partnership",
                  description: "New global partnership established",
                  time: "2 days ago",
                  icon: HandshakeIcon,
                  color: "bg-eerie_black/10 text-eerie_black"
                }
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3 p-3">
                  <div className={cn("rounded-lg p-2", activity.color)}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-black_olive">{activity.action}</p>
                    <p className="text-sm text-black_olive/60">{activity.description}</p>
                    <p className="text-xs text-black_olive/40 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
