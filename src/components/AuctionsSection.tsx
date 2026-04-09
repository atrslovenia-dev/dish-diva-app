import { useState } from "react";
import { motion } from "framer-motion";
import { Gavel, Search, Sparkles } from "lucide-react";
import { auctionsData, type AuctionItem } from "@/data/auctions";
import BidModal from "@/components/auction/BidModal";
import AuctionHeroBanner from "@/components/auction/AuctionHeroBanner";
import AuctionFeaturedCard from "@/components/auction/AuctionFeaturedCard";
import AuctionLotCard from "@/components/auction/AuctionLotCard";
import AuctionFullscreen from "@/components/auction/AuctionFullscreen";

type SortOption = "ending" | "price-asc" | "price-desc" | "bids";

const AuctionsSection = () => {
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [fullscreenItem, setFullscreenItem] = useState<AuctionItem | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("ending");
  const [searchQuery, setSearchQuery] = useState("");

  const sorted = [...auctionsData]
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artist.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "ending": return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        case "price-asc": return a.currentBid - b.currentBid;
        case "price-desc": return b.currentBid - a.currentBid;
        case "bids": return b.bidCount - a.bidCount;
        default: return 0;
      }
    });

  const featured = sorted.filter((i) => i.featured);
  const regular = sorted.filter((i) => !i.featured);

  const openBid = (item: AuctionItem) => {
    setFullscreenItem(null);
    setSelectedItem(item);
    setBidModalOpen(true);
  };

  return (
    <section className="bg-background">
      <AuctionHeroBanner totalLots={auctionsData.length} totalBids={auctionsData.reduce((s, i) => s + i.bidCount, 0)} />

      <div className="container py-3">
        {/* Filter row */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1 max-w-[200px]">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Išči..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-7 pr-2 py-1.5 border border-border bg-card text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary/20 rounded-sm font-body"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-2 py-1.5 border border-border bg-card text-foreground text-[10px] uppercase tracking-wider focus:outline-none rounded-sm cursor-pointer font-body"
          >
            <option value="ending">Konec kmalu</option>
            <option value="price-desc">Cena ↓</option>
            <option value="price-asc">Cena ↑</option>
            <option value="bids">Največ ponudb</option>
          </select>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={13} className="text-accent" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">Izpostavljeni loti</p>
              <span className="flex-1 h-px bg-accent/20" />
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              {featured.map((item, i) => (
                <AuctionFeaturedCard key={item.id} item={item} index={i} openBid={openBid} openFullscreen={setFullscreenItem} />
              ))}
            </div>
          </div>
        )}

        {/* Regular */}
        {regular.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Gavel size={13} className="text-muted-foreground" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Vsi loti</p>
              <span className="flex-1 h-px bg-border" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {regular.map((item, i) => (
                <AuctionLotCard key={item.id} item={item} index={i} openBid={openBid} openFullscreen={setFullscreenItem} />
              ))}
            </div>
          </div>
        )}

        {/* How it works */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="border-t border-border/50 pt-6 pb-4">
          <h3 className="font-heading text-xl font-light text-foreground mb-4 text-center">
            Kako poteka <span className="italic font-medium text-primary">dražba</span>?
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Registracija", desc: "Ustvarite račun in potrdite identiteto." },
              { step: "02", title: "Pregled", desc: "Preglejte katalog del in ocene." },
              { step: "03", title: "Ponudba", desc: "Oddajte ponudbo z varnim plačilom." },
              { step: "04", title: "Dostava", desc: "Delo dostavimo v 14 dneh." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center">
                  <span className="font-heading text-sm font-semibold text-primary">{item.step}</span>
                </div>
                <h4 className="font-heading text-sm font-medium text-foreground mb-1">{item.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Fullscreen viewer */}
      <AuctionFullscreen item={fullscreenItem} onClose={() => setFullscreenItem(null)} onBid={openBid} />

      {/* Bid modal */}
      {selectedItem && (
        <BidModal item={selectedItem} isOpen={bidModalOpen} onClose={() => { setBidModalOpen(false); setSelectedItem(null); }} />
      )}
    </section>
  );
};

export default AuctionsSection;
