import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useActivity } from "@/hooks/use-activity"
import { formatDistanceToNow } from "date-fns"

function getActivityDetails(activity: any) {
  switch (activity.activity_type) {
    case 'event_registration':
      return {
        action: 'registered for',
        target: activity.metadata?.event_title || 'an event',
      }
    case 'certification_completed':
      return {
        action: 'completed',
        target: activity.metadata?.certification_name || 'a certification',
      }
    case 'membership_renewal':
      return {
        action: 'renewed',
        target: 'membership subscription',
      }
    case 'comment_added':
      return {
        action: 'commented on',
        target: activity.metadata?.content_title || 'a post',
      }
    default:
      return {
        action: activity.activity_type.replace(/_/g, ' '),
        target: activity.description || '',
      }
  }
}

export function RecentActivity() {
  const { activities, isLoading } = useActivity()

  if (isLoading) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {activities?.map((activity) => {
        const { action, target } = getActivityDetails(activity)
        const initials = activity.profiles?.first_name?.[0] + activity.profiles?.last_name?.[0] || '??'
        const name = `${activity.profiles?.first_name || ''} ${activity.profiles?.last_name || ''}`
        const time = formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })

        return (
          <div key={activity.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={activity.profiles?.profile_image_url} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {name}
                <span className="text-muted-foreground"> {action} </span>
                {target}
              </p>
              <p className="text-sm text-muted-foreground">
                {time}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}