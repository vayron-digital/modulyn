interface Task {
  id: string
  title: string
  status: string
  dueDate: Date
  dependencies: string[]
  dependents: string[]
}

export class TaskDependencyValidator {
  private tasks: Task[]

  constructor(tasks: Task[]) {
    this.tasks = tasks
  }

  /**
   * Validates if adding a dependency would create a circular reference
   */
  hasCircularDependency(taskId: string, dependencyId: string): boolean {
    const visited = new Set<string>()
    const recursionStack = new Set<string>()

    const dfs = (currentId: string): boolean => {
      if (recursionStack.has(currentId)) {
        return true // Circular dependency found
      }

      if (visited.has(currentId)) {
        return false
      }

      visited.add(currentId)
      recursionStack.add(currentId)

      const task = this.tasks.find((t) => t.id === currentId)
      if (!task) return false

      // Check all dependencies
      for (const depId of task.dependencies) {
        if (dfs(depId)) {
          return true
        }
      }

      recursionStack.delete(currentId)
      return false
    }

    // Temporarily add the new dependency
    const task = this.tasks.find((t) => t.id === taskId)
    if (!task) return false

    const originalDependencies = [...task.dependencies]
    task.dependencies = [...task.dependencies, dependencyId]

    const hasCircular = dfs(taskId)

    // Restore original dependencies
    task.dependencies = originalDependencies

    return hasCircular
  }

  /**
   * Validates if dependencies have valid due dates (before the dependent task)
   */
  hasValidDueDates(taskId: string, dueDate: Date): boolean {
    const task = this.tasks.find((t) => t.id === taskId)
    if (!task) return true

    // Check if all dependencies are due before this task
    for (const depId of task.dependencies) {
      const dependency = this.tasks.find((t) => t.id === depId)
      if (dependency && dependency.dueDate >= dueDate) {
        return false
      }
    }

    // Check if all dependent tasks are due after this task
    for (const depId of task.dependents) {
      const dependent = this.tasks.find((t) => t.id === depId)
      if (dependent && dependent.dueDate <= dueDate) {
        return false
      }
    }

    return true
  }

  /**
   * Validates if completing a task would create inconsistencies
   */
  canCompleteTask(taskId: string): {
    valid: boolean
    reason?: string
  } {
    const task = this.tasks.find((t) => t.id === taskId)
    if (!task) return { valid: false, reason: "Task not found" }

    // Check if all dependencies are completed
    for (const depId of task.dependencies) {
      const dependency = this.tasks.find((t) => t.id === depId)
      if (dependency && dependency.status !== "completed") {
        return {
          valid: false,
          reason: `Dependency "${dependency.title}" is not completed`,
        }
      }
    }

    return { valid: true }
  }

  /**
   * Gets the critical path for a task
   */
  getCriticalPath(taskId: string): Task[] {
    const path: Task[] = []
    const visited = new Set<string>()

    const dfs = (currentId: string) => {
      if (visited.has(currentId)) return

      visited.add(currentId)
      const task = this.tasks.find((t) => t.id === currentId)
      if (!task) return

      // Add dependencies to path
      for (const depId of task.dependencies) {
        dfs(depId)
      }

      path.push(task)
    }

    dfs(taskId)
    return path
  }

  /**
   * Gets task completion percentage based on dependencies
   */
  getCompletionPercentage(taskId: string): number {
    const criticalPath = this.getCriticalPath(taskId)
    if (criticalPath.length === 0) return 0

    const completedTasks = criticalPath.filter(
      (task) => task.status === "completed"
    ).length

    return Math.round((completedTasks / criticalPath.length) * 100)
  }

  /**
   * Gets estimated completion date based on dependencies
   */
  getEstimatedCompletionDate(taskId: string): Date | null {
    const criticalPath = this.getCriticalPath(taskId)
    if (criticalPath.length === 0) return null

    // Find the latest due date in the critical path
    return new Date(
      Math.max(...criticalPath.map((task) => task.dueDate.getTime()))
    )
  }

  /**
   * Gets blocked tasks (tasks that can't be started due to dependencies)
   */
  getBlockedTasks(): Task[] {
    return this.tasks.filter((task) => {
      if (task.status === "completed") return false
      if (task.dependencies.length === 0) return false

      // Check if any dependency is not completed
      return task.dependencies.some((depId) => {
        const dependency = this.tasks.find((t) => t.id === depId)
        return dependency && dependency.status !== "completed"
      })
    })
  }

  /**
   * Gets available tasks (tasks that can be started)
   */
  getAvailableTasks(): Task[] {
    return this.tasks.filter((task) => {
      if (task.status === "completed") return false
      if (task.dependencies.length === 0) return true

      // Check if all dependencies are completed
      return task.dependencies.every((depId) => {
        const dependency = this.tasks.find((t) => t.id === depId)
        return dependency && dependency.status === "completed"
      })
    })
  }
}
