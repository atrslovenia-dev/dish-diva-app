import { motion } from "framer-motion";
import heroImage from "@/assets/ljart.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1
            className="text-primary-foreground tracking-tight leading-[1.1]"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <span className="block italic font-light text-2xl sm:text-3xl lg:text-4xl">
              Vabljeni v
            </span>
            <span className="block italic font-bold text-4xl sm:text-6xl lg:text-7xl">
              skrbno izbran svet
            </span>
            <span className="block italic font-normal text-2xl sm:text-4xl lg:text-5xl">
              sodobne slovenske umetnosti,
            </span>
            <span className="block italic font-medium text-2xl sm:text-4xl lg:text-5xl">
              oblikovanja in avtorskih izdelkov.
            </span>
          </h1>
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          href="/gallery"
          className="inline-block mt-12 px-10 py-4 border border-primary-foreground/30 text-primary-foreground font-body text-sm uppercase tracking-[0.2em] hover:bg-primary-foreground/10 transition-all duration-300 rounded-sm"
        >
          Oglejte si galerijo
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
