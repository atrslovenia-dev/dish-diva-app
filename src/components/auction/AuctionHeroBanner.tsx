import { motion } from "framer-motion";
import { Gavel } from "lucide-react";

interface AuctionHeroBannerProps {
  totalLots: number;
  totalBids: number;
}

const AuctionHeroBanner = ({ totalLots, totalBids }: AuctionHeroBannerProps) => {
  return (
    <div className="bg-background pt-[68px]">
      <div className="container py-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Gavel size={16} className="text-primary" />
            <h1 className="font-heading text-xl font-medium text-foreground">
              Zimska dražba <span className="text-muted-foreground font-light text-base">Dec 2025</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
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
