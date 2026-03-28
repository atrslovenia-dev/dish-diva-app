import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 font-heading text-6xl font-light text-foreground">404</h1>
        <p className="mb-6 text-lg text-muted-foreground font-light">Stran ni bila najdena</p>
        <a href="/" className="text-primary text-sm uppercase tracking-[0.15em] hover:opacity-70 transition-opacity">
          Nazaj na domačo stran
        </a>
      </div>
    </div>
  );
};

export default NotFound;
