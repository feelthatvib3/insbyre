import { useState } from 'react';

import { cn } from 'shared/lib/cn';

interface ProductGalleryProps {
  images: string[];
  thumbnail?: string | null;
}

export function ProductGallery({ images, thumbnail }: ProductGalleryProps) {
  const allImages = thumbnail ? [thumbnail, ...images.filter((img) => img !== thumbnail)] : images;
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-y-2 md:flex-row md:gap-x-2">
      <div className="flex w-full gap-x-2 md:flex-col md:gap-x-0 md:gap-y-2">
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              'aspect-square w-full max-w-24 cursor-pointer overflow-hidden rounded-2xl border-1 transition-colors duration-300',
              selectedImage === index
                ? 'border-united-nations-blue'
                : 'hover:border-united-nations-blue/35 border-transparent'
            )}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} className="object-cover" />
          </button>
        ))}
      </div>

      <div className="aspect-[24/30] overflow-hidden rounded-2xl">
        <img
          src={allImages[selectedImage]}
          alt="Main product image"
          className="size-full object-cover"
        />
      </div>
    </div>
  );
}
