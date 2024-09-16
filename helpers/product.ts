interface ImageItem {
  images: string[];
  type: "image";
}

interface VideoItem {
  images?: string[]; // redundant
  displayImage: string;
  links: {
    introVideo: string;
    completeVideo: string;
  };
  type: "video";
}

interface FlattenedImageItem {
  links?: any; // redundant
  images: string;
  type: "image";
}

interface FallBackStructure {
  images: string;
  type: "image";
}

type MediaItem = ImageItem | VideoItem;
type FlattenedMediaItem = FlattenedImageItem | VideoItem;

const fallBackStructure: FallBackStructure = {
  images: "",
  type: "image",
};

export function flattenMediaStructure(
  oldStructure: MediaItem[]
): FlattenedMediaItem[] {
  // Return fallback structure if input is not valid
  if (!Array.isArray(oldStructure) || oldStructure.length === 0) {
    return [fallBackStructure];
  }

  // Initialize a new array for the flattened structure
  const newStructure: FlattenedMediaItem[] = [];

  oldStructure.forEach((item) => {
    if (!item || typeof item !== "object" || !item.type) {
      // Skip invalid items and push fallback structure
      newStructure.push(fallBackStructure);
      return;
    }

    if (
      item.type === "image" &&
      Array.isArray(item.images) &&
      item.images.length > 0
    ) {
      // Flatten the array of images into individual objects
      item.images.forEach((image) => {
        newStructure.push({
          images: image,
          type: "image",
        });
      });
    } else if (item.type === "video") {
      // Add video objects as they are
      newStructure.push(item);
    } else {
      // For any invalid or incomplete items, add the fallback structure
      newStructure.push(fallBackStructure);
    }
  });

  return newStructure;
}

// Example usage:
const oldStructure: MediaItem[] = [
  {
    images: [
      "/images/product/prod-1.png",
      "/images/product/prod-2.png",
      "/images/product/prod-3.png",
    ],
    type: "image",
  },
  {
    displayImage: "/images/product/prod-1.png",
    links: {
      introVideo: "/videos/prod-1.mp4",
      completeVideo: "https://www.youtube.com/watch?v=6qg7UHgkq-U",
    },
    type: "video",
  },
];

const newStructure = flattenMediaStructure(oldStructure);
console.log(newStructure);
