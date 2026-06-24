'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ProductConfig } from '@/config/product.config'

type ProductGalleryProps = {
  images: ProductConfig['product']['images']
  showcase?: boolean
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

export default function ProductGallery({ images, showcase = false }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [viewportWidth, setViewportWidth] = useState(0)

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

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const updateWidth = () => setViewportWidth(viewport.offsetWidth)
    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [])

  const mainAspect = showcase ? 'aspect-[13/11]' : 'aspect-[4/5]'
  const mainImageFit = showcase ? 'object-contain' : 'object-cover'
  const slideWidth = viewportWidth > 0 ? viewportWidth : undefined
  const translateX = slideWidth ? activeIndex * slideWidth : 0

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

  return (
    <div className="flex flex-col gap-3">
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
          ref={viewportRef}
          className={`overflow-hidden rounded-2xl bg-surface ${mainAspect} w-full`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
          aria-label="Product photos"
        >
          <div
            className={`flex h-full ${prefersReducedMotion ? '' : 'transition-transform duration-500 ease-out'}`}
            style={{ transform: `translateX(-${translateX}px)` }}
          >
            {images.map((image, index) => (
              <div
                key={image.src}
                className="relative h-full shrink-0"
                style={{ width: slideWidth ?? '100%' }}
                aria-hidden={index !== activeIndex}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className={mainImageFit}
                />
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-sm backdrop-blur-sm hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:left-3 lg:h-11 lg:w-11 max-lg:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/95 text-foreground shadow-sm backdrop-blur-sm hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:right-3 lg:h-11 lg:w-11 max-lg:opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div
          className="flex gap-2 overflow-x-auto pb-0.5"
          role="tablist"
          aria-label="Choose product photo"
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              onClick={() => setActiveIndex(index)}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-16 sm:w-16 ${
                index === activeIndex
                  ? 'border-accent'
                  : 'border-border hover:border-accent/50'
              }`}
              aria-label={`Photo ${index + 1}: ${image.alt}`}
              aria-selected={index === activeIndex}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
