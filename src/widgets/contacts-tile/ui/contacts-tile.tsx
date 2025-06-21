'use client';

import { EnvelopeSimpleIcon, XIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

import { contacts } from 'entities/menu';

export function ContactsTile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="group relative flex size-full items-center justify-center overflow-hidden rounded-2xl select-none">
      {/* Tile view (only triggers open on click) */}
      <motion.div
        onClick={() => setOpen(true)}
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: open ? 0 : 1,
          scale: open ? 0.95 : 1,
          pointerEvents: open ? 'none' : 'auto'
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { duration: 0 }
        }}
        className="bg-muted hover:border-input-border-hover absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-2xl border p-4 transition duration-300 md:items-end md:justify-start"
      >
        <div className="relative flex items-center gap-x-2">
          <h2 className="font-display z-[1] text-lg uppercase transition duration-300 group-hover:translate-x-4 sm:text-3xl">
            Контакты
          </h2>
          <EnvelopeSimpleIcon
            size={20}
            className="text-united-nations-blue absolute z-0 opacity-0 transition duration-300 group-hover:-rotate-25 group-hover:opacity-100"
          />
        </div>
      </motion.div>

      {/* Contact links (with close button) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: open ? 1 : 0,
          scale: open ? 1 : 0.95,
          pointerEvents: open ? 'auto' : 'none'
        }}
        transition={{ delay: open ? 0.1 : 0, duration: 0.15 }}
        className="z-20 flex size-full flex-col gap-2 md:flex-row lg:flex-col"
      >
        {contacts.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-muted hover:border-input-border-hover font-display flex size-full items-center justify-center gap-x-2 rounded-2xl border p-4 uppercase transition sm:text-2xl"
          >
            <p className="md:hidden lg:block">{item.name}</p>
            <item.icon
              weight="fill"
              className="text-united-nations-blue hidden md:block lg:hidden"
            />
          </Link>
        ))}

        {/* Close button */}
        <button
          className="bg-muted hover:bg-muted-foreground/5 hover:border-input-border-hover flex size-full cursor-pointer items-center justify-center rounded-2xl border p-2 transition"
          onClick={() => setOpen(false)}
        >
          <XIcon className="size-6" />
        </button>
      </motion.div>
    </div>
  );
}
