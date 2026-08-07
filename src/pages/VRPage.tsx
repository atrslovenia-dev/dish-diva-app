import { lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const VRGallery = lazy(() => import("@/components/VRGallery"));

const VRPage = () => {
  useEffect(() => {
    document.title = "Virtualna galerija 360° | Lučka in Avgust";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute(
        "content",
        "Sprehodite se skozi virtualno galerijo 360° in si oglejte umetnine v prostoru, navdihnjenem s Plečnikovo arhitekturo."
      );
    }
  }, []);

  return (
    <main className="fixed inset-0 bg-background">
      <h1 className="sr-only">Virtualna galerija 360°</h1>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Nalaganje virtualne galerije…
          </div>
        }
      >
        <VRGallery className="w-full h-full" />
      </Suspense>
      <Link
        to="/"
        className="absolute top-4 left-4 z-50 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-sm text-foreground backdrop-blur-md transition-colors hover:bg-background"
      >
        <ArrowLeft className="h-4 w-4" />
        Nazaj
      </Link>
    </main>
  );
};

export default VRPage;
