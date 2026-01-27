'use client'

import { useState, useRef, useEffect } from 'react'

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date(value))
  const dropdownRef = useRef<HTMLDivElement>(null)

  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ]

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  const formatISODate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day)
    setSelectedDate(newDate)
    onChange(formatISODate(newDate))
    setIsOpen(false)
  }

  const handleMonthChange = (monthIndex: number) => {
    const newDate = new Date(selectedDate.getFullYear(), monthIndex, selectedDate.getDate())
    setSelectedDate(newDate)
  }

  const handleYearChange = (year: number) => {
    const newDate = new Date(year, selectedDate.getMonth(), selectedDate.getDate())
    setSelectedDate(newDate)
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedDate)
    const firstDay = getFirstDayOfMonth(selectedDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="w-8 h-8" />
      )
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate.getDate()
      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`
            w-8 h-8 text-xs font-mono transition-all duration-200
            hover:bg-purple-500/20 hover:text-purple-300
            ${isSelected 
              ? 'bg-purple-500 text-black font-bold shadow-[0_0_10px_rgba(168,85,247,0.5)] border-purple-400' 
              : 'text-zinc-400 hover:text-white border-transparent hover:border-purple-500/30'
            }
            border rounded-sm relative overflow-hidden
            hover:shadow-[0_0_8px_rgba(168,85,247,0.3)]
            active:scale-95
          `}
        >
          {day}
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
        </button>
      )
    }

    return days
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Input Display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full bg-transparent border-b border-zinc-700 text-xl font-mono 
          focus:outline-none focus:border-purple-500 text-white pb-2
          hover:border-purple-400 transition-colors duration-200
          text-left flex items-center justify-between group
        "
      >
        <span className="tracking-wider">{formatDate(selectedDate)}</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
          <svg 
            className={`w-4 h-4 text-purple-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Calendar */}
      {isOpen && (
        <div className="
          absolute top-full left-0 mt-2 z-50
          bg-black/95 backdrop-blur-md border border-purple-500/30
          rounded-lg p-4 shadow-[0_0_30px_rgba(168,85,247,0.2)]
          min-w-[280px]
          animate-in fade-in slide-in-from-top-2 duration-200
          before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/5 before:to-transparent before:rounded-lg before:pointer-events-none
        ">
          {/* Glitch overlay */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
          
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
            {/* Month Selector */}
            <select
              value={selectedDate.getMonth()}
              onChange={(e) => handleMonthChange(parseInt(e.target.value))}
              className="
                bg-black/80 text-purple-400 font-mono text-sm
                border border-purple-500/30 rounded px-2 py-1
                focus:outline-none focus:border-purple-400
                hover:bg-purple-950/20 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)]
                transition-all duration-200
              "
            >
              {months.map((month, index) => (
                <option key={month} value={index} className="bg-black text-purple-400">
                  {month}
                </option>
              ))}
            </select>

            {/* Year Selector */}
            <select
              value={selectedDate.getFullYear()}
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
              className="
                bg-black/80 text-purple-400 font-mono text-sm
                border border-purple-500/30 rounded px-2 py-1
                focus:outline-none focus:border-purple-400
                hover:bg-purple-950/20 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)]
                transition-all duration-200
              "
            >
              {Array.from({ length: 80 }, (_, i) => 2024 - i).map(year => (
                <option key={year} value={year} className="bg-black text-purple-400">
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="w-8 h-6 text-xs font-mono text-zinc-600 flex items-center justify-center border-b border-zinc-800/50">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-2 border-t border-zinc-800 flex justify-between items-center">
            <span className="text-[9px] text-zinc-600 font-mono uppercase tracking-wider">
              Temporal Coordinates
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="
                text-[10px] text-purple-400 hover:text-purple-300
                border border-purple-500/30 hover:border-purple-400
                px-2 py-1 rounded-sm font-mono
                transition-all duration-200
                hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]
                hover:bg-purple-950/20
              "
            >
              LOCK_IN
            </button>
          </div>
        </div>
      )}
    </div>
  )
}