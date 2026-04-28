import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: string
  onClick?: () => void
  style?: React.CSSProperties
}

export const Card: React.FC<CardProps> = ({ children, className = '', padding = '20px', onClick, style: customStyle }) => {
  const style: React.CSSProperties = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding,
    ...(customStyle ?? {}),
    cursor: onClick ? 'pointer' : 'default',
  }
  return <div style={style} className={className} onClick={onClick}>{children}</div>
}