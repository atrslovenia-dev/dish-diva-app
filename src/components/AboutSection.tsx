import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-8">
            Art that Inspires and Enriches
          </h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
            Together with the exceptional creators we present in our gallery, we believe that art — 
            as the renowned Slovenian artist Miha Maleš once wrote — can be one of the most beautiful 
            and purest things in our lives. Through their diverse artistic expressions and techniques, 
            the works of art bring light, warmth, a spark of joy and inspiration into our everyday lives. 
            Art reflects our inner world and helps us see beauty even in the complexity of life.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
