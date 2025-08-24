"use client"

import { useState } from "react"
import { EmailSidebar } from "@/components/email/email-sidebar"
import { EmailList } from "@/components/email/email-list"
import { EmailView } from "@/components/email/email-view"
import { EmailCompose } from "@/components/email/email-compose"
import { EmailSearch } from "@/components/email/email-search"
import { EmailToolbar } from "@/components/email/email-toolbar"
import { EmailStats } from "@/components/email/email-stats"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

export type EmailView = "inbox" | "sent" | "drafts" | "trash" | "spam"
export type EmailFilter = "all" | "unread" | "flagged" | "attachments"

export default function EmailPage() {
  const [view, setView] = useState<EmailView>("inbox")
  const [filter, setFilter] = useState<EmailFilter>("all")
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null)
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  // This would normally come from an API/OAuth flow
  const handleConnect = () => {
    // Initiate OAuth flow
    setIsConnected(true)
  }

  if (!isConnected) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="mx-auto flex max-w-md flex-col items-center space-y-4 text-center">
          <div className="rounded-full bg-primary/10 p-6">
            <svg
              className="h-12 w-12 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Connect Your Email</h2>
          <p className="text-muted-foreground">
            Connect your email account to start managing your emails securely
            within the application.
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={handleConnect} className="w-full">
              Connect Gmail Account
            </Button>
            <Button onClick={handleConnect} variant="outline" className="w-full">
              Connect Outlook Account
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            We use secure OAuth 2.0 for email access. Your credentials are never
            stored.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="w-64 border-r">
        <div className="p-4">
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Compose
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Compose Email</DialogTitle>
                <DialogDescription>
                  Create and send a new email message
                </DialogDescription>
              </DialogHeader>
              <EmailCompose onSend={() => setIsComposeOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <EmailSidebar
            view={view}
            onViewChange={setView}
            filter={filter}
            onFilterChange={setFilter}
          />
        </ScrollArea>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <EmailSearch />
            <EmailToolbar
              view={view}
              filter={filter}
              onFilterChange={setFilter}
            />
          </div>
        </div>

        <EmailStats view={view} />
        <Separator />

        <div className="flex flex-1">
          <div
            className={`border-r ${
              selectedEmail ? "w-[400px]" : "w-full"
            } transition-all duration-200`}
          >
            <EmailList
              view={view}
              filter={filter}
              selectedEmail={selectedEmail}
              onEmailSelect={setSelectedEmail}
            />
          </div>
          {selectedEmail && (
            <div className="flex-1">
              <EmailView
                emailId={selectedEmail}
                onClose={() => setSelectedEmail(null)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
