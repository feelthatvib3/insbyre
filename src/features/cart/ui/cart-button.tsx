import { ShoppingBagIcon, XIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { useCartStore } from 'features/cart';

import { cn } from 'shared/lib/cn';
import { useOverlayStore } from 'shared/model/use-overlay-store';
import { Button } from 'shared/ui/button';

export function CartButton() {
  const count = useCartStore((s) => s.getCount());
  const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlayStore();
  const open = isOverlayOpen('cart');

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
          'relative gap-x-[3px] rounded-full !px-2 transition-all',
          open ? 'bg-background' : '',
          count === 0
            ? 'w-[38px]'
            : count < 10
              ? 'w-[47px]'
              : count >= 10 && count < 100
                ? 'w-[56px]'
                : 'w-[63px]'
        )}
        style={{ zIndex }}
        onClick={() => toggleOverlay('cart')}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={open ? 'close' : 'bag'}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {open ? (
              <XIcon className="size-5" />
            ) : (
              <ShoppingBagIcon
                className={cn(
                  'size-5 transition-all',
                  count > 0 ? 'translate-x-0' : 'translate-x-[5px]'
                )}
              />
            )}
          </motion.div>
        </AnimatePresence>
        <p
          className={cn(
            'text-sm transition-all',
            count > 0 ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
          )}
        >
          {count}
        </p>
      </Button>

      <div
        className={cn(
          'bg-united-nations-blue/15 pointer-events-none fixed inset-0 z-35 backdrop-blur-3xl transition duration-300',
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
          className="bg-muted flex flex-col rounded-2xl p-2 shadow-2xl"
          initial={{ opacity: 0, y: -10 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{
            delay: 0.3
          }}
        >
          123
        </motion.ul>
        <motion.ul className="flex items-center gap-x-2">
          <motion.li
            key={1}
            initial={{ opacity: 0, y: 10 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              delay: 0.3
            }}
            className="bg-muted flex w-full items-center gap-x-2 rounded-2xl shadow-2xl"
          >
            123
          </motion.li>
          <motion.li
            key={2}
            initial={{ opacity: 0, y: 10 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{
              delay: 0.3
            }}
            className="bg-muted flex w-full items-center gap-x-2 rounded-2xl shadow-2xl"
          >
            456
          </motion.li>
        </motion.ul>
      </div>
    </div>
  );
}
