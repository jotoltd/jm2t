import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(72);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
  }, [isScrolled, mobileMenuOpen]);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Process', href: '#process' },
    { label: 'Projects', href: '/projects', isPage: true },
    { label: 'Contact', href: '/contact', isPage: true },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0c0b0a]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-18">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <img
            src="/images/trans_logo.png"
            alt="JM² Tiling Co"
            className="h-10 sm:h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) =>
            item.isPage ? (
              <Link
                key={item.href}
                to={item.href}
                className="text-sm text-[#a8a39a] hover:text-[#f5f0e8] transition-colors tracking-wide"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#a8a39a] hover:text-[#f5f0e8] transition-colors tracking-wide"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-5">
          <a
            href="tel:+4407738427208"
            className="flex items-center gap-2 text-sm text-[#a8a39a] hover:text-[#f5f0e8] transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>07738 427208</span>
          </a>
          <Link
            to="/quote"
            className="px-5 py-2.5 bg-[#c9a84c] hover:bg-[#e2c97e] text-[#0c0b0a] text-xs font-semibold tracking-widest uppercase transition-all duration-300"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#a8a39a] hover:text-[#f5f0e8] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 bottom-0 bg-[#111110] border-t border-white/10 overflow-y-auto flex flex-col px-6 py-8"
          style={{ top: `${headerHeight}px` }}
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-5 p-1.5 text-[#a8a39a] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <nav className="flex flex-col gap-1 mt-4">
            {navLinks.map((item) =>
              item.isPage ? (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-2xl text-[#f5f0e8] py-3 border-b border-white/5 hover:text-[#c9a84c] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-2xl text-[#f5f0e8] py-3 border-b border-white/5 hover:text-[#c9a84c] transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href="tel:+4407738427208"
              className="flex items-center justify-center gap-2 py-3.5 border border-white/10 text-[#f5f0e8] text-sm tracking-widest uppercase hover:border-[#c9a84c]/50 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#c9a84c]" /> 07738 427208
            </a>
            <Link
              to="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="py-3.5 bg-[#c9a84c] text-[#0c0b0a] text-sm font-semibold tracking-widest uppercase text-center hover:bg-[#e2c97e] transition-colors"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
