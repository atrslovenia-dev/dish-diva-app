import { lazy, Suspense, useEffect } from "react";
import { X } from "lucide-react";


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
        className="group absolute top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/70 text-foreground backdrop-blur-md transition-all duration-300 hover:bg-primary hover:border-primary hover:text-primary-foreground hover:rotate-90"
        aria-label="Zapri galerijo"
        title="Zapri galerijo"
      >
        <X className="h-5 w-5 transition-transform duration-300" />
      </Link>
    </main>
  );
};

export default VRPage;
