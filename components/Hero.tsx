import Image from 'next/image'
import Link from 'next/link'

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
      className={`relative isolate min-h-[70dvh] overflow-hidden lg:min-h-[80vh] ${className}`}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover object-[68%_center] sm:object-[72%_center] lg:object-[right_center]"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/5 sm:from-black/75 sm:via-black/45 sm:to-transparent"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 lg:from-transparent lg:via-transparent lg:to-black/15" />

      <div className="relative z-10 mx-auto flex h-full min-h-[inherit] max-w-[1200px] items-center px-5 py-20 sm:px-8 lg:px-10">
        <div className="w-full max-w-xl lg:max-w-[34rem]">
          <p
            className="hero-fade-in font-display text-[2rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]"
            style={{ animationDelay: '0.15s' }}
          >
            {headline}
          </p>

          <p
            className="hero-fade-in mt-5 max-w-lg text-base leading-relaxed text-white/90 sm:mt-6 sm:text-lg sm:leading-8"
            style={{ animationDelay: '0.3s' }}
          >
            {subheadline}
          </p>

          <div className="hero-fade-in mt-8 sm:mt-10" style={{ animationDelay: '0.45s' }}>
            <Link
              href={ctaHref}
              className="group inline-flex min-h-12 items-center justify-center rounded-xl bg-ember px-7 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember-hover hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 sm:min-h-[3.25rem] sm:px-8 sm:text-base motion-reduce:transform-none motion-reduce:transition-none"
            >
              Order now
              <span
                aria-hidden
                className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none"
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
