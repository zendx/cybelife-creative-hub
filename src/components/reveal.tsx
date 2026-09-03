import {
  createElement,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type RevealElement =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "main"
  | "nav"
  | "ul"
  | "ol"
  | "li"
  | "span";

export interface RevealProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** The semantic element used for the wrapper. */
  as?: RevealElement;
  children: ReactNode;
  /** Delay before the reveal begins, in milliseconds. */
  delay?: number;
  /** Percentage of the wrapper that must enter the viewport. */
  threshold?: number;
  /** IntersectionObserver margin; useful for revealing slightly before entry. */
  rootMargin?: string;
}

/**
 * Reveals its content once with a subtle bottom-to-top transition.
 * Motion is disabled when the visitor prefers reduced motion.
 */
export function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  threshold = 0.12,
  rootMargin = "0px 0px -8%",
  style,
  ...props
}: RevealProps) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isRevealed, setIsRevealed] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;

    const revealImmediately = () => {
      observer?.disconnect();
      setReduceMotion(true);
      setIsRevealed(true);
      setIsReady(true);
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) revealImmediately();
    };

    if (motionPreference.matches || !("IntersectionObserver" in window)) {
      revealImmediately();
    } else {
      const bounds = element.getBoundingClientRect();
      const isInitiallyVisible = bounds.top <= window.innerHeight * 0.92 && bounds.bottom >= 0;

      if (isInitiallyVisible) {
        setIsRevealed(true);
        setIsReady(true);
      } else {
        setIsRevealed(false);
        setIsReady(true);
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;

          setIsRevealed(true);
          observer?.disconnect();
        },
        {
          rootMargin,
          threshold: Math.min(1, Math.max(0, threshold)),
        },
      );

      observer.observe(element);
    }

    motionPreference.addEventListener("change", handleMotionPreference);

    return () => {
      observer?.disconnect();
      motionPreference.removeEventListener("change", handleMotionPreference);
    };
  }, [rootMargin, threshold]);

  const revealStyle: CSSProperties = {
    opacity: !isReady || isRevealed ? 1 : 0,
    transform: !isReady || isRevealed ? "translate3d(0, 0, 0)" : "translate3d(0, 1.75rem, 0)",
    transitionProperty: "opacity, transform",
    transitionDuration: reduceMotion ? "0ms" : "700ms",
    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    transitionDelay: isRevealed && !reduceMotion ? `${Math.max(0, delay)}ms` : "0ms",
    willChange: !isReady || isRevealed ? undefined : "opacity, transform",
    ...style,
  };

  return createElement(
    as,
    {
      ...props,
      ref: elementRef,
      className,
      style: revealStyle,
      "data-revealed": isRevealed ? "true" : "false",
    },
    children,
  );
}
