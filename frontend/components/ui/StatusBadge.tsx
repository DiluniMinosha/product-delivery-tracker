import React from 'react'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusClasses = (status: string) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'In Transit':
        return 'bg-blue-100 text-blue-800'
      case 'Failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <span 
      className={cn(
        'px-2 py-1 rounded-full text-xs font-medium',
        getStatusClasses(status)
      )}
    >
      {status}
    </span>
  )
}