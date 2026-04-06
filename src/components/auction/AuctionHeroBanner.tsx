import { motion } from "framer-motion";
import { Gavel } from "lucide-react";

interface AuctionHeroBannerProps {
  totalLots: number;
  totalBids: number;
}

const AuctionHeroBanner = ({ totalLots, totalBids }: AuctionHeroBannerProps) => {
  return (
    <div className="bg-background pt-20 pb-8 md:pt-24 md:pb-10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <Gavel size={18} className="text-primary" />
            <h1 className="font-heading text-2xl md:text-3xl font-medium text-foreground">
              Zimska dražba <span className="text-muted-foreground font-light">— Dec 2025</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-wider text-muted-foreground">
            <span>{totalLots} lotov</span>
            <span className="w-px h-3 bg-border" />
            <span>{totalBids} ponudb</span>
            <span className="w-px h-3 bg-border" />
            <span className="text-primary font-medium">● Živo</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuctionHeroBanner;
