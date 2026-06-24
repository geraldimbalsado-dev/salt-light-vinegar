import type { ProductConfig } from '@/config/product.config'
import { getMessengerUrl } from '@/lib/messenger'

type FooterProps = {
  brand: ProductConfig['brand']
  contact: ProductConfig['contact']
}

export default function Footer({ brand, contact }: FooterProps) {
  const messengerUrl = getMessengerUrl(contact.messengerUrl)

  return (
    <footer className="border-t border-border bg-palm text-white">
      <div className="section-shell flex flex-col gap-6 py-8 sm:flex-row sm:items-start sm:justify-between sm:py-10">
        <div>
          <p className="font-display text-ui-xl font-semibold">{brand.name}</p>
          <p className="mt-2 text-ui-sm text-white/80">{brand.tagline}</p>
        </div>
        <address className="not-italic text-ui-sm text-white/80">
          <p>{contact.address}</p>
          <p className="mt-2">
            <a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="inline-flex min-h-11 items-center hover:text-white"
            >
              {contact.phone}
            </a>
          </p>
          <p className="mt-1">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex min-h-11 items-center hover:text-white"
            >
              {contact.email}
            </a>
          </p>
          <p className="mt-1">
            <a
              href={messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-semibold text-white hover:underline"
            >
              Message us on Messenger
            </a>
          </p>
        </address>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-ui-xs text-white/75">
        © {new Date().getFullYear()} {brand.name}. All rights reserved.
      </div>
    </footer>
  )
}
