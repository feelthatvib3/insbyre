import { MinusIcon, PlusIcon, ShoppingBagIcon, XIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { type FormEvent, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { PaymentButton, useCartStore } from 'features/cart';

import { cn } from 'shared/lib/cn';
import { formatPrice } from 'shared/lib/format-price';
import { useOverlayStore } from 'shared/model/use-overlay-store';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

export function Cart() {
  const count = useCartStore((s) => s.getCount());
  const { items, getTotal, getCount, decrementQuantity, incrementQuantity } = useCartStore();
  const { isOverlayOpen, toggleOverlay, closeOverlay } = useOverlayStore();
  const open = isOverlayOpen('cart');
  const [zIndex, setZIndex] = useState<number>(45);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    email: ''
  });

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => setZIndex(10), 300);
      return () => clearTimeout(timeout);
    } else {
      setZIndex(45);
    }
  }, [open]);

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.address) {
      alert('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    try {
      setIsLoading(true);
      const { name, address, phone } = form;
      const description = `${name} / ${address} / ${phone}`;
      const orderId = v4();

      const res = await fetch(`${import.meta.env.VITE_BASE_API}/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: getTotal().toFixed(2),
          description,
          metadata: { orderId },
          items,
          totalItems: getCount()
        })
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Ошибка при создании платежа.');
      }
    } catch {
      setIsLoading(false);
      alert('Сервер недоступен. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        className={cn(
          'relative gap-x-[3px] rounded-full !px-2 transition-all',
          open ? 'bg-white' : '',
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
            animate={{ scale: 1, translateX: 0, opacity: 1 }}
            exit={{ scale: 0.8, translateX: 1.25, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {open ? (
              <XIcon
                className={cn(
                  'size-5 transition-all',
                  count > 0 ? 'translate-x-0' : 'translate-x-[6px]'
                )}
              />
            ) : (
              <ShoppingBagIcon
                className={cn(
                  'size-5 transition-all',
                  count > 0 ? 'translate-x-0' : 'translate-x-[6px]'
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
          'absolute -right-11.5 z-45 mt-4 w-[calc(100vw-2rem)] max-w-lg space-y-2 transition duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
      >
        <motion.div
          className="rounded-2xl bg-white shadow-2xl"
          initial={{ opacity: 0, y: -10 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ delay: 0.3 }}
        >
          <ul className="space-y-4 p-4">
            {!items.length ? (
              <p className="text-muted-foreground">В вашей корзине пока что нет товаров.</p>
            ) : (
              items.map(({ id, name, thumbnail, quantity, size, sku }) => (
                <li key={id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-3">
                      <img
                        src={thumbnail}
                        alt={name}
                        className="size-10 rounded-[4px] object-cover"
                      />
                      <div>
                        <p className="font-display text-lg leading-6 uppercase">
                          {name}{' '}
                          {size ? <span className="text-united-nations-blue">{size}</span> : null}
                        </p>
                        <p className="text-muted-foreground text-sm">{sku}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <div className="flex items-center gap-x-1">
                        <button
                          onClick={() => incrementQuantity({ id, size })}
                          className="text-muted-foreground hover:bg-united-nations-blue/5 hover:text-united-nations-blue cursor-pointer rounded-lg p-2 transition-all active:scale-[95%]"
                        >
                          <PlusIcon size={20} weight="bold" />
                        </button>
                        <p className="w-[25px] text-center">{quantity}</p>
                        <button
                          onClick={() => decrementQuantity({ id, size })}
                          className="text-muted-foreground hover:bg-united-nations-blue/5 hover:text-united-nations-blue cursor-pointer rounded-lg p-2 transition-all active:scale-[95%]"
                        >
                          <MinusIcon size={20} weight="bold" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <p>Итого</p>
              <p>{formatPrice(getTotal())}</p>
            </div>
          </div>
        </motion.div>
        <motion.form
          onSubmit={handleOnSubmit}
          className="space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            delay: 0.6
          }}
        >
          {/* тут будут данные для отправки типа имя получателя, адрес, коммент к товару и т.д. */}
          <div className="rounded-2xl bg-white shadow-2xl">
            <div className="space-y-2 p-4">
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Ваши фамилия, имя, отчество"
                required
              />
              <Input
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                type="email"
                placeholder="Электронная почта"
              />
              <Input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="Контактный номер телефона"
                type="tel"
                required
              />
              <Input
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                placeholder="Город, улица, дом / квартира"
                required
              />
            </div>
            <div className="border-t p-4">
              <p className="text-muted-foreground text-sm">
                Убедитесь, что всё заполнено верно — это важно.
              </p>
            </div>
          </div>
          <PaymentButton
            type="submit"
            open={open}
            disabled={items.length === 0}
            loading={isLoading}
          />
        </motion.form>
      </div>
    </div>
  );
}
