'use client';

import { PlusIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

import { contacts, menu } from 'entities/menu';

import { cn } from 'shared/lib/cn';
import { Button } from 'shared/ui/button';

export function Menu() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className={cn(
          'relative z-45 w-[38px] flex-col gap-y-1 rounded-full !px-2',
          open
            ? 'bg-united-nations-blue text-background border-united-nations-blue hover:border-united-nations-blue'
            : ''
        )}
        onClick={() => setOpen(!open)}
      >
        <PlusIcon
          className={cn('size-5 transition duration-300', open ? 'rotate-45' : 'rotate-0')}
        />
      </Button>

      <div
        className={cn(
          'bg-united-nations-blue/15 pointer-events-none fixed inset-0 z-40 backdrop-blur-lg transition duration-300',
          open ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* invisible full-screen layer for outside clicks */}
      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-30" />}

      <div
        className={cn(
          'absolute right-0 z-45 mt-4 w-[calc(100vw-2rem)] max-w-xs space-y-2 transition duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <motion.ul
          className="bg-muted flex flex-col gap-y-2 rounded-2xl p-2 shadow-2xl"
          initial={{ opacity: 0, y: -10 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{
            delay: 0.3
          }}
        >
          {menu.map((item, index) => (
            <motion.li key={index} className="">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="hover:bg-united-nations-blue/5 flex items-center gap-x-2 rounded-[8px] p-3 transition"
              >
                <item.icon
                  className="text-united-nations-blue transition duration-300"
                  weight="fill"
                />
                <span className="font-display uppercase">{item.name}</span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        <motion.ul className="flex items-center gap-x-2">
          {contacts.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                delay: 0.3
              }}
              className="bg-muted flex w-full items-center gap-x-2 rounded-2xl shadow-2xl"
            >
              <Link
                href={item.href}
                target="_blank"
                onClick={() => setOpen(false)}
                className="hover:bg-united-nations-blue/5 flex w-full items-center justify-center gap-x-2 rounded-[8px] p-4 transition"
              >
                <item.icon
                  className="text-united-nations-blue size-6 transition duration-300"
                  weight="fill"
                />
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
