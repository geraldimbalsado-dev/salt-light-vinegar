'use client'

import Image from 'next/image'
import type { Bundle } from '@/config/product.config'
import { formatPrice } from '@/lib/format'
import { useOrder } from '@/context/OrderContext'

type BundleSelectorProps = {
  bundles: Bundle[]
}

export default function BundleSelector({ bundles }: BundleSelectorProps) {
  const { selectedBundleId, setSelectedBundleId } = useOrder()

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-medium text-foreground">Choose your bundle</legend>
      <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0">
        {bundles.map((bundle) => {
          const selected = bundle.id === selectedBundleId
          const savings =
            bundle.compareAtPrice != null
              ? bundle.compareAtPrice - bundle.price
              : 0

          return (
            <button
              key={bundle.id}
              type="button"
              onClick={() => setSelectedBundleId(bundle.id)}
              className={`relative flex w-[11.5rem] shrink-0 snap-start flex-col items-start overflow-hidden rounded-2xl border-2 p-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:w-auto sm:p-4 ${
                selected
                  ? 'border-accent bg-accent/5 shadow-sm'
                  : 'border-border bg-card hover:border-accent/40'
              }`}
              aria-pressed={selected}
            >
              <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-xl bg-surface sm:aspect-[4/5]">
                <Image
                  src={bundle.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 160px, 33vw"
                  className="object-cover"
                />
              </div>
              {bundle.badge && (
                <span className="mb-1.5 rounded-full bg-palm px-2 py-0.5 text-[10px] font-semibold text-white sm:mb-2 sm:px-2.5 sm:text-xs">
                  {bundle.badge}
                </span>
              )}
              <span className="font-display text-base font-semibold text-foreground sm:text-lg">
                {bundle.label}
              </span>
              <span className="mt-0.5 text-[11px] leading-snug text-muted sm:mt-1 sm:text-xs">
                {bundle.description}
              </span>
              <span className="mt-auto pt-2 font-semibold text-accent sm:pt-3">
                {formatPrice(bundle.price)}
              </span>
              {savings > 0 && (
                <span className="text-[11px] text-palm sm:text-xs">
                  Save {formatPrice(savings)}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
