import type { ProductConfig } from '@/config/product.config'

type HeaderProps = {
  brand: ProductConfig['brand']
  overlay?: boolean
}

export default function Header({ brand, overlay = false }: HeaderProps) {
  return (
    <header
      className={
        overlay
          ? 'absolute inset-x-0 top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-md'
          : 'sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md'
      }
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a
          href="#main"
          className={`font-display text-xl font-semibold ${overlay ? 'text-white' : 'text-foreground'}`}
        >
          {brand.logoText}
        </a>
        <nav aria-label="Primary">
          <a
            href="#buy-box"
            className={`inline-flex min-h-11 items-center rounded-xl px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              overlay
                ? 'bg-ember text-white hover:bg-ember-hover focus-visible:ring-white focus-visible:ring-offset-black/40'
                : 'bg-ember text-white hover:bg-ember-hover focus-visible:ring-ember'
            }`}
          >
            Order
          </a>
        </nav>
      </div>
    </header>
  )
}
