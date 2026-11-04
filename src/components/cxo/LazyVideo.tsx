import { useEffect, useRef, type VideoHTMLAttributes } from "react";

/**
 * Autoplaying muted video that only plays while it is on screen.
 * Keeps the page smooth: no video decoding while you are scrolling elsewhere.
 */
export function LazyVideo({
  rootMargin = "200px",
  ...props
}: VideoHTMLAttributes<HTMLVideoElement> & { rootMargin?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (video.preload === "none") video.preload = "auto";
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [rootMargin]);

  return <video ref={ref} muted loop playsInline {...props} />;
}
