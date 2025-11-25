import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ImageGalleryProps {
  images: string[];
  altTextPrefix: string;
}

export function ImageGallery({ images, altTextPrefix }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = ''; // Restore scroll
  };

  const goToPrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null && selectedImage < images.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage === null) return;
    
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        goToPrevious();
        break;
      case "ArrowRight":
        e.preventDefault();
        goToNext();
        break;
      case "Escape":
        closeImage();
        break;
    }
  };

  // Add/remove keyboard listener
  useState(() => {
    if (selectedImage !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  });

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => openImage(idx)}
            className="group relative rounded-lg overflow-hidden border bg-muted hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all cursor-pointer"
            aria-label={`View ${altTextPrefix} image ${idx + 1} of ${images.length} in full size`}
            type="button"
          >
            <div className="relative">
              <ImageWithFallback
                src={img}
                alt={`${altTextPrefix} artifact ${idx + 1}`}
                className="w-full h-64 object-contain"
              />
              {/* Overlay hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-focus-visible:bg-black/10 transition-colors flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-opacity">
                  Click to enlarge
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Simple Lightbox Modal - No Radix UI needed! */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeImage}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${selectedImage + 1} of ${images.length}`}
        >
          {/* Close Button */}
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 z-50 bg-background/80 hover:bg-background w-11 h-11 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Close image viewer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous Button */}
          {selectedImage > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 z-50 bg-background/80 hover:bg-background w-11 h-11 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Previous image (${selectedImage} of ${images.length})`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next Button */}
          {selectedImage < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 z-50 bg-background/80 hover:bg-background w-11 h-11 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Next image (${selectedImage + 2} of ${images.length})`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Main Image */}
          <div
            className="w-full h-full p-12 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={images[selectedImage]}
              alt={`${altTextPrefix} artifact ${selectedImage + 1} - Full size view`}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-4 py-2 rounded-full">
            <p className="text-sm font-medium" aria-live="polite" aria-atomic="true">
              {selectedImage + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
