import { motion } from "framer-motion";
import { MapPin, Mail, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-4">Dobrodošli</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
            Obiščite nas
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="bg-background rounded-sm p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <MapPin className="text-primary" size={22} />
            </div>
            <h3 className="font-heading text-lg font-medium text-foreground">Lokacija</h3>
            <a
              href="https://www.google.com/maps?q=Novi+trg+6,+Ljubljana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors block"
            >
              Novi trg 6, Ljubljana, Slovenija
            </a>
          </div>

          <div className="bg-background rounded-sm p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Mail className="text-primary" size={22} />
            </div>
            <h3 className="font-heading text-lg font-medium text-foreground">E-pošta</h3>
            <a href="mailto:info@luckainavgust.si" className="text-sm text-muted-foreground hover:text-primary transition-colors block">
              info@luckainavgust.si
            </a>
          </div>

          <div className="bg-background rounded-sm p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Clock className="text-primary" size={22} />
            </div>
            <h3 className="font-heading text-lg font-medium text-foreground">Delovni čas</h3>
            <p className="text-sm text-muted-foreground">Pon–Pet: 10:00 – 18:00<br />Sob: 10:00 – 14:00</p>
          </div>
        </motion.div>

        <div className="flex justify-center gap-8 mt-12">
          <a
            href="https://www.facebook.com/profile.php?id=61558709874168"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a
            href="https://www.instagram.com/luckainavgust/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
