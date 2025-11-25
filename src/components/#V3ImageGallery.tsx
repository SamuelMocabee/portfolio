import { useState, useEffect } from "react";
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
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
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
  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

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

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95"
          onClick={closeImage}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${selectedImage + 1} of ${images.length}`}
        >
          {/* Close Button - Top Right */}
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 z-50 bg-background/90 hover:bg-background w-12 h-12 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close image viewer"
            type="button"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous Button - Left Side */}
          {selectedImage > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-background/90 hover:bg-background w-12 h-12 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={`Previous image (${selectedImage} of ${images.length})`}
              type="button"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next Button - Right Side */}
          {selectedImage < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-background/90 hover:bg-background w-12 h-12 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={`Next image (${selectedImage + 2} of ${images.length})`}
              type="button"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Main Image Container - With proper spacing */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              padding: '80px 80px', // More space for controls
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={images[selectedImage]}
              alt={`${altTextPrefix} artifact ${selectedImage + 1} - Full size view`}
              className="max-w-full max-h-full w-auto h-auto object-contain"
            />
          </div>

          {/* Image Counter - Bottom Center */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 bg-background/90 px-6 py-3 rounded-full">
            <p className="text-sm font-medium" aria-live="polite" aria-atomic="true">
              {selectedImage + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
