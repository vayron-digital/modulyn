import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Award, Download } from "lucide-react"

interface MemberCertificationsProps {
  id: string
}

// This would normally come from an API
const certifications = [
  {
    id: 1,
    name: "Advanced Trade Practices",
    status: "completed",
    completedDate: new Date(2024, 1, 15),
    expiryDate: new Date(2026, 1, 15),
    progress: 100,
  },
  {
    id: 2,
    name: "International Commerce Specialist",
    status: "in_progress",
    progress: 65,
    completedRequirements: [
      "Core Principles",
      "Trade Regulations",
      "Documentation",
    ],
    remainingRequirements: ["Final Assessment", "Case Study"],
  },
  {
    id: 3,
    name: "Supply Chain Management",
    status: "expired",
    completedDate: new Date(2022, 1, 15),
    expiryDate: new Date(2024, 1, 15),
    progress: 100,
  },
]

export function MemberCertifications({ id }: MemberCertificationsProps) {
  return (
    <div className="space-y-6">
      {certifications.map((cert) => (
        <Card key={cert.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-muted-foreground" />
              <CardTitle>{cert.name}</CardTitle>
            </div>
            {cert.status === "completed" && (
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Certificate
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    cert.status === "completed"
                      ? "success"
                      : cert.status === "in_progress"
                      ? "warning"
                      : "destructive"
                  }
                >
                  {cert.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {cert.progress}% Complete
                </span>
              </div>
              <Progress value={cert.progress} />
              {cert.status === "in_progress" && (
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-medium">
                      Completed Requirements
                    </h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {cert.completedRequirements?.map((req) => (
                        <Badge key={req} variant="success">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">
                      Remaining Requirements
                    </h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {cert.remainingRequirements?.map((req) => (
                        <Badge key={req} variant="outline">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {(cert.status === "completed" || cert.status === "expired") && (
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Completed:{" "}
                    {cert.completedDate?.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span>
                    {cert.status === "expired" ? "Expired" : "Expires"}:{" "}
                    {cert.expiryDate?.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
