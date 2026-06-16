import { MapPin } from 'lucide-react';

const locations = [
  'Crawley',
  'Horsham',
  'Haywards Heath',
  'Reigate',
  'Redhill',
  'South London',
  'Surrey',
  'West Sussex',
];

export default function LocationsMarquee() {
  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#101012] py-10">
      <div className="no-scrollbar flex">
        <div className="animate-marquee flex flex-shrink-0 items-center gap-10 pr-10">
          {[...locations, ...locations].map((location, i) => (
            <span
              key={`${location}-${i}`}
              className="flex items-center gap-3 font-display text-3xl text-white/25 whitespace-nowrap"
            >
              <MapPin className="h-5 w-5 text-[#c9a84c]" />
              {location}
            </span>
          ))}
        </div>
        <div className="animate-marquee flex flex-shrink-0 items-center gap-10 pr-10">
          {[...locations, ...locations].map((location, i) => (
            <span
              key={`${location}-dup-${i}`}
              className="flex items-center gap-3 font-display text-3xl text-white/25 whitespace-nowrap"
            >
              <MapPin className="h-5 w-5 text-[#c9a84c]" />
              {location}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
