'use client'

import { useEffect, useState } from 'react'
import { buttonClassName } from '@/lib/button-styles'

type MobileNavProps = {
  overlay?: boolean
}

const links = [
  { href: '#details', label: 'Details' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#buy-box', label: 'Order' },
]

export default function MobileNav({ overlay = false }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [open])

  return (
    <div className="relative sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
          overlay
            ? 'border-white/20 bg-white/10 text-white hover:bg-white/15 focus-visible:ring-white focus-visible:ring-offset-black/40'
            : 'border-border bg-card text-foreground hover:bg-surface focus-visible:ring-accent'
        }`}
        aria-expanded={open}
        aria-controls="mobile-nav-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden
        >
          {open ? (
            <path d="M6 6l12 12M18 6 6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/30"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-nav-menu"
            aria-label="Mobile"
            className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-lg"
          >
            <ul className="divide-y divide-border py-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center px-4 text-ui-sm font-medium text-foreground active:bg-surface"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </div>
  )
}

export function MobileOrderButton({ overlay = false }: { overlay?: boolean }) {
  return (
    <a
      href="#buy-box"
      className={buttonClassName({
        variant: 'primary',
        size: 'md',
        className: `sm:hidden ${overlay ? 'focus-visible:ring-white focus-visible:ring-offset-black/40' : ''}`,
      })}
    >
      Order
    </a>
  )
}
