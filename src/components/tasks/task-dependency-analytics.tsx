"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Link,
  AlertCircle,
  Clock,
  CheckCircle2,
  ArrowRight,
  Calendar,
} from "lucide-react"
import { TaskDependencyValidator } from "@/lib/task-dependency-validator"
import { formatDistanceToNow } from "date-fns"

interface Task {
  id: string
  title: string
  status: string
  dueDate: Date
  dependencies: string[]
  dependents: string[]
}

interface TaskDependencyAnalyticsProps {
  tasks: Task[]
}

export function TaskDependencyAnalytics({ tasks }: TaskDependencyAnalyticsProps) {
  const validator = useMemo(() => new TaskDependencyValidator(tasks), [tasks])

  const blockedTasks = useMemo(() => validator.getBlockedTasks(), [validator])
  const availableTasks = useMemo(() => validator.getAvailableTasks(), [validator])

  const tasksByDependencyCount = useMemo(() => {
    const counts = tasks.reduce<Record<number, number>>((acc, task) => {
      const count = task.dependencies.length
      acc[count] = (acc[count] || 0) + 1
      return acc
    }, {})

    return Object.entries(counts).map(([dependencies, count]) => ({
      dependencies: Number(dependencies),
      count,
    }))
  }, [tasks])

  const criticalPaths = useMemo(() => {
    return tasks
      .filter((task) => task.dependents.length === 0) // End tasks
      .map((task) => ({
        task,
        path: validator.getCriticalPath(task.id),
        completion: validator.getCompletionPercentage(task.id),
        estimatedCompletion: validator.getEstimatedCompletionDate(task.id),
      }))
  }, [tasks, validator])

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {tasks.filter((t) => t.status === "completed").length} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blockedTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              Waiting on dependencies
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableTasks.length}</div>
            <p className="text-xs text-muted-foreground">Ready to start</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Paths
            </CardTitle>
            <Link className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalPaths.length}</div>
            <p className="text-xs text-muted-foreground">End-to-end paths</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tasks by Dependencies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tasksByDependencyCount}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="dependencies"
                    label={{
                      value: "Number of Dependencies",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Number of Tasks",
                      angle: -90,
                      position: "insideLeft",
                    }}
                  />
                  <Tooltip />
                  <Bar dataKey="count" fill="#adfa1d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Critical Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalPaths.map(({ task, path, completion, estimatedCompletion }) => (
                <div key={task.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{task.title}</span>
                    <Badge variant="outline">
                      {path.length} tasks
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={completion} className="h-2" />
                    <span className="text-sm">{completion}%</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    {path.map((t, i) => (
                      <div key={t.id} className="flex items-center gap-1">
                        {i > 0 && <ArrowRight className="h-4 w-4" />}
                        <span>{t.title}</span>
                        <Badge
                          variant={
                            t.status === "completed"
                              ? "success"
                              : t.status === "in_progress"
                              ? "warning"
                              : "secondary"
                          }
                        >
                          {t.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  {estimatedCompletion && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Estimated completion{" "}
                        {formatDistanceToNow(estimatedCompletion, {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Blocked Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blockedTasks.map((task) => {
                const dependencies = task.dependencies
                  .map((id) => tasks.find((t) => t.id === id))
                  .filter((t): t is Task => t !== undefined)

                return (
                  <div key={task.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{task.title}</span>
                      <Badge variant="outline">
                        {dependencies.length} blocking
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      {dependencies.map((dep) => (
                        <div
                          key={dep.id}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <ArrowRight className="h-4 w-4" />
                          <span>{dep.title}</span>
                          <Badge
                            variant={
                              dep.status === "completed"
                                ? "success"
                                : dep.status === "in_progress"
                                ? "warning"
                                : "secondary"
                            }
                          >
                            {dep.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableTasks.map((task) => (
                <div key={task.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{task.title}</span>
                    <Badge
                      variant={
                        task.dependencies.length === 0 ? "success" : "secondary"
                      }
                    >
                      {task.dependencies.length === 0
                        ? "No dependencies"
                        : "Dependencies met"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Due {formatDistanceToNow(task.dueDate, { addSuffix: true })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
