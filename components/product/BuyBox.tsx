'use client'

import { useRef, useState, type FormEvent } from 'react'
import type { ProductConfig } from '@/config/product.config'
import productConfig from '@/config/product.config'
import { formatPrice } from '@/lib/format'
import { buildOrderMessage, getMessengerUrl } from '@/lib/messenger'
import { isValidPhilippinePhone } from '@/lib/validation'
import { useOrder } from '@/context/OrderContext'
import BundleSelector from './BundleSelector'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'

type BuyBoxProps = {
  product: ProductConfig['product']
  bundles: ProductConfig['bundles']
  trust: ProductConfig['trust']
}

type FormState = {
  name: string
  phone: string
  address: string
  notes: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const fieldOrder: (keyof FormState)[] = ['name', 'phone', 'address']

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <a
      href="#testimonials"
      className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
    >
      <span className="text-accent" aria-hidden>
        ★
      </span>
      <span>
        {rating.toFixed(1)} · {count} reviews
      </span>
    </a>
  )
}

export default function BuyBox({ product, bundles, trust }: BuyBoxProps) {
  const { selectedBundle, quantity, setQuantity } = useOrder()
  const lineTotal = selectedBundle.price * quantity
  const formRef = useRef<HTMLFormElement>(null)

  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    address: '',
    notes: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.phone.trim()) {
      next.phone = 'Phone number is required'
    } else if (!isValidPhilippinePhone(form.phone)) {
      next.phone = 'Enter a valid PH mobile number (e.g. 0917 123 4567)'
    }
    if (!form.address.trim()) next.address = 'Delivery address is required'
    return next
  }

  function focusFirstError(nextErrors: FormErrors) {
    const firstField = fieldOrder.find((field) => nextErrors[field])
    if (!firstField) return
    const input = formRef.current?.querySelector<HTMLElement>(`#${firstField}`)
    input?.focus()
    input?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  function updateField(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  function openMessenger(e?: FormEvent) {
    e?.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      focusFirstError(nextErrors)
      return
    }

    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      bundle: selectedBundle,
      quantity,
      notes: form.notes.trim() || undefined,
    }

    const message = buildOrderMessage(payload, product.name)
    const url = getMessengerUrl(productConfig.contact.messengerUrl)

    void navigator.clipboard?.writeText(message).catch(() => undefined)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
          {product.name}
        </h1>
        <p className="text-sm text-muted sm:text-base">{product.subtitle}</p>
        <StarRating rating={product.rating} count={product.reviewCount} />
      </div>

      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
          {formatPrice(selectedBundle.price)}
        </span>
        {selectedBundle.compareAtPrice != null && (
          <span className="text-base text-muted line-through">
            {formatPrice(selectedBundle.compareAtPrice)}
          </span>
        )}
        <span className="text-sm text-muted">per bundle</span>
      </div>

      <BundleSelector bundles={bundles} />

      <div className="flex flex-wrap items-center gap-3">
        <span id="quantity-label" className="text-sm font-medium">
          Quantity
        </span>
        <div
          className="flex items-center rounded-xl border border-border bg-card"
          role="group"
          aria-labelledby="quantity-label"
        >
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-10 w-10 items-center justify-center text-lg text-foreground hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span
            className="min-w-[2.25rem] text-center font-semibold tabular-nums"
            aria-live="polite"
            aria-atomic="true"
          >
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-10 w-10 items-center justify-center text-lg text-foreground hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <p className="text-sm text-muted">
          Total:{' '}
          <strong className="text-foreground">{formatPrice(lineTotal)}</strong>
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-surface/40 p-3 sm:grid-cols-4">
        {trust.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-1.5 text-[11px] font-medium text-muted sm:text-xs"
          >
            <span aria-hidden>{item.icon}</span>
            {item.label}
          </li>
        ))}
      </ul>

      <form
        ref={formRef}
        id="checkout"
        className="scroll-target rounded-2xl border border-border bg-card p-4 sm:p-5"
        onSubmit={openMessenger}
        noValidate
      >
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Delivery details
            </h2>
            <p className="mt-0.5 text-xs text-muted sm:text-sm">
              {productConfig.contact.deliveryNote}
            </p>
          </div>
          <p className="shrink-0 rounded-lg bg-surface px-3 py-1.5 text-right text-xs">
            <span className="font-semibold text-foreground">
              {selectedBundle.label} × {quantity}
            </span>
            <span className="mt-0.5 block text-accent">{formatPrice(lineTotal)}</span>
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Input
            id="name"
            label="Full name"
            required
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            error={errors.name}
            autoComplete="name"
          />
          <Input
            id="phone"
            label="Phone number"
            required
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            error={errors.phone}
            autoComplete="tel"
            placeholder="0917 123 4567"
          />
          <div className="sm:col-span-2">
            <Input
              id="address"
              label="Delivery address"
              required
              value={form.address}
              onChange={(e) => updateField('address', e.target.value)}
              error={errors.address}
              autoComplete="street-address"
            />
          </div>
          <div className="sm:col-span-2">
            <Textarea
              id="notes"
              label="Notes (optional)"
              value={form.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder="Preferred delivery time, landmarks, etc."
            />
          </div>
        </div>

        <div className="mt-4">
          <Button type="submit" variant="messenger" size="lg" className="w-full">
            Order via Messenger
          </Button>
          <p className="mt-2 text-center text-xs text-muted">
            Order details are copied — paste them in Messenger to confirm payment and
            delivery.
          </p>
        </div>
      </form>
    </div>
  )
}
