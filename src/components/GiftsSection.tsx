import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { giftsData, type Gift } from "@/data/gifts";

interface CartItem extends Gift {
  quantity: number;
}

const GiftsSection = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (gift: Gift) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === gift.id);
      if (existing) {
        return prev.map((item) =>
          item.id === gift.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...gift, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="py-24 md:py-32 bg-background relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[13px] uppercase tracking-[0.2em] text-primary font-medium mb-4">Izbrana darila</p>
          <h2 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-5">
            Edinstvena darila za <span className="italic font-medium">posebne priložnosti</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base font-light">
            Naša galerija ponuja skrbno izbiro originalnih slovenskih umetniških del — 
            idealnih za vsako posebno priložnost. Vsako delo nosi svojo zgodbo.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {giftsData
            .filter((g) => g.published)
            .map((gift, i) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group"
              >
                <div className="aspect-square overflow-hidden rounded-sm mb-3">
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-heading text-sm font-medium text-foreground line-clamp-2 mb-1">
                  {gift.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">€{gift.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(gift)}
                  className="w-full py-2.5 border border-primary text-primary text-xs uppercase tracking-[0.12em] font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-sm"
                >
                  V košarico
                </button>
              </motion.div>
            ))}
        </div>
      </div>

      {/* Floating cart button */}
      {itemCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
        >
          <ShoppingCart size={22} />
          <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        </button>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-background shadow-xl p-8 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-heading text-2xl font-light text-foreground">Košarica</h3>
              <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-muted-foreground text-sm">Vaša košarica je prazna.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 border-b border-border pb-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-sm object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">€{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-muted-foreground hover:text-foreground">
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-6 text-center text-foreground">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-muted-foreground hover:text-foreground">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <div className="pt-4">
                  <div className="flex justify-between text-foreground font-medium text-lg">
                    <span>Skupaj</span>
                    <span className="text-primary font-heading">€{total.toFixed(2)}</span>
                  </div>
                  <button className="w-full mt-6 py-3.5 bg-primary text-primary-foreground text-sm uppercase tracking-[0.15em] font-medium hover:opacity-90 transition-opacity rounded-sm">
                    Zaključi nakup
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default GiftsSection;
