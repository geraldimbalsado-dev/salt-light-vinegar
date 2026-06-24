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
      className="px-4 pb-4 text-ui-sm leading-relaxed text-muted whitespace-pre-line sm:px-5 sm:text-ui-base"
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
              className="flex min-h-[3.25rem] w-full items-center justify-between gap-4 px-4 py-4 text-left text-ui-base font-medium text-foreground transition-colors active:bg-surface/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:px-5"
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
