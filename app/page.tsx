import productConfig from '@/config/product.config'
import Header from '@/components/layout/Header'
import Hero from '@/components/Hero'
import Footer from '@/components/layout/Footer'
import StickyOrderBar from '@/components/layout/StickyOrderBar'
import ProductSection from '@/components/sections/ProductSection'
import DetailsAccordion from '@/components/sections/DetailsAccordion'
import TestimonialsSection from '@/components/sections/TestimonialsSection'

const sectionMap = {
  product: <ProductSection key="product" />,
  details: <DetailsAccordion key="details" details={productConfig.details} />,
  testimonials: (
    <TestimonialsSection
      key="testimonials"
      testimonials={productConfig.testimonials}
      regionLabel={productConfig.brand.regionLabel}
    />
  ),
}

export default function Home() {
  return (
    <>
      <div className="relative">
        <Header brand={productConfig.brand} overlay />
        <Hero
          headline={productConfig.hero.headline}
          subheadline={productConfig.hero.subheadline}
          imageSrc={productConfig.hero.imageSrc}
          imageAlt={productConfig.hero.imageAlt}
        />
      </div>
      <main id="main" className="pb-[var(--sticky-bar-offset)]">
        {productConfig.sectionOrder.map((key) => sectionMap[key])}
      </main>
      <Footer brand={productConfig.brand} contact={productConfig.contact} />
      <StickyOrderBar />
    </>
  )
}
