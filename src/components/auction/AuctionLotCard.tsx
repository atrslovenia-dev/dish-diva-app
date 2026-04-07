import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gavel, TrendingUp, ChevronDown, History } from "lucide-react";
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
  const [activeImg, setActiveImg] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group bg-card border border-border/50 rounded-sm overflow-hidden hover:border-primary/20 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={item.images[activeImg]}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 bg-foreground/80 text-background px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider backdrop-blur-sm">
          Lot {item.lotNumber}
        </div>
        {/* Image dots */}
        {item.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {item.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === activeImg ? "bg-background w-3" : "bg-background/50"}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Artist & title */}
        <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">{item.artist}</p>
        <h3 className="font-heading text-base font-medium text-foreground mb-0.5">{item.title}</h3>
        <p className="text-[10px] text-muted-foreground mb-3">{item.medium} · {item.dimensions}</p>

        {/* Current bid — prominent box */}
        <div className="bg-primary/5 border border-primary/10 rounded-sm p-2.5 mb-2">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Trenutna ponudba</p>
              <p className="font-heading text-xl font-bold text-primary">€{item.currentBid.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <TrendingUp size={10} /> {item.bidCount}
              </span>
            </div>
          </div>
        </div>

        {/* Top bids mini-leaderboard */}
        <div className="mb-2 px-1">
          {item.bids.slice(0, 3).map((bid, bi) => (
            <div key={bid.id} className={`flex items-center justify-between text-[10px] py-0.5 ${bi === 0 ? "text-primary font-semibold" : "text-foreground/50"}`}>
              <span>{bi + 1}. {bid.bidder}</span>
              <span className="font-heading">€{bid.amount}</span>
            </div>
          ))}
        </div>

        {/* Countdown */}
        <CountdownTimer endDate={item.endDate} compact />

        {/* Actions */}
        <div className="flex gap-1.5 mt-3">
          <button
            onClick={() => openBid(item)}
            className="flex-1 py-2.5 bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity rounded-sm flex items-center justify-center gap-1"
          >
            <Gavel size={11} /> Ponudi
          </button>
          <button
            onClick={() => setExpandedLot(expandedLot === item.id ? null : item.id)}
            className="px-2.5 py-2.5 border border-border text-muted-foreground hover:text-foreground transition-all rounded-sm"
          >
            <ChevronDown size={12} className={`transition-transform duration-300 ${expandedLot === item.id ? "rotate-180" : ""}`} />
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
            <div className="p-3 bg-secondary/20">
              <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium mb-1.5 flex items-center gap-1">
                <History size={9} /> Vse ponudbe ({item.bidCount})
              </p>
              {item.bids.slice(0, 5).map((bid, bi) => (
                <div key={bid.id} className={`flex items-center justify-between text-[10px] py-0.5 ${bi === 0 ? "text-primary font-medium" : "text-foreground/50"}`}>
                  <span>{bid.bidder}</span>
                  <span className="font-heading font-semibold">€{bid.amount}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AuctionLotCard;
