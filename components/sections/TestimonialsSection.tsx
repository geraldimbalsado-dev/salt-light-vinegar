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
    <section id="testimonials" className="scroll-target bg-surface/40 py-8 sm:py-12">
      <div className="section-shell">
        <h2 className="font-display text-ui-2xl font-semibold text-foreground sm:text-ui-3xl">
          Loved in {regionLabel}
        </h2>
        <p className="mt-1 text-ui-sm text-muted">What customers are saying.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.author}
              className="flex flex-col rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md sm:p-5"
            >
              <p className="text-accent text-ui-sm tracking-wide" aria-hidden>
                ★★★★★
              </p>
              <p className="mt-2 flex-1 text-ui-sm leading-relaxed text-foreground">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-3 border-t border-border pt-3">
                <cite className="not-italic text-ui-sm">
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
