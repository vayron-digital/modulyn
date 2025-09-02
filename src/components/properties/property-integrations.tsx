"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Key,
  Lock,
  LockKeyhole,
  RefreshCw,
  Shield,
  ShieldCheck,
  XCircle,
} from "lucide-react"

// Mock data for supported platforms
const platforms = [
  {
    id: "zillow",
    name: "Zillow",
    logo: "/images/platforms/zillow.png", // We'll use a placeholder for now
    description: "Connect with Zillow's real estate marketplace",
    status: "connected" as const,
    authType: "oauth" as const,
    lastSync: "2 hours ago",
    properties: 156,
  },
  {
    id: "realtor",
    name: "Realtor.com",
    logo: "/images/platforms/realtor.png",
    description: "Sync listings from Realtor.com",
    status: "disconnected" as const,
    authType: "api" as const,
    lastSync: null,
    properties: 0,
  },
  {
    id: "trulia",
    name: "Trulia",
    logo: "/images/platforms/trulia.png",
    description: "Import properties from Trulia",
    status: "connected" as const,
    authType: "oauth" as const,
    lastSync: "1 day ago",
    properties: 89,
  },
  {
    id: "mls",
    name: "MLS",
    logo: "/images/platforms/mls.png",
    description: "Connect to Multiple Listing Service",
    status: "error" as const,
    authType: "api" as const,
    lastSync: "Failed",
    properties: 245,
    error: "API key expired"
  }
]

type Platform = typeof platforms[0]
type Status = "connected" | "disconnected" | "error"
type AuthType = "oauth" | "api"

export function PropertyIntegrations() {
  const router = useRouter()
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false)
  const [autoSync, setAutoSync] = useState(true)

  const handleConnect = (platform: Platform) => {
    if (platform.authType === "oauth") {
      // Redirect to OAuth flow
      // In production, this would be your OAuth endpoint
      window.location.href = `/api/oauth/${platform.id}/authorize`
    } else {
      setSelectedPlatform(platform)
      setShowApiKeyDialog(true)
    }
  }

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle API key submission
    setShowApiKeyDialog(false)
  }

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "connected":
        return "bg-flame/10 text-flame"
      case "disconnected":
        return "bg-black_olive/10 text-black_olive"
      case "error":
        return "bg-red-100 text-red-600"
      default:
        return "bg-timberwolf/20 text-black_olive/60"
    }
  }

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "connected":
        return CheckCircle2
      case "disconnected":
        return AlertCircle
      case "error":
        return XCircle
      default:
        return AlertCircle
    }
  }

  return (
    <div className="space-y-6">
      {/* Integration Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-flame/10">
              <Shield className="h-6 w-6 text-flame" />
            </div>
            <div>
              <p className="text-sm font-medium text-black_olive/60">Connected Platforms</p>
              <h3 className="text-2xl font-bold text-black_olive">2</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-black_olive/10">
              <Key className="h-6 w-6 text-black_olive" />
            </div>
            <div>
              <p className="text-sm font-medium text-black_olive/60">Active API Keys</p>
              <h3 className="text-2xl font-bold text-black_olive">1</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-timberwolf/20">
              <RefreshCw className="h-6 w-6 text-black_olive" />
            </div>
            <div>
              <p className="text-sm font-medium text-black_olive/60">Last Sync</p>
              <h3 className="text-sm font-bold text-black_olive">2 hours ago</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-eerie_black/10">
              <LockKeyhole className="h-6 w-6 text-eerie_black" />
            </div>
            <div>
              <p className="text-sm font-medium text-black_olive/60">OAuth Sessions</p>
              <h3 className="text-2xl font-bold text-black_olive">2</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Auto-sync Setting */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-black_olive">Automatic Synchronization</Label>
            <p className="text-sm text-black_olive/60">
              Keep your property listings up to date automatically
            </p>
          </div>
          <Switch
            checked={autoSync}
            onCheckedChange={setAutoSync}
          />
        </div>
      </Card>

      {/* Platform List */}
      <div className="space-y-4">
        {platforms.map((platform) => (
          <Card key={platform.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-black_olive/5 flex items-center justify-center">
                  {/* Placeholder for platform logo */}
                  <Lock className="h-6 w-6 text-black_olive/40" />
                </div>
                <div>
                  <h3 className="font-medium text-black_olive">{platform.name}</h3>
                  <p className="text-sm text-black_olive/60">{platform.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <Badge
                    className={getStatusColor(platform.status)}
                  >
                    <div className="flex items-center gap-1.5">
                      {React.createElement(getStatusIcon(platform.status), { className: "h-3.5 w-3.5" })}
                      <span>{platform.status === "error" ? "Error" : platform.status}</span>
                    </div>
                  </Badge>
                  {platform.status === "connected" && (
                    <p className="text-xs text-black_olive/40 mt-1">
                      Last sync: {platform.lastSync}
                    </p>
                  )}
                </div>
                <Button
                  variant={platform.status === "connected" ? "outline" : "default"}
                  className={
                    platform.status === "connected"
                      ? "border-timberwolf text-black_olive hover:bg-timberwolf/20"
                      : "bg-flame hover:bg-flame/90 text-white"
                  }
                  onClick={() => handleConnect(platform)}
                >
                  {platform.status === "connected" ? "Manage" : "Connect"}
                  {platform.authType === "oauth" && (
                    <ExternalLink className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {platform.status === "connected" && (
              <div className="mt-4 pt-4 border-t border-timberwolf">
                <Accordion type="single" collapsible>
                  <AccordionItem value="details">
                    <AccordionTrigger className="text-sm text-black_olive/60 hover:text-black_olive">
                      Connection Details
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-black_olive/60">Authentication Type</p>
                            <p className="font-medium text-black_olive">
                              {platform.authType === "oauth" ? "OAuth 2.0" : "API Key"}
                            </p>
                          </div>
                          <div>
                            <p className="text-black_olive/60">Synced Properties</p>
                            <p className="font-medium text-black_olive">
                              {platform.properties}
                            </p>
                          </div>
                          {platform.authType === "oauth" && (
                            <>
                              <div>
                                <p className="text-black_olive/60">Token Expires</p>
                                <p className="font-medium text-black_olive">
                                  In 6 days
                                </p>
                              </div>
                              <div>
                                <p className="text-black_olive/60">Auto Refresh</p>
                                <p className="font-medium text-black_olive">
                                  Enabled
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-timberwolf text-black_olive hover:bg-timberwolf/20"
                            onClick={() => {
                              // Trigger manual sync
                            }}
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Sync Now
                          </Button>
                          {platform.authType === "oauth" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-timberwolf text-black_olive hover:bg-timberwolf/20"
                              onClick={() => {
                                // Refresh OAuth token
                              }}
                            >
                              <Key className="mr-2 h-4 w-4" />
                              Refresh Token
                            </Button>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            {platform.status === "error" && (
              <Alert className="mt-4 bg-red-50 text-red-600 border-red-100">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Connection Error</AlertTitle>
                <AlertDescription>{platform.error}</AlertDescription>
              </Alert>
            )}
          </Card>
        ))}
      </div>

      {/* API Key Dialog */}
      <Dialog open={showApiKeyDialog} onOpenChange={setShowApiKeyDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect to {selectedPlatform?.name}</DialogTitle>
            <DialogDescription>
              Enter your API key to connect with {selectedPlatform?.name}. This key will be encrypted and stored securely.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApiKeySubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your API key"
                  className="border-timberwolf text-black_olive"
                />
              </div>
              <Alert>
                <ShieldCheck className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Your API key will be encrypted using industry-standard AES-256 encryption before being stored.
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="border-timberwolf text-black_olive hover:bg-timberwolf/20"
                onClick={() => setShowApiKeyDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-flame hover:bg-flame/90 text-white">
                Connect Platform
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
