"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Calendar,
  Contact2,
  FileText,
  Home,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Star,
  Users,
} from "lucide-react"

export function CrmHomePage() {
  const router = useRouter()
  const [timeOfDay, setTimeOfDay] = useState(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "morning"
    if (hour < 17) return "afternoon"
    return "evening"
  })

  const quickActions = [
    {
      title: "Add New Property",
      icon: Home,
      description: "List a new property for sale or rent",
      href: "/dashboard/properties/new",
      color: "bg-flame/10 text-flame",
    },
    {
      title: "Add New Lead",
      icon: Users,
      description: "Create a new lead profile",
      href: "/dashboard/leads/new",
      color: "bg-black_olive/10 text-black_olive",
    },
    {
      title: "Schedule Viewing",
      icon: Calendar,
      description: "Set up a property viewing appointment",
      href: "/dashboard/calendar/new",
      color: "bg-timberwolf/20 text-black_olive",
    },
    {
      title: "Create Task",
      icon: MessageSquare,
      description: "Add a new task or reminder",
      href: "/dashboard/tasks/new",
      color: "bg-eerie_black/10 text-eerie_black",
    },
  ]

  const featuredLinks = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      description: "View your performance metrics",
      href: "/dashboard",
    },
    {
      title: "Properties",
      icon: Building2,
      description: "Manage your property listings",
      href: "/dashboard/properties",
    },
    {
      title: "Contacts",
      icon: Contact2,
      description: "View and manage your contacts",
      href: "/dashboard/contacts",
    },
    {
      title: "Deals",
      icon: FileText,
      description: "Track your ongoing deals",
      href: "/dashboard/deals",
    },
    {
      title: "Email",
      icon: Mail,
      description: "Check your communications",
      href: "/dashboard/email",
    },
  ]

  return (
    <div className="min-h-[85vh] flex flex-col">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-black_olive to-eerie_black p-8 text-floral_white mb-6">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">
            Good {timeOfDay}, John
          </h1>
          <p className="text-floral_white/80 max-w-xl">
            Welcome to your real estate command center. What would you like to do today?
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black_olive/90" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
            <Building2 className="h-64 w-64 text-floral_white/5" />
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
              <h2 className="text-lg font-semibold text-black_olive">Favorites</h2>
              <Button variant="ghost" size="sm" className="text-black_olive/60 hover:text-black_olive">
                <Star className="mr-2 h-4 w-4" />
                Manage
              </Button>
            </div>
            <div className="space-y-3">
              {[
                { title: "Luxury Villa Project", type: "Property", path: "/properties/123" },
                { title: "VIP Clients", type: "Contact List", path: "/contacts/vip" },
                { title: "Follow-up Tasks", type: "Task List", path: "/tasks/followup" },
                { title: "Monthly Report", type: "Report", path: "/reports/monthly" },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => router.push(item.path)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-timberwolf/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Star className="h-4 w-4 text-flame" />
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

        {/* Right Column - Recent Items */}
        <div className="md:col-span-4 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black_olive">Recent Properties</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push("/dashboard/properties")}
                className="border-timberwolf text-black_olive hover:bg-timberwolf/20"
              >
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {[
                { 
                  title: "Modern Downtown Apartment",
                  address: "123 City Center, LA",
                  price: "$750,000",
                  type: "Residential"
                },
                { 
                  title: "Retail Space in Mall",
                  address: "456 Shopping Ave",
                  price: "$1,200,000",
                  type: "Commercial"
                },
                { 
                  title: "Beachfront Villa",
                  address: "789 Ocean Drive",
                  price: "$2,500,000",
                  type: "Luxury"
                }
              ].map((property, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-timberwolf/10 transition-colors text-left"
                >
                  <div className="h-16 w-16 rounded-lg bg-black_olive/5 flex items-center justify-center">
                    <Home className="h-8 w-8 text-black_olive/40" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black_olive">{property.title}</h3>
                    <p className="text-sm text-black_olive/60">{property.address}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-flame">{property.price}</span>
                      <span className="text-black_olive/40">•</span>
                      <span className="text-sm text-black_olive/60">{property.type}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-black_olive">Recent Activities</h2>
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
                  action: "Property Added",
                  description: "New listing: Modern Downtown Apartment",
                  time: "2 hours ago",
                  icon: Home,
                  color: "bg-flame/10 text-flame"
                },
                { 
                  action: "Lead Updated",
                  description: "Updated contact info for Sarah Johnson",
                  time: "4 hours ago",
                  icon: Users,
                  color: "bg-black_olive/10 text-black_olive"
                },
                { 
                  action: "Meeting Scheduled",
                  description: "Property viewing with Michael Chen",
                  time: "Yesterday",
                  icon: Calendar,
                  color: "bg-timberwolf/20 text-black_olive"
                },
                { 
                  action: "Deal Updated",
                  description: "Offer submitted for Beach Property",
                  time: "2 days ago",
                  icon: FileText,
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
