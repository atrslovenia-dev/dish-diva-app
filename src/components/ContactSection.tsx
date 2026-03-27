import { motion } from "framer-motion";
import { MapPin, Mail, Clock } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-card">
      <div className="container max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12 text-foreground"
        >
          Visit Us
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-3 gap-6 text-center"
        >
          <div className="bg-background rounded-xl p-6 space-y-3">
            <MapPin className="mx-auto text-primary" size={28} />
            <h3 className="font-heading text-lg font-semibold text-foreground">Location</h3>
            <a
              href="https://www.google.com/maps?q=Novi+trg+6,+Ljubljana"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground underline hover:text-primary transition-colors"
            >
              Novi trg 6, Ljubljana, Slovenia
            </a>
          </div>

          <div className="bg-background rounded-xl p-6 space-y-3">
            <Mail className="mx-auto text-primary" size={28} />
            <h3 className="font-heading text-lg font-semibold text-foreground">Email</h3>
            <a href="mailto:info@luckainavgust.si" className="text-sm text-muted-foreground underline hover:text-primary transition-colors">
              info@luckainavgust.si
            </a>
          </div>

          <div className="bg-background rounded-xl p-6 space-y-3">
            <Clock className="mx-auto text-primary" size={28} />
            <h3 className="font-heading text-lg font-semibold text-foreground">Hours</h3>
            <p className="text-sm text-muted-foreground">Mon–Fri: 10:00 – 18:00<br />Sat: 10:00 – 14:00</p>
          </div>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10">
          <a
            href="https://www.facebook.com/profile.php?id=61558709874168"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a
            href="https://www.instagram.com/luckainavgust/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
