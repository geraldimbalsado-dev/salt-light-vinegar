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
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    )
    observer.observe(checkout)
    return () => observer.disconnect()
  }, [])

  if (!visible) return null

  function scrollToOrder() {
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/98 shadow-[0_-8px_24px_rgba(44,26,14,0.08)] backdrop-blur-md"
      role="region"
      aria-label="Continue your order"
    >
      <div className="section-shell flex items-center gap-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:gap-4 sm:py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-ui-sm font-semibold text-foreground">
            {selectedBundle.label} × {quantity}
          </p>
          <p className="text-ui-sm font-medium text-accent">{formatPrice(lineTotal)}</p>
        </div>
        <Button variant="primary" size="md" className="shrink-0 px-5" onClick={scrollToOrder}>
          Order now
        </Button>
      </div>
    </div>
  )
}
