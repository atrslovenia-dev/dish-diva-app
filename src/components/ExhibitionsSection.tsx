import { motion } from "framer-motion";
import tuttaImage from "@/assets/tutta-exhibition.png";

const ExhibitionsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-4">Trenutno na ogled</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
            Razstave
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-card rounded-sm overflow-hidden shadow-sm"
        >
          <img
            src={tuttaImage}
            alt="Klavdij Tutta — Sredozemski vrtovi in potovanja"
            className="w-full"
          />
          <div className="p-8 md:p-10">
            <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-2">
              Klavdij Tutta: <span className="italic">Sredozemski vrtovi in potovanja</span> 2021–2025
            </h3>
            <p className="text-sm text-muted-foreground font-medium mb-6 uppercase tracking-wider">
              Otvoritev razstave in predstavitev vinske etikete
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-foreground/80">
              <div className="space-y-3">
                <p><span className="font-medium text-foreground">Kdaj:</span> Sreda, 5. november 2025, ob 18.00</p>
                <p><span className="font-medium text-foreground">Kje:</span> Atelje Lučka & Avgust, Novi trg 6, Ljubljana</p>
              </div>
              <div className="space-y-3">
                <p><span className="font-medium text-foreground">Predstavi:</span> Umetnostna zgodovinarka Judita Krivec Dragan</p>
                <p><span className="font-medium text-foreground">Na ogled do:</span> 30. november 2025</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-center text-primary font-heading text-lg italic">
                🎨 Vabljeni! 🍷
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExhibitionsSection;
