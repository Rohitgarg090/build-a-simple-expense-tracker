import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default'
  className?: string
  style?: React.CSSProperties
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '', style: customStyle }) => {
  const colors: Record<string, React.CSSProperties> = {
    success: { backgroundColor: '#22c55e' + '20', color: '#22c55e' },
    warning: { backgroundColor: '#f59e0b' + '20', color: '#f59e0b' },
    error:   { backgroundColor: '#ef4444'   + '20', color: '#ef4444'   },
    info:    { backgroundColor: '#6366f1'  + '20', color: '#6366f1'  },
    default: { backgroundColor: '#ffffff',         color: '#64748b', border: '1px solid #e2e8f0' },
  }
  const style: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center',
    padding: '2px 8px', borderRadius: '999px',
    fontSize: '12px', fontWeight: 500,
    ...colors[variant],
    ...(customStyle ?? {}),
  }
  return <span style={style} className={className}>{children}</span>
}