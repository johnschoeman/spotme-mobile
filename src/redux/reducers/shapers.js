export const arrayToObj = (array) => {
  const result = {}
  for (let i = 0; i < array.length; i++) {
    const el = array[i]
    result[el.id] = el
  }
  return result
}
