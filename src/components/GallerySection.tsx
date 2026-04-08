import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryImage {
  src: string;
  artist: string;
  title: string;
  description: string;
}

import auctionTondi from "@/assets/auction-tondi.jpg";
import auctionAbstractBlue from "@/assets/auction-abstract-blue.jpg";
import auctionMixedMedia from "@/assets/auction-mixed-media.jpg";
import auctionMediterranean from "@/assets/auction-mediterranean.jpg";

const galleryImages: GalleryImage[] = [
  {
    src: auctionTondi,
    artist: "Marjanca Jemec Božič",
    title: "Devet svetov — serija tondijev",
    description: "Ciklus devetih okroglih slik, ki raziskuje kozmične in krajinske svetove skozi naivistični idiom.",
  },
  {
    src: auctionAbstractBlue,
    artist: "Ana Koželj",
    title: "Modra eksplozija",
    description: "Abstraktni ekspresionizem v modrih in rumenih tonih — intimno, a monumentalno.",
  },
  {
    src: auctionMixedMedia,
    artist: "Klavdij Tutta",
    title: "Kompozicija s čolnom",
    description: "Minimalistična poetika predmetov in krajine v mešani tehniki.",
  },
  {
    src: auctionMediterranean,
    artist: "Peter Marolt",
    title: "Mediteranski cipresi — triptih",
    description: "Istrska krajina s kolesarji, cipresami in morjem v živahni paleti.",
  },
];

const GallerySection = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const navigate = useCallback((dir: -1 | 1) => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      const next = prev + dir;
      if (next < 0) return galleryImages.length - 1;
      if (next >= galleryImages.length) return 0;
      return next;
    });
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  }, [closeLightbox, navigate]);

  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-4">Razstavljene umetnine</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
            Galerija
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group cursor-pointer relative overflow-hidden rounded-sm"
              onClick={() => openLightbox(i)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4 md:p-5">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-75">
                  <ZoomIn size={20} className="text-background" />
                </div>
                <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-primary-foreground/70 font-semibold mb-0.5">{img.artist}</p>
                <h3 className="font-heading text-base md:text-lg font-medium text-background leading-tight mb-1">{img.title}</h3>
                <p className="text-[11px] md:text-xs text-background/60 font-light line-clamp-2 hidden md:block">{img.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-foreground/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
            >
              <X size={22} className="text-background" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={24} className="text-background" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={24} className="text-background" />
            </button>

            {/* Image + info */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35 }}
              className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-sm shadow-2xl"
              />
              <div className="mt-6 text-center max-w-lg">
                <p className="text-[11px] uppercase tracking-[0.25em] text-primary/80 font-semibold mb-1">
                  {galleryImages[lightboxIndex].artist}
                </p>
                <h3 className="font-heading text-2xl md:text-3xl font-medium text-background mb-2">
                  {galleryImages[lightboxIndex].title}
                </h3>
                <p className="text-sm text-background/50 font-light">
                  {galleryImages[lightboxIndex].description}
                </p>
              </div>
              {/* Dots */}
              <div className="flex items-center gap-2 mt-5">
                {galleryImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === lightboxIndex ? "bg-primary w-6" : "bg-background/30 hover:bg-background/50"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
