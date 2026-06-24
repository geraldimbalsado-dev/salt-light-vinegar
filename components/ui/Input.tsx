import { type InputHTMLAttributes, useId } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export default function Input({ label, error, id, className = '', ...props }: InputProps) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  const errorId = error ? `${inputId}-error` : undefined

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={inputId} className="text-ui-sm font-medium text-foreground">
        {label}
        {props.required && <span className="text-ember"> *</span>}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className="min-h-11 w-full rounded-xl border border-border bg-card px-4 text-base text-foreground placeholder:text-muted focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/20 sm:text-ui-sm"
        {...props}
      />
      {error && (
        <p id={errorId} className="text-ui-sm text-ember" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
