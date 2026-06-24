export function isValidPhilippinePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return /^09\d{9}$/.test(digits) || /^639\d{9}$/.test(digits)
}
