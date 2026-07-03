import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import LetterArtPage from "./pages/LetterArtPage";
import GalleryPage from "./pages/GalleryPage";
import ExhibitionsPage from "./pages/ExhibitionsPage";
import EventsPage from "./pages/EventsPage";
import AuctionsPage from "./pages/AuctionsPage";
import GiftsPage from "./pages/GiftsPage";
import ClubPage from "./pages/ClubPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import CrmLogin from "./pages/crm/CrmLogin";
import CrmLayout from "./pages/crm/CrmLayout";
import CrmDashboard from "./pages/crm/CrmDashboard";
import CrmItems from "./pages/crm/CrmItems";
import CrmItemEdit from "./pages/crm/CrmItemEdit";
import CrmArtists from "./pages/crm/CrmArtists";
import CrmEvents from "./pages/crm/CrmEvents";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/letter-art" element={<LetterArtPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/exhibitions" element={<ExhibitionsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/auctions" element={<AuctionsPage />} />
            <Route path="/gifts" element={<GiftsPage />} />
            <Route path="/club" element={<ClubPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/crm/login" element={<CrmLogin />} />
            <Route path="/crm" element={<CrmLayout />}>
              <Route index element={<CrmDashboard />} />
              <Route path="items" element={<CrmItems />} />
              <Route path="items/:id" element={<CrmItemEdit />} />
              <Route path="artists" element={<CrmArtists />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
