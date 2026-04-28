'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/Badge'
import { tokens } from '@/styles/tokens'
import { PlusCircle, Trash2, Filter, DollarSign, TrendingUp, Tag } from 'lucide-react'

interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

const CATEGORIES = ['Food', 'Transport', 'Housing', 'Entertainment', 'Health', 'Shopping', 'Other']
const CATEGORY_COLORS: Record<string, string> = {
  Food: tokens.accent, Transport: tokens.primary, Housing: tokens.warning,
  Entertainment: '#8b5cf6', Health: tokens.error, Shopping: '#ec4899', Other: tokens.textMuted
}

const SAMPLE: Expense[] = [
  { id: '1', description: 'Grocery shopping', amount: 85.5, category: 'Food', date: '2024-06-10' },
  { id: '2', description: 'Monthly rent', amount: 1200, category: 'Housing', date: '2024-06-01' },
  { id: '3', description: 'Uber ride', amount: 18.75, category: 'Transport', date: '2024-06-12' },
  { id: '4', description: 'Netflix subscription', amount: 15.99, category: 'Entertainment', date: '2024-06-05' },
  { id: '5', description: 'Gym membership', amount: 45, category: 'Health', date: '2024-06-03' },
]

export default function Page() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All')
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    const stored = localStorage.getItem('expenses')
    setExpenses(stored ? JSON.parse(stored) : SAMPLE)
  }, [])

  const save = useCallback((data: Expense[]) => {
    setExpenses(data)
    localStorage.setItem('expenses', JSON.stringify(data))
  }, [])

  const addExpense = () => {
    if (!desc || !amount || isNaN(Number(amount))) return
    const next = [...expenses, { id: Date.now().toString(), description: desc, amount: Number(amount), category, date }]
    save(next)
    setDesc(''); setAmount(''); setCategory('Food'); setDate(new Date().toISOString().split('T')[0])
    setModalOpen(false)
  }

  const deleteExpense = (id: string) => save(expenses.filter(e => e.id !== id))

  const filtered = filterCategory === 'All' ? expenses : expenses.filter(e => e.category === filterCategory)
  const total = filtered.reduce((s, e) => s + e.amount, 0)
  const byCategory = CATEGORIES.map(c => ({ c, sum: expenses.filter(e => e.category === c).reduce((s, e) => s + e.amount, 0) })).filter(x => x.sum > 0)

  const cardStyle: React.CSSProperties = { padding: '16px', marginBottom: '8px' }
  const rowStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }

  return (
    <div style={{ background: tokens.background, minHeight: '100vh', fontFamily: tokens.fontFamily, padding: '24px 16px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ color: tokens.text, fontSize: '26px', fontWeight: 700, margin: 0 }}>💸 Expense Tracker</h1>
            <p style={{ color: tokens.textMuted, margin: '4px 0 0', fontSize: '14px' }}>Track and manage your spending</p>
          </div>
          <Button onClick={() => setModalOpen(true)}><PlusCircle size={16} style={{ marginRight: '6px' }} />Add Expense</Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <Card style={{ ...cardStyle, background: tokens.primary }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <DollarSign size={20} color={tokens.primaryFg} />
              <span style={{ color: tokens.primaryFg, fontSize: '13px', fontWeight: 600 }}>Total Spent</span>
            </div>
            <div style={{ color: tokens.primaryFg, fontSize: '28px', fontWeight: 800, marginTop: '6px' }}>${total.toFixed(2)}</div>
          </Card>
          <Card style={{ ...cardStyle, background: tokens.surface }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color={tokens.primary} />
              <span style={{ color: tokens.textMuted, fontSize: '13px', fontWeight: 600 }}>Transactions</span>
            </div>
            <div style={{ color: tokens.text, fontSize: '28px', fontWeight: 800, marginTop: '6px' }}>{filtered.length}</div>
          </Card>
        </div>

        <Card style={{ ...cardStyle, marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <Tag size={15} color={tokens.primary} />
            <span style={{ color: tokens.text, fontWeight: 600, fontSize: '13px' }}>Spending by Category</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {byCategory.map(({ c, sum }) => (
              <Badge key={c} style={{ background: CATEGORY_COLORS[c] + '20', color: CATEGORY_COLORS[c], border: '1px solid ' + CATEGORY_COLORS[c], padding: '4px 10px', borderRadius: '999px', fontSize: '12px' }}>
                {c}: ${sum.toFixed(0)}
              </Badge>
            ))}
          </div>
        </Card>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          <Filter size={15} color={tokens.textMuted} />
          {['All', ...CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setFilterCategory(cat)} style={{ padding: '4px 12px', borderRadius: '999px', border: '1px solid ' + (filterCategory === cat ? tokens.primary : tokens.border), background: filterCategory === cat ? tokens.primary : tokens.surface, color: filterCategory === cat ? tokens.primaryFg : tokens.textMuted, fontSize: '12px', cursor: 'pointer', fontWeight: filterCategory === cat ? 700 : 400 }}>
              {cat}
            </button>
          ))}
        </div>

        <div>
          {filtered.length === 0 && <p style={{ color: tokens.textMuted, textAlign: 'center', padding: '32px' }}>No expenses found.</p>}
          {filtered.sort((a, b) => b.date.localeCompare(a.date)).map(e => (
            <Card key={e.id} style={{ ...cardStyle }}>
              <div style={rowStyle}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: tokens.text, fontWeight: 600 }}>{e.description}</span>
                    <Badge style={{ background: CATEGORY_COLORS[e.category] + '20', color: CATEGORY_COLORS[e.category], fontSize: '11px', padding: '2px 8px', borderRadius: '999px' }}>{e.category}</Badge>
                  </div>
                  <span style={{ color: tokens.textMuted, fontSize: '12px' }}>{e.date}</span>
                </div>
                <span style={{ color: tokens.primary, fontWeight: 700, fontSize: '16px' }}>${e.amount.toFixed(2)}</span>
                <button onClick={() => deleteExpense(e.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tokens.error, padding: '4px' }}><Trash2 size={16} /></button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add New Expense">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Input placeholder="Description" value={desc} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value)} />
          <Input placeholder="Amount ($)" type="number" value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)} />
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding: '10px 12px', borderRadius: tokens.borderRadius, border: '1px solid ' + tokens.border, background: tokens.surface, color: tokens.text, fontSize: '14px', width: '100%' }}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <Input type="date" value={date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)} />
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <Button onClick={() => setModalOpen(false)} style={{ background: tokens.surfaceAlt, color: tokens.text }}>Cancel</Button>
            <Button onClick={addExpense}>Add Expense</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}