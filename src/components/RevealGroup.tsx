import { useRef, useEffect, ReactNode } from "react";

export default function RevealGroup({ children, className = "", key }: { children: ReactNode; className?: string; key?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("opacity-100", "translate-y-0"); el.classList.remove("opacity-0", "translate-y-6"); }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [key]);
  return <div ref={ref} className={`opacity-0 translate-y-6 transition-all duration-700 ease-out ${className}`}>{children}</div>;
}
