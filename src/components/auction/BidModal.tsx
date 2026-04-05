import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, ChevronRight, Shield, Lock } from "lucide-react";
import type { AuctionItem } from "@/data/auctions";

interface Props {
  item: AuctionItem;
  isOpen: boolean;
  onClose: () => void;
}

type PaymentMethod = "card" | "paypal" | "googlepay";
type Step = "bid" | "payment" | "confirm" | "success";

const bidIncrements = [10, 20, 50, 100, 200];

const BidModal = ({ item, isOpen, onClose }: Props) => {
  const [step, setStep] = useState<Step>("bid");
  const [bidAmount, setBidAmount] = useState(item.currentBid + 20);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [processing, setProcessing] = useState(false);

  const minimumBid = item.currentBid + 10;

  const handleClose = () => {
    setStep("bid");
    setBidAmount(item.currentBid + 20);
    setPaymentMethod(null);
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setCardName("");
    setProcessing(false);
    onClose();
  };

  const handlePlaceBid = () => {
    if (bidAmount >= minimumBid) {
      setStep("payment");
    }
  };

  const handlePaymentConfirm = () => {
    if (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCvc || !cardName)) return;
    setStep("confirm");
  };

  const handleFinalConfirm = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep("success");
    }, 2000);
  };

  const formatCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

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
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <img src={item.images[0]} alt={item.title} className="w-12 h-12 rounded-sm object-cover" />
              <div>
                <p className="font-heading text-lg font-medium text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">Lot {item.lotNumber} · {item.artist}</p>
              </div>
            </div>
            <button onClick={handleClose} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Steps indicator */}
          <div className="px-6 pt-5">
            <div className="flex items-center gap-2 mb-6">
              {["Ponudba", "Plačilo", "Potrditev"].map((label, i) => {
                const stepIndex = ["bid", "payment", "confirm"].indexOf(step);
                const isActive = i <= stepIndex;
                const isCurrent = i === stepIndex;
                return (
                  <div key={label} className="flex items-center gap-2 flex-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                      isCurrent ? "bg-primary text-primary-foreground" : isActive ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
                    }`}>
                      {i + 1}
                    </div>
                    <span className={`text-[11px] uppercase tracking-wider hidden sm:block ${isCurrent ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {label}
                    </span>
                    {i < 2 && <div className={`flex-1 h-px ${isActive ? "bg-primary/30" : "bg-border"}`} />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="px-6 pb-6">
            {/* STEP 1: Bid */}
            {step === "bid" && (
              <div className="space-y-5">
                <div className="bg-secondary/50 rounded-sm p-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Trenutna ponudba</span>
                    <span className="font-heading text-xl font-semibold text-primary">€{item.currentBid}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Ocena: €{item.estimateLow}–€{item.estimateHigh}</span>
                    <span>{item.bidCount} ponudb</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                    Vaša ponudba (min. €{minimumBid})
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">€</span>
                    <input
                      type="number"
                      min={minimumBid}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Math.max(minimumBid, Number(e.target.value)))}
                      className="w-full pl-10 pr-4 py-3.5 border border-border bg-background text-foreground text-lg font-heading font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 font-medium">Hitro povišanje</p>
                  <div className="flex flex-wrap gap-2">
                    {bidIncrements.map((inc) => (
                      <button
                        key={inc}
                        onClick={() => setBidAmount((prev) => prev + inc)}
                        className="px-4 py-2 border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-all rounded-sm"
                      >
                        +€{inc}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handlePlaceBid}
                  disabled={bidAmount < minimumBid}
                  className="w-full py-4 bg-primary text-primary-foreground text-sm uppercase tracking-[0.15em] font-medium hover:opacity-90 transition-opacity rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Nadaljuj na plačilo <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === "payment" && (
              <div className="space-y-5">
                <div className="bg-secondary/50 rounded-sm p-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Vaša ponudba</span>
                  <span className="font-heading text-2xl font-semibold text-primary">€{bidAmount}</span>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium">Izberite način plačila</p>
                  <div className="space-y-2">
                    {/* Credit card */}
                    <button
                      onClick={() => setPaymentMethod("card")}
                      className={`w-full flex items-center gap-4 p-4 border rounded-sm transition-all ${
                        paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="w-10 h-10 bg-secondary rounded-sm flex items-center justify-center">
                        <CreditCard size={20} className="text-foreground" />
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium text-foreground">Kreditna / debetna kartica</p>
                        <p className="text-xs text-muted-foreground">Visa, Mastercard, Maestro</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "card" ? "border-primary" : "border-border"
                      }`}>
                        {paymentMethod === "card" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                    </button>

                    {/* PayPal */}
                    <button
                      onClick={() => setPaymentMethod("paypal")}
                      className={`w-full flex items-center gap-4 p-4 border rounded-sm transition-all ${
                        paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="w-10 h-10 bg-[#003087] rounded-sm flex items-center justify-center">
                        <span className="text-[#fff] font-bold text-xs">PP</span>
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium text-foreground">PayPal</p>
                        <p className="text-xs text-muted-foreground">Varno plačilo s PayPal računom</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "paypal" ? "border-primary" : "border-border"
                      }`}>
                        {paymentMethod === "paypal" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                    </button>

                    {/* Google Pay */}
                    <button
                      onClick={() => setPaymentMethod("googlepay")}
                      className={`w-full flex items-center gap-4 p-4 border rounded-sm transition-all ${
                        paymentMethod === "googlepay" ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="w-10 h-10 bg-foreground rounded-sm flex items-center justify-center">
                        <span className="text-background font-bold text-xs">G</span>
                      </div>
                      <div className="text-left flex-1">
                        <p className="text-sm font-medium text-foreground">Google Pay</p>
                        <p className="text-xs text-muted-foreground">Hitro plačilo z Google računom</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === "googlepay" ? "border-primary" : "border-border"
                      }`}>
                        {paymentMethod === "googlepay" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Card form */}
                <AnimatePresence>
                  {paymentMethod === "card" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">Ime na kartici</label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Janez Novak"
                            className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all rounded-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">Številka kartice</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            placeholder="4242 4242 4242 4242"
                            maxLength={19}
                            className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all rounded-sm font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">Veljavnost</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                              placeholder="MM/LL"
                              maxLength={5}
                              className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all rounded-sm font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5 font-medium">CVC</label>
                            <input
                              type="text"
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                              placeholder="123"
                              maxLength={4}
                              className="w-full px-4 py-3 border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all rounded-sm font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("bid")}
                    className="flex-1 py-3.5 border border-border text-sm uppercase tracking-[0.12em] font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition-all rounded-sm"
                  >
                    Nazaj
                  </button>
                  <button
                    onClick={handlePaymentConfirm}
                    disabled={!paymentMethod || (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCvc || !cardName))}
                    className="flex-[2] py-3.5 bg-primary text-primary-foreground text-sm uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity rounded-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Potrdi plačilo <ChevronRight size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
                  <Lock size={12} />
                  <span>Varno šifrirano plačilo · SSL 256-bit</span>
                </div>
              </div>
            )}

            {/* STEP 3: Confirm */}
            {step === "confirm" && (
              <div className="space-y-5">
                <div className="bg-secondary/50 rounded-sm p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delo</span>
                    <span className="font-medium text-foreground">{item.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Umetnik</span>
                    <span className="text-foreground">{item.artist}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lot</span>
                    <span className="text-foreground">#{item.lotNumber}</span>
                  </div>
                  <div className="border-t border-border my-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vaša ponudba</span>
                    <span className="font-heading text-xl font-semibold text-primary">€{bidAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Provizija (12%)</span>
                    <span className="text-foreground">€{(bidAmount * 0.12).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border my-2" />
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-foreground">Skupaj</span>
                    <span className="font-heading text-xl font-semibold text-foreground">€{(bidAmount * 1.12).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Način plačila</span>
                    <span className="text-foreground">
                      {paymentMethod === "card" && "Kartica"}
                      {paymentMethod === "paypal" && "PayPal"}
                      {paymentMethod === "googlepay" && "Google Pay"}
                    </span>
                  </div>
                </div>

                <div className="bg-accent/10 rounded-sm p-4 text-xs text-foreground/70 leading-relaxed">
                  <p className="font-medium text-foreground mb-1">Pravni pogoji:</p>
                  <p>S potrditvijo ponudbe se zavezujete k plačilu, če vaša ponudba zmaga. Provizija dražbene hiše znaša 12% nad ceno doseženo na dražbi. Plačilo je potrebno izvesti v 7 dneh po zaključku dražbe.</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("payment")}
                    className="flex-1 py-3.5 border border-border text-sm uppercase tracking-[0.12em] font-medium text-muted-foreground hover:text-foreground hover:border-foreground transition-all rounded-sm"
                  >
                    Nazaj
                  </button>
                  <button
                    onClick={handleFinalConfirm}
                    disabled={processing}
                    className="flex-[2] py-3.5 bg-primary text-primary-foreground text-sm uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity rounded-sm disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                        Obdelava...
                      </>
                    ) : (
                      <>
                        <Shield size={16} />
                        Potrdi ponudbo — €{(bidAmount * 1.12).toFixed(2)}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Success */}
            {step === "success" && (
              <div className="text-center py-6 space-y-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                  className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </motion.div>
                <div>
                  <h3 className="font-heading text-2xl font-medium text-foreground mb-2">Ponudba oddana!</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Vaša ponudba v višini <span className="font-semibold text-primary">€{bidAmount}</span> za delo "{item.title}" je bila uspešno oddana.
                    Obvestili vas bomo o poteku dražbe.
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-sm p-4 text-xs text-muted-foreground space-y-1 max-w-xs mx-auto">
                  <p>Referenčna št.: <span className="font-mono text-foreground">DRZ-2025-{item.lotNumber}-{Math.floor(Math.random() * 9000 + 1000)}</span></p>
                  <p>Potrditev poslana na vaš e-poštni naslov</p>
                </div>
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-[0.12em] font-medium hover:opacity-90 transition-opacity rounded-sm"
                >
                  Zapri
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BidModal;
