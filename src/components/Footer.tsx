const Footer = () => {
  return (
    <footer className="py-8 bg-foreground text-background">
      <div className="container text-center">
        <p className="font-heading text-lg font-semibold mb-2">
          Atelje Lučka & Avgust
        </p>
        <p className="text-sm opacity-70">
          © {new Date().getFullYear()} All rights reserved. Art & Design in Ljubljana.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
