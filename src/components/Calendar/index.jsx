// ShiftScheduler.tsx
import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { formatISO, setHours, setMinutes } from 'date-fns'

const shiftTypes = [
  { label: '一般工時', value: 'normal' },
  { label: '二週變形工時', value: 'biweekly' },
  { label: '四週變形工時', value: 'fourweek' },
  { label: '八週變形工時', value: 'eightweek' },
]

export default function ShiftScheduler() {
  const [employeeName, setEmployeeName] = useState('')
  const [workType, setWorkType] = useState('normal')
  const [startTime, setStartTime] = useState('09:00')
  const [endTime, setEndTime] = useState('17:00')
  const [events, setEvents] = useState([])

  const handleAddShifts = () => {
    if (!employeeName) return alert('請輸入員工姓名')
    if (startTime >= endTime) return alert('上班時間必須早於下班時間')

    const today = new Date()
    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)

    const startDate = setMinutes(setHours(new Date(today), startHour), startMinute)
    const endDate = setMinutes(setHours(new Date(today), endHour), endMinute)

    const newEvent = {
      title: `${employeeName}（${shiftTypes.find(w => w.value === workType)?.label}）`,
      start: formatISO(startDate),
      end: formatISO(endDate),
      backgroundColor: '#64b5f6',
    }

    setEvents(prev => [...prev, newEvent])
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">排班系統（全職員工）</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="員工姓名"
          value={employeeName}
          onChange={e => setEmployeeName(e.target.value)}
          className="p-2 border rounded"
        />

        <select
          value={workType}
          onChange={e => setWorkType(e.target.value)}
          className="p-2 border rounded"
        >
          {shiftTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>

        <div className="flex gap-2 items-center">
          <label>上班時間：</label>
          <input
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="p-2 border rounded"
          />
          <span>～</span>
          <input
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      </div>

      <button
        onClick={handleAddShifts}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6"
      >
        加入排班
      </button>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'timeGridWeek,dayGridMonth',
        }}
        events={events}
        allDaySlot={false}
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        height="auto"
      />
    </div>
  )
}
