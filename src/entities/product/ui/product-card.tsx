import { formatPrice } from 'shared/lib/format-price';
import type { Product } from 'shared/types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <a
      href={`/products/${product.categories[0]}/${product.slug}`}
      className="group group flex h-full flex-col justify-between overflow-hidden"
    >
      <div className="bg-united-nations-blue/5 flowers border-united-nations-blue/15 rounded-2xl border p-2 transition-all duration-300 group-hover:border-transparent group-hover:p-0">
        <div className="aspect-[1] overflow-hidden rounded-[8px] transition-all duration-300 group-hover:rounded-2xl">
          <img src={product.images[0]} alt={product.name} className="size-full object-cover" />
        </div>
      </div>

      <div className="space-y-0 px-2 pt-2 pb-2">
        <h2 className="group-hover:text-united-nations-blue font-medium uppercase transition-colors duration-300">
          {product.name}
        </h2>
        <p className="text-muted-foreground">{formatPrice(product.price)}</p>
      </div>
    </a>
  );
};
