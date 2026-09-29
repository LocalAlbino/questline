import { useEffect, useState } from "react";

/** Counts down once started. Returns the seconds remaining (0 when idle) and a function to start from `seconds`. */
export function useCooldown(initialSeconds = 0) {
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const timeout = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(timeout);
  }, [remaining]);

  return [remaining, setRemaining] as const;
}
