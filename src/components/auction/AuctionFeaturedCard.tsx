import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gavel, History, TrendingUp, Eye } from "lucide-react";
import { type AuctionItem } from "@/data/auctions";
import CountdownTimer from "@/components/auction/CountdownTimer";

interface Props {
  item: AuctionItem;
  index: number;
  expandedLot: string | null;
  setExpandedLot: (id: string | null) => void;
  openBid: (item: AuctionItem) => void;
}

const formatDateTime = (ts: string) => {
  const d = new Date(ts);
  return d.toLocaleDateString("sl-SI", { day: "numeric", month: "short" }) + " " +
    d.toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" });
};

const AuctionFeaturedCard = ({ item, index, expandedLot, setExpandedLot, openBid }: Props) => {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group bg-card border border-border/50 rounded-sm overflow-hidden hover:border-primary/20 transition-all duration-300"
    >
      <div className="grid md:grid-cols-2">
        {/* Image with thumbnails */}
        <div className="relative">
          <div className="aspect-square overflow-hidden bg-secondary">
            <img
              src={item.images[activeImg]}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
            Lot {item.lotNumber}
          </div>
          {item.images.length > 1 && (
            <div className="absolute bottom-3 left-3 flex gap-1">
              {item.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`w-10 h-10 rounded-sm overflow-hidden border-2 transition-all ${idx === activeImg ? "border-primary shadow-md" : "border-background/60 opacity-70 hover:opacity-100"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="p-5 flex flex-col">
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary font-semibold mb-0.5">{item.artist}</p>
          <h3 className="font-heading text-xl font-medium text-foreground mb-0.5">{item.title}</h3>
          <p className="text-[11px] text-muted-foreground mb-3">{item.medium} · {item.dimensions} · {item.year}</p>

          <p className="text-xs text-foreground/60 leading-relaxed line-clamp-2 mb-4">{item.longDescription}</p>

          {/* Current bid — prominent */}
          <div className="bg-primary/5 border border-primary/10 rounded-sm p-3 mb-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Trenutna ponudba</span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <TrendingUp size={10} /> {item.bidCount} ponudb
              </span>
            </div>
            <p className="font-heading text-2xl font-bold text-primary">€{item.currentBid.toLocaleString()}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Ocena: €{item.estimateLow}–€{item.estimateHigh}</p>
          </div>

          {/* Countdown */}
          <div className="mb-3">
            <CountdownTimer endDate={item.endDate} compact />
          </div>

          {/* Top 3 bids — always visible */}
          <div className="border border-border/50 rounded-sm p-2.5 mb-3 bg-secondary/20">
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium mb-1.5 flex items-center gap-1">
              <History size={10} /> Lestvica ponudb
            </p>
            {item.bids.slice(0, 3).map((bid, bi) => (
              <div key={bid.id} className={`flex items-center justify-between text-[11px] py-0.5 ${bi === 0 ? "text-primary font-semibold" : "text-foreground/60"}`}>
                <span className="flex items-center gap-1">
                  <span className="w-3.5 text-center text-[9px] text-muted-foreground">{bi + 1}.</span>
                  {bid.bidder}
                </span>
                <span className="font-heading">€{bid.amount}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => openBid(item)}
              className="flex-1 py-2.5 bg-primary text-primary-foreground text-[11px] uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity rounded-sm flex items-center justify-center gap-1.5"
            >
              <Gavel size={12} /> Oddaj ponudbo
            </button>
            <button
              onClick={() => setExpandedLot(expandedLot === item.id ? null : item.id)}
              className="px-3 py-2.5 border border-border text-muted-foreground hover:text-foreground transition-all rounded-sm text-[10px]"
            >
              <Eye size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Full bid history */}
      <AnimatePresence>
        {expandedLot === item.id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border/50"
          >
            <div className="p-4 bg-secondary/20">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">
                Celotna zgodovina ({item.bidCount} ponudb)
              </p>
              <div className="space-y-1">
                {item.bids.map((bid, bi) => (
                  <div key={bid.id} className={`flex items-center justify-between text-xs py-1 ${bi === 0 ? "text-primary font-medium" : "text-foreground/60"}`}>
                    <span>{bid.bidder}</span>
                    <span className="font-heading font-semibold">€{bid.amount}</span>
                    <span className="text-[10px] text-muted-foreground">{formatDateTime(bid.timestamp)}</span>
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

export default AuctionFeaturedCard;
