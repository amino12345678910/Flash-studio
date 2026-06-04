export default function Footer() {
  return (
    <footer className="bg-dark text-foreground py-20 px-6 md:px-10 flex flex-col items-center justify-center text-center">
      <h2 className="font-serif text-5xl md:text-8xl mb-10 text-gold opacity-80">Flash Studio</h2>
      <div className="flex gap-10 uppercase tracking-widest text-xs opacity-60 mb-20">
        <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
        <a href="#" className="hover:opacity-100 transition-opacity">Behance</a>
        <a href="#" className="hover:opacity-100 transition-opacity">Pinterest</a>
      </div>
      <p className="text-xs uppercase tracking-widest opacity-40">
        &copy; {new Date().getFullYear()} Flash Studio. All rights reserved.
      </p>
    </footer>
  );
}
