import { useMediaQuery } from "react-responsive";

const useBreakpoint = () => {
  const isXs = useMediaQuery({ query: "(min-width: 445px)" });
  const isSm = useMediaQuery({ query: "(min-width: 640px)" });
  const isMd = useMediaQuery({ query: "(min-width: 768px)" });
  const isLg = useMediaQuery({ query: "(min-width: 1024px)" });
  const isXl = useMediaQuery({ query: "(min-width: 1280px)" });
  const is2Xl = useMediaQuery({ query: "(min-width: 1440px)" });

  return { isXs, isSm, isMd, isLg, isXl, is2Xl };
};

export default useBreakpoint;
