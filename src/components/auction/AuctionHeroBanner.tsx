import { motion } from "framer-motion";
import { Gavel, TrendingUp, Eye } from "lucide-react";

interface AuctionHeroBannerProps {
  totalLots: number;
  totalBids: number;
}

const AuctionHeroBanner = ({ totalLots, totalBids }: AuctionHeroBannerProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, hsl(var(--accent)) 0%, transparent 40%)`
        }} />
      </div>
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container relative">
        <div className="py-20 md:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/15 border border-primary/20 rounded-full mb-8">
              <Gavel size={14} className="text-primary" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-primary font-semibold">Ekskluzivne dražbe</span>
            </div>

            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-light text-background mb-6 leading-[0.95]">
              Dražite unikatna
              <br />
              <span className="italic font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                umetniška dela
              </span>
            </h1>

            <p className="text-background/50 max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed mb-10">
              Odkrijte izjemna dela slovenskih umetnikov na naših periodičnih dražbah.
              Vsako delo je unikat z zgodbo, ki čaka na svojega lastnika.
            </p>

            <div className="flex items-center justify-center gap-8 text-xs text-background/40">
              <span className="flex items-center gap-2">
                <Gavel size={13} className="text-primary/70" />
                <span className="text-background/60 font-medium">{totalLots}</span> lotov
              </span>
              <span className="w-px h-4 bg-background/10" />
              <span className="flex items-center gap-2">
                <TrendingUp size={13} className="text-accent/70" />
                <span className="text-background/60 font-medium">{totalBids}</span> ponudb
              </span>
              <span className="w-px h-4 bg-background/10" />
              <span className="flex items-center gap-2">
                <Eye size={13} className="text-primary/70" />
                Živa dražba
              </span>
            </div>
          </motion.div>

          {/* Auction info strip */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-8 py-4 bg-background/5 border border-background/10 rounded-sm text-[11px] uppercase tracking-wider text-background/40"
          >
            <span>Zimska dražba — December 2025</span>
            <span className="w-px h-3 bg-background/10 hidden sm:block" />
            <span>Provizija 12%</span>
            <span className="w-px h-3 bg-background/10 hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
              Kartice
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-[9px] bg-[#003087] text-white px-1 py-0.5 rounded-sm">PP</span>
              PayPal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-bold text-[9px] bg-background/80 text-foreground px-1 py-0.5 rounded-sm">G</span>
              Google Pay
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};

export default AuctionHeroBanner;
