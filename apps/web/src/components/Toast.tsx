interface ToastProps {
  message: string
  type: 'success' | 'error'
}

export function Toast({ message, type }: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className={`rounded-lg shadow-lg p-4 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
      } text-white`}>
        {message}
      </div>
    </div>
  )
}
