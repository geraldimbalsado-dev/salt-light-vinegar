type TrustIconProps = {
  name: string
  className?: string
}

export default function TrustIcon({ name, className = 'h-4 w-4 shrink-0 text-accent' }: TrustIconProps) {
  switch (name) {
    case 'origin':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3 4 9v12h6v-7h4v7h6V9l-8-6Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'natural':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 8c-2 2-2 4-2 4s2 0 4-2M12 8c2 2 2 4 2 4s-2 0-4-2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'shipping':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M3 6h11v9H3V6Zm11 2h4l3 3v4h-7V8ZM6.5 18a1.5 1.5 0 1 0 0 .01M17.5 18a1.5 1.5 0 1 0 0 .01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'batch':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3c-4 2-7 2-7 6v8c0 2 3 4 7 4s7-2 7-4V9c0-4-3-4-7-6Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      )
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      )
  }
}
