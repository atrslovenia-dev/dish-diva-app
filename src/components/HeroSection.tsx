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
          className="flex flex-col items-center"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-px bg-primary-foreground/40 mb-8"
          />
          <h1
            className="text-primary-foreground leading-[1.3] max-w-3xl mx-auto"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <span className="block italic font-light text-xl sm:text-2xl lg:text-3xl">
              Vabljeni v
            </span>
            <span className="block italic font-semibold text-4xl sm:text-5xl lg:text-6xl">
              skrbno izbran svet
            </span>
            <span className="block italic font-light text-xl sm:text-2xl lg:text-3xl">
              sodobne slovenske umetnosti,
            </span>
            <span className="block italic font-light text-xl sm:text-2xl lg:text-3xl">
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
