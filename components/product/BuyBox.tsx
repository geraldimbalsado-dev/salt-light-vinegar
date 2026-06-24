'use client'

import { useRef, useState, type FormEvent, type ReactNode } from 'react'
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
import TrustIcon from '@/components/ui/TrustIcon'

type BuyBoxProps = {
  product: ProductConfig['product']
  bundles: ProductConfig['bundles']
  trust: ProductConfig['trust']
  gallerySlot?: ReactNode
}

type FormState = {
  name: string
  phone: string
  address: string
  notes: string
}

type FormErrors = Partial<Record<keyof FormState, string>>
type SubmitFeedback = 'idle' | 'success' | 'error'

const fieldOrder: (keyof FormState)[] = ['name', 'phone', 'address']

const steps = [
  { id: 1, label: 'Bundle', short: 'Choose bundle' },
  { id: 2, label: 'Details', short: 'Your details' },
  { id: 3, label: 'Confirm', short: 'Messenger' },
] as const

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <a
      href="#testimonials"
      className="inline-flex min-h-11 items-center gap-1.5 text-ui-sm text-muted transition-colors active:text-foreground"
    >
      <span className="text-accent" aria-hidden>
        ★★★★★
      </span>
      <span>
        {rating.toFixed(1)} · {count} reviews
      </span>
    </a>
  )
}

function OrderSteps() {
  return (
    <div
      className="rounded-xl border border-border bg-surface/50 px-3 py-3 sm:px-4"
      aria-label="Order steps"
    >
      <ol className="flex items-center gap-1.5 sm:gap-2">
        {steps.map((step, index) => (
          <li key={step.id} className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ui-xs font-semibold ${
                index === 0
                  ? 'bg-accent text-white'
                  : 'border border-border bg-card text-muted'
              }`}
            >
              {step.id}
            </span>
            <span
              className={`truncate text-ui-xs sm:text-ui-sm ${
                index === 0 ? 'font-semibold text-foreground' : 'text-muted'
              }`}
            >
              <span className="sm:hidden">{step.short}</span>
              <span className="hidden sm:inline">{step.label}</span>
            </span>
            {index < steps.length - 1 && (
              <span
                aria-hidden
                className="ml-auto hidden h-px min-w-3 flex-1 bg-border sm:block"
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function BuyBox({ product, bundles, trust, gallerySlot }: BuyBoxProps) {
  const { selectedBundle, quantity, setQuantity } = useOrder()
  const lineTotal = selectedBundle.price * quantity
  const formRef = useRef<HTMLFormElement>(null)
  const lastOrderMessage = useRef('')

  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    address: '',
    notes: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitFeedback, setSubmitFeedback] = useState<SubmitFeedback>('idle')

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
    if (submitFeedback !== 'idle') {
      setSubmitFeedback('idle')
    }
  }

  async function copyOrderMessage(message: string): Promise<boolean> {
    if (!navigator.clipboard?.writeText) return false
    try {
      await navigator.clipboard.writeText(message)
      return true
    } catch {
      return false
    }
  }

  async function openMessenger(e?: FormEvent) {
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
    lastOrderMessage.current = message
    const url = getMessengerUrl(productConfig.contact.messengerUrl)

    const copied = await copyOrderMessage(message)
    setSubmitFeedback(copied ? 'success' : 'error')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  async function retryCopy() {
    if (!lastOrderMessage.current) return
    const copied = await copyOrderMessage(lastOrderMessage.current)
    setSubmitFeedback(copied ? 'success' : 'error')
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-display text-ui-xl font-semibold leading-tight text-foreground sm:text-ui-3xl">
          {product.name}
        </h1>
        <p className="text-ui-sm leading-relaxed text-muted">{product.subtitle}</p>
        <StarRating rating={product.rating} count={product.reviewCount} />
      </div>

      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="font-display text-ui-3xl font-semibold text-accent">
          {formatPrice(selectedBundle.price)}
        </span>
        {selectedBundle.compareAtPrice != null && (
          <span className="text-ui-base text-muted line-through">
            {formatPrice(selectedBundle.compareAtPrice)}
          </span>
        )}
        <span className="w-full text-ui-sm text-muted sm:w-auto">per bundle</span>
      </div>

      {gallerySlot}

      <OrderSteps />

      <BundleSelector bundles={bundles} />

      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2.5 sm:justify-start sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0">
        <span id="quantity-label" className="text-ui-sm font-medium">
          Quantity
        </span>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center rounded-xl border border-border bg-background"
            role="group"
            aria-labelledby="quantity-label"
          >
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex min-h-11 min-w-11 items-center justify-center text-lg text-foreground active:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span
              className="min-w-[2.5rem] text-center text-ui-base font-semibold tabular-nums"
              aria-live="polite"
              aria-atomic="true"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="flex min-h-11 min-w-11 items-center justify-center text-lg text-foreground active:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <p className="text-ui-sm text-muted">
            Total{' '}
            <strong className="text-foreground">{formatPrice(lineTotal)}</strong>
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-2.5 rounded-xl border border-border bg-surface/40 p-3 min-[420px]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-2 text-ui-sm font-medium text-muted"
          >
            <TrustIcon name={item.icon} />
            <span className="leading-snug">{item.label}</span>
          </li>
        ))}
      </ul>

      <p className="text-ui-sm text-muted">
        Ingredients and storage info in{' '}
        <a href="#details" className="font-medium text-accent underline-offset-2 active:underline">
          product details
        </a>
        .
      </p>

      <form
        ref={formRef}
        id="checkout"
        className="scroll-target-checkout rounded-2xl border border-border bg-card p-4 sm:p-5"
        onSubmit={openMessenger}
        noValidate
      >
        <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between">
          <p className="order-2 flex items-center justify-between rounded-lg bg-surface px-3 py-2.5 text-ui-sm sm:order-1 sm:hidden">
            <span className="font-semibold text-foreground">
              {selectedBundle.label} × {quantity}
            </span>
            <span className="font-semibold text-accent">{formatPrice(lineTotal)}</span>
          </p>
          <div className="order-1 sm:order-2">
            <h2 className="font-display text-ui-lg font-semibold text-foreground">
              Delivery details
            </h2>
            <p className="mt-1 text-ui-sm leading-relaxed text-muted">
              {productConfig.contact.deliveryNote}
            </p>
          </div>
          <p className="hidden shrink-0 rounded-lg bg-surface px-3 py-1.5 text-right text-ui-xs sm:block">
            <span className="font-semibold text-foreground">
              {selectedBundle.label} × {quantity}
            </span>
            <span className="mt-0.5 block text-accent">{formatPrice(lineTotal)}</span>
          </p>
        </div>

        <div className="mt-4 grid gap-4">
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
          <Input
            id="address"
            label="Delivery address"
            required
            value={form.address}
            onChange={(e) => updateField('address', e.target.value)}
            error={errors.address}
            autoComplete="street-address"
          />
          <Textarea
            id="notes"
            label="Notes (optional)"
            value={form.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            placeholder="Preferred delivery time, landmarks, etc."
          />
        </div>

        <div className="mt-5">
          {submitFeedback === 'success' && (
            <div
              role="status"
              className="mb-3 rounded-xl border border-palm/30 bg-palm/10 px-4 py-3 text-ui-sm leading-relaxed text-foreground"
            >
              Order copied — paste it in Messenger to confirm payment and delivery.
            </div>
          )}
          {submitFeedback === 'error' && (
            <div
              role="alert"
              className="mb-3 rounded-xl border border-ember/30 bg-ember/10 px-4 py-3 text-ui-sm text-foreground"
            >
              <p>Couldn&apos;t copy automatically. Tap below, then paste in Messenger.</p>
              <Button
                type="button"
                variant="outline"
                size="md"
                className="mt-3 w-full sm:w-auto"
                onClick={retryCopy}
              >
                Copy order details
              </Button>
            </div>
          )}

          <Button type="submit" variant="messenger" size="lg" className="w-full">
            Order via Messenger
          </Button>
          {submitFeedback === 'idle' && (
            <p className="mt-2 text-center text-ui-sm leading-relaxed text-muted">
              Your order details will be copied — paste them in Messenger to confirm.
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
