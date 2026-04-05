import { motion } from "framer-motion";
import { Timer, Gavel, TrendingUp } from "lucide-react";
import { auctionsData } from "@/data/auctions";

const AuctionsSection = () => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("sl-SI", { day: "numeric", month: "long", year: "numeric" });
  };

  const daysLeft = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-4">
            Ekskluzivne dražbe
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-5">
            Dražite unikatna <span className="italic font-medium">umetniška dela</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-light">
            Odkrijte izjemna dela slovenskih umetnikov na naših periodičnih dražbah.
            Vsako delo je unikat z zgodbo, ki čaka na svojega lastnika.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {auctionsData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-sm overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-sm flex items-center gap-1.5 text-xs font-medium">
                  <Timer size={13} />
                  {daysLeft(item.endDate)} dni
                </div>
              </div>

              <div className="p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.15em] text-primary font-medium mb-2">
                  {item.artist}
                </p>
                <h3 className="font-heading text-xl md:text-2xl font-medium text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-5 font-light">
                  {item.description}
                </p>

                <div className="flex items-center justify-between border-t border-border/50 pt-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Trenutna ponudba</p>
                    <p className="font-heading text-2xl font-semibold text-primary">€{item.currentBid}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1 justify-end">
                      <TrendingUp size={12} /> {item.bidCount} ponudb
                    </p>
                    <p className="text-xs text-muted-foreground">do {formatDate(item.endDate)}</p>
                  </div>
                </div>

                <button className="w-full mt-5 py-3 border-2 border-primary text-primary text-sm uppercase tracking-[0.12em] font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-sm flex items-center justify-center gap-2">
                  <Gavel size={16} />
                  Oddaj ponudbo
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuctionsSection;
