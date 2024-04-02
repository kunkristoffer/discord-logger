// Returns random item from array
export const getRandomFromArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Retturns random number from between
export const getRandomNumberBetween = (from, to) => {
  return Math.floor(Math.random() * (to - from) + from)
}