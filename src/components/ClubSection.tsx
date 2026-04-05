import { motion } from "framer-motion";
import { Check, ArrowRight, MapPin, Calendar } from "lucide-react";
import { clubBenefits, clubTrips, clubTiers } from "@/data/club";

const ClubSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-4">
            Klub Atelje Lučka & Avgust
          </p>
          <h2 className="font-heading text-4xl md:text-6xl font-light text-foreground mb-5">
            Postanite del naše <span className="italic font-medium">umetniške družine</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-light">
            Člani kluba periodično prejemajo ekskluzivno gradivo — voščilnice, darila,
            promocijske izdelke — ter se udeležujejo umetniških potovanj po Evropi.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-24">
          {clubBenefits.map((benefit, i) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-card border border-border/50 rounded-sm p-6 hover:border-primary/30 hover:shadow-md transition-all duration-400"
            >
              <span className="text-3xl mb-4 block">{benefit.icon}</span>
              <h3 className="font-heading text-lg font-medium text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <p className="text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-3">
              Umetniška potovanja
            </p>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-foreground">
              Odkrivajte galerije <span className="italic font-medium">sveta</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {clubTrips.map((trip, i) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-sm overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-lg"
              >
                <div className="aspect-[3/2] overflow-hidden relative">
                  <img
                    src={trip.image}
                    alt={trip.destination}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-primary-foreground font-heading text-lg font-medium">{trip.destination}</p>
                    <p className="text-primary-foreground/80 text-xs">{trip.highlight}</p>
                  </div>
                </div>
                <div className="p-5 bg-card">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {trip.date}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {trip.destination.split("—")[0].trim()}</span>
                  </div>
                  <p className="text-sm text-foreground/80 font-light leading-relaxed">{trip.description}</p>
                  <button className="mt-4 text-primary text-xs uppercase tracking-[0.12em] font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300">
                    Več informacij <ArrowRight size={13} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <p className="text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-3">
              Članstvo
            </p>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-foreground">
              Izberite svoj <span className="italic font-medium">paket</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {clubTiers.map((tier, i) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-sm p-8 border transition-all duration-300 ${
                  tier.highlighted
                    ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                    : "border-border/50 bg-card hover:border-primary/30"
                }`}
              >
                {tier.highlighted && (
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                    ★ Najbolj priljubljen
                  </p>
                )}
                <h4 className="font-heading text-2xl font-medium text-foreground mb-1">{tier.name}</h4>
                <div className="mb-6">
                  <span className="font-heading text-3xl font-semibold text-primary">{tier.price}</span>
                  <span className="text-muted-foreground text-sm"> / {tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check size={15} className="text-primary mt-0.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 text-sm uppercase tracking-[0.12em] font-medium rounded-sm transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  Pridruži se
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClubSection;
