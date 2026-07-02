import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, ChevronRight, Shield, Lock } from "lucide-react";
import type { AuctionItem } from "@/data/auctions";
import { useCountdown } from "@/hooks/useCountdown";
import { Slider } from "@/components/ui/slider";

interface Props {
  item: AuctionItem;
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = "card" | "paypal" | "googlepay";
type Step = "bid" | "payment" | "confirm" | "success";

const BidModal = ({ item, isOpen, onClose }: Props) => {
  const [step, setStep] = useState<Step>("bid");
  const minimumBid = item.currentBid + 10;
  const maxBid = item.estimateHigh * 2;
  const [bidAmount, setBidAmount] = useState(item.currentBid + 50);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [processing, setProcessing] = useState(false);

  const countdown = useCountdown(item.endDate);

  const handleClose = () => {
    setStep("bid");
    setBidAmount(item.currentBid + 50);
    setPaymentMethod(null);
    setProcessing(false);
    onClose();
  };

  const handlePlaceBid = () => {
    if (bidAmount >= minimumBid) setStep("payment");
  };

  const handlePaymentConfirm = () => {
    if (!paymentMethod) return;
    setStep("confirm");
  };

  const handleFinalConfirm = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("success");
    }, 1200);
  };


  // Slider position as percentage for visual
  const sliderPercent = useMemo(() => {
    return Math.min(100, Math.max(0, ((bidAmount - minimumBid) / (maxBid - minimumBid)) * 100));
  }, [bidAmount, minimumBid, maxBid]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          onClick={handleClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-background rounded-sm shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          {/* Header with image */}
          <div className="relative h-32 overflow-hidden">
            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
            <button onClick={handleClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/10 backdrop-blur-sm text-background/70 hover:text-background transition-all flex items-center justify-center">
              <X size={16} />
            </button>
            <div className="absolute bottom-3 left-4 right-4">
              <p className="text-background/50 text-[10px] uppercase tracking-[0.2em]">Lot {item.lotNumber} · {item.artist}</p>
              <h3 className="font-heading text-xl text-background font-medium italic">{item.title}</h3>
            </div>
          </div>

          {/* Steps */}
          {step !== "success" && (
            <div className="px-5 pt-4">
              <div className="flex items-center gap-2 mb-4">
                {["Ponudba", "Plačilo", "Potrditev"].map((label, i) => {
                  const stepIndex = ["bid", "payment", "confirm"].indexOf(step);
                  const isActive = i <= stepIndex;
                  const isCurrent = i === stepIndex;
                  return (
                    <div key={label} className="flex items-center gap-2 flex-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium transition-all ${
                        isCurrent ? "bg-primary text-primary-foreground" : isActive ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                      }`}>{i + 1}</div>
                      <span className={`text-[10px] uppercase tracking-wider hidden sm:block ${isCurrent ? "text-foreground font-medium" : "text-muted-foreground"}`}>{label}</span>
                      {i < 2 && <div className={`flex-1 h-px ${isActive ? "bg-primary/30" : "bg-border"}`} />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="px-5 pb-5">
            {/* STEP 1: Bid with Slider */}
            {step === "bid" && (
              <div className="space-y-4">
                {/* Current bid + countdown */}
                <div className="flex items-center justify-between bg-primary/5 border border-primary/10 rounded-sm p-3">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Trenutna ponudba</p>
                    <p className="font-heading text-2xl font-bold text-primary">€{item.currentBid.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Do konca</p>
                    <p className={`font-heading text-lg font-semibold tabular-nums ${countdown.total < 86400000 ? "text-destructive" : "text-foreground"}`}>
                      {countdown.days > 0 && `${countdown.days}d `}{String(countdown.hours).padStart(2, "0")}:{String(countdown.minutes).padStart(2, "0")}:{String(countdown.seconds).padStart(2, "0")}
                    </p>
                  </div>
                </div>

                {/* Bid leaderboard */}
                <div className="space-y-0.5">
                  <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium mb-1">Lestvica ponudb</p>
                  {item.bids.slice(0, 4).map((bid, bi) => (
                    <div key={bid.id} className={`flex items-center justify-between text-[11px] py-0.5 ${bi === 0 ? "text-primary font-semibold" : "text-foreground/50"}`}>
                      <span className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[8px] font-bold text-primary">{bid.bidder.split(" ").map(w => w[0]).join("")}</span>
                        {bid.bidder}
                      </span>
                      <span className="font-heading">€{bid.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Artistic bid slider */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Vaša ponudba</label>
                    <span className="font-heading text-2xl font-bold text-primary">€{bidAmount.toLocaleString()}</span>
                  </div>
                  
                  {/* Slider track */}
                  <div className="relative py-3">
                    <Slider
                      value={[bidAmount]}
                      onValueChange={(val) => setBidAmount(val[0])}
                      min={minimumBid}
                      max={maxBid}
                      step={10}
                      className="w-full"
                    />
                    {/* Labels under slider */}
                    <div className="flex justify-between mt-2 text-[9px] text-muted-foreground">
                      <span>€{minimumBid.toLocaleString()}</span>
                      <span className="text-primary/50 italic">Ocena €{item.estimateLow.toLocaleString()}–€{item.estimateHigh.toLocaleString()}</span>
                      <span>€{maxBid.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Quick increments */}
                  <div className="flex gap-1.5 mt-1">
                    {[20, 50, 100, 200, 500].map((inc) => (
                      <button
                        key={inc}
                        onClick={() => setBidAmount((prev) => Math.min(maxBid, prev + inc))}
                        className="flex-1 py-1.5 border border-border text-[10px] text-foreground hover:border-primary hover:text-primary transition-all rounded-sm"
                      >
                        +€{inc}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handlePlaceBid}
                  disabled={bidAmount < minimumBid}
                  className="w-full py-3.5 bg-primary text-primary-foreground text-xs uppercase tracking-[0.15em] font-medium hover:opacity-90 transition-opacity rounded-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  Nadaljuj na plačilo <ChevronRight size={14} />
                </button>
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === "payment" && (
              <div className="space-y-4">
                <div className="bg-secondary/50 rounded-sm p-3 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Vaša ponudba</span>
                  <span className="font-heading text-xl font-semibold text-primary">€{bidAmount.toLocaleString()}</span>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2 font-medium">Način plačila</p>
                  <div className="space-y-1.5">
                    {([
                      { key: "card" as PaymentMethod, label: "Kreditna / debetna kartica", sub: "Visa, Mastercard, Maestro", icon: <CreditCard size={18} className="text-foreground" />, bg: "bg-secondary" },
                      { key: "paypal" as PaymentMethod, label: "PayPal", sub: "Varno plačilo s PayPal računom", icon: <span className="text-[#fff] font-bold text-xs">PP</span>, bg: "bg-[#003087]" },
                      { key: "googlepay" as PaymentMethod, label: "Google Pay", sub: "Hitro plačilo z Google računom", icon: <span className="text-background font-bold text-xs">G</span>, bg: "bg-foreground" },
                    ]).map(({ key, label, sub, icon, bg }) => (
                      <button
                        key={key}
                        onClick={() => setPaymentMethod(key)}
                        className={`w-full flex items-center gap-3 p-3 border rounded-sm transition-all ${
                          paymentMethod === key ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                        }`}
                      >
                        <div className={`w-9 h-9 ${bg} rounded-sm flex items-center justify-center`}>{icon}</div>
                        <div className="text-left flex-1">
                          <p className="text-sm font-medium text-foreground">{label}</p>
                          <p className="text-[10px] text-muted-foreground">{sub}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === key ? "border-primary" : "border-border"}`}>
                          {paymentMethod === key && <div className="w-2 h-2 rounded-full bg-primary" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {paymentMethod === "card" && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="space-y-2.5 pt-1">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">Ime na kartici</label>
                          <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Janez Novak" className="w-full px-3 py-2.5 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all rounded-sm" />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">Številka kartice</label>
                          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} placeholder="4242 4242 4242 4242" maxLength={19} className="w-full px-3 py-2.5 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all rounded-sm font-mono" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">Veljavnost</label>
                            <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(formatExpiry(e.target.value))} placeholder="MM/LL" maxLength={5} className="w-full px-3 py-2.5 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all rounded-sm font-mono" />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1 font-medium">CVC</label>
                            <input type="text" value={cardCvc} onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="123" maxLength={4} className="w-full px-3 py-2.5 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all rounded-sm font-mono" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-2">
                  <button onClick={() => setStep("bid")} className="flex-1 py-3 border border-border text-xs uppercase tracking-[0.12em] font-medium text-muted-foreground hover:text-foreground transition-all rounded-sm">Nazaj</button>
                  <button
                    onClick={handlePaymentConfirm}
                    disabled={!paymentMethod || (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCvc || !cardName))}
                    className="flex-[2] py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity rounded-sm disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    Potrdi plačilo <ChevronRight size={14} />
                  </button>
                </div>
                <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground">
                  <Lock size={11} /> <span>Varno šifrirano plačilo · SSL 256-bit</span>
                </div>
              </div>
            )}

            {/* STEP 3: Confirm */}
            {step === "confirm" && (
              <div className="space-y-4">
                <div className="bg-secondary/50 rounded-sm p-4 space-y-2">
                  {[
                    ["Delo", item.title],
                    ["Umetnik", item.artist],
                    ["Lot", `#${item.lotNumber}`],
                  ].map(([l, v]) => (
                    <div key={l} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{l}</span>
                      <span className="font-medium text-foreground">{v}</span>
                    </div>
                  ))}
                  <div className="border-t border-border my-1" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vaša ponudba</span>
                    <span className="font-heading text-xl font-semibold text-primary">€{bidAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Provizija (12%)</span>
                    <span>€{(bidAmount * 0.12).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border my-1" />
                  <div className="flex justify-between text-sm font-medium">
                    <span>Skupaj</span>
                    <span className="font-heading text-xl font-semibold">€{(bidAmount * 1.12).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Način plačila</span>
                    <span>{paymentMethod === "card" ? "Kartica" : paymentMethod === "paypal" ? "PayPal" : "Google Pay"}</span>
                  </div>
                </div>

                <div className="bg-accent/10 rounded-sm p-3 text-[11px] text-foreground/70 leading-relaxed">
                  <p className="font-medium text-foreground mb-1">Pravni pogoji:</p>
                  <p>S potrditvijo se zavezujete k plačilu, če vaša ponudba zmaga. Provizija 12%. Plačilo v 7 dneh.</p>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => setStep("payment")} className="flex-1 py-3 border border-border text-xs uppercase tracking-[0.12em] font-medium text-muted-foreground hover:text-foreground transition-all rounded-sm">Nazaj</button>
                  <button
                    onClick={handleFinalConfirm}
                    disabled={processing}
                    className="flex-[2] py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity rounded-sm disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" /> Obdelava...</>
                    ) : (
                      <><Shield size={14} /> Potrdi — €{(bidAmount * 1.12).toFixed(2)}</>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Success */}
            {step === "success" && (
              <div className="text-center py-6 space-y-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15, stiffness: 200 }} className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12" /></svg>
                </motion.div>
                <div>
                  <h3 className="font-heading text-2xl font-medium text-foreground mb-1">Ponudba oddana!</h3>
                  <p className="text-sm text-muted-foreground">Vaša ponudba <span className="font-semibold text-primary">€{bidAmount.toLocaleString()}</span> za "{item.title}" je bila uspešno oddana.</p>
                </div>
                <div className="bg-secondary/50 rounded-sm p-3 text-[11px] text-muted-foreground space-y-0.5 max-w-xs mx-auto">
                  <p>Ref.: <span className="font-mono text-foreground">DRZ-2025-{item.lotNumber}-{Math.floor(Math.random() * 9000 + 1000)}</span></p>
                  <p>Potrditev poslana na e-pošto</p>
                </div>
                <button onClick={handleClose} className="px-8 py-3 bg-primary text-primary-foreground text-xs uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity rounded-sm">Zapri</button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BidModal;
