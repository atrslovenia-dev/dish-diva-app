import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gavel, TrendingUp, Eye, History, ChevronDown, SlidersHorizontal, Search, Sparkles } from "lucide-react";
import { auctionsData, type AuctionItem } from "@/data/auctions";
import CountdownTimer from "@/components/auction/CountdownTimer";
import BidModal from "@/components/auction/BidModal";
import AuctionHeroBanner from "@/components/auction/AuctionHeroBanner";
import AuctionFeaturedCard from "@/components/auction/AuctionFeaturedCard";
import AuctionLotCard from "@/components/auction/AuctionLotCard";

type SortOption = "ending" | "price-asc" | "price-desc" | "bids";

const AuctionsSection = () => {
  const [selectedItem, setSelectedItem] = useState<AuctionItem | null>(null);
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [expandedLot, setExpandedLot] = useState<string | null>(null);
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
    setSelectedItem(item);
    setBidModalOpen(true);
  };

  return (
    <section className="bg-background">
      {/* Hero banner — no empty space */}
      <AuctionHeroBanner totalLots={auctionsData.length} totalBids={auctionsData.reduce((s, i) => s + i.bidCount, 0)} />

      <div className="container py-4 md:py-6">
        {/* Compact filter bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Išči..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-border bg-card text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary/20 rounded-sm font-body"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 border border-border bg-card text-foreground text-[10px] uppercase tracking-wider focus:outline-none rounded-sm cursor-pointer font-body"
          >
            <option value="ending">Konec kmalu</option>
            <option value="price-desc">Cena ↓</option>
            <option value="price-asc">Cena ↑</option>
            <option value="bids">Največ ponudb</option>
          </select>
        </div>

        {/* Featured lots */}
        {featured.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles size={16} className="text-accent" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-accent font-semibold">Izpostavljeni loti</p>
              <span className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {featured.map((item, i) => (
                <AuctionFeaturedCard
                  key={item.id}
                  item={item}
                  index={i}
                  expandedLot={expandedLot}
                  setExpandedLot={setExpandedLot}
                  openBid={openBid}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular lots */}
        {regular.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Gavel size={14} className="text-muted-foreground" />
              <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">Vsi loti</p>
              <span className="flex-1 h-px bg-border" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regular.map((item, i) => (
                <AuctionLotCard
                  key={item.id}
                  item={item}
                  index={i}
                  expandedLot={expandedLot}
                  setExpandedLot={setExpandedLot}
                  openBid={openBid}
                />
              ))}
            </div>
          </div>
        )}

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-28 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/50 to-transparent rounded-sm" />
          <div className="relative text-center py-16">
            <h3 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-12">
              Kako poteka <span className="italic font-medium text-primary">dražba</span>?
            </h3>
            <div className="grid sm:grid-cols-4 gap-10">
              {[
                { step: "01", title: "Registracija", desc: "Ustvarite račun in potrdite svojo identiteto za sodelovanje na dražbah." },
                { step: "02", title: "Pregled lotov", desc: "Preglejte katalog del, njihove opise, ocene in zgodovino provenienc." },
                { step: "03", title: "Oddaja ponudbe", desc: "Oddajte ponudbo z varnim plačilom — kartica, PayPal ali Google Pay." },
                { step: "04", title: "Zmaga & dostava", desc: "Če zmaga, delo dostavimo v 14 dneh z zavarovano pošiljko." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full border-2 border-primary/20 bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/40 transition-all duration-300">
                    <span className="font-heading text-xl font-semibold text-primary">{item.step}</span>
                  </div>
                  <h4 className="font-heading text-xl font-medium text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bid modal */}
      {selectedItem && (
        <BidModal
          item={selectedItem}
          isOpen={bidModalOpen}
          onClose={() => {
            setBidModalOpen(false);
            setSelectedItem(null);
          }}
        />
      )}
    </section>
  );
};

export default AuctionsSection;
