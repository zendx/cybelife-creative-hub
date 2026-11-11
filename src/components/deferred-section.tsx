import { Suspense, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";

export function DeferredSection({
  component: Component,
  fallback,
  rootMargin = "240px",
}: {
  component: ComponentType;
  fallback: ReactNode;
  rootMargin?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={sectionRef}>
      {shouldLoad ? (
        <Suspense fallback={fallback}>
          <Component />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}
