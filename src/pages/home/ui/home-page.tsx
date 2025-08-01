import { CoatHangerIcon } from '@phosphor-icons/react';
import type { FC } from 'react';

import { ContactsTile } from 'pages/home/ui/contacts-tile';
import { Keychain } from 'pages/home/ui/keychain';

import { Header } from 'widgets/header';

export const HomePage: FC = () => {
  return (
    <main>
      <section className="min-h-dvh">
        <div className="mx-auto max-w-[1200px]">
          <Header />
          <div className="grid min-h-[calc(100dvh-68px)] grid-cols-1 grid-rows-[1fr_1fr] gap-4 px-4 pb-4 md:grid-cols-2 md:grid-rows-1 xl:px-0">
            {/* Left Column */}
            <div className="flex flex-col justify-between gap-4">
              {/* Top-left large tile */}
              <div className="bg-united-nations-blue/5 flowers border-united-nations-blue/15 min-h-[250px] rounded-2xl border transition duration-300 md:h-[80%]">
                <div className="flex h-full flex-col justify-between gap-4 p-4 sm:gap-8 sm:p-8 md:p-4 lg:p-8">
                  <h1 className="font-display bg-background/5 text-2xl uppercase backdrop-blur-xs sm:text-3xl lg:text-4xl xl:text-5xl">
                    Одежда, в которой ты к месту
                  </h1>
                  <p className="bg-background/5 backdrop-blur-xs">
                    Иногда достаточно того, чтобы вещь не мешала, не подталкивала, не требовала
                    внимания. Просто была рядом.
                  </p>
                </div>
              </div>
              {/* Bottom small tiles (stacked) */}
              <div className="flex h-full gap-4 md:h-[30%] md:flex-col lg:flex-row">
                <a
                  href="/products"
                  className="bg-united-nations-blue/5 flowers border-united-nations-blue/15 group flower relative flex size-full items-center justify-center rounded-2xl border p-4 transition duration-300 md:items-end md:justify-start"
                >
                  <div className="relative flex items-center gap-x-2">
                    <CoatHangerIcon
                      size={20}
                      className="text-united-nations-blue absolute opacity-0 transition duration-300 group-hover:-rotate-25 group-hover:opacity-100"
                    />
                    <h2 className="font-display text-lg uppercase transition duration-300 group-hover:translate-x-4 sm:text-3xl">
                      Каталог
                    </h2>
                  </div>
                </a>
                <ContactsTile />
              </div>
            </div>
            {/* Right full-height tile */}
            <div className="bg-united-nations-blue/5 flowers border-united-nations-blue/15 group relative h-auto overflow-hidden rounded-2xl border transition duration-300">
              <Keychain />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
