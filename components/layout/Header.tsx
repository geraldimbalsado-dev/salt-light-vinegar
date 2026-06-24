import Link from 'next/link'
import type { ProductConfig } from '@/config/product.config'
import { buttonClassName } from '@/lib/button-styles'
import MobileNav, { MobileOrderButton } from './MobileNav'

type HeaderProps = {
  brand: ProductConfig['brand']
  overlay?: boolean
}

const navLinkClass = (overlay: boolean) =>
  `hidden text-ui-sm font-medium transition-colors lg:inline-flex lg:min-h-11 lg:items-center lg:px-2 ${
    overlay ? 'text-white/90 hover:text-white' : 'text-muted hover:text-foreground'
  }`

export default function Header({ brand, overlay = false }: HeaderProps) {
  return (
    <header
      className={
        overlay
          ? 'absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md pt-[env(safe-area-inset-top)]'
          : 'sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md pt-[env(safe-area-inset-top)]'
      }
    >
      <div className="section-shell flex h-14 items-center justify-between sm:h-16">
        <Link
          href="/"
          className={`font-display text-ui-lg font-semibold sm:text-ui-xl ${overlay ? 'text-white' : 'text-foreground'}`}
        >
          {brand.logoText}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-2">
          <a href="#details" className={navLinkClass(overlay)}>
            Details
          </a>
          <a href="#testimonials" className={navLinkClass(overlay)}>
            Reviews
          </a>
          <MobileNav overlay={overlay} />
          <MobileOrderButton overlay={overlay} />
          <a
            href="#buy-box"
            className={buttonClassName({
              variant: 'primary',
              size: 'md',
              className: `hidden sm:inline-flex ${overlay ? 'focus-visible:ring-white focus-visible:ring-offset-black/40' : ''}`,
            })}
          >
            Order now
          </a>
        </nav>
      </div>
    </header>
  )
}
