"use client";
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean | undefined {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handler = () => setMatches(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);

    // Intentional: read initial value after mount so the first client render
    // returns undefined (matching SSR), avoiding a hydration mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMatches(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
