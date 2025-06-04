// ScheduleCalendar.tsx
import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function ScheduleCalendar({ events, year, month }) {
  const paddedMonth = (month + 1).toString().padStart(2, '0');
  const initialDate = `${year}-${paddedMonth}-01`;
  console.log(initialDate)

  console.log(events)
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">🗓 本月排班月曆</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        initialDate={initialDate} // 顯示指定年月
        events={events}
        headerToolbar={false} // 不顯示任何導航按鈕
        fixedWeekCount={false} // 自動顯示幾週
        height="auto"
      />
    </div>
  )
}
