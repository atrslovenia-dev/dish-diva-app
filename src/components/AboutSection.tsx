import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import HlsPlayer from "@/components/HlsPlayer";
import { galleryImages } from "@/data/gallery";

const slides = galleryImages.slice(0, 8);
const VIDEO_SRC = "https://video.cloudcomputing.si/hls/a49ee48e7e2268ccc53683e1fa72a7e8/master.m3u8";


const AboutSection = () => {
  const [playing, setPlaying] = useState(false);

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

        {/* Animated gallery presentation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-sm overflow-hidden bg-foreground/5"
        >
          <div className="relative aspect-video overflow-hidden">
            {slides.map((img, i) => (
              <motion.div
                key={img.src}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [1.08, 1, 1.04, 1.06],
                }}
                transition={{
                  duration: slides.length * 4,
                  times: [
                    (i / slides.length) - 0.02,
                    i / slides.length + 0.02,
                    (i + 1) / slides.length - 0.04,
                    (i + 1) / slides.length,
                  ].map((t) => Math.max(0, Math.min(1, t))),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0,
                }}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-primary-foreground">
                  <p className="text-[11px] uppercase tracking-[0.25em] opacity-80 mb-1">
                    {img.artist}
                  </p>
                  <h3 className="font-heading text-2xl md:text-3xl font-light italic">
                    {img.title}
                  </h3>
                </div>
              </motion.div>
            ))}

            {/* Top caption */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-10">
              <p className="text-primary-foreground/90 text-[11px] uppercase tracking-[0.25em] font-medium drop-shadow">
                Atelje Lučka &amp; Avgust — Predstavitev galerije
              </p>
            </div>
          </div>
        </motion.div>

        {/* Predstavitveni video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-20"
        >
          <p className="text-center text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-4">
            Video
          </p>
          <h3 className="font-heading text-3xl md:text-4xl font-light text-foreground text-center mb-8">
            Zgodba <span className="italic font-medium">ateljeja</span>
          </h3>

          <div className="relative rounded-sm overflow-hidden shadow-lg ring-1 ring-primary/15 bg-foreground/5">
            <div className="relative aspect-video">
              {playing ? (
                <HlsPlayer
                  src={VIDEO_SRC}
                  autoPlay
                  title="Predstavitveni video ateljeja Lučka & Avgust"
                  className="absolute inset-0 w-full h-full object-contain bg-foreground/10"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Predvajaj predstavitveni video"
                  className="group absolute inset-0 w-full h-full"
                >
                  <img
                    src={slides[0]?.src}
                    alt="Predstavitveni video ateljeja Lučka & Avgust"
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/40 transition-colors group-hover:bg-foreground/30" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex items-center gap-3 px-7 py-3.5 rounded-full border border-primary-foreground/40 bg-foreground/50 backdrop-blur-sm text-primary-foreground text-sm uppercase tracking-[0.2em] transition-all group-hover:bg-primary group-hover:border-primary">
                      <Play className="w-4 h-4" strokeWidth={1.5} />
                      Predvajaj
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mt-4">
            Kratek vpogled v naš svet umetnosti, oblikovanja in avtorskih izdelkov
          </p>
        </motion.div>
      </div>

    </section>
  );
};

export default AboutSection;
