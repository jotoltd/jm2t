/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import ServicesOverview from './components/ServicesOverview';
import Process from './components/Process';
import ProjectsShowcase from './components/ProjectsShowcase';
import Testimonials from './components/Testimonials';
import LocationsMarquee from './components/LocationsMarquee';
import ContactSection from './components/ContactSection';
import MobileBottomBar from './components/MobileBottomBar';
import Footer from './components/Footer';
import { MessageCircle } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop';
import PageTransition from './components/PageTransition';
import SplashScreen from './components/SplashScreen';
import { useState } from 'react';

const FloorTiling = lazy(() => import('./pages/FloorTiling'));
const BathroomTiling = lazy(() => import('./pages/BathroomTiling'));
const WallTiling = lazy(() => import('./pages/WallTiling'));
const Regrouting = lazy(() => import('./pages/Regrouting'));
const Projects = lazy(() => import('./pages/Projects'));
const Contact = lazy(() => import('./pages/Contact'));
const Quote = lazy(() => import('./pages/Quote'));
const ProcessPage = lazy(() => import('./pages/Process'));
const Admin = lazy(() => import('./pages/Admin'));

function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0c0b0a] font-sans selection:bg-[#c9a84c] selection:text-[#0c0b0a] pb-16 md:pb-0">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main>
        <Hero />
        <Stats />
        <ServicesOverview />
        <Process />
        <ProjectsShowcase />
        <Testimonials />
        <LocationsMarquee />
        <ContactSection />
      </main>
      <Footer hideEnquiry={true} />
      <MobileBottomBar isHidden={mobileMenuOpen} />
      <a
        href="https://wa.me/447738427208?text=Hi%20JM²TilingCo,%20I'm%20interested%20in%20a%20tiling%20quote"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3 md:p-4 rounded-full shadow-2xl shadow-black/50 transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-sm font-bold hidden md:inline">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950" />}>
      <Routes location={location}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/floor-tiling" element={<PageTransition><FloorTiling /></PageTransition>} />
        <Route path="/bathroom-tiling" element={<PageTransition><BathroomTiling /></PageTransition>} />
        <Route path="/wall-tiling" element={<PageTransition><WallTiling /></PageTransition>} />
        <Route path="/regrouting" element={<PageTransition><Regrouting /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/quote" element={<PageTransition><Quote /></PageTransition>} />
        <Route path="/process" element={<PageTransition><ProcessPage /></PageTransition>} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splashShown'));

  const handleSplashComplete = () => {
    sessionStorage.setItem('splashShown', 'true');
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}
