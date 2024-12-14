import { videoPath, youTubeLink } from "@/constants/appConstants";

export const keyattribute = [
  {
    id: 1,
    key: "Premium Quality Material",
    value:
      "Crafted from high-grade cast iron, ensuring durability and longevity.",
  },
  {
    id: 2,
    key: "Ergonomic Design",
    value:
      "The comfortable, non-slip grip ensures a secure hold during even the most intense workouts.",
  },
  {
    id: 3,
    key: "Compact and Versatile",
    value:
      "Ideal for a wide range of exercises, including bicep curls, tricep extensions, shoulder presses, and more.",
  },
  {
    id: 4,
    key: "Space-Saving",
    value: "Compact size makes it easy to store and perfect for home use.",
  },
  {
    id: 5,
    key: "Rust-Resistant Finish",
    value:
      "Coated with a protective layer to prevent rust and corrosion, maintaining a sleek look for years.",
  },
];

export const specification = [
  {
    id: 1,
    key: "Weight",
    value: "10 kilograms (22 pounds)",
  },
  {
    id: 2,
    key: "Material",
    value: "Cast iron with anti-rust coating",
  },
  {
    id: 3,
    key: "Grip",
    value: "Textured, non-slip handle",
  },
  {
    id: 4,
    key: "Dimensions",
    value: "Compact size makes it easy to store and perfect for home use.",
  },
  {
    id: 5,
    key: "Colour",
    value:
      "Coated with a protective layer to prevent rust and corrosion, maintaining a sleek look for years.dddd",
  },
];

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
    id: 1,
    name: "10kg Dumbbell | Enhance Your Strength Training",
    description:
      "Elevate your workout routine with our premium 10kg dumbbell, designed to meet the needs of both beginners and seasoned fitness enthusiasts. Whether you’re aiming to build muscle, tone your body, or improve overall fitness, this versatile dumbbell is the perfect addition to your home gym.",
    stock: 200,
    src: "/images/product/prod-1.png",
    type: "image",
    displayImage: "/images/product/prod-1.png",
    medias: [
      {
        images: [
          "/images/product/prod-1.png",
          // "/images/product/prod-2.png",
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
    keyattribute,
    specification,
  },
  {
    id: 2,
    name: "10kg Dumbbell | Enhance Your Strength Training",
    description:
      "Elevate your workout routine with our premium 10kg dumbbell, designed to meet the needs of both beginners and seasoned fitness enthusiasts. Whether you’re aiming to build muscle, tone your body, or improve overall fitness, this versatile dumbbell is the perfect addition to your home gym.",
    stock: 200,
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
    sizes: [],
    colors: [],
    keyattribute: [],
    specification: [],
  },
];
