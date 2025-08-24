"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react"

interface PropertyGalleryProps {
  id: string
}

// This would normally come from an API
const images = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    type: "Exterior",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    type: "Living Room",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    type: "Kitchen",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    type: "Master Bedroom",
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    type: "Bathroom",
  },
]

export function PropertyGallery({ id }: PropertyGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      <div className="group relative aspect-video overflow-hidden rounded-lg">
        <img
          src={images[currentImage].url}
          alt={images[currentImage].type}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={previousImage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={nextImage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="absolute bottom-4 left-4 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
          {currentImage + 1} / {images.length}
        </div>
        <div className="absolute bottom-4 right-4 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
          {images[currentImage].type}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setCurrentImage(index)}
            className={`relative aspect-video overflow-hidden rounded-lg ${
              index === currentImage
                ? "ring-2 ring-primary ring-offset-2"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={image.url}
              alt={image.type}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Button variant="outline" className="gap-2">
          <ImageIcon className="h-4 w-4" />
          Add Photos
        </Button>
        <span className="text-sm text-muted-foreground">
          {images.length} photos
        </span>
      </div>
    </div>
  )
}
