import { motion } from "framer-motion";
import wreathImage from "@/assets/wreath-workshop.png";

const EventsSection = () => {
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
          <p className="text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-4">Pridružite se nam</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground">
            Praznični čas se <span className="italic font-medium">bliža</span> ✨
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-8 items-start"
        >
          {/* Event info */}
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6">
              Delavnica origamija: <span className="italic">Izdelaj svoj praznični venček</span>
            </h3>

            <div className="flex justify-center md:justify-start mb-6">
              <img
                src={wreathImage}
                alt="Origami praznični venček delavnica"
                className="max-w-full max-h-64 rounded-sm shadow-sm"
              />
            </div>

            <div className="space-y-3 text-sm text-foreground/80">
              <p><span className="font-medium text-foreground">Kdaj:</span> Četrtek, 27. november 2025, 17.30–19.00</p>
              <p>
                <span className="font-medium text-foreground">Kje:</span> Atelje Lučka & Avgust, Novi trg 6, Ljubljana{" "}
                <a
                  href="https://www.google.com/maps?q=Novi+trg+6,+Ljubljana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  (Zemljevid)
                </a>
              </p>
              <p><span className="font-medium text-foreground">Vodja:</span> Nataša Brunec, Ars Origami</p>
              <p><span className="font-medium text-foreground">Cena:</span> 35 €</p>
              <p className="text-muted-foreground pt-2">
                🌿 Vsak udeleženec prejme presenečenje. ☕ Čaj in panettone vključena.
              </p>
            </div>
          </div>

          {/* Registration form */}
          <div className="bg-background rounded-sm p-8 shadow-sm">
            <h4 className="font-heading text-xl font-medium mb-6 text-foreground">Prijava</h4>
            <form className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">E-pošta</label>
                <input
                  type="email"
                  placeholder="vaša@epošta.si"
                  className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all rounded-sm"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Ime in priimek</label>
                <input
                  type="text"
                  placeholder="Janez Novak"
                  className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all rounded-sm"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">Telefon</label>
                <input
                  type="tel"
                  placeholder="+386 ..."
                  className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all rounded-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-primary text-primary-foreground text-sm uppercase tracking-[0.15em] font-medium hover:opacity-90 transition-opacity rounded-sm mt-2"
              >
                Pošlji prijavo
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
