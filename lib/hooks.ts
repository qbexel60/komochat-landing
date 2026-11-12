'use client';

import { useInView, useReducedMotion } from 'motion/react';
import { useEffect, useState, type RefObject } from 'react';

/** True while the element is on screen (loops rest when it is not). */
export function useOnScreen(ref: RefObject<Element | null>, margin = '0px 0px -10% 0px') {
  return useInView(ref, { margin: margin as `${number}px ${number}px ${number}px ${number}px` });
}

/**
 * A step counter for small looping demos. Each step lasts its own time;
 * it only runs while `active`. With reduced motion it stays on `restStep`.
 */
export function useSteps(durations: number[], active: boolean, restStep = durations.length - 1) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce || !active) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % durations.length), durations[step]);
    return () => window.clearTimeout(t);
  }, [step, active, reduce, durations]);

  return reduce ? restStep : step;
}
