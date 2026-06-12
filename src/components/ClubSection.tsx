import { useState, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, X, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { clubBenefits, clubTiers, clubSubmenus } from "@/data/club";

const VRGallery = lazy(() => import("@/components/VRGallery"));

const ClubSection = () => {
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null);
  const [vrModalOpen, setVrModalOpen] = useState(false);

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
            promocijske izdelke — ter se udeležujejo umetniških potovanj po Evropi in Sloveniji.
          </p>
        </motion.div>

        {/* Benefits grid — expandable */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {clubBenefits.map((benefit, i) => {
            const isExpanded = expandedBenefit === benefit.id;
            const hasDetails = benefit.details.length > 0;

            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`bg-card border rounded-sm overflow-hidden transition-all duration-400 ${
                  isExpanded ? "border-primary/40 shadow-lg col-span-1 md:col-span-2 lg:col-span-3" : "border-border/50 hover:border-primary/30 hover:shadow-md"
                }`}
              >
                <div
                  className={`p-6 ${hasDetails ? "cursor-pointer" : ""}`}
                  onClick={() => hasDetails && setExpandedBenefit(isExpanded ? null : benefit.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <span className="text-3xl mb-4 block">{benefit.icon}</span>
                      <h3 className="font-heading text-lg font-medium text-foreground mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed">{benefit.description}</p>
                    </div>
                    {hasDetails && (
                      <span className="text-primary mt-1 ml-2 shrink-0">
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </span>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && hasDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-border/30">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {benefit.details.map((detail, di) => (
                            <motion.div
                              key={di}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: di * 0.05 }}
                              className="bg-background/50 border border-border/30 rounded-sm overflow-hidden"
                            >
                              {detail.image && (
                                <div className="aspect-square overflow-hidden">
                                  <img
                                    src={detail.image}
                                    alt={detail.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                  />
                                </div>
                              )}
                              <div className="p-4">
                                <h4 className="text-sm font-medium text-foreground mb-1">{detail.title}</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed mb-2">{detail.description}</p>
                                {detail.price && (
                                  <p className="text-xs font-semibold text-primary">{detail.price}</p>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Submenus — VR, Video, etc. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <p className="text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-3">
              Več za člane
            </p>
            <h3 className="font-heading text-3xl md:text-4xl font-light text-foreground">
              Digitalna <span className="italic font-medium">doživetja</span>
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubSubmenus.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card border border-border/50 rounded-sm p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
                onClick={() => item.id === "vr-gallery" && setVrModalOpen(true)}
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h4 className="font-heading text-base font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                <span className="mt-4 text-primary text-xs uppercase tracking-[0.12em] font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  {item.id === "vr-gallery" ? "Vstopi v galerijo" : "Več"} <ArrowRight size={12} />
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* VR Gallery Modal — full 3D experience */}
        <AnimatePresence>
          {vrModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/95"
            >
              {/* 3D Canvas */}
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <RotateCcw size={32} className="text-primary animate-spin mx-auto mb-4" />
                    <p className="text-primary-foreground/70 text-sm">Nalagam galerijo...</p>
                  </div>
                </div>
              }>
                <VRGallery className="w-full h-full" />
              </Suspense>

              {/* Overlay UI */}
              <div className="absolute top-0 left-0 right-0 p-6 flex items-start justify-between pointer-events-none">
                <div>
                  <h3 className="font-heading text-xl text-primary-foreground/90 font-medium">
                    Virtualna galerija 360°
                  </h3>
                  <p className="text-primary-foreground/50 text-xs mt-1">
                    Klikni in povleci za ogled • Kolešček za približanje • Lebdi nad sliko za opis
                  </p>
                </div>
                <button
                  onClick={() => setVrModalOpen(false)}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/20 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Bottom badge */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none">
                <span className="bg-primary-foreground/10 text-primary-foreground/60 text-[11px] px-3 py-1.5 rounded-full backdrop-blur-sm">
                  🥽 360° pogled
                </span>
                <span className="bg-primary-foreground/10 text-primary-foreground/60 text-[11px] px-3 py-1.5 rounded-full backdrop-blur-sm">
                  8 del na ogled
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
