import { Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MobileBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-3 border-t border-white/10 p-3 backdrop-blur md:hidden bg-[#0c0b0a]/95">
      <a
        href="tel:+447738427208"
        className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold border border-white/20 text-white"
      >
        <Phone className="h-4 w-4" />
        Call
      </a>
      <Link
        to="/quote"
        className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold bg-[#c9a84c] text-[#0c0b0a]"
      >
        Free Quote
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
