import { useState, useCallback } from "react";

/**
 *
 * @param initState = false
 * @returns [typeof state, typeof toggle, typeof setState]
 */
function useToggle(
  initState = false
): [state: boolean, toggle: () => void, setState: (e: any) => void] {
  const [state, setState] = useState(initState);

  const toggle = useCallback(() => {
    setState((s) => !s);
  }, []);

  return /** @type {[typeof state, typeof toggle, typeof setState]} */ [
    state,
    toggle,
    setState,
  ];
}

export default useToggle;
