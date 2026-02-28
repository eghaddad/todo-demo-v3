'use client'

import { useEffect, useState } from 'react'
import { TaskForm } from '@/components/TaskForm'
import { TaskList } from '@/components/TaskList'
import { EmptyState } from '@/components/EmptyState'
import { Toast } from '@/components/Toast'
import { fetchTasks, createTask, updateTask, deleteTask } from '@/lib/api'

export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const data = await fetchTasks()
      setTasks(data)
    } catch (error) {
      showToast('Failed to load tasks', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (title: string, description: string) => {
    try {
      const newTask = await createTask(title, description)
      setTasks([newTask, ...tasks])
      showToast('Task created successfully', 'success')
    } catch (error) {
      showToast('Failed to create task', 'error')
      throw error
    }
  }

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      const updated = await updateTask(id, { completed })
      setTasks(tasks.map(t => t.id === id ? updated : t))
      showToast('Task updated', 'success')
    } catch (error) {
      showToast('Failed to update task', 'error')
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter(t => t.id !== id))
      showToast('Task deleted', 'success')
    } catch (error) {
      showToast('Failed to delete task', 'error')
    }
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">📝 TODO Demo V3</h1>
      
      <TaskForm onSubmit={handleCreateTask} />
      
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <EmptyState />
      ) : (
        <TaskList
          tasks={tasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </main>
  )
}
