import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { useContentImage } from '../hooks/useContentImage';

interface HeaderProps {
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

function LogoImage() {
  const { imageUrl } = useContentImage('logo_icon', '/images/logo_icon.png');
  return <img src={imageUrl} alt="JM2 TilingCo" className="h-12 md:h-14 w-auto" />;
}

export default function Header({ mobileMenuOpen: externalMobileMenuOpen, setMobileMenuOpen: externalSetMobileMenuOpen }: HeaderProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [internalMobileMenuOpen, setInternalMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  
  // Use external state if provided, otherwise use internal
  const mobileMenuOpen = externalMobileMenuOpen !== undefined ? externalMobileMenuOpen : internalMobileMenuOpen;
  const setMobileMenuOpen = externalSetMobileMenuOpen || setInternalMobileMenuOpen;
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
    setInternalMobileMenuOpen(false);
    if (externalSetMobileMenuOpen) externalSetMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
    { label: 'Process', href: '/process', isPage: true },
    { label: 'Projects', href: '/projects', isPage: true },
    { label: 'Contact', href: '/contact', isPage: true },
  ];

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.split('#')[1];
    if (!hash) return;
    
    // If already on homepage, scroll directly
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(hash);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

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
          <LogoImage />
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
              <Link
                key={item.href}
                to={item.href}
                onClick={(e) => handleHashClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, item.href)}
                className="text-sm text-[#a8a39a] hover:text-[#f5f0e8] transition-colors tracking-wide"
              >
                {item.label}
              </Link>
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
          className="lg:hidden fixed inset-0 bg-[#0c0b0a] flex flex-col px-6 pt-16 pb-20 z-[100] h-screen"
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-5 p-1.5 text-[#a8a39a] hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex-1 overflow-y-auto -mx-6 px-6">
            <nav className="flex flex-col">
              {/* Services Section with nested links */}
              <div className="space-y-3">
                <div className="border border-[#c9a84c]/20 rounded-lg p-4 bg-white/[0.02]">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#c9a84c]/60 mb-3 block">Services</span>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        to={service.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm text-white/80 hover:text-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all py-2 px-3 rounded"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="border border-[#c9a84c]/20 rounded-lg p-4 bg-white/[0.02]">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#c9a84c]/60 mb-3 block">Menu</span>
                  <div className="flex flex-col gap-1">
                    {navLinks.filter(item => !item.hasDropdown).map((item) =>
                      item.isPage ? (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg text-white/90 hover:text-[#c9a84c] transition-all py-2 px-3 rounded hover:bg-white/5"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={(e) => {
                            handleHashClick(e as unknown as React.MouseEvent<HTMLAnchorElement>, item.href);
                            setMobileMenuOpen(false);
                          }}
                          className="text-lg text-white/90 hover:text-[#c9a84c] transition-all py-2 px-3 rounded hover:bg-white/5"
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <Link
              to="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="py-4 bg-[#c9a84c] text-[#0c0b0a] text-base font-semibold tracking-widest uppercase text-center hover:bg-[#e2c97e] transition-colors"
            >
              Get a Free Quote
            </Link>
            <div className="flex items-center justify-center gap-3">
              <a href="tel:+447738427208" className="flex h-12 w-12 items-center justify-center border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0c0b0a] transition-colors">
                <Phone className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/jm2tilingco/" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0c0b0a] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <rect x="2" y="2" width="20" height="20" rx="5"></rect>
                  <circle cx="12" cy="12" r="4"></circle>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"></circle>
                </svg>
              </a>
              <a href="https://www.facebook.com/jm2tilingco" target="_blank" rel="noopener noreferrer" className="flex h-12 w-12 items-center justify-center border border-[#c9a84c]/40 text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0c0b0a] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
