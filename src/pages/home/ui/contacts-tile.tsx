import { EnvelopeSimpleIcon, XIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import { contacts } from 'features/menu';

import { cn } from 'shared/lib/cn';

export function ContactsTile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative flex size-full items-center justify-center overflow-hidden rounded-2xl select-none">
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className="bg-united-nations-blue/5 flowers border-united-nations-blue/15 absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-2xl border p-4 md:items-end md:justify-start"
        >
          <div className="relative flex items-center gap-x-2">
            <h2 className="font-display z-[1] text-lg uppercase transition group-hover:translate-x-4 sm:text-3xl">
              Контакты
            </h2>
            <EnvelopeSimpleIcon
              size={20}
              className="text-united-nations-blue absolute z-0 translate-y-0.5 opacity-0 transition group-hover:-rotate-25 group-hover:opacity-100"
            />
          </div>
        </div>
      )}

      {open && (
        <div className="z-20 flex size-full flex-col gap-2 md:flex-row lg:flex-col">
          {contacts.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'font-display bg-united-nations-blue/5 border-united-nations-blue/15 hover:border-united-nations-blue/40 flex size-full items-center justify-center gap-x-2.5 rounded-2xl border p-4 uppercase transition sm:text-2xl'
              )}
            >
              <item.icon weight="fill" className="text-united-nations-blue hidden md:block" />
              <p className="text-united-nations-blue md:hidden lg:block">{item.name}</p>
            </a>
          ))}

          {/* Close button */}
          <button
            className="bg-destructive/5 border-destructive/20 hover:border-destructive/35 flex size-full cursor-pointer items-center justify-center rounded-2xl border p-2"
            onClick={() => setOpen(false)}
          >
            <XIcon className="text-destructive size-6" />
          </button>
        </div>
      )}
    </div>
  );
}
