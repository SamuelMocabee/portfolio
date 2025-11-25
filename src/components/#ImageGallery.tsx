import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ImageGalleryProps {
  images: string[];
  altTextPrefix: string;
}

export function ImageGallery({ images, altTextPrefix }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
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
  const handleKeyDown = (e: React.KeyboardEvent) => {
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

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => openImage(idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openImage(idx);
              }
            }}
            className="group relative rounded-lg overflow-hidden border bg-muted hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
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

      {/* Accessible Modal/Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && closeImage()}>
        <DialogContent 
          className="max-w-7xl w-[95vw] h-[95vh] p-0 gap-0"
          onKeyDown={handleKeyDown}
          aria-describedby="image-gallery-description"
        >
          {/* Screen reader accessible title */}
          <VisuallyHidden>
            <DialogTitle>
              Image {selectedImage !== null ? selectedImage + 1 : 0} of {images.length}
            </DialogTitle>
          </VisuallyHidden>
          
          {/* Screen reader description */}
          <VisuallyHidden>
            <DialogDescription id="image-gallery-description">
              Use arrow keys to navigate between images, or press Escape to close.
              {selectedImage !== null && ` Currently viewing image ${selectedImage + 1} of ${images.length}.`}
            </DialogDescription>
          </VisuallyHidden>

          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center bg-black/95 rounded-lg">
              {/* Close Button - Minimum 44x44px for touch accessibility */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 bg-background/80 hover:bg-background w-11 h-11 rounded-full"
                onClick={closeImage}
                aria-label="Close image viewer"
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Previous Button */}
              {selectedImage > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 z-50 bg-background/80 hover:bg-background w-11 h-11 rounded-full"
                  onClick={goToPrevious}
                  aria-label={`Previous image (${selectedImage} of ${images.length})`}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              )}

              {/* Next Button */}
              {selectedImage < images.length - 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 z-50 bg-background/80 hover:bg-background w-11 h-11 rounded-full"
                  onClick={goToNext}
                  aria-label={`Next image (${selectedImage + 2} of ${images.length})`}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              )}

              {/* Main Image */}
              <div className="w-full h-full p-12 flex items-center justify-center">
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
        </DialogContent>
      </Dialog>
    </>
  );
}
