import { Gavel } from "lucide-react";

interface AuctionHeroBannerProps {
  totalLots: number;
  totalBids: number;
}

const AuctionHeroBanner = ({ totalLots, totalBids }: AuctionHeroBannerProps) => {
  return (
    <div className="bg-background pt-[68px]">
      <div className="container flex items-center justify-between py-2 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Gavel size={14} className="text-primary" />
          <span className="font-heading text-sm font-medium text-foreground">Zimska dražba</span>
          <span className="text-[10px] text-muted-foreground">Dec 2025</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>{totalLots} lotov</span>
          <span className="w-px h-2.5 bg-border" />
          <span>{totalBids} ponudb</span>
          <span className="w-px h-2.5 bg-border" />
          <span className="text-primary font-medium">● Živo</span>
        </div>
      </div>
    </div>
  );
};

export default AuctionHeroBanner;
