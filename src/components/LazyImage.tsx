import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MutableRefObject,
} from "react";

const listenerCallbacks = new WeakMap();

const handleIntersections = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (!listenerCallbacks.has(entry.target)) return;

    const callback = listenerCallbacks.get(entry.target);
    if (!entry.isIntersecting) return;

    observer.unobserve(entry.target);
    listenerCallbacks.delete(entry.target);
    callback();
  });
};

let observer = new IntersectionObserver(
  handleIntersections as IntersectionObserverCallback,
  {
    rootMargin: "0px",
    threshold: 0.25,
  }
);

const useIntersection = (
  ref: MutableRefObject<HTMLDivElement | null>,
  callback: () => void
) => {
  let intersectionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      intersectionRef.current = ref.current;
      listenerCallbacks.set(ref.current, callback);
      observer.observe(ref.current);
    }

    return () => {
      if (intersectionRef.current) {
        listenerCallbacks.delete(intersectionRef.current);
        observer.unobserve(intersectionRef.current);
      }
    };
  }, [ref, callback]);
};

type LazyImageProps = {
  src: string;
  alt?: string;
  title?: string;
  style?: React.CSSProperties;
  ratio?: "3:2" | "1:1"; // The ratio for placeholder image
};
export function LazyImage(props: LazyImageProps) {
  const { src, alt = "Image", title = "", style = {}, ratio = "1:1" } = props;
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const callback = useCallback(() => {
    setInView(true);
  }, [setInView]);

  useIntersection(ref, callback);

  return (
    <div ref={ref}>
      {inView ? (
        <img src={src} alt={alt} title={title} style={style} />
      ) : (
        <img
          src={
            ratio === "1:1"
              ? "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8XA8AAksBZG7LpHYAAAAASUVORK5CYII="
              : ratio === "3:2"
              ? "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACCAQAAAA3fa6RAAAAEElEQVR42mM8U88ABIwQCgAXtgKZPVsbEAAAAABJRU5ErkJggg=="
              : ""
          }
          alt="loading"
          style={{ width: "100%", height: "auto" }}
        />
        // <LoadingPlaceholder />
      )}
    </div>
  );
}
