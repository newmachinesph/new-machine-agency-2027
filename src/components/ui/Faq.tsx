"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  q: string;
  a: string;
};

type FaqProps = {
  items: readonly FaqItem[];
};

export default function Faq({ items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={item.q} className={`border-b border-border ${open ? "acc-open" : ""}`}>
            <button
              type="button"
              id={`faq-btn-${i}`}
              aria-expanded={open}
              aria-controls={`faq-panel-${i}`}
              onClick={() => setOpenIndex(open ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-medium">{item.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-muted transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              className="acc-panel"
            >
              <div>
                <p className="pb-5 text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
