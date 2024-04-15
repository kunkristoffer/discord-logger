/**
 * Functions takes a string param and checks if it contains keywords indication user is working remote
 * @param {*} string
 * @returns
 */
export const isUserRemote = (string) => {
  // Check if input is string, if not, break
  if (typeof string !== 'string') return

  // check if string contains some variation of "hjemmekontor"
  const regex = new RegExp('[hH][kK]|[hH][jJeEkK][eEmM]')

  // return true if regex statement passes evaluation
  if (regex.test(string)) return true
  return false
}