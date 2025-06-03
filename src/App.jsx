import React, { useState } from 'react';
import EmployeeForm from './components/Employ';

function App() {
  const [employeeList, setEmployeeList] = useState([])

  return (
    <div className="p-6">
      <EmployeeForm onEmployeeListChange={setEmployeeList} />
      {/* 後面還可以加 排班規則設定表單、產生按鈕、FullCalendar */}
    </div>
  )
}

export default App
