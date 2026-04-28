export const tokens = {
  primary: '#0d9488',
  primaryFg: '#ffffff',
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceAlt: '#f1f5f9',
  text: '#0f172a',
  textMuted: '#64748b',
  accent: '#6366f1',
  error: '#ef4444',
  success: '#22c55e',
  warning: '#f59e0b',
  border: '#e2e8f0',
  fontFamily: 'Inter, system-ui, sans-serif',
  borderRadius: '8px',
} as const
export type Tokens = typeof tokens