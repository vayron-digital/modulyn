import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { LucideIcon } from "lucide-react"

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: LucideIcon
  loading?: boolean
  error?: string | null
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon: Icon, 
  loading = false, 
  error = null 
}: KPICardProps) {
  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          {Icon && <Skeleton className="h-4 w-4" />}
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-16 mb-1" />
          <Skeleton className="h-3 w-32" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-destructive">{title}</CardTitle>
          {Icon && <Icon className="h-4 w-4 text-destructive" />}
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">Error loading data</div>
        </CardContent>
      </Card>
    )
  }

  const formatChange = (changeValue: number) => {
    const sign = changeValue >= 0 ? '+' : ''
    return `${sign}${changeValue}`
  }

  const getChangeColor = (changeValue: number) => {
    if (changeValue > 0) return 'text-green-600'
    if (changeValue < 0) return 'text-red-600'
    return 'text-muted-foreground'
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <p className={`text-xs ${getChangeColor(change)}`}>
            {formatChange(change)} {changeLabel}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
