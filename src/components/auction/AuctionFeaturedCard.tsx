import { motion } from "framer-motion";
import { Gavel, History, TrendingUp, Maximize2 } from "lucide-react";
import { type AuctionItem } from "@/data/auctions";
import CountdownTimer from "@/components/auction/CountdownTimer";

interface Props {
  item: AuctionItem;
  index: number;
  openBid: (item: AuctionItem) => void;
  openFullscreen: (item: AuctionItem) => void;
}

const AuctionFeaturedCard = ({ item, index, openBid, openFullscreen }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-card border border-border/50 rounded-sm overflow-hidden hover:border-primary/20 transition-all duration-300"
    >
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="relative cursor-pointer" onClick={() => openFullscreen(item)}>
          <div className="aspect-square overflow-hidden bg-secondary">
            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
            Lot {item.lotNumber}
          </div>
          <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/10 backdrop-blur-sm text-background/60 hover:text-background hover:bg-background/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Maximize2 size={14} />
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col">
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold mb-0.5">{item.artist}</p>
          <h3 className="font-heading text-xl font-medium text-foreground mb-0.5 italic">{item.title}</h3>
          <p className="text-[10px] text-muted-foreground mb-2">{item.medium} · {item.dimensions} · {item.year}</p>
          <p className="text-xs text-foreground/60 leading-relaxed line-clamp-2 mb-3">{item.longDescription}</p>

          {/* Current bid */}
          <div className="bg-primary/5 border border-primary/10 rounded-sm p-3 mb-2">
            <div className="flex justify-between items-center mb-0.5">
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground">Trenutna ponudba</span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><TrendingUp size={10} /> {item.bidCount} ponudb</span>
            </div>
            <p className="font-heading text-2xl font-bold text-primary">€{item.currentBid.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Ocena: €{item.estimateLow.toLocaleString()}–€{item.estimateHigh.toLocaleString()}</p>
          </div>

          <CountdownTimer endDate={item.endDate} startDate={item.startDate} compact />

          {/* Bid leaderboard */}
          <div className="border border-border/50 rounded-sm p-2 my-2 bg-secondary/20">
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium mb-1 flex items-center gap-1"><History size={9} /> Lestvica</p>
            {item.bids.slice(0, 3).map((bid, bi) => (
              <div key={bid.id} className={`flex items-center justify-between text-[11px] py-0.5 ${bi === 0 ? "text-primary font-semibold" : "text-foreground/50"}`}>
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

          <button
            onClick={() => openBid(item)}
            className="w-full mt-auto py-2.5 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity rounded-sm flex items-center justify-center gap-1.5"
          >
            <Gavel size={12} /> Oddaj ponudbo
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AuctionFeaturedCard;
