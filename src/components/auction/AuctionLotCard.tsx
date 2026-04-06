import { motion, AnimatePresence } from "framer-motion";
import { Gavel, TrendingUp, ChevronDown } from "lucide-react";
import { type AuctionItem } from "@/data/auctions";
import CountdownTimer from "@/components/auction/CountdownTimer";

interface Props {
  item: AuctionItem;
  index: number;
  expandedLot: string | null;
  setExpandedLot: (id: string | null) => void;
  openBid: (item: AuctionItem) => void;
}

const AuctionLotCard = ({ item, index, expandedLot, setExpandedLot, openBid }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group bg-card border border-border/50 rounded-sm overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-3 left-3 bg-foreground/80 text-background px-2.5 py-1 rounded-sm text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm">
          Lot {item.lotNumber}
        </div>
      </div>

      <div className="p-5 md:p-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-1">{item.artist}</p>
        <h3 className="font-heading text-xl font-medium text-foreground mb-1">{item.title}</h3>
        <p className="text-xs text-muted-foreground mb-5">{item.medium} · {item.dimensions}</p>

        <div className="flex justify-between items-baseline mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Trenutna</p>
            <p className="font-heading text-2xl font-semibold text-primary">€{item.currentBid}</p>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><TrendingUp size={11} /> {item.bidCount} ponudb</span>
          </div>
        </div>

        <CountdownTimer endDate={item.endDate} compact />

        <div className="flex gap-2 mt-5">
          <button
            onClick={() => openBid(item)}
            className="flex-1 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity rounded-sm flex items-center justify-center gap-1.5 shadow-sm shadow-primary/15"
          >
            <Gavel size={13} /> Ponudi
          </button>
          <button
            onClick={() => setExpandedLot(expandedLot === item.id ? null : item.id)}
            className="px-3 py-3 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all rounded-sm"
          >
            <ChevronDown size={14} className={`transition-transform duration-300 ${expandedLot === item.id ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Bid history */}
      <AnimatePresence>
        {expandedLot === item.id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border/50"
          >
            <div className="p-5 bg-secondary/30">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">Zadnje ponudbe</p>
              <div className="space-y-1.5">
                {item.bids.slice(0, 4).map((bid, bi) => (
                  <div key={bid.id} className={`flex items-center justify-between text-xs py-1.5 ${bi === 0 ? "text-primary font-medium" : "text-foreground/60"}`}>
                    <span>{bid.bidder}</span>
                    <span className="font-heading font-semibold">€{bid.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AuctionLotCard;
