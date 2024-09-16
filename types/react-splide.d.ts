declare module "@splidejs/react-splide" {
  import { ComponentType } from "react";

  interface SplideProps {
    options?: object;
    [key: string]: any; // This makes the prop typing flexible
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<any>;
}
