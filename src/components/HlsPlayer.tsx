import { useEffect, useRef } from "react";
import Hls from "hls.js";

interface HlsPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  title?: string;
  autoPlay?: boolean;
}

const HlsPlayer = ({ src, poster, className, title, autoPlay }: HlsPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      if (autoPlay) video.play().catch(() => undefined);
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      tryPlay();
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);
      return () => hls.destroy();
    }
  }, [src, autoPlay]);


  return (
    <video
      ref={videoRef}
      title={title}
      poster={poster}
      controls
      playsInline
      preload="metadata"
      className={className}
    />
  );
};

export default HlsPlayer;
