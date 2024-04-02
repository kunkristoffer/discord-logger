// Returns random item from array
export const getRandomFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Retturns random number from between
export const getRandomNumberBetween = (start, end) => {
  return Math.floor(Math.random() * (end - start + 1) + start)
}