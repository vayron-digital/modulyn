"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, Upload, Download } from "lucide-react"
import { toast } from "sonner"

export function ContactActions() {
  const router = useRouter()
  const [isImporting, setIsImporting] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleImport = async () => {
    if (!selectedFile) return

    try {
      setIsImporting(true)
      // Here you would normally upload the file to your API
      // const formData = new FormData()
      // formData.append("file", selectedFile)
      // const response = await fetch("/api/contacts/import", {
      //   method: "POST",
      //   body: formData,
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Contacts imported successfully")
      router.refresh()
    } catch (error) {
      toast.error("Failed to import contacts")
    } finally {
      setIsImporting(false)
      setSelectedFile(null)
    }
  }

  const handleExport = async () => {
    try {
      // Here you would normally call your API to get the export file
      // const response = await fetch("/api/contacts/export")
      // const blob = await response.blob()
      // const url = window.URL.createObjectURL(blob)
      // const a = document.createElement("a")
      // a.href = url
      // a.download = "contacts.csv"
      // a.click()

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success("Contacts exported successfully")
    } catch (error) {
      toast.error("Failed to export contacts")
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={() => router.push("/dashboard/contacts/new")}>
        <UserPlus className="mr-2 h-4 w-4" />
        Add Contact
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Contacts</DialogTitle>
            <DialogDescription>
              Upload a CSV file containing your contacts. Download our template to
              ensure the correct format.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Template</Label>
              <Button variant="outline" className="w-full" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </div>
            <div className="space-y-2">
              <Label>File</Label>
              <Input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                disabled={isImporting}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedFile(null)}
              disabled={isImporting}
            >
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={!selectedFile || isImporting}>
              {isImporting ? "Importing..." : "Import"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button variant="outline" onClick={handleExport}>
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
    </div>
  )
}
