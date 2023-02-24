export function convertMinutesInHours(hours: number): string {
  const movieHours = (hours / 60).toString().substring(0, 1)
  const movieMinutes = (hours % 60).toString().substring(0, 2)

  return `${movieHours}h ${movieMinutes}min`
}