import React, { useCallback, useState } from 'react';
import EmployeeForm from './components/Employ';
import ScheduleRuleForm from './components/ScheduleForm';
import ScheduleCalendar from './components/ScheduleCalendar';
import MonthPicker from './components/MonthPicker';
import { generateSchedule } from './util';

function App() {
  const [employeeList, setEmployeeList] = useState([]);
  const [scheduleRule, setScheduleRule] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(5);

  const handleGenerate = useCallback(() => {
    if (!scheduleRule || employeeList.length === 0) {
      alert('請先輸入員工與排班規則')
      return
    }

    const generated = generateSchedule(employeeList, scheduleRule, selectedYear, selectedMonth) // 2025/09
    setEvents(generated);
  },[employeeList, scheduleRule, selectedYear, selectedMonth])

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">📋 員工排班系統</h1>

      <MonthPicker
        year={selectedYear}
        month={selectedMonth}
        onChange={(year, month) => {
          setSelectedYear(year)
          setSelectedMonth(month - 1)
        }}
      />

      <EmployeeForm onEmployeeListChange={setEmployeeList} />
      <ScheduleRuleForm onRuleChange={setScheduleRule} />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleGenerate}
      >
        產生這個月班表（暫時 console 輸出）
      </button>
      {events.length > 0 && <ScheduleCalendar events={events} year={selectedYear} month={selectedMonth}/>}
    </div>
  )
}

export default App
