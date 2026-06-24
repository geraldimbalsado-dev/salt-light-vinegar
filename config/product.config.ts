export type Bundle = {
  id: string
  label: string
  bottles: number
  sizeMl: number
  price: number
  compareAtPrice?: number
  badge?: string
  description: string
  image: string
  imageAlt: string
}

export type ProductConfig = {
  brand: {
    name: string
    tagline: string
    regionLabel: string
    primaryColor: string
    logoText: string
  }
  meta: {
    title: string
    description: string
    canonicalUrl?: string
    ogImage?: string
  }
  hero: {
    headline: string
    subheadline: string
    imageSrc: string
    imageAlt: string
  }
  product: {
    name: string
    subtitle: string
    rating: number
    reviewCount: number
    images: { src: string; alt: string }[]
  }
  bundles: Bundle[]
  trust: { icon: string; label: string }[]
  details: { id: string; title: string; content: string }[]
  testimonials: { quote: string; author: string; location: string }[]
  contact: {
    messengerUrl: string
    email: string
    phone: string
    address: string
    deliveryNote: string
  }
  sectionOrder: ('product' | 'gallery' | 'details' | 'testimonials')[]
}

const BOTTLE_SIZE_ML = 350

const productConfig: ProductConfig = {
  brand: {
    name: 'Salt Light',
    tagline: 'Pure coconut nectar vinegar from Buenavista',
    regionLabel: 'Buenavista',
    primaryColor: '#C47A2A',
    logoText: 'Salt Light',
  },
  meta: {
    title: 'Salt Light | Artisan Coconut Vinegar from Buenavista',
    description:
      'Small-batch spiced coconut sap vinegar made in Buenavista, Agusan del Norte. Choose Solo, Duo, or Family bundles and order via Messenger.',
    canonicalUrl: 'https://eirenesuka.com',
  },
  hero: {
    headline: 'Taste Buenavista in every drop',
    subheadline:
      'Small-batch spiced coconut sap vinegar — bright, balanced, and made for sinugba, kinilaw, and everyday ulam.',
    imageSrc: '/images/vinegar-img-hero.png',
    imageAlt: 'Salt Light spiced coconut vinegar bottles',
  },
  product: {
    name: 'Spiced Coconut Sap Vinegar',
    subtitle: '100% natural coconut nectar — 350 mL bottle, crafted in Buenavista',
    rating: 4.9,
    reviewCount: 48,
    images: [
      {
        src: '/images/prod-1.png',
        alt: 'Spicy suka with Filipino pulutan platter',
      },
      {
        src: '/images/prod-2.png',
        alt: 'Glazed chicken with rice and dipping sauce',
      },
      {
        src: '/images/prod-3.png',
        alt: 'Fresh tuna kinilaw served chilled with citrus marinade',
      },
    ],
  },
  bundles: [
    {
      id: 'solo',
      label: 'Solo',
      bottles: 1,
      sizeMl: BOTTLE_SIZE_ML,
      price: 120,
      description: '1 bottle · 350 mL — perfect to try',
      image: '/images/solo.png',
      imageAlt: 'Salt Light Solo bundle — 1 bottle of spiced coconut vinegar',
    },
    {
      id: 'duo',
      label: 'Duo',
      bottles: 2,
      sizeMl: BOTTLE_SIZE_ML,
      price: 230,
      compareAtPrice: 240,
      badge: 'Popular',
      description: '2 bottles · 350 mL each — everyday pantry',
      image: '/images/duo.png',
      imageAlt: 'Salt Light Duo bundle — 2 bottles of spiced coconut vinegar',
    },
    {
      id: 'family',
      label: 'Family',
      bottles: 3,
      sizeMl: BOTTLE_SIZE_ML,
      price: 330,
      compareAtPrice: 360,
      badge: 'Best value',
      description: '3 bottles · 350 mL each — for sharing',
      image: '/images/family.png',
      imageAlt: 'Salt Light Family bundle — 3 bottles of spiced coconut vinegar',
    },
  ],
  trust: [
    { icon: '🌴', label: 'Made in Buenavista' },
    { icon: '🥥', label: '100% coconut nectar' },
    { icon: '🚚', label: 'Ships in 2–3 days' },
    { icon: '♻️', label: 'Small-batch crafted' },
  ],
  details: [
    {
      id: 'about',
      title: 'About Salt Light',
      content:
        'Salt Light began as a family recipe — slow-fermented coconut sap vinegar with just the right warmth of local spices. Every batch uses pure coconut nectar from Agusan del Norte, with no shortcuts.',
    },
    {
      id: 'ingredients',
      title: 'Ingredients',
      content:
        'Coconut sap vinegar, natural spices (chili, garlic, onion), sea salt. No artificial preservatives or coloring.',
    },
    {
      id: 'uses',
      title: 'How to use',
      content:
        'Use as a dipping sauce for grilled meats and seafood, add to kinilaw and salads, or splash into soups and adobo for extra depth. Start with a tablespoon and adjust to taste.',
    },
    {
      id: 'storage',
      title: 'Storage',
      content:
        'Store in a cool, dry place away from direct sunlight. Refrigerate after opening. Best consumed within 12 months of opening.',
    },
    {
      id: 'faq',
      title: 'FAQ',
      content:
        'Q: Is it very spicy?\nA: It has a gentle warmth — flavorful but not overwhelming.\n\nQ: Do you ship outside Agusan del Norte?\nA: Yes, we ship nationwide in the Philippines.\n\nQ: How do I pay?\nA: Confirm your order via Messenger. We will share payment options when we confirm availability.',
    },
  ],
  testimonials: [
    {
      quote:
        'Finally a suka that tastes like what lola used to make. Perfect with pork barbecue.',
      author: 'Maria R.',
      location: 'Buenavista',
    },
    {
      quote:
        'Brought the Family bundle as pasalubong. Everyone asked where to order more.',
      author: 'Jake T.',
      location: 'Cabadbaran',
    },
    {
      quote:
        'Clean ingredients, great flavor. I use it on kinilaw every weekend now.',
      author: 'Ana L.',
      location: 'Butuan City',
    },
  ],
  contact: {
    messengerUrl: 'https://m.me/your-page',
    email: 'hello@saltlight.com',
    phone: '+63 917 123 4567',
    address: 'Buenavista, Agusan del Norte, Philippines',
    deliveryNote:
      'We deliver within Buenavista and nearby towns in 1–2 days. Nationwide shipping in 3–5 days.',
  },
  sectionOrder: ['product', 'gallery', 'testimonials', 'details'],
}

export default productConfig
