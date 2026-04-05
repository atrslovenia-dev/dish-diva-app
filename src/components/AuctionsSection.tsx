import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gavel, TrendingUp, Eye, History, ChevronDown, SlidersHorizontal, Search } from "lucide-react";
import { auctionsData, type AuctionItem } from "@/data/auctions";
import CountdownTimer from "@/components/auction/CountdownTimer";
import BidModal from "@/components/auction/BidModal";

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

  const formatDateTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleDateString("sl-SI", { day: "numeric", month: "short" }) + ", " +
      d.toLocaleTimeString("sl-SI", { hour: "2-digit", minute: "2-digit" });
  };

  const openBid = (item: AuctionItem) => {
    setSelectedItem(item);
    setBidModalOpen(true);
  };

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-5">
            <Gavel size={14} className="text-primary" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">Ekskluzivne dražbe</span>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-light text-foreground mb-5">
            Dražite unikatna <span className="italic font-medium">umetniška dela</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-light mb-4">
            Odkrijte izjemna dela slovenskih umetnikov na naših periodičnih dražbah.
            Vsako delo je unikat z zgodbo, ki čaka na svojega lastnika.
          </p>
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Gavel size={13} /> {auctionsData.length} lotov</span>
            <span className="flex items-center gap-1.5"><TrendingUp size={13} /> {auctionsData.reduce((s, i) => s + i.bidCount, 0)} ponudb</span>
            <span className="flex items-center gap-1.5"><Eye size={13} /> Živa dražba</span>
          </div>
        </motion.div>

        {/* Auction house banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-sm p-6 md:p-8 mb-12 text-center"
        >
          <p className="font-heading text-lg md:text-xl text-foreground font-medium mb-2">
            Zimska dražba umetniških del — December 2025
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            Atelje Lučka & Avgust · Novi trg 6, Ljubljana · Provizija 12% · Plačilo v 7 dneh
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
              Kartice
            </span>
            <span className="flex items-center gap-1">
              <span className="font-bold text-[10px] bg-[#003087] text-[#fff] px-1.5 py-0.5 rounded-sm">PP</span>
              PayPal
            </span>
            <span className="flex items-center gap-1">
              <span className="font-bold text-[10px] bg-foreground text-background px-1.5 py-0.5 rounded-sm">G</span>
              Google Pay
            </span>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Iščite po imenu ali umetniku..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all rounded-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="text-muted-foreground" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-border bg-background text-foreground text-xs uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-sm cursor-pointer"
            >
              <option value="ending">Konec kmalu</option>
              <option value="price-desc">Cena ↓</option>
              <option value="price-asc">Cena ↑</option>
              <option value="bids">Največ ponudb</option>
            </select>
          </div>
        </div>

        {/* Featured lots */}
        {featured.length > 0 && (
          <div className="mb-16">
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-primary" /> Izpostavljeni loti
            </p>
            <div className="grid lg:grid-cols-2 gap-6">
              {featured.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-card border border-border/50 rounded-sm overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-xl"
                >
                  <div className="grid md:grid-cols-2">
                    {/* Image gallery */}
                    <div className="relative">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-sm text-[11px] font-semibold uppercase tracking-wider">
                        Lot {item.lotNumber}
                      </div>
                      {item.images.length > 1 && (
                        <div className="absolute bottom-3 right-3 flex gap-1.5">
                          {item.images.slice(0, 3).map((img, idx) => (
                            <div key={idx} className="w-10 h-10 rounded-sm overflow-hidden border-2 border-background/80 shadow-sm">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-6 md:p-7 flex flex-col">
                      <p className="text-[11px] uppercase tracking-[0.15em] text-primary font-semibold mb-1">{item.artist}</p>
                      <h3 className="font-heading text-2xl font-medium text-foreground mb-2">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mb-1">{item.medium}, {item.year}</p>
                      <p className="text-xs text-muted-foreground mb-4">{item.dimensions}</p>

                      <div className="flex-1">
                        <p className="text-sm text-foreground/80 font-light leading-relaxed line-clamp-3 mb-4">
                          {item.longDescription}
                        </p>
                      </div>

                      <div className="border-t border-border/50 pt-4 space-y-3">
                        <div className="flex justify-between items-baseline">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Trenutna ponudba</p>
                            <p className="font-heading text-3xl font-semibold text-primary">€{item.currentBid}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Ocena</p>
                            <p className="text-sm text-foreground">€{item.estimateLow}–€{item.estimateHigh}</p>
                          </div>
                        </div>

                        <CountdownTimer endDate={item.endDate} />

                        <div className="flex gap-2">
                          <button
                            onClick={() => openBid(item)}
                            className="flex-1 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity rounded-sm flex items-center justify-center gap-2"
                          >
                            <Gavel size={14} /> Oddaj ponudbo
                          </button>
                          <button
                            onClick={() => setExpandedLot(expandedLot === item.id ? null : item.id)}
                            className="px-3 py-3 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all rounded-sm"
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
              ))}
            </div>
          </div>
        )}

        {/* Regular lots */}
        {regular.length > 0 && (
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-border" /> Vsi loti
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regular.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group bg-card border border-border/50 rounded-sm overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-foreground/80 text-background px-2.5 py-1 rounded-sm text-[10px] font-semibold uppercase tracking-wider">
                      Lot {item.lotNumber}
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="text-[11px] uppercase tracking-[0.15em] text-primary font-semibold mb-1">{item.artist}</p>
                    <h3 className="font-heading text-lg font-medium text-foreground mb-1">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{item.medium} · {item.dimensions}</p>

                    <div className="flex justify-between items-baseline mb-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Trenutna</p>
                        <p className="font-heading text-2xl font-semibold text-primary">€{item.currentBid}</p>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><TrendingUp size={11} /> {item.bidCount} ponudb</span>
                      </div>
                    </div>

                    <CountdownTimer endDate={item.endDate} compact />

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => openBid(item)}
                        className="flex-1 py-2.5 bg-primary text-primary-foreground text-xs uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity rounded-sm flex items-center justify-center gap-1.5"
                      >
                        <Gavel size={13} /> Ponudi
                      </button>
                      <button
                        onClick={() => setExpandedLot(expandedLot === item.id ? null : item.id)}
                        className="px-3 py-2.5 border border-border text-muted-foreground hover:text-foreground transition-all rounded-sm"
                      >
                        <ChevronDown size={14} className={`transition-transform ${expandedLot === item.id ? "rotate-180" : ""}`} />
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
                              <div key={bid.id} className={`flex items-center justify-between text-xs py-1 ${bi === 0 ? "text-primary font-medium" : "text-foreground/60"}`}>
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
          className="mt-24 text-center"
        >
          <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-10">
            Kako poteka <span className="italic font-medium">dražba</span>?
          </h3>
          <div className="grid sm:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Registracija", desc: "Ustvarite račun in potrdite svojo identiteto za sodelovanje na dražbah." },
              { step: "02", title: "Pregled lotov", desc: "Preglejte katalog del, njihove opise, ocene in zgodovino provenienc." },
              { step: "03", title: "Oddaja ponudbe", desc: "Oddajte ponudbo z varnim plačilom — kartica, PayPal ali Google Pay." },
              { step: "04", title: "Zmaga & dostava", desc: "Če zmaga, delo dostavimo v 14 dneh z zavarovano pošiljko." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-heading text-xl font-semibold text-primary">{item.step}</span>
                </div>
                <h4 className="font-heading text-lg font-medium text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
              </div>
            ))}
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
