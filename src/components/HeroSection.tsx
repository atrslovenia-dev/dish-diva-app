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
          <h1 className="font-heading text-6xl sm:text-8xl lg:text-9xl font-light text-primary-foreground tracking-tight leading-[0.9]">
            <span className="block italic font-light">Moja</span>
            <span className="block font-bold">UMETNOST</span>
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-[1px] bg-primary-foreground/50 mx-auto my-6"
          />
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-light text-primary-foreground/90 tracking-wide">
            je moj <span className="italic font-medium">kapital</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-heading italic text-primary-foreground/60 text-lg mt-8 tracking-wide"
        >
          — Avgust Černigoj
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
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
