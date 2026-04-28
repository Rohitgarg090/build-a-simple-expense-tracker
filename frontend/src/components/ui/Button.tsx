import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  style?: React.CSSProperties
}

export const Button: React.FC<ButtonProps> = ({
  children, onClick, variant = 'primary', size = 'md',
  disabled = false, loading = false, type = 'button', className = '', style
}) => {
  const base: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    border: 'none', cursor: disabled || loading ? 'not-allowed' : 'pointer',
    fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500, borderRadius: '8px',
    transition: 'opacity 0.2s', opacity: disabled || loading ? 0.6 : 1,
    padding: size === 'sm' ? '6px 12px' : size === 'lg' ? '12px 24px' : '8px 16px',
    fontSize: size === 'sm' ? '13px' : size === 'lg' ? '16px' : '14px',
  }
  const variants: Record<string, React.CSSProperties> = {
    primary:   { backgroundColor: '#0d9488',   color: '#ffffff' },
    secondary: { backgroundColor: '#ffffff',   color: '#0f172a',    border: '1px solid #e2e8f0' },
    ghost:     { backgroundColor: 'transparent',     color: '#0f172a',    border: '1px solid transparent' },
    danger:    { backgroundColor: '#ef4444',      color: '#ffffff' },
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} style={{ ...base, ...variants[variant], ...(style ?? {}) }} className={className}>
      {loading ? '...' : children}
    </button>
  )
}