import { useMemo } from "react";
import { motion } from "framer-motion";
import { galleryImages } from "@/data/gallery";

const AboutSection = () => {
  // Pick 12 images for the 360° carousel
  const images = useMemo(() => galleryImages.slice(0, 12), []);
  const count = images.length;
  const radius = 320; // px — cylinder radius
  const angleStep = 360 / count;

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

        {/* 360° Gallery presentation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-sm overflow-hidden bg-gradient-to-b from-foreground/[0.04] via-background to-foreground/[0.04]"
        >
          <div
            className="relative aspect-video w-full"
            style={{ perspective: "1200px" }}
          >
            {/* Soft floor + ceiling vignette to evoke gallery space */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,hsl(var(--background))_95%)] z-10" />

            {/* Rotating stage */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            >
              {images.map((img, i) => {
                const angle = i * angleStep;
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="w-[180px] md:w-[220px] h-[120px] md:h-[150px] rounded-sm overflow-hidden shadow-2xl ring-1 ring-primary/10 bg-card">
                      <img
                        src={img.src}
                        alt={img.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <p className="text-foreground/70 text-xs uppercase tracking-[0.2em] font-medium">
                Atelje Lučka & Avgust — 360° predstavitev galerije
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
