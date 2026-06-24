import { type ButtonHTMLAttributes, type ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'messenger'
  size?: 'md' | 'lg'
  children: ReactNode
}

const variants = {
  primary:
    'bg-ember text-white hover:bg-ember-hover focus-visible:ring-ember',
  secondary:
    'bg-accent text-white hover:bg-accent-hover focus-visible:ring-accent',
  outline:
    'border-2 border-border bg-card text-foreground hover:bg-surface focus-visible:ring-accent',
  messenger:
    'bg-[#0084FF] text-white hover:bg-[#0073e6] focus-visible:ring-[#0084FF]',
}

const sizes = {
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-[3rem] px-6 py-3 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
