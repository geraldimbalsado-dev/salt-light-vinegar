'use client'

import Image from 'next/image'
import type { Bundle } from '@/config/product.config'
import { formatPrice } from '@/lib/format'
import { useOrder } from '@/context/OrderContext'

type BundleSelectorProps = {
  bundles: Bundle[]
}

function bundleAriaLabel(bundle: Bundle, savings: number): string {
  const parts = [
    bundle.label,
    bundle.description,
    formatPrice(bundle.price),
    bundle.badge,
    savings > 0 ? `Save ${formatPrice(savings)}` : null,
  ].filter(Boolean)
  return parts.join('. ')
}

export default function BundleSelector({ bundles }: BundleSelectorProps) {
  const { selectedBundleId, setSelectedBundleId } = useOrder()

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-ui-sm font-medium text-foreground">Choose your bundle</legend>
      <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-3 sm:gap-3">
        {bundles.map((bundle) => {
          const selected = bundle.id === selectedBundleId
          const savings =
            bundle.compareAtPrice != null ? bundle.compareAtPrice - bundle.price : 0

          return (
            <button
              key={bundle.id}
              type="button"
              onClick={() => setSelectedBundleId(bundle.id)}
              className={`relative flex w-full flex-row items-center gap-3 overflow-hidden rounded-2xl border-2 p-3 text-left transition-all active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:flex-col sm:items-start sm:p-4 ${
                selected
                  ? 'border-accent bg-accent/5 shadow-sm'
                  : 'border-border bg-card active:border-accent/40'
              }`}
              aria-pressed={selected}
              aria-label={bundleAriaLabel(bundle, savings)}
            >
              <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl bg-surface sm:mb-3 sm:aspect-[4/5] sm:h-auto sm:w-full">
                <Image
                  src={bundle.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 72px, 33vw"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1 sm:w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-ui-base font-semibold text-foreground sm:text-ui-lg">
                    {bundle.label}
                  </span>
                  {bundle.badge && (
                    <span className="rounded-full bg-palm px-2 py-0.5 text-ui-xs font-semibold text-white">
                      {bundle.badge}
                    </span>
                  )}
                </div>
                <span className="mt-0.5 block text-ui-xs leading-snug text-muted sm:mt-1">
                  {bundle.description}
                </span>
                <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2 sm:mt-auto sm:pt-2">
                  <span className="font-semibold text-accent sm:pt-1">
                    {formatPrice(bundle.price)}
                  </span>
                  {savings > 0 && (
                    <span className="text-ui-xs text-palm">Save {formatPrice(savings)}</span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
