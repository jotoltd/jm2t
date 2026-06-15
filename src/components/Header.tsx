import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Menu, X, Star, Hammer } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects', isPage: true },
    { label: 'Wall Tiling', href: '/wall-tiling', isPage: true },
    { label: 'Floor Tiling', href: '/floor-tiling', isPage: true },
    { label: 'Bathroom Tiling', href: '/bathroom-tiling', isPage: true },
    { label: 'Re-grouting & Repair', href: '/regrouting', isPage: true },
    { label: 'Contact', href: '/contact', isPage: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro-bar for contact information */}
      <div className="bg-[#050507] text-neutral-400 py-1.5 px-4 sm:px-6 text-[11px] border-b border-white/10 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <span className="flex items-center gap-1 text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-cyan-500" />
              <span>Surrey & West Sussex</span>
            </span>
            <span className="hidden md:flex items-center gap-1 text-cyan-400 font-bold tracking-wider">
              <Star className="w-3.5 h-3.5 fill-cyan-400" />
              <span>Fully Insured & Qualified</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+4407738427208" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>07738 427208</span>
            </a>
            <a href="mailto:admin@jm2tilingco.com" className="hidden sm:flex hover:text-cyan-400 transition-colors items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>admin@jm2tilingco.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className={`transition-all duration-300 px-4 sm:px-6 py-3.5 ${
        isScrolled 
          ? 'bg-white shadow-2xl border-b border-neutral-200 py-2.5' 
          : 'bg-white shadow-lg border-b border-neutral-200 py-4'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Brand */}
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="/images/trans_logo.png"
              alt="JM²TilingCo Logo"
              className="h-14 sm:h-20 md:h-24 w-auto object-contain shrink-0 drop-shadow-[0_0_10px_rgba(77,238,255,0.6)] group-hover:drop-shadow-[0_0_22px_rgba(77,238,255,1)] transition-all duration-300"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              item.isPage
                ? <Link key={item.href} to={item.href} className="font-sans text-base uppercase tracking-wider font-black text-neutral-900 transition-colors hover:text-cyan-500 relative py-1 border-b-2 border-cyan-500 pb-0.5">{item.label}</Link>
                : <a key={item.href} href={item.href} className="font-sans text-base uppercase tracking-wider font-black text-neutral-700 transition-colors hover:text-cyan-500 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-cyan-500 after:transition-all hover:after:w-full">{item.label}</a>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden sm:flex items-center gap-8">
            <a href="tel:+4407738427208" className="text-right hidden xl:flex flex-col items-end hover:text-cyan-600 transition-colors group">
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-none mb-1 group-hover:text-cyan-500">Call Now</p>
              <p className="text-sm font-bold font-mono tracking-wide text-neutral-900 group-hover:text-cyan-600">07738 427208</p>
            </a>
            <Link
              to="/quote"
              className="bg-cyan-500 text-black hover:bg-cyan-600 hover:text-white px-6 py-2.5 rounded-none text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-none transition-colors text-neutral-800 hover:bg-neutral-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 animate-pulse" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-neutral-950/98 flex flex-col justify-center px-6 pt-24 animate-fade-in">
          <nav className="flex flex-col gap-6 text-center">
            {menuItems.map((item) => (
              item.isPage
                ? <Link key={item.href} to={item.href} onClick={() => setMobileMenuOpen(false)} className="font-display text-2xl font-bold tracking-tight text-cyan-400 hover:text-cyan-300 transition-colors py-2">{item.label}</Link>
                : <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className="font-display text-2xl font-bold tracking-tight text-neutral-200 hover:text-cyan-400 transition-colors py-2">{item.label}</a>
            ))}
            <div className="pt-8 border-t border-neutral-800/60 max-w-xs mx-auto w-full">
              <a
                href="tel:+4407738427208"
                className="block w-full text-center bg-neutral-800 hover:bg-neutral-700 text-white py-3 rounded-none font-bold uppercase tracking-widest text-xs mb-3 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-400" /> Call Us — 07738 427208
              </a>
              <Link
                to="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-none font-bold uppercase tracking-widest text-xs shadow-lg shadow-cyan-600/20"
              >
                Get Custom Quote
              </Link>
              <div className="mt-8 flex flex-col gap-2 items-center text-neutral-400 text-xs font-mono">
                <a href="tel:+4407738427208" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>07738 427208</span>
                </a>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>admin@jm2tilingco.com</span>
                </span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
