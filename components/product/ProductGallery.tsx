'use client'

import Image from 'next/image'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { ProductConfig } from '@/config/product.config'

type ProductGalleryProps = {
  images: ProductConfig['product']['images']
  showcase?: boolean
  compact?: boolean
}

function ChevronLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

export default function ProductGallery({
  images,
  showcase = false,
  compact = false,
}: ProductGalleryProps) {
  const baseId = useId()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const activeImage = images[activeIndex] ?? images[0]
  const panelId = `${baseId}-panel`

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + images.length) % images.length)
    },
    [images.length],
  )

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (images.length <= 1 || isPaused || prefersReducedMotion) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [images.length, isPaused, prefersReducedMotion])

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return

    const deltaX = event.changedTouches[0].clientX - touchStartX.current
    const threshold = 50

    if (deltaX > threshold) goPrev()
    else if (deltaX < -threshold) goNext()

    touchStartX.current = null
  }

  const frameClass = compact
    ? 'relative aspect-[5/4] max-h-[min(56vw,15.5rem)] overflow-hidden rounded-2xl bg-surface sm:max-h-none sm:aspect-[624/552]'
    : showcase
      ? 'relative aspect-[624/552] overflow-hidden rounded-2xl bg-surface'
      : 'relative aspect-[5/4] overflow-hidden rounded-2xl bg-surface sm:aspect-[4/5]'

  const thumbSize = compact
    ? 'h-12 w-12 sm:h-16 sm:w-16'
    : 'h-14 w-14 sm:h-16 sm:w-16'

  return (
    <div className="flex flex-col gap-2.5 sm:gap-3">
      {compact && (
        <p className="text-ui-sm text-muted">On the table — swipe to see more pairings</p>
      )}

      <div
        className="group relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsPaused(false)
          }
        }}
      >
        <div
          className={frameClass}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="Product photos"
        >
          <Image
            key={activeImage.src}
            id={panelId}
            role="tabpanel"
            aria-label={activeImage.alt}
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={showcase || compact ? 'object-contain' : 'object-cover'}
            priority={compact}
          />
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Image {activeIndex + 1} of {images.length}: {activeImage.alt}
        </p>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute top-1/2 left-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-sm backdrop-blur-sm active:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:left-3 max-lg:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute top-1/2 right-2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-sm backdrop-blur-sm active:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:right-3 max-lg:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight />
            </button>
            <p
              className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-2.5 py-0.5 text-ui-xs font-medium text-white backdrop-blur-sm lg:hidden"
              aria-hidden
            >
              {activeIndex + 1} / {images.length}
            </p>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Choose product photo"
        >
          {images.map((image, index) => {
            const tabId = `${baseId}-tab-${index}`
            return (
              <button
                key={image.src}
                id={tabId}
                type="button"
                role="tab"
                onClick={() => setActiveIndex(index)}
                className={`relative shrink-0 overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${thumbSize} ${
                  index === activeIndex
                    ? 'border-accent'
                    : 'border-border active:border-accent/50'
                }`}
                aria-label={`Photo ${index + 1}: ${image.alt}`}
                aria-selected={index === activeIndex}
                aria-controls={panelId}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
