import React, { useState } from 'react'

// interface Employee {
//   name: string
//   scheduleType: '一般' | '二週' | '四週' | '八週'
// }

export default function EmployeeForm({
  onEmployeeListChange,
}) {
  const [name, setName] = useState('')
  const [employees, setEmployees] = useState([
    // {name: "蔡如安"},
    // {name: "理權恩"},
    // {name: "林雅茹"},
    // {name: "菜種恩"},
    // {name: "鄧以軒"},
    // {name: "詹又成"},
    // {name: "裝置成"},
    // {name: "徐翊豪"},
    // {name: "周衍明"},
    // {name: "范修鴻"},
  ])

  const addEmployee = () => {
    if (!name.trim()) return
    const newList = [...employees, { name }]
    setEmployees(newList)
    onEmployeeListChange(newList)
    setName('')
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
        <button onClick={addEmployee} className="bg-blue-500 text-white px-3 py-1 rounded">
          新增員工
        </button>
      </div>

      <ul className="list-disc pl-5">
        {employees.map((emp, idx) => (
          <li key={idx}>
            {emp.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
