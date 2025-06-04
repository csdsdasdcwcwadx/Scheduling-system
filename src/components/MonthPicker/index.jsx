import React from 'react'

export default function MonthPicker({
  year,
  month,
  onChange,
}) {
  const handleYearChange = (e) => {
    onChange(parseInt(e.target.value), month)
  }

  const handleMonthChange = (e) => {
    onChange(year, parseInt(e.target.value))
  }

  return (
    <div className="flex items-center gap-2">
      <label>📆 排班年月：</label>
      <select value={year} onChange={handleYearChange} className="border px-2 py-1">
        {Array.from({ length: 7 }, (_, i) => 2024 + i).map((y) => (
          <option key={y} value={y}>
            {y} 年
          </option>
        ))}
      </select>
      <select value={month} onChange={handleMonthChange} className="border px-2 py-1">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
          <option key={m} value={m}>
            {m} 月
          </option>
        ))}
      </select>
    </div>
  )
}
