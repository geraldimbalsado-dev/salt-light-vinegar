export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function bundleSummary(bundle: {
  label: string
  bottles: number
  sizeMl: number
}): string {
  return `${bundle.label} — ${bundle.bottles}×${bundle.sizeMl} mL`
}
