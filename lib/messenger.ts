import type { Bundle } from '@/config/product.config'

export type OrderPayload = {
  name: string
  phone: string
  address: string
  bundle: Bundle
  quantity: number
  notes?: string
}

export function buildOrderMessage(payload: OrderPayload, productName: string): string {
  const total = payload.bundle.price * payload.quantity
  const lines = [
    `Hi! I'd like to order ${productName}.`,
    '',
    `Bundle: ${payload.bundle.label} (${payload.bundle.bottles}×${payload.bundle.sizeMl} mL)`,
    `Quantity: ${payload.quantity}`,
    `Estimated total: ₱${total}`,
    '',
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Address: ${payload.address}`,
    payload.notes ? `Notes: ${payload.notes}` : null,
  ].filter(Boolean)

  return lines.join('\n')
}

export function getMessengerUrl(messengerUrl: string): string {
  return messengerUrl.trim()
}
