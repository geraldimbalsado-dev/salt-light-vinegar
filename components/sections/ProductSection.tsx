import productConfig from '@/config/product.config'
import BuyBox from '@/components/product/BuyBox'
import ProductGallery from '@/components/product/ProductGallery'

export default function ProductSection() {
  return (
    <section aria-label="Order" className="section-shell py-6 sm:py-10">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="hidden lg:sticky lg:top-[calc(var(--header-offset)+1rem)] lg:block">
          <p className="mb-3 text-ui-sm text-muted">On the table</p>
          <ProductGallery images={productConfig.product.images} />
          <p className="mt-3 text-ui-sm text-muted">
            See how Salt Light pairs with Filipino favorites.
          </p>
        </div>

        <div id="buy-box" className="scroll-target min-w-0">
          <BuyBox
            product={productConfig.product}
            bundles={productConfig.bundles}
            trust={productConfig.trust}
            gallerySlot={
              <div className="lg:hidden">
                <ProductGallery images={productConfig.product.images} compact />
              </div>
            }
          />
        </div>
      </div>
    </section>
  )
}
