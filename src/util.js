import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

export function generateSchedule(employees, rule, year, month) {
  const events = []

  const monthStart = startOfMonth(new Date(year, month))
  const monthEnd = endOfMonth(monthStart)
  const allDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // 依據 scheduleType 設定每位員工的最大可排時數
  const scheduleLimits = {
    normal: 160,
    twoWeekFlex: 80,
    fourWeekFlex: 160,
    eightWeekFlex: 320,
  }

  const maxHoursPerEmployee = scheduleLimits[rule.scheduleType || 'normal']

  // 每位員工已排幾小時
  const workHours = new Map()
  employees.forEach((e) => workHours.set(e.name, 0))

  // 幫助隨機但公平地分配
  const getAvailableEmployees = (hoursRequired) =>
    [...workHours.entries()]
      .filter(([_, hours]) => hours + hoursRequired <= maxHoursPerEmployee)
      .sort((a, b) => a[1] - b[1]) // 優先分配給目前排班較少者
      .map(([name]) => name)

  for (const day of allDays) {
    const dow = day.getDay()
    if (rule?.dayOff?.includes(dow)) continue

    for (const slot of rule.timeSlots) {
      const [startHour] = slot.start.split(':').map(Number)
      const [endHour] = slot.end.split(':').map(Number)
      const hours = endHour - startHour

      const available = getAvailableEmployees(hours)
      const assigned = available.slice(0, slot.required)

      for (const name of assigned) {
        const startTime = format(day, 'yyyy-MM-dd') + 'T' + slot.start
        const endTime = format(day, 'yyyy-MM-dd') + 'T' + slot.end

        events.push({
          title: `${name}（${slot.label}）`,
          start: startTime,
          end: endTime,
        })

        workHours.set(name, (workHours.get(name) || 0) + hours)
      }
    }
  }

  return events
}

export function calculateStats(events) {
  const stats = {};

  for (const event of events) {
    const nameMatch = event.title.match(/^(.+?)（(.+?)）$/);
    if (!nameMatch) continue;

    const [, name, shift] = nameMatch;
    const start = new Date(event.start);
    const end = new Date(event.end);
    const hours = (end - start) / (1000 * 60 * 60);

    if (!stats[name]) {
      stats[name] = {
        totalHours: 0,
        shifts: {}
      };
    }

    stats[name].totalHours += hours;
    stats[name].shifts[shift] = (stats[name].shifts[shift] || 0) + 1;
  }

  return stats;
}