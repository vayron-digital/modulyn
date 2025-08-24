"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Download,
  Upload,
  Eye,
  Clock,
  FileImage,
  FileSpreadsheet,
} from "lucide-react"

interface PropertyDocumentsProps {
  id: string
}

// This would normally come from an API
const documents = [
  {
    id: "1",
    name: "Property Disclosure Statement",
    type: "PDF",
    size: "2.4 MB",
    uploadedBy: "Sarah Johnson",
    uploadedAt: new Date(2024, 2, 1),
    icon: FileText,
  },
  {
    id: "2",
    name: "Floor Plans",
    type: "Image",
    size: "5.1 MB",
    uploadedBy: "Michael Brown",
    uploadedAt: new Date(2024, 2, 5),
    icon: FileImage,
  },
  {
    id: "3",
    name: "Property Tax History",
    type: "Excel",
    size: "1.2 MB",
    uploadedBy: "Sarah Johnson",
    uploadedAt: new Date(2024, 2, 8),
    icon: FileSpreadsheet,
  },
  {
    id: "4",
    name: "Home Inspection Report",
    type: "PDF",
    size: "3.8 MB",
    uploadedBy: "Emily Davis",
    uploadedAt: new Date(2024, 2, 10),
    icon: FileText,
  },
]

export function PropertyDocuments({ id }: PropertyDocumentsProps) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold">Documents & Files</h3>
          <p className="text-sm text-muted-foreground">
            Manage property-related documents and files
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>

      <div className="rounded-lg border">
        {documents.map((doc, index) => (
          <div
            key={doc.id}
            className={`flex items-center justify-between p-4 ${
              index !== documents.length - 1 ? "border-b" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-muted">
                <doc.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{doc.name}</span>
                  <Badge variant="secondary">{doc.type}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>{doc.size}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {doc.uploadedAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
