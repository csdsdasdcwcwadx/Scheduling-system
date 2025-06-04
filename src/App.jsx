import React, { useCallback, useState } from 'react';
import EmployeeForm from './components/Employ';
import ScheduleRuleForm from './components/ScheduleForm';
import ScheduleCalendar from './components/ScheduleCalendar';
import MonthPicker from './components/MonthPicker';
import { generateSchedule, calculateStats } from './util';

// 休假問題
// PT問題
// 禮拜幾需要比較多人
// 客製化排班需求
function App() {
  const [employeeList, setEmployeeList] = useState([]);
  const [scheduleRule, setScheduleRule] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [employeeStats, setEmployeeStats] = useState({});

  const handleGenerate = useCallback(() => {
    if (!scheduleRule || employeeList.length === 0) {
      alert('請先輸入員工與排班規則')
      return
    }

    const generated = generateSchedule(employeeList, scheduleRule, selectedYear, selectedMonth) // 2025/09
    setEvents(generated);

    const stats = calculateStats(generated); // ← 這裡加上統計
    setEmployeeStats(stats);
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

      {Object.keys(employeeStats).length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">📊 員工統計</h2>
          <table className="w-full border mt-2 text-left">
            <thead>
              <tr>
                <th className="border px-2 py-1">姓名</th>
                <th className="border px-2 py-1">總時數</th>
                <th className="border px-2 py-1">班別分布</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(employeeStats).map(([name, stat]) => (
                <tr key={name}>
                  <td className="border px-2 py-1">{name}</td>
                  <td className="border px-2 py-1">{stat.totalHours} 小時</td>
                  <td className="border px-2 py-1">
                    {Object.entries(stat.shifts).map(
                      ([shiftName, count]) => `${shiftName}：${count} 次`
                    ).join('、')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App
