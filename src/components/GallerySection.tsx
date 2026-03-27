import { motion } from "framer-motion";

const galleryImages = [
  "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=600&fit=crop",
  "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop",
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-card">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12 text-foreground"
        >
          Gallery
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {galleryImages.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="aspect-square overflow-hidden rounded-lg group"
            >
              <img
                src={src}
                alt={`Gallery artwork ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
