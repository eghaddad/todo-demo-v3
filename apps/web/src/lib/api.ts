const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function fetchTasks() {
  const res = await fetch(`${API_URL}/api/tasks`)
  if (!res.ok) throw new Error('Failed to fetch tasks')
  return res.json()
}

export async function createTask(title: string, description: string) {
  const res = await fetch(`${API_URL}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  })
  if (!res.ok) throw new Error('Failed to create task')
  return res.json()
}

export async function updateTask(id: string, updates: { completed?: boolean; title?: string; description?: string }) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  if (!res.ok) throw new Error('Failed to update task')
  return res.json()
}

export async function deleteTask(id: string) {
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Failed to delete task')
}
