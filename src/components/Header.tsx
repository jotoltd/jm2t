import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(72);
  const headerRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
  }, [isScrolled, mobileMenuOpen]);

  useEffect(() => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const serviceLinks = [
    { label: 'Floor Tiling', href: '/floor-tiling' },
    { label: 'Bathroom Tiling', href: '/bathroom-tiling' },
    { label: 'Wall Tiling', href: '/wall-tiling' },
    { label: 'Re-grouting & Repair', href: '/regrouting' },
  ];

  const navLinks = [
    { label: 'Services', href: '/#services', hasDropdown: true },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Process', href: '/#process' },
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
        <Link to="/" className="flex items-center group shrink-0">
          <img src="/images/logo_icon.png" alt="JM2 TilingCo" className="h-12 md:h-14 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) =>
            item.hasDropdown ? (
              <div key={item.label} ref={servicesRef} className="relative">
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="flex items-center gap-1 text-sm text-[#a8a39a] hover:text-[#f5f0e8] transition-colors tracking-wide"
                >
                  {item.label}
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-[#111110] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        className="block px-4 py-3 text-sm text-[#a8a39a] hover:text-[#f5f0e8] hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : item.isPage ? (
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

        {/* Right side: phone + CTA (desktop) / hamburger (mobile) */}
        <div className="flex items-center gap-5">
          <a
            href="tel:+447738427208"
            className="hidden lg:flex items-center gap-2 text-sm text-white/90 hover:text-[#c9a84c] transition-colors"
          >
            <Phone className="w-4 h-4 text-[#c9a84c]" />
            <span>07738 427208</span>
          </a>
          <Link
            to="/quote"
            className="group relative hidden lg:inline-flex overflow-hidden border border-[#c9a84c]/50 px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-[#c9a84c] transition-colors hover:text-[#0c0b0a]"
          >
            <span className="absolute inset-0 -translate-x-full bg-[#c9a84c] transition-transform duration-300 group-hover:translate-x-0"></span>
            <span className="relative">Get a Quote</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden flex items-center justify-center h-11 w-11 border transition-all duration-500 cursor-pointer touch-manipulation active:scale-95 ${isScrolled ? 'bg-[#c9a84c] border-[#c9a84c] text-[#0c0b0a]' : 'bg-transparent border-[#c9a84c]/40 text-[#c9a84c]'}`}
            aria-label="Toggle menu"
            type="button"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-x-0 bottom-0 bg-[#111110] border-t border-white/10 overflow-y-auto flex flex-col px-6 py-8 z-50"
          style={{ top: `${headerHeight}px` }}
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-5 p-1.5 text-[#a8a39a] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <nav className="flex flex-col gap-1 mt-4">
            {/* Services Section with nested links */}
            <div className="py-3 border-b border-white/5">
              <span className="font-display text-2xl text-[#f5f0e8]">Services</span>
              <div className="mt-2 ml-4 flex flex-col gap-2">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.href}
                    to={service.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-[#a8a39a] hover:text-[#c9a84c] transition-colors py-1"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>
            {navLinks.filter(item => !item.hasDropdown).map((item) =>
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
              href="tel:+447738427208"
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
