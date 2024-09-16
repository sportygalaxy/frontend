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
        images: [
          "/images/product/prod-1.png",
          "/images/product/prod-2.png",
          "/images/product/prod-3.png",
          "/images/product/prod-4.png",
        ],
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
          introVideo: "", // link to short video clip
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
