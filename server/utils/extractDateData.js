/**
 * This function takes a timestamp and returns an object where you can get specific segments from
 * @param {*} epoch timespamp
 * @returns Object with year, month, day
 */
const getYearMonthDay = (epoch) => {
  // Convert epoch to time object
  const date = new Date(epoch)

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  }
}

export default getYearMonthDay