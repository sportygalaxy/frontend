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
    price: "1200",
    sizes: [
      {
        size: {
          id: "123e4567-e89b-12d3-a456-426614174005",
          name: "X",
        },
      },
      {
        size: {
          id: "123e4567-e89b-12d3-a456-426614174006",
          name: "XL",
        },
      },
    ],
    colors: [
      {
        color: {
          id: "123e4567-e89b-12d3-a456-426614174007",
          name: "#000",
        },
      },
      {
        color: {
          id: "123e4567-e89b-12d3-a456-426614174008",
          name: "#583808",
        },
      },
    ],
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
    price: "1200",
    sizes: [
      {
        size: {
          id: "123e4567-e89b-12d3-a456-426614174005",
          name: "Small",
        },
      },
      {
        size: {
          id: "123e4567-e89b-12d3-a456-426614174006",
          name: "Medium",
        },
      },
    ],
    colors: [
      {
        color: {
          id: "123e4567-e89b-12d3-a456-426614174007",
          name: "Red",
        },
      },
      {
        color: {
          id: "123e4567-e89b-12d3-a456-426614174008",
          name: "Blue",
        },
      },
    ],
  },
];
