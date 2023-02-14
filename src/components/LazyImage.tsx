import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MutableRefObject,
} from "react";
import placeholder from "../images/placeholder-image.png";

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
};
export function LazyImage(props: LazyImageProps) {
  const { src, alt = "Image", title = "", style = {} } = props;
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const callback = useCallback(() => {
    setInView(true);
  }, [setInView]);

  useIntersection(ref, callback);

  return (
    <div ref={ref}>
      {inView ? (
        <img src={props.src} alt={alt} title={title} style={style} />
      ) : (
        <img src={placeholder} alt="loading" />
        // <LoadingPlaceholder />
      )}
    </div>
  );
}
