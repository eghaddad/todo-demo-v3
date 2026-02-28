import { Task } from '@/app/page'
import { TaskItem } from './TaskItem'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
