import { motion } from "framer-motion";
import tuttaImage from "@/assets/tutta-exhibition.png";

const ExhibitionsSection = () => {
  return (
    <section id="exhibitions" className="py-20 md:py-28 bg-background">
      <div className="container max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12 text-foreground"
        >
          Current Exhibitions
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-card rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="p-6 md:p-8">
            <img
              src={tuttaImage}
              alt="Klavdij Tutta — Mediterranean Gardens and Voyages"
              className="w-full rounded-xl mb-6"
            />
            <h3 className="font-heading text-xl md:text-2xl font-semibold text-primary mb-2">
              Klavdij Tutta: Mediterranean Gardens and Voyages 2021–2025
            </h3>
            <p className="text-sm text-muted-foreground font-medium mb-4">
              Exhibition Opening and Wine Label Presentation
            </p>
            <div className="space-y-2 text-sm text-foreground/80">
              <p><strong>When:</strong> Wednesday, November 5, 2025, at 6:00 PM</p>
              <p><strong>Location:</strong> Atelje Lučka & Avgust, Novi trg 6, Ljubljana</p>
              <p><strong>Presented by:</strong> Art historian Judita Krivec Dragan</p>
              <p><strong>Open until:</strong> November 30, 2025</p>
            </div>
            <p className="text-center text-primary font-semibold mt-6 text-sm">
              🎨 We look forward to seeing you! 🍷
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExhibitionsSection;
