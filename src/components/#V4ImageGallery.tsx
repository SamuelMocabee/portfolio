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
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={closeImage}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${selectedImage + 1} of ${images.length}`}
        >
          {/* Main Image */}
          <div
            className="flex-1 flex items-center justify-center w-full max-w-7xl mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={images[selectedImage]}
              alt={`${altTextPrefix} artifact ${selectedImage + 1} - Full size view`}
              className="max-w-full max-h-full w-auto h-auto object-contain"
            />
          </div>

          {/* Bottom Controls: < [1/2] > X */}
          <div
            className="flex items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button < */}
            <button
              onClick={goToPrevious}
              disabled={selectedImage === 0}
              className="bg-background/90 hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed w-12 h-12 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={`Previous image`}
              type="button"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Image Counter [1/2] */}
            <div className="bg-background/90 px-6 py-3 rounded-full min-w-[100px] text-center">
              <p className="text-sm font-medium" aria-live="polite" aria-atomic="true">
                {selectedImage + 1} / {images.length}
              </p>
            </div>

            {/* Next Button > */}
            <button
              onClick={goToNext}
              disabled={selectedImage === images.length - 1}
              className="bg-background/90 hover:bg-background disabled:opacity-50 disabled:cursor-not-allowed w-12 h-12 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label={`Next image`}
              type="button"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Close Button X */}
            <button
              onClick={closeImage}
              className="bg-background/90 hover:bg-background w-12 h-12 rounded-full flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ml-2"
              aria-label="Close image viewer"
              type="button"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
