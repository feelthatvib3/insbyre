import { ProductList } from 'entities/product';

export default function Page() {
  return (
    <div>
      <div className="mx-auto max-w-[1200px] space-y-4 px-4 py-4 md:space-y-8 md:py-8 xl:px-0">
        <h1 className="font-display text-4xl uppercase">Каталог</h1>
        <ProductList />
      </div>
    </div>
  );
}
