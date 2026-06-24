export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'messenger' | 'hero'
export type ButtonSize = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-ember text-white hover:bg-ember-hover focus-visible:ring-ember',
  secondary: 'bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent',
  outline:
    'border-2 border-border bg-card text-foreground hover:bg-surface focus-visible:ring-accent',
  messenger:
    'bg-messenger text-white hover:bg-messenger-hover focus-visible:ring-messenger',
  hero: 'bg-ember text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ember-hover hover:shadow-xl focus-visible:ring-white focus-visible:ring-offset-black/40 motion-reduce:transform-none motion-reduce:transition-none',
}

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-12 px-6 py-3 text-base sm:min-h-[3.25rem] sm:px-8',
}

export function buttonClassName({
  variant = 'primary',
  size = 'md',
  className = '',
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim()
}
