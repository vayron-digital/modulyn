"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Upload,
  Download,
  MoreHorizontal,
  Eye,
  Trash,
  FileText,
  FileImage,
  FileSpreadsheet,
  Share2,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface LeadDocumentsProps {
  id: string
}

// This would normally come from an API
const documents = [
  {
    id: "1",
    name: "Pre-approval Letter",
    type: "PDF",
    size: "245 KB",
    category: "Financial",
    uploadedBy: "Sarah Johnson",
    uploadedAt: new Date(2024, 2, 15),
    icon: FileText,
  },
  {
    id: "2",
    name: "Property Requirements",
    type: "Document",
    size: "156 KB",
    category: "Requirements",
    uploadedBy: "Sarah Johnson",
    uploadedAt: new Date(2024, 2, 14),
    icon: FileText,
  },
  {
    id: "3",
    name: "Viewing Photos - 123 Main St",
    type: "Images",
    size: "4.2 MB",
    category: "Properties",
    uploadedBy: "Michael Brown",
    uploadedAt: new Date(2024, 2, 12),
    icon: FileImage,
  },
  {
    id: "4",
    name: "Property Comparisons",
    type: "Spreadsheet",
    size: "328 KB",
    category: "Analysis",
    uploadedBy: "Emily Davis",
    uploadedAt: new Date(2024, 2, 10),
    icon: FileSpreadsheet,
  },
]

export function LeadDocuments({ id }: LeadDocumentsProps) {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Documents</h3>
          <p className="text-sm text-muted-foreground">
            Manage documents and files related to this lead
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
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
                  <Badge variant="outline">{doc.category}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>{doc.size}</span>
                  </div>
                  <span>•</span>
                  <span>
                    Uploaded by {doc.uploadedBy}{" "}
                    {formatDistanceToNow(doc.uploadedAt, { addSuffix: true })}
                  </span>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
