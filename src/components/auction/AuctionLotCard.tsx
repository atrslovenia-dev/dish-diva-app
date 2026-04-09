import { motion } from "framer-motion";
import { Gavel, TrendingUp, Maximize2 } from "lucide-react";
import { type AuctionItem } from "@/data/auctions";
import CountdownTimer from "@/components/auction/CountdownTimer";

interface Props {
  item: AuctionItem;
  index: number;
  openBid: (item: AuctionItem) => void;
  openFullscreen: (item: AuctionItem) => void;
}

const AuctionLotCard = ({ item, index, openBid, openFullscreen }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group bg-card border border-border/50 rounded-sm overflow-hidden hover:border-primary/20 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary cursor-pointer" onClick={() => openFullscreen(item)}>
        <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute top-2 left-2 bg-foreground/80 text-background px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider backdrop-blur-sm">
          Lot {item.lotNumber}
        </div>
        <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/10 backdrop-blur-sm text-background/60 hover:text-background hover:bg-background/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Maximize2 size={12} />
        </button>
      </div>

      <div className="p-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">{item.artist}</p>
        <h3 className="font-heading text-base font-medium text-foreground mb-0.5 italic">{item.title}</h3>
        <p className="text-[10px] text-muted-foreground mb-2">{item.medium} · {item.dimensions}</p>

        {/* Current bid */}
        <div className="bg-primary/5 border border-primary/10 rounded-sm p-2 mb-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Trenutna ponudba</p>
              <p className="font-heading text-lg font-bold text-primary">€{item.currentBid.toLocaleString()}</p>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <TrendingUp size={10} /> {item.bidCount}
            </span>
          </div>
        </div>

        {/* Top bidders with initials */}
        <div className="mb-2 px-0.5">
          {item.bids.slice(0, 3).map((bid, bi) => (
            <div key={bid.id} className={`flex items-center justify-between text-[10px] py-0.5 ${bi === 0 ? "text-primary font-semibold" : "text-foreground/50"}`}>
              <span className="flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-[7px] font-bold text-primary">
                  {bid.bidder.split(" ").map(w => w[0]).join("")}
                </span>
                {bid.bidder}
              </span>
              <span className="font-heading">€{bid.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>

        <CountdownTimer endDate={item.endDate} compact />

        <button
          onClick={() => openBid(item)}
          className="w-full mt-2 py-2.5 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity rounded-sm flex items-center justify-center gap-1"
        >
          <Gavel size={11} /> Ponudi
        </button>
      </div>
    </motion.div>
  );
};

export default AuctionLotCard;
