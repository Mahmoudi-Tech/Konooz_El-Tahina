import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  style?: CSSProperties;
}

export default function Reveal({ children, className = "", delay = 0, id, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={`reveal-3d ${visible ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
