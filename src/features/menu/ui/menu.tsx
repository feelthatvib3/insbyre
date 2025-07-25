import { PlusIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { contacts, menu } from 'features/menu';

import { cn } from 'shared/lib/cn';
import { useOverlayStore } from 'shared/model/use-overlay-store';
import { Button } from 'shared/ui/button';

export function Menu() {
  const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlayStore();
  const open = isOverlayOpen('menu');

  const [zIndex, setZIndex] = useState<number>(45);

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => setZIndex(10), 300);
      return () => clearTimeout(timeout);
    } else {
      setZIndex(45);
    }
  }, [open]);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className={cn(
          'relative gap-x-0.5 rounded-full !px-2 transition-all',
          open ? 'bg-white' : ''
        )}
        style={{ zIndex }}
        onClick={() => toggleOverlay('menu')}
      >
        <PlusIcon
          className={cn('size-5 transition duration-300', open ? 'rotate-45' : 'rotate-0')}
        />
      </Button>

      <div
        className={cn(
          'bg-united-nations-blue/15 pointer-events-none fixed inset-0 z-40 backdrop-blur-3xl transition duration-300',
          open ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* invisible full-screen layer for outside clicks */}
      {open && <div onClick={closeOverlay} className="fixed inset-0 z-30" />}

      <div
        className={cn(
          'absolute right-0 z-45 mt-4 w-[calc(100vw-2rem)] max-w-xs space-y-2 transition duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <motion.ul
          className="flex flex-col rounded-2xl bg-white p-2 shadow-2xl"
          initial={{ opacity: 0, y: -10 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{
            delay: 0.3
          }}
        >
          {menu.map((item, index) => (
            <motion.li key={index}>
              <a
                href={item.href}
                onClick={closeOverlay}
                className="hover:bg-united-nations-blue/5 flex items-center gap-x-3 rounded-[8px] p-3 transition sm:gap-x-4 sm:p-4"
              >
                <item.icon
                  className="text-united-nations-blue size-5 transition duration-300"
                  weight="fill"
                />
                <span className="font-display text-lg uppercase">{item.name}</span>
              </a>
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
              className="flex w-full items-center gap-x-2 overflow-hidden rounded-2xl bg-white shadow-2xl transition duration-300"
            >
              <a
                href={item.href}
                target="_blank"
                onClick={closeOverlay}
                className="hover:bg-united-nations-blue/5 flex w-full items-center justify-center gap-x-2 p-4 transition"
              >
                <item.icon
                  className="text-united-nations-blue size-6 transition duration-300"
                  weight="fill"
                />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
