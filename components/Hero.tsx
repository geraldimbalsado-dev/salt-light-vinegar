import Image from 'next/image'
import Link from 'next/link'
import { buttonClassName } from '@/lib/button-styles'

export type HeroProps = {
  headline: string
  subheadline: string
  ctaHref?: string
  imageSrc: string
  imageAlt: string
  className?: string
}

export default function Hero({
  headline,
  subheadline,
  ctaHref = '#buy-box',
  imageSrc,
  imageAlt,
  className = '',
}: HeroProps) {
  return (
    <section
      aria-label="Introduction"
      className={`relative isolate min-h-[62dvh] overflow-hidden sm:min-h-[70dvh] lg:min-h-[80vh] ${className}`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-[center_30%] sm:object-[72%_center] lg:object-[right_center]"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20 sm:bg-gradient-to-r sm:from-black/75 sm:via-black/45 sm:to-transparent"
      />

      <div className="section-shell relative z-10 flex min-h-[inherit] items-end pb-10 pt-24 sm:items-center sm:py-20">
        <div className="w-full max-w-xl lg:max-w-[34rem]">
          <p
            className="hero-fade-in font-display text-[1.75rem] font-semibold leading-[1.12] tracking-tight text-white min-[400px]:text-ui-3xl sm:text-5xl lg:text-[3.25rem]"
            style={{ animationDelay: '0.15s' }}
          >
            {headline}
          </p>

          <p
            className="hero-fade-in mt-4 max-w-lg text-ui-sm leading-relaxed text-white/90 sm:mt-6 sm:text-ui-lg sm:leading-8"
            style={{ animationDelay: '0.3s' }}
          >
            {subheadline}
          </p>

          <div className="hero-fade-in mt-6 sm:mt-10" style={{ animationDelay: '0.45s' }}>
            <Link
              href={ctaHref}
              className={`group ${buttonClassName({ variant: 'hero', size: 'lg', className: 'w-full sm:w-auto' })}`}
            >
              Order now
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
