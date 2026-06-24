import type { ProductConfig } from '@/config/product.config'
import Accordion from '@/components/ui/Accordion'

type DetailsAccordionProps = {
  details: ProductConfig['details']
}

export default function DetailsAccordion({ details }: DetailsAccordionProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
      <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
        Product details
      </h2>
      <p className="mt-1 text-sm text-muted">Everything you need to know before you order.</p>
      <div className="mt-5">
        <Accordion items={details} />
      </div>
    </section>
  )
}
