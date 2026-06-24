import type { ProductConfig } from '@/config/product.config'

type TestimonialsSectionProps = {
  testimonials: ProductConfig['testimonials']
  regionLabel: string
}

export default function TestimonialsSection({
  testimonials,
  regionLabel,
}: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="scroll-target bg-surface/40 py-10 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
          Loved in {regionLabel}
        </h2>
        <p className="mt-1 text-sm text-muted">What customers are saying.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.author}
              className="flex flex-col rounded-xl border border-border bg-card p-4 sm:p-5"
            >
              <p className="flex-1 text-sm leading-relaxed text-foreground">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-3 border-t border-border pt-3">
                <cite className="not-italic text-sm">
                  <span className="font-semibold text-foreground">{item.author}</span>
                  <span className="text-muted"> · {item.location}</span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
