import { useState } from 'react'
import { Task } from '@/app/page'
import { ConfirmDialog } from './ConfirmDialog'

interface TaskItemProps {
  task: Task
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggle(task.id, e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`mt-1 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                {task.description}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-400">
              Created {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => setShowConfirm(true)}
            className="text-red-600 hover:text-red-800 font-medium text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {showConfirm && (
        <ConfirmDialog
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          onConfirm={() => {
            onDelete(task.id)
            setShowConfirm(false)
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  )
}
