'use client';

import { CoatHangerIcon, ShoppingBagIcon } from '@phosphor-icons/react';
import Link from 'next/link';

import { ContactsTile } from 'widgets/contacts-tile';
import { Header } from 'widgets/header';
import { InsbyreKeychain } from 'widgets/insbyre-keychain';

import { useCartStore } from 'features/cart';

import { Button } from 'shared/ui/button';

export default function Page() {
  const { increment } = useCartStore();
  return (
    <main>
      <section className="min-h-dvh">
        <div className="mx-auto max-w-[1200px]">
          <Header />

          <div className="grid min-h-[calc(100dvh-70px)] grid-cols-1 grid-rows-[1fr_1fr] gap-4 px-4 pb-4 md:grid-cols-2 md:grid-rows-1 xl:px-0">
            {/* Left Column */}
            <div className="flex flex-col justify-between gap-4">
              {/* Top-left large tile */}
              <div className="bg-muted hover:border-input-border-hover min-h-[250px] rounded-2xl border transition duration-300 sm:min-h-auto md:h-[70%]">
                <div className="flex h-full flex-col justify-between gap-4 p-4 sm:gap-8 sm:p-8 md:p-4 lg:p-8">
                  <h1 className="font-display text-2xl leading-12 uppercase sm:text-3xl lg:text-4xl xl:text-5xl">
                    Одежда, в которой ты к месту
                  </h1>
                  <p>
                    Иногда достаточно того, чтобы вещь не мешала, не подталкивала, не требовала
                    внимания. Просто была рядом.
                  </p>
                </div>
              </div>

              {/* Bottom small tiles (stacked) */}
              <div className="flex h-full gap-4 md:h-[30%] md:flex-col lg:flex-row">
                <Link
                  href="/catalogue"
                  className="bg-muted group hover:border-input-border-hover relative flex size-full items-center justify-center rounded-2xl border p-4 transition duration-300 md:items-end md:justify-start"
                >
                  <div className="relative flex items-center gap-x-2">
                    <CoatHangerIcon
                      size={20}
                      className="text-muted-foreground group-hover:text-united-nations-blue absolute opacity-0 transition duration-300 group-hover:-rotate-25 group-hover:opacity-100"
                    />
                    <h2 className="font-display text-lg uppercase transition duration-300 group-hover:translate-x-4 sm:text-3xl">
                      Каталог
                    </h2>
                  </div>
                </Link>
                <ContactsTile />
              </div>
            </div>

            {/* Right full-height tile */}
            <div className="bg-muted group hover:border-input-border-hover flowers relative h-auto overflow-hidden rounded-2xl border transition duration-300">
              <InsbyreKeychain />
              <Button
                variant="outline-brand"
                rounded="full"
                className="absolute right-4 bottom-4 font-normal uppercase"
                onClick={() => increment()}
              >
                <ShoppingBagIcon className="size-5" weight="fill" />
                <span>В корзину</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
