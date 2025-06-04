import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export function generateSchedule( employees, rule, year, month ){
  const events = []

  const monthStart = startOfMonth(new Date(year, month))
  const monthEnd = endOfMonth(monthStart)
  const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // 建立排班次數 map，盡量平均每人班數
  const assignCount = new Map();
  employees.forEach((e) => assignCount.set(e.name, 0))

  // 幫助隨機但公平：每次都排序後再抽
  const getAvailableEmployees = () =>
    [...assignCount.entries()]
      .sort((a, b) => a[1] - b[1]) // 排班少的優先
      .map(([name]) => name)

  for (const day of allDays) {
    const dow = day.getDay()
    if (rule && rule.dayOff && rule.dayOff.includes(dow)) continue

    for (const slot of rule.timeSlots) {
      const available = getAvailableEmployees()
      const assigned = available.slice(0, slot.required)

      for (const name of assigned) {
        const startTime = format(day, 'yyyy-MM-dd') + 'T' + slot.start
        const endTime = format(day, 'yyyy-MM-dd') + 'T' + slot.end

        events.push({
          title: `${name}（${slot.label}）`,
          start: startTime,
          end: endTime,
        })

        assignCount.set(name, (assignCount.get(name) || 0) + 1)
      }
    }
  }

  return events
}