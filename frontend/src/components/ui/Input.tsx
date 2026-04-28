import React from 'react'

interface InputProps {
  label?: string
  error?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  disabled?: boolean
  name?: string
  id?: string
  required?: boolean
  style?: React.CSSProperties
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export const Input: React.FC<InputProps> = ({
  label, error, placeholder, value, onChange,
  type = 'text', disabled = false, name, id, required = false, style, onKeyDown
}) => {
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', fontSize: '14px',
    backgroundColor: '#ffffff', color: '#0f172a',
    border: '1px solid ' + (error ? '#ef4444' : '#e2e8f0'),
    borderRadius: '8px', outline: 'none',
    fontFamily: 'Inter, system-ui, sans-serif', boxSizing: 'border-box',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
      {label && <label htmlFor={id} style={{ fontSize: '13px', fontWeight: 500, color: '#0f172a' }}>{label}{required && ' *'}</label>}
      <input id={id} name={name} type={type} placeholder={placeholder} value={value}
        onChange={onChange} disabled={disabled} required={required} onKeyDown={onKeyDown}
        style={{ ...inputStyle, ...(style ?? {}) }} />
      {error && <span style={{ fontSize: '12px', color: '#ef4444' }}>{error}</span>}
    </div>
  )
}