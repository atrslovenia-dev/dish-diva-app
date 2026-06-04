import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";
import letterArtIllustration from "@/assets/letter-art-illustration.png.asset.json";


const LetterArtSection = () => {
  const [recipient, setRecipient] = useState<"self" | "other">("self");
  const [region, setRegion] = useState<"si" | "world">("si");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Hvala za naročilo! Kontaktirali vas bomo v kratkem.");
  };

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-4">
            Naročnina 2026
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-3">
            Umetnost v pismu <span className="italic font-medium">2026</span>
          </h1>
          <p className="font-heading italic text-lg md:text-xl text-muted-foreground">
            Hommage Srečku Kosovelu
          </p>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-12"
        >
          <img
            src={letterArtIllustration.url}
            alt="Ilustracija pisma s pečatom in trakovi"
            className="w-full max-w-xs md:max-w-sm h-auto mix-blend-multiply"
          />
        </motion.div>


        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto space-y-5 text-foreground/80 text-[15px] leading-relaxed font-light mb-14"
        >
          <p>
            Kdaj ste nazadnje v svoj domači poštni nabiralnik prejeli z roko napisano razglednico,
            pismo, voščilo? Se spomnite prijetnih občutkov — morda vznemirjenja, veselega
            pričakovanja in radovednosti ob odpiranju kuverte in prebiranju vsebine?
          </p>
          <p>
            In kdaj ste vi sami komu, ki vam je drag/a, to sporočili s skrbno izbrano in izpisano
            razglednico, vizitko, voščilnico ali pismom?
          </p>
          <p className="text-foreground">
            Nikoli ni prepozno in vedno je pravi čas in priložnost, da nekomu polepšate dan. Toliko
            bolj, če potrebuje spodbudo, prijazno in toplo besedo, oporo, navdih.
          </p>
          <p>
            Naročite se na <em className="text-primary font-medium not-italic">Umetnost v pismu</em>{" "}
            — naj vas vsak mesec v nabiralniku pričaka izbor avtorskih, skrbno oblikovanih
            voščilnic ali razglednic, letos, v Kosovelovem letu, z izbranimi verzi Srečka Kosovela.
          </p>
          <p className="italic text-primary">
            Odlična priložnost za zbiratelje in ljubitelje umetnosti.
          </p>
        </motion.div>

        {/* What's inside */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-14"
        >
          {[
            { icon: Mail, title: "3 voščilnice ali 7 razglednic", desc: "avtorske, s kuvertami in verzi Srečka Kosovela" },
            { icon: Heart, title: "Osebno sporočilo", desc: "idejne vodje in snovalke projekta" },
            { icon: Sparkles, title: "Drobna presenečenja", desc: "skrbno izbrana v vsaki pošiljki" },
          ].map((item, i) => (
            <div key={i} className="bg-card p-6 rounded-sm text-center">
              <item.icon className="w-7 h-7 text-primary mx-auto mb-3" strokeWidth={1.5} />
              <h3 className="font-heading text-base font-medium text-foreground mb-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground font-light">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-14"
        >
          <div className="border border-primary/30 p-6 rounded-sm text-center bg-card">
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">Slovenija</p>
            <p className="font-heading text-3xl text-primary mb-1">17,00 €</p>
            <p className="text-xs text-muted-foreground">na mesec</p>
          </div>
          <div className="border border-primary/30 p-6 rounded-sm text-center bg-card">
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2">Ostale države</p>
            <p className="font-heading text-3xl text-primary mb-1">20,00 €</p>
            <p className="text-xs text-muted-foreground">na mesec</p>
          </div>
        </motion.div>

        <p className="text-center text-sm text-muted-foreground font-light max-w-xl mx-auto mb-3">
          Naročnino lahko kadarkoli prekličete. Primerno za osebna in poslovna darila za vse, ki še
          cenijo klasično pošto. Ob večjih naročilih je možna personalizacija.
        </p>
        <p className="text-center text-xs text-primary font-medium mb-14">
          Naročila se sprejemajo do 10. v mesecu. Pošiljko prejmete do konca meseca. Začnemo v juniju!
        </p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-sm p-8 md:p-10 max-w-2xl mx-auto shadow-sm"
        >
          <h2 className="font-heading text-2xl font-light text-foreground mb-8 text-center">
            Naročilni obrazec
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium">
                Pošiljko naročam
              </label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { v: "self", l: "Zase" },
                  { v: "other", l: "Za drugega naslovnika" },
                ] as const).map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setRecipient(o.v)}
                    className={`py-3 px-4 text-sm rounded-sm border transition-all ${
                      recipient === o.v
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium">
                Območje dostave
              </label>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { v: "si", l: "Slovenija — 17 €" },
                  { v: "world", l: "Ostale države — 20 €" },
                ] as const).map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setRegion(o.v)}
                    className={`py-3 px-4 text-sm rounded-sm border transition-all ${
                      region === o.v
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 space-y-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Vaši podatki
              </p>
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Ime in priimek *</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2">Poštni naslov *</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-2">E-pošta *</label>
                <input
                  required
                  type="email"
                  className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-sm"
                />
              </div>
              {recipient === "other" && (
                <div>
                  <label className="block text-xs text-muted-foreground mb-2">
                    Podatki naslovnika (ime, naslov)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-sm resize-none"
                  />
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground italic">* Polja so obvezna</p>

            <button
              type="submit"
              className="w-full py-3.5 bg-primary text-primary-foreground text-sm uppercase tracking-[0.15em] font-medium hover:opacity-90 transition-opacity rounded-sm"
            >
              Pošlji naročilo
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default LetterArtSection;
