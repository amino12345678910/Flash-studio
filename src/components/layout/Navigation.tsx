import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-foreground p-6 md:p-10 flex justify-between items-center uppercase tracking-[0.2em] text-sm">
      <Link href="/" className="font-serif text-xl tracking-widest">
        Flash Studio
      </Link>
      <nav className="hidden md:flex gap-8">
        <Link href="#services" className="hover:text-gold transition-colors duration-300">Services</Link>
        <Link href="#gallery" className="hover:text-gold transition-colors duration-300">Gallery</Link>
        <Link href="#about" className="hover:text-gold transition-colors duration-300">About</Link>
        <Link href="#contact" className="hover:text-gold transition-colors duration-300">Contact</Link>
      </nav>
      <button className="md:hidden uppercase tracking-widest text-xs">Menu</button>
    </header>
  );
}
