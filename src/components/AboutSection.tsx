import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-4">O nas</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-10 leading-tight">
            Umetnost, ki <span className="italic font-medium">navdihuje</span> in bogati
          </h2>
          <div className="w-12 h-[1px] bg-primary/40 mx-auto mb-10" />
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg font-light">
            Skupaj z izjemnimi ustvarjalci, ki jih predstavljamo v naši galeriji, verjamemo, 
            da je umetnost — kot je nekoč zapisal priznani slovenski umetnik Miha Maleš — 
            ena najlepših in najčistejših reči v našem življenju. Skozi raznolike umetniške 
            izraze in tehnike umetnine prinašajo svetlobo, toplino, iskro veselja in navdiha 
            v naš vsakdan. Umetnost odseva naš notranji svet in nam pomaga videti lepoto 
            tudi v kompleksnosti življenja.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
