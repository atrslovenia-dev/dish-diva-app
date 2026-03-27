import { motion } from "framer-motion";
import wreathImage from "@/assets/wreath-workshop.png";

const EventsSection = () => {
  return (
    <section id="events" className="py-20 md:py-28 bg-card">
      <div className="container max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12 text-primary"
        >
          The Holiday Season Is Approaching! ✨
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h3 className="font-heading text-xl md:text-2xl text-center text-muted-foreground">
            Join our origami workshop: Create Your Own Festive Wreath
          </h3>

          <div className="flex justify-center">
            <img
              src={wreathImage}
              alt="Origami Holiday Wreath workshop"
              className="max-w-full max-h-80 rounded-xl shadow-md"
            />
          </div>

          <div className="bg-background rounded-xl p-6 space-y-3 text-sm text-foreground/80">
            <p><strong>When:</strong> Thursday, November 27, 2025, 5:30 PM – 7:00 PM</p>
            <p>
              <strong>Location:</strong> Atelje Lučka & Avgust, Novi trg 6, Ljubljana{" "}
              <a
                href="https://www.google.com/maps?q=Novi+trg+6,+Ljubljana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                (Map)
              </a>
            </p>
            <p><strong>Instructor:</strong> Nataša Brunec, Ars Origami</p>
            <p><strong>Price:</strong> €35</p>
            <p className="text-muted-foreground">
              🌿 Every participant receives a surprise gift. ☕ Tea and panettone included.
            </p>
          </div>

          <div className="bg-background rounded-xl p-6">
            <h4 className="font-heading text-lg font-semibold mb-4 text-foreground">Register</h4>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Send Registration
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
