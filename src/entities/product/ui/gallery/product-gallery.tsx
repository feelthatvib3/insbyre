'use client';

import Image from 'next/image';
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
    <div className="space-y-2">
      <div>
        <div className="bg-muted aspect-[24/23] overflow-hidden rounded-lg">
          <Image
            src={allImages[selectedImage]}
            alt="Main product image"
            width={600}
            height={600}
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {allImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              'aspect-square cursor-pointer overflow-hidden rounded-lg border-2 transition-colors',
              selectedImage === index
                ? 'border-united-nations-blue'
                : 'hover:border-united-nations-blue/35 border-transparent'
            )}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              width={200}
              height={200}
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
