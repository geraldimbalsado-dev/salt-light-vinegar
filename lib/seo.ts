import productConfig from '@/config/product.config'

export function buildProductSchema() {
  const lowestPrice = Math.min(...productConfig.bundles.map((b) => b.price))

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productConfig.product.name,
    description: productConfig.meta.description,
    brand: {
      '@type': 'Brand',
      name: productConfig.brand.name,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'PHP',
      lowPrice: lowestPrice,
      highPrice: Math.max(...productConfig.bundles.map((b) => b.price)),
      offerCount: productConfig.bundles.length,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: productConfig.product.rating,
      reviewCount: productConfig.product.reviewCount,
    },
  }
}

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: productConfig.brand.name,
    description: productConfig.brand.tagline,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buenavista',
      addressRegion: 'Agusan del Norte',
      addressCountry: 'PH',
    },
    telephone: productConfig.contact.phone,
    email: productConfig.contact.email,
  }
}
