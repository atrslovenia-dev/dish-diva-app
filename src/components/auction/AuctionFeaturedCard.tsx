import { motion, AnimatePresence } from "framer-motion";
import { Gavel, History } from "lucide-react";
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
  return d.toLocaleDateString("sl-SI", { day: "numeric", month: "short" }) + ", " +
    d.toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" });
};

const AuctionFeaturedCard = ({ item, index, expandedLot, setExpandedLot, openBid }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card border border-border/50 rounded-sm overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
    >
      <div className="grid md:grid-cols-2">
        {/* Image */}
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1.5 rounded-sm text-[11px] font-semibold uppercase tracking-wider shadow-lg">
            Lot {item.lotNumber}
          </div>
          {item.images.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-1.5">
              {item.images.slice(0, 3).map((img, idx) => (
                <div key={idx} className="w-11 h-11 rounded-sm overflow-hidden border-2 border-background/80 shadow-md">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-7 md:p-8 flex flex-col">
          <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-1.5">{item.artist}</p>
          <h3 className="font-heading text-2xl md:text-3xl font-medium text-foreground mb-2">{item.title}</h3>
          <p className="text-xs text-muted-foreground mb-1">{item.medium}, {item.year}</p>
          <p className="text-xs text-muted-foreground mb-5">{item.dimensions}</p>

          <p className="text-sm text-foreground/70 font-light leading-relaxed line-clamp-3 mb-6 flex-1">
            {item.longDescription}
          </p>

          <div className="border-t border-border/50 pt-5 space-y-4">
            <div className="flex justify-between items-baseline">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Trenutna ponudba</p>
                <p className="font-heading text-3xl font-semibold text-primary">€{item.currentBid}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Ocena</p>
                <p className="text-sm text-foreground font-heading">€{item.estimateLow}–€{item.estimateHigh}</p>
              </div>
            </div>

            <CountdownTimer endDate={item.endDate} />

            <div className="flex gap-2">
              <button
                onClick={() => openBid(item)}
                className="flex-1 py-3.5 bg-primary text-primary-foreground text-xs uppercase tracking-[0.15em] font-medium hover:opacity-90 transition-opacity rounded-sm flex items-center justify-center gap-2 shadow-md shadow-primary/20"
              >
                <Gavel size={14} /> Oddaj ponudbo
              </button>
              <button
                onClick={() => setExpandedLot(expandedLot === item.id ? null : item.id)}
                className="px-4 py-3.5 border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all rounded-sm"
              >
                <History size={14} />
              </button>
            </div>
          </div>
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
            <div className="p-6 bg-secondary/30">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-3 flex items-center gap-2">
                <History size={13} /> Zgodovina ponudb ({item.bidCount})
              </p>
              <div className="space-y-2">
                {item.bids.map((bid, bi) => (
                  <div key={bid.id} className={`flex items-center justify-between text-sm py-2 ${bi === 0 ? "text-primary font-medium" : "text-foreground/70"}`}>
                    <span>{bid.bidder}</span>
                    <span className="font-heading font-semibold">€{bid.amount}</span>
                    <span className="text-xs text-muted-foreground">{formatDateTime(bid.timestamp)}</span>
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
