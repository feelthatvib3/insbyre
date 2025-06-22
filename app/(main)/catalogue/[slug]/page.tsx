'use client';

import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const slug = params?.slug;

  return (
    <div>
      <div className="mx-auto max-w-[1200px] space-y-4 px-4 py-4 md:space-y-8 md:py-8 xl:px-0">
        <h1 className="font-display text-4xl uppercase">{slug}</h1>
        <p className="text-muted-foreground">Тут будет продукт.</p>
      </div>
    </div>
  );
}
