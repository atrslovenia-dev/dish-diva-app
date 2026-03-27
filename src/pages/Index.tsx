import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import ExhibitionsSection from "@/components/ExhibitionsSection";
import EventsSection from "@/components/EventsSection";
import GiftsSection from "@/components/GiftsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ExhibitionsSection />
      <EventsSection />
      <GiftsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
