const Footer = () => {
  return (
    <footer className="py-10 bg-foreground text-background">
      <div className="container text-center">
        <p className="font-heading text-xl font-light tracking-wide mb-2">
          Atelje <span className="italic">Lučka</span> & <span className="italic">Avgust</span>
        </p>
        <p className="text-sm opacity-50 font-light">
          © {new Date().getFullYear()} Vse pravice pridržane. Umetnost & oblikovanje v Ljubljani.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
