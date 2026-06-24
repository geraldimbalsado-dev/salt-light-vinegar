'use client'

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import productConfig from '@/config/product.config'

type OrderContextValue = {
  selectedBundleId: string
  quantity: number
  setSelectedBundleId: (id: string) => void
  setQuantity: (qty: number) => void
  selectedBundle: (typeof productConfig.bundles)[number]
}

const OrderContext = createContext<OrderContextValue | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [selectedBundleId, setSelectedBundleId] = useState(
    productConfig.bundles[1]?.id ?? productConfig.bundles[0].id
  )
  const [quantity, setQuantity] = useState(1)

  const selectedBundle =
    productConfig.bundles.find((b) => b.id === selectedBundleId) ??
    productConfig.bundles[0]

  return (
    <OrderContext.Provider
      value={{
        selectedBundleId,
        quantity,
        setSelectedBundleId,
        setQuantity,
        selectedBundle,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const ctx = useContext(OrderContext)
  if (!ctx) {
    throw new Error('useOrder must be used within OrderProvider')
  }
  return ctx
}
