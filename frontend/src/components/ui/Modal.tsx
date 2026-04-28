'use client'
import React, { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, style: customStyle }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const overlay: React.CSSProperties = {
    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
  }
  const box: React.CSSProperties = {
    backgroundColor: '#ffffff', borderRadius: '8px',
    padding: '24px', minWidth: '320px', maxWidth: '90vw',
    maxHeight: '90vh', overflow: 'auto',
    border: '1px solid #e2e8f0',
    ...(customStyle ?? {}),
  }
  const header: React.CSSProperties = {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '16px',
  }
  return (
    <div style={overlay} onClick={onClose}>
      <div style={box} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div style={header}>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>{title}</h2>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#64748b' }}>×</button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}