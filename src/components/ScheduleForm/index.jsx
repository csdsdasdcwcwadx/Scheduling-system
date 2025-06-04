import React, { useState, useEffect } from 'react'

export default function ScheduleForm({
  onRuleChange,
}) {
  const [timeSlots, setTimeSlots] = useState([
    { label: '早班', start: '08:00', end: '14:00', required: 1 },
    { label: '中班', start: '15:00', end: '20:00', required: 1 }
  ])
  const [dayOff, setDayOff] = useState([])

  const handleAddTimeSlot = () => {
    setTimeSlots([
      ...timeSlots,
      { label: '', start: '', end: '', required: 1 },
    ])
  }

  const handleRemoveTimeSlot = (index) => {
    const updated = [...timeSlots]
    updated.splice(index, 1)
    setTimeSlots(updated)
  }

  const handleChange = (
    index,
    key,
    value
  ) => {
    const updated = [...timeSlots]
    updated[index][key] = value
    setTimeSlots(updated)
  }

  const toggleDayOff = (day) => {
    setDayOff((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  useEffect(() => {
    onRuleChange({ timeSlots, dayOff })
  }, [timeSlots, dayOff, onRuleChange])

  return (
    <div>
      <h2 className="text-lg font-semibold">📅 排班規則設定</h2>

      {timeSlots.map((slot, idx) => (
        <div key={idx} className="flex gap-2 items-center mb-2">
          <input
            type="text"
            value={slot.label}
            placeholder="名稱（如：早班）"
            onChange={(e) => handleChange(idx, 'label', e.target.value)}
            className="border px-2 py-1 w-24"
          />
          <input
            type="time"
            value={slot.start}
            onChange={(e) => handleChange(idx, 'start', e.target.value)}
            className="border px-2 py-1"
          />
          <span>→</span>
          <input
            type="time"
            value={slot.end}
            onChange={(e) => handleChange(idx, 'end', e.target.value)}
            className="border px-2 py-1"
          />
          <input
            type="number"
            value={slot.required}
            min={1}
            onChange={(e) =>
              handleChange(idx, 'required', parseInt(e.target.value, 10))
            }
            className="border px-2 py-1 w-16"
          />
          <button
            onClick={() => handleRemoveTimeSlot(idx)}
            className="text-red-500 ml-2"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        onClick={handleAddTimeSlot}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        ➕ 新增時段
      </button>

      <div className="mt-4">
        <label className="block font-medium mb-1">🛑 公休日（可複選）：</label>
        <div className="flex gap-2 flex-wrap">
          {['日', '一', '二', '三', '四', '五', '六'].map((label, i) => (
            <label key={i} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={dayOff.includes(i)}
                onChange={() => toggleDayOff(i)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
