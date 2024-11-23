export function generateAvailabilityValue(): number {
  // Generate a random number between 15 and 100
  return Math.floor(Math.random() * (100 - 15 + 1)) + 15
}

export function getAvailabilityStatus(value: number) {
  if (value >= 70) return { value, color: 'bg-green-500', label: 'Available' }
  if (value >= 50) return { value, color: 'bg-yellow-500', label: 'Limited' }
  if (value >= 30) return { value, color: 'bg-orange-500', label: 'Low' }
  return { value, color: 'bg-red-500', label: 'Critical' }
} 