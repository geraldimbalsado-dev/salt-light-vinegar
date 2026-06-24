import { type InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export default function Input({ label, error, id, className = '', ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
        {props.required && <span className="text-ember"> *</span>}
      </label>
      <input
        id={inputId}
        className="min-h-11 w-full rounded-xl border border-border bg-card px-4 text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
        {...props}
      />
      {error && <p className="text-sm text-ember">{error}</p>}
    </div>
  )
}
