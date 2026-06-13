import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import videoAsset from "@/assets/about-demo.mp4.asset.json";

const AboutSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-4">O nas</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-10 leading-tight">
            Umetnost, ki <span className="italic font-medium">navdihuje</span> in bogati
          </h2>
          <div className="w-12 h-[1px] bg-primary/40 mx-auto mb-10" />
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg font-light max-w-3xl mx-auto">
            Skupaj z izjemnimi ustvarjalci, ki jih predstavljamo v naši galeriji, verjamemo,
            da je umetnost — kot je nekoč zapisal priznani slovenski umetnik Miha Maleš —
            ena najlepših in najčistejših reči v našem življenju. Skozi raznolike umetniške
            izraze in tehnike umetnine prinašajo svetlobo, toplino, iskro veselja in navdiha
            v naš vsakdan. Umetnost odseva naš notranji svet in nam pomaga videti lepoto
            tudi v kompleksnosti življenja.
          </p>
        </motion.div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-sm overflow-hidden group"
        >
          <div className="aspect-video bg-foreground/5">
            <video
              ref={videoRef}
              src={videoAsset.url}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent pointer-events-none" />

          {/* Play button — center */}
          {!isPlaying && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-colors shadow-lg">
                <Play size={32} className="text-primary-foreground ml-1" />
              </div>
            </motion.button>
          )}

          {/* Controls — bottom */}
          <div className={`absolute bottom-4 left-4 right-4 flex items-center justify-between transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"} group-hover:opacity-100`}>
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-foreground/50 transition-colors"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-foreground/50 transition-colors"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          </div>

          {/* Caption */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
            <p className={`text-primary-foreground/80 text-xs uppercase tracking-[0.15em] font-medium transition-opacity duration-300 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
              Atelje Lučka & Avgust — Predstavitveni video
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
