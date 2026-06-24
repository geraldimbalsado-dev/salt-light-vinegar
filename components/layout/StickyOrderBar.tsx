'use client'

import { useEffect, useState } from 'react'
import { formatPrice } from '@/lib/format'
import { useOrder } from '@/context/OrderContext'
import Button from '@/components/ui/Button'

export default function StickyOrderBar() {
  const { selectedBundle, quantity } = useOrder()
  const [visible, setVisible] = useState(false)
  const lineTotal = selectedBundle.price * quantity

  useEffect(() => {
    const checkout = document.getElementById('checkout')
    if (!checkout) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -20% 0px' }
    )
    observer.observe(checkout)
    return () => observer.disconnect()
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden"
      role="region"
      aria-label="Continue your order"
    >
      <div className="mx-auto flex max-w-lg items-center gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {selectedBundle.label} × {quantity}
          </p>
          <p className="text-sm text-accent">{formatPrice(lineTotal)}</p>
        </div>
        <Button
          variant="messenger"
          size="md"
          onClick={() => {
            document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
