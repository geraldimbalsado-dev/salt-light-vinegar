import productConfig from '@/config/product.config'
import BuyBox from '@/components/product/BuyBox'

export default function ProductSection() {
  return (
    <section
      aria-label="Order"
      className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <div id="buy-box" className="scroll-target">
        <BuyBox
          product={productConfig.product}
          bundles={productConfig.bundles}
          trust={productConfig.trust}
        />
      </div>
    </section>
  )
}
