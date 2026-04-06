import { motion } from "framer-motion";
import { Gavel, TrendingUp, Eye } from "lucide-react";

interface AuctionHeroBannerProps {
  totalLots: number;
  totalBids: number;
}

const AuctionHeroBanner = ({ totalLots, totalBids }: AuctionHeroBannerProps) => {
  return (
    <div className="bg-background pt-24 pb-16 md:pt-32 md:pb-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-6">
            <Gavel size={14} className="text-primary" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">Ekskluzivne dražbe</span>
          </div>

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-5 leading-[1]">
            Dražite unikatna{" "}
            <span className="italic font-medium">umetniška dela</span>
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed mb-8">
            Odkrijte izjemna dela slovenskih umetnikov na naših periodičnih dražbah.
            Vsako delo je unikat z zgodbo, ki čaka na svojega lastnika.
          </p>

          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground mb-10">
            <span className="flex items-center gap-1.5"><Gavel size={13} /> {totalLots} lotov</span>
            <span className="flex items-center gap-1.5"><TrendingUp size={13} /> {totalBids} ponudb</span>
            <span className="flex items-center gap-1.5"><Eye size={13} /> Živa dražba</span>
          </div>

          {/* Auction info strip */}
          <div className="inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-6 py-3 bg-card border border-border rounded-sm text-[11px] uppercase tracking-wider text-muted-foreground">
            <span>Zimska dražba — December 2025</span>
            <span className="w-px h-3 bg-border hidden sm:block" />
            <span>Provizija 12%</span>
            <span className="w-px h-3 bg-border hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
              Kartice
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-[9px] bg-[#003087] text-white px-1 py-0.5 rounded-sm">PP</span>
              PayPal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-[9px] bg-foreground text-background px-1 py-0.5 rounded-sm">G</span>
              Google Pay
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuctionHeroBanner;
