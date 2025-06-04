import React, { useState } from 'react'

// interface Employee {
//   name: string
//   scheduleType: '一般' | '二週' | '四週' | '八週'
// }

export default function EmployeeForm({
  onEmployeeListChange,
}) {
  const [name, setName] = useState('')
  const [scheduleType, setScheduleType] = useState('一般');
  const [employees, setEmployees] = useState([
    {name: "蔡如安", scheduleType: '一般'},
    {name: "理權恩", scheduleType: '一般'},
    {name: "林雅茹", scheduleType: '一般'},
    {name: "菜種恩", scheduleType: '一般'},
    {name: "鄧以軒", scheduleType: '一般'},
    {name: "詹又成", scheduleType: '一般'},
    {name: "裝置成", scheduleType: '一般'},
    {name: "徐翊豪", scheduleType: '一般'},
    {name: "周衍明", scheduleType: '一般'},
    {name: "范修鴻", scheduleType: '一般'},
  ])

  const addEmployee = () => {
    if (!name.trim()) return
    const newList = [...employees, { name, scheduleType }]
    setEmployees(newList)
    onEmployeeListChange(newList)
    setName('')
    setScheduleType('一般')
  }

  return (
    <div className="p-4 border rounded-lg mb-6">
      <h2 className="text-lg font-bold mb-2">👤 員工設定</h2>
      <div className="flex gap-4 mb-2">
        <input
          type="text"
          placeholder="輸入員工姓名"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <select
          value={scheduleType}
          onChange={(e) => setScheduleType(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="一般">一般</option>
          <option value="二週">二週</option>
          <option value="四週">四週</option>
          <option value="八週">八週</option>
        </select>
        <button onClick={addEmployee} className="bg-blue-500 text-white px-3 py-1 rounded">
          新增員工
        </button>
      </div>

      <ul className="list-disc pl-5">
        {employees.map((emp, idx) => (
          <li key={idx}>
            {emp.name}（{emp.scheduleType} 工時）
          </li>
        ))}
      </ul>
    </div>
  )
}
