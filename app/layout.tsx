import type { Metadata } from 'next'
import { Fraunces, DM_Sans } from 'next/font/google'
import productConfig from '@/config/product.config'
import { buildLocalBusinessSchema, buildProductSchema } from '@/lib/seo'
import { OrderProvider } from '@/context/OrderContext'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  weight: ['400', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: productConfig.meta.title,
  description: productConfig.meta.description,
  openGraph: {
    title: productConfig.meta.title,
    description: productConfig.meta.description,
    type: 'website',
    locale: 'en_PH',
    images: productConfig.meta.ogImage ? [productConfig.meta.ogImage] : [],
  },
  twitter: {
    card: 'summary_large_image',
    title: productConfig.meta.title,
    description: productConfig.meta.description,
  },
  metadataBase: productConfig.meta.canonicalUrl
    ? new URL(productConfig.meta.canonicalUrl)
    : undefined,
  alternates: productConfig.meta.canonicalUrl
    ? { canonical: productConfig.meta.canonicalUrl }
    : undefined,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const productSchema = buildProductSchema()
  const businessSchema = buildLocalBusinessSchema()

  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={productConfig.brand.primaryColor} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-ember focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <OrderProvider>{children}</OrderProvider>
      </body>
    </html>
  )
}
