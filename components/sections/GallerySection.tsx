import productConfig from '@/config/product.config'
import ProductGallery from '@/components/product/ProductGallery'

export default function GallerySection() {
  return (
    <section aria-label="Product photos" className="py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[min(100%,624px)] px-4 sm:px-6">
        <div className="mb-5 sm:mb-6">
          <h2 className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
            On the table
          </h2>
          <p className="mt-1 text-sm text-muted">
            See how Salt Light pairs with Filipino favorites.
          </p>
        </div>
        <ProductGallery images={productConfig.product.images} showcase />
      </div>
    </section>
  )
}
