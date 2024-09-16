import { videoPath, youTubeLink } from "@/constants/appConstants";

export const medias = [
  {
    displayImage: "/images/product/prod-1.png",
    images: [],
    type: "image",
  },
  {
    displayImage: "/images/product/prod-1.png",
    links: {
      introVideo: videoPath, // link to short video clip
      completeVideo: youTubeLink, // link to full video clip
    },
    type: "video",
  },
];

export const products = [
  {
    name: "10kg Dumbbell | Enhance Your Strength Training",
    description:
      "Elevate your workout routine with our premium 10kg dumbbell, designed to meet the needs of both beginners and seasoned fitness enthusiasts. Whether you’re aiming to build muscle, tone your body, or improve overall fitness, this versatile dumbbell is the perfect addition to your home gym.",
    src: "/images/product/prod-1.png",
    type: "image",
    displayImage: "/images/product/prod-1.png",
    medias: [
      {
        images: ["/images/product/prod-1.png", "/images/product/prod-2.png"],
        type: "image",
      },
      {
        displayImage: "/images/product/prod-1.png",
        links: {
          introVideo: videoPath, // link to short video clip
          completeVideo: youTubeLink, // link to full video clip
        },
        type: "video",
      },
    ],
    price: "$1200",
    colors: ["blue", "black"],
    sizes: ["X", "XL"],
  },
  {
    name: "10kg Dumbbell | Enhance Your Strength Training",
    description:
      "Elevate your workout routine with our premium 10kg dumbbell, designed to meet the needs of both beginners and seasoned fitness enthusiasts. Whether you’re aiming to build muscle, tone your body, or improve overall fitness, this versatile dumbbell is the perfect addition to your home gym.",
    src: videoPath, // link to short video clip
    poster: "/images/product/prod-1.png", // path to thumbnail
    link: youTubeLink, // link to full video clip
    type: "video",
    displayImage: "/images/product/prod-1.png",
    medias: [
      {
        images: [],
        type: "image",
      },
      {
        displayImage: "/images/product/prod-1.png",
        links: {
          introVideo: videoPath, // link to short video clip
          completeVideo: youTubeLink, // link to full video clip
        },
        type: "video",
      },
    ],
    price: "$1200",
    colors: ["red", "green"],
    sizes: ["X", "XL"],
  },
];

const oldStructure = [
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

// I need you study the structure and write me a javascript helper function to flatten the object with type image such that it now looks like this. Take care of error cases like (null, undefined, zero length count)

const newStructure = [
  {
    images: "/images/product/prod-1.png",
    type: "image",
  },
  {
    images: "/images/product/prod-2.png",
    type: "image",
  },
  {
    images: "/images/product/prod-3.png",
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

// if there is an error case, return a fallback structure

const fallBackStructure = {
  images: "",
  type: "image",
};
