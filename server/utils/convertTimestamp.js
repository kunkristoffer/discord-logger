export const timestampToHourMinute = (timestamp) => {
  // Check if timestamp is a number, if not, return arg
  if (typeof timestamp !== 'number') return timestamp

  const time = new Date(timestamp)
  const hour = time.getHours() <= 9 ? '0' + time.getHours() : time.getHours()
  const minutes = time.getMinutes() <= 9 ? '0' + time.getMinutes() : time.getMinutes()

  return `${hour}:${minutes}`
}

export const dateToHourMinute = (date) => {
  // Check if timestamp is a date, if not, return arg
  if (date instanceof Date && !isNaN(date)) {
    const hour = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()

    return `${hour}:${minutes}`
  } else {
    return date
  }
}