import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

/** تأثير الإمالة ثلاثي الأبعاد — يعمل فقط على الشاشات الكبيرة التي بها ماوس */
export function useTilt<T extends HTMLElement>(options: Record<string, unknown> = {}) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 993px)");
    if (!mq.matches) return;
    VanillaTilt.init(el, options);
    return () => {
      (el as HTMLElement & { vanillaTilt?: { destroy: () => void } }).vanillaTilt?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}
