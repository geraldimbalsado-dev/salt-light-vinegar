'use client'

import { useId, useState } from 'react'

type AccordionItem = {
  id: string
  title: string
  content: string
}

type AccordionProps = {
  items: AccordionItem[]
}

function AccordionPanel({ id, content, hidden }: { id: string; content: string; hidden: boolean }) {
  return (
    <div
      id={id}
      role="region"
      hidden={hidden}
      className="px-5 pb-4 whitespace-pre-line text-sm leading-relaxed text-muted"
    >
      {content}
    </div>
  )
}

export default function Accordion({ items }: AccordionProps) {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((item) => {
        const isOpen = openId === item.id
        const panelId = `${baseId}-${item.id}`

        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex min-h-12 w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-foreground transition-colors hover:bg-surface/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <span>{item.title}</span>
              <span
                className={`text-accent transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden
              >
                ▾
              </span>
            </button>
            <AccordionPanel id={panelId} content={item.content} hidden={!isOpen} />
          </div>
        )
      })}
    </div>
  )
}
