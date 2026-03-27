import { motion } from "framer-motion";
import heroImage from "@/assets/ljart.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />

      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold text-primary-foreground tracking-tight leading-none"
        >
          MY ART
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground tracking-tight leading-none mt-2"
        >
          IS MY CAPITAL
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-heading italic text-primary-foreground/70 text-lg mt-6"
        >
          — Avgust Černigoj
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          href="#gallery"
          className="inline-block mt-10 px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-body font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity"
        >
          View Gallery
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
