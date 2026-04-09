import { motion, AnimatePresence } from "framer-motion";
import { X, Gavel } from "lucide-react";
import { type AuctionItem } from "@/data/auctions";
import CountdownTimer from "./CountdownTimer";

interface Props {
  item: AuctionItem | null;
  onClose: () => void;
  onBid: (item: AuctionItem) => void;
}

const AuctionFullscreen = ({ item, onClose, onBid }: Props) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
      >
        {/* Full image */}
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          src={item.images[0]}
          alt={item.title}
          className="max-w-[90vw] max-h-[85vh] object-contain"
        />

        {/* Subtle close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-background/10 backdrop-blur-sm text-background/70 hover:text-background hover:bg-background/20 transition-all flex items-center justify-center"
        >
          <X size={18} />
        </button>

        {/* Bottom info bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent pt-16 pb-6 px-8"
        >
          <div className="max-w-4xl mx-auto flex items-end justify-between gap-8">
            <div>
              <p className="text-background/50 text-xs uppercase tracking-[0.2em] mb-1">{item.artist}</p>
              <h2 className="font-heading text-2xl md:text-3xl text-background font-medium italic">{item.title}</h2>
              <p className="text-background/40 text-xs mt-1">{item.medium} · {item.dimensions}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-background/40 text-[10px] uppercase tracking-wider">Trenutna ponudba</p>
                <p className="font-heading text-2xl text-background font-semibold">€{item.currentBid.toLocaleString()}</p>
                <div className="mt-1">
                  <CountdownTimer endDate={item.endDate} compact />
                </div>
              </div>
              <button
                onClick={() => onBid(item)}
                className="px-6 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.15em] font-medium hover:opacity-90 transition-opacity rounded-sm flex items-center gap-2"
              >
                <Gavel size={14} /> Ponudi
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuctionFullscreen;
