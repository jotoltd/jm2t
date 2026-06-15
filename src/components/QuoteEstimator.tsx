import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  CheckSquare, 
  Square, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Ruler, 
  Grid3X3,
  LayoutGrid,
  Maximize,
  Plus, 
  Check, 
  Copy, 
  Send, 
  FileText,
  Info,
  Hammer
} from 'lucide-react';
import { TILING_PACKAGES, EXTRA_SERVICES } from '../data/packages';
import { TileFormat, PatternType, ServiceInquiry } from '../types';

interface QuoteEstimatorProps {
  selectedFormat: TileFormat;
  setSelectedFormat: (type: TileFormat) => void;
  selectedPattern: PatternType;
  setSelectedPattern: (type: PatternType) => void;
  selectedPackageId: string;
  setSelectedPackageId: (packageId: string) => void;
}

export default function QuoteEstimator({
  selectedFormat,
  setSelectedFormat,
  selectedPattern,
  setSelectedPattern,
  selectedPackageId,
  setSelectedPackageId,
}: QuoteEstimatorProps) {
  // Local state for active add-on extra services
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  
  // Local state for inquiry fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDetails: '',
    squareMeters: '',
    preferredDate: '',
    additionalNotes: ''
  });

  // Success state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Sync package selection from props
  const activePackage = TILING_PACKAGES.find(p => p.id === selectedPackageId) || TILING_PACKAGES[0];

  // Calculations
  const basePricePerSqm = activePackage.basePrices[selectedPattern];
  const squareMeters = parseFloat(formData.squareMeters) || 0;
  const basePrice = basePricePerSqm * squareMeters;
  const extrasCost = selectedExtras.reduce((sum, extraId) => {
    const extra = EXTRA_SERVICES.find(e => e.id === extraId);
    return sum + (extra ? extra.price : 0);
  }, 0);
  const totalPrice = basePrice + extrasCost;

  // Toggle checklist for extra services
  const handleToggleExtra = (extraId: string) => {
    if (selectedExtras.includes(extraId)) {
      setSelectedExtras(selectedExtras.filter(id => id !== extraId));
    } else {
      setSelectedExtras([...selectedExtras, extraId]);
    }
  };

  // Compile detailed plaintext copyable text
  const generateMailContent = () => {
    const chosenExtrasNames = selectedExtras.map(id => {
      const extra = EXTRA_SERVICES.find(e => e.id === id);
      return extra ? `- ${extra.name} (£${extra.price}/m²)` : '';
    }).filter(Boolean).join('\n');

    return `JM2TILINGCO - SERVICE ENQUIRY
-----------------------------------------
Customer Details:
- Name: ${formData.name || 'Not provided'}
- Phone: ${formData.phone || 'Not provided'}
- Email: ${formData.email || 'Not provided'}

Project Details:
- Area Size: ${formData.squareMeters || 'Not specified'} m²
- Room/Project Type: ${formData.projectDetails || 'Not specified'}
- Tile Format: ${selectedFormat.toUpperCase()}
- Pattern Type: ${selectedPattern.toUpperCase()}

Tiling Service Selected:
- Package: ${activePackage.name}
- Rate: £${basePricePerSqm} per m² (${selectedPattern === 'pattern' ? 'Pattern/Herringbone' : 'Standard Layout'})
- Quality Guarantee: ${activePackage.qualityGuarantee || 'Standard Warranty'}

Add-on Extras Selected:
${chosenExtrasNames || 'None selected'}

Estimated Pricing Summary:
- Area: ${squareMeters} m²
- Rate: £${basePricePerSqm}/m²
- Base Cost: £${basePrice.toFixed(2)}
- Add-on Extras: £${extrasCost}
-----------------------------------------
TOTAL ESTIMATED COST: £${totalPrice.toFixed(2)}
-----------------------------------------
Preferred Date for Service: ${formData.preferredDate || 'Flexible / To be confirmed'}

Additional Notes:
${formData.additionalNotes || 'None'}

Thank you for choosing JM²TilingCo. We look forward to transforming your space!
`;
  };

  // Handler to submission action
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in your Name, Email, and Phone number so we can contact you!");
      return;
    }
    setIsSubmitted(true);
  };

  // Copy proposal copy to clipboard helper
  const handleCopyToClipboard = () => {
    const content = generateMailContent();
    navigator.clipboard.writeText(content).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    });
  };

  // Send native email client helper
  const handleSendEmail = () => {
    const emailTo = "admin@jm2tilingco.com";
    const subject = encodeURIComponent(`JM²TilingCo Service Enquiry - ${formData.name || 'Inquiry'}`);
    const body = encodeURIComponent(generateMailContent());
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="quote-estimator" className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neutral-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4 animate-fade-in">
          <span className="text-cyan-500 font-mono text-xs font-bold tracking-[0.25em] uppercase block">
            Service Enquiry
          </span>
          <h2 className="font-display text-4xl font-extrabold tracking-tight uppercase">
            Get Your Free Quote
          </h2>
          <p className="text-neutral-400 text-sm font-sans font-normal leading-relaxed max-w-xl mx-auto">
            Fill in the form below to let us know which service you're interested in and how we can help — we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Workspace Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Configurator Choices (8 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Tile Format & Pattern */}
            <div className="bg-neutral-900 border border-white/10 rounded-none p-6 space-y-4 shadow-2xl text-left">
              <span className="font-mono text-[10px] uppercase text-cyan-400 font-extrabold tracking-widest">
                Step 1: Select Tile Format
              </span>
              <h3 className="font-display text-lg font-bold uppercase tracking-wider">Tile Format & Pattern</h3>
              
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'large', name: 'Large', sub: '600mm+', icon: Maximize },
                  { id: 'medium', name: 'Medium', sub: '300-600mm', icon: LayoutGrid },
                  { id: 'small', name: 'Small', sub: 'Mosaic/Metro', icon: Grid3X3 }
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedFormat(v.id as TileFormat)}
                    className={`p-4 rounded-none border text-center transition-all cursor-pointer ${
                      selectedFormat === v.id
                        ? 'border-cyan-500 bg-cyan-600/10 text-white shadow-xl shadow-cyan-950/20'
                        : 'border-white/5 bg-neutral-950 text-neutral-400 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <v.icon className={`w-6 h-6 mx-auto mb-2 ${selectedFormat === v.id ? 'text-cyan-400' : 'text-neutral-500'}`} />
                    <span className="font-display text-xs font-bold block uppercase tracking-wider">{v.name}</span>
                    <span className="text-[9px] text-neutral-500 font-sans block mt-1">{v.sub}</span>
                  </button>
                ))}
              </div>

              {/* Pattern Type Selection */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] text-neutral-500 uppercase font-mono tracking-widest mb-2">Pattern Type</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPattern('standard')}
                    className={`p-3 rounded-none border text-center transition-all cursor-pointer ${
                      selectedPattern === 'standard'
                        ? 'border-cyan-500 bg-cyan-600/10 text-white'
                        : 'border-white/5 bg-neutral-950 text-neutral-400 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <span className="font-display text-xs font-bold block uppercase tracking-wider">Standard Layout</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPattern('pattern')}
                    className={`p-3 rounded-none border text-center transition-all cursor-pointer ${
                      selectedPattern === 'pattern'
                        ? 'border-cyan-500 bg-cyan-600/10 text-white'
                        : 'border-white/5 bg-neutral-950 text-neutral-400 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <span className="font-display text-xs font-bold block uppercase tracking-wider">Herringbone/Pattern</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Base Package Detail */}
            <div className="bg-neutral-900 border border-white/10 rounded-none p-6 space-y-4 shadow-2xl text-left">
              <span className="font-mono text-[10px] uppercase text-cyan-400 font-extrabold tracking-widest">
                Step 2: Select Service
              </span>
              <h3 className="font-display text-lg font-bold uppercase tracking-wider">Tiling Service</h3>

              <div className="space-y-2">
                {TILING_PACKAGES.map((pkg) => {
                  const isChecked = selectedPackageId === pkg.id;
                  const currentPrice = pkg.basePrices[selectedPattern];

                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`p-4 rounded-none border cursor-pointer transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${
                        isChecked
                          ? 'border-cyan-500 bg-cyan-600/5 shadow-inner'
                          : 'border-white/5 bg-neutral-950 hover:border-white/10'
                      }`}
                    >
                      <div className="flex gap-3.5 items-start">
                        <div className="mt-1 shrink-0">
                          {isChecked ? (
                            <div className="w-4 h-4 rounded-none bg-cyan-500 flex items-center justify-center p-0.5">
                              <Check className="w-3 h-3 text-black stroke-[3]" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded-none border border-neutral-700" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-display text-sm font-bold uppercase tracking-wide">{pkg.name}</span>
                            {pkg.badge && (
                              <span className="text-[8px] bg-neutral-800 text-neutral-300 px-2.5 py-0.5 rounded-none uppercase tracking-widest font-mono">
                                {pkg.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-neutral-400 text-xs font-sans mt-1 max-w-md line-clamp-1">
                            {pkg.shortDesc}
                          </p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right sm:shrink-0">
                        <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider block">Estimated Base</span>
                        <span className="font-display text-base font-black text-white">£{currentPrice}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Extras add-ons */}
            <div id="extras" className="bg-neutral-900 border border-white/10 rounded-none p-6 space-y-4 shadow-2xl text-left">
              <span className="font-mono text-[10px] uppercase text-cyan-400 font-extrabold tracking-widest">
                Step 3: Optional Extras
              </span>
              <h3 className="font-display text-lg font-bold uppercase tracking-wider">Add Extra Services</h3>
              <p className="text-xs text-neutral-400 font-sans -mt-2">
                Configure your project with additional professional services:
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {EXTRA_SERVICES.map((extra) => {
                  const isChecked = selectedExtras.includes(extra.id);

                  return (
                    <div
                      key={extra.id}
                      onClick={() => handleToggleExtra(extra.id)}
                      className={`p-3.5 rounded-none border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                        isChecked
                          ? 'border-cyan-500 bg-cyan-600/5 shadow-inner'
                          : 'border-white/5 bg-neutral-950 hover:border-white/10'
                      }`}
                    >
                      <div className="flex gap-2.5 items-start">
                        <div className="mt-0.5 shrink-0 text-cyan-400">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 fill-cyan-950 stroke-[2.5]" />
                          ) : (
                            <Square className="w-4 h-4 text-neutral-700" />
                          )}
                        </div>
                        <div>
                          <span className="font-display text-xs font-bold block leading-tight uppercase tracking-wider">{extra.name}</span>
                          <span className="text-[10px] text-neutral-400 font-sans line-clamp-2 mt-1">
                            {extra.description}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-neutral-950 p-2 rounded-none border border-white/5">
                        <span className="text-[8px] uppercase font-mono text-neutral-450 font-bold bg-neutral-900 px-1.5 py-0.5 rounded-none">
                          {extra.category}
                        </span>
                        <span className="font-display text-sm font-extrabold text-white">+£{extra.price}/m²</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT: LIVE ESTIMATE BOARD & BOOKING PANEL (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Realtime Pricing Ticker Card */}
            <div className="rounded-none bg-neutral-900 border border-white/10 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-600 py-3.5 px-6 flex justify-between items-center text-left">
                <span className="font-display text-xs font-bold tracking-widest uppercase text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  <span>Quote Estimate</span>
                </span>
                <span className="text-[9px] font-mono bg-white/20 text-white px-2 py-0.5 rounded-none font-bold tracking-wider uppercase">
                  Surrey & West Sussex
                </span>
              </div>

              <div className="p-6 space-y-6 text-left">
                
                {/* Square Meters Input */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono text-neutral-400 tracking-widest font-bold flex items-center gap-1">
                    <Ruler className="w-3" /> Area Size (m²)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="e.g. 25"
                    value={formData.squareMeters}
                    onChange={e => setFormData({ ...formData, squareMeters: e.target.value })}
                    className="w-full bg-neutral-950 border border-white/5 rounded-none px-3 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
                
                {/* Breakdowns */}
                <div className="space-y-3.5 border-b border-white/5 pb-6">
                  
                  {/* Base Pack Line */}
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <h5 className="font-display font-bold uppercase tracking-wider text-neutral-200">
                        {activePackage.name}
                      </h5>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        £{basePricePerSqm}/m² × {squareMeters || 0}m² ({selectedPattern === 'pattern' ? 'Pattern' : 'Standard'})
                      </span>
                    </div>
                    <span className="font-mono font-bold text-white">£{basePrice.toFixed(2)}</span>
                  </div>

                  {/* Addons List */}
                  {selectedExtras.length > 0 ? (
                    <div className="pt-3 border-t border-white/5 space-y-2">
                      <span className="text-neutral-500 text-[9px] uppercase font-mono tracking-[0.15em] font-bold block">
                        Included Extras ({selectedExtras.length})
                      </span>
                      {selectedExtras.map(id => {
                        const extra = EXTRA_SERVICES.find(e => e.id === id);
                        if (!extra) return null;
                        return (
                          <div key={id} className="flex justify-between text-xs text-neutral-400 font-sans">
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-none bg-cyan-400" />
                              <span>{extra.name}</span>
                            </span>
                            <span className="font-mono text-neutral-300">£{extra.price}.00</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-[11px] text-neutral-500 font-sans italic pt-2 border-t border-white/5">
                      No custom add-on extras appended yet. Add extra stages above to detail.
                    </p>
                  )}

                </div>

                {/* Final Total Row */}
                <div className="flex justify-between items-end bg-neutral-950 p-4 rounded-none border border-white/5">
                  <div>
                    <span className="text-neutral-500 text-[9px] font-mono uppercase tracking-widest font-extrabold block">
                      Estimated Total
                    </span>
                    <span className="text-neutral-400 text-[10px] font-sans">
                      Subject to site survey
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-cyan-400 text-[9px] font-mono block -mb-0.5 font-bold">GBP</span>
                    <span className="font-display text-3xl font-black text-white">
                      £{totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-950 border border-white/5 rounded-none text-[10px] text-neutral-400 leading-relaxed flex items-start gap-2">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>Quality Guarantee:</strong> All work comes with our installation warranty. Final price may vary based on site conditions and preparation required.
                  </p>
                </div>

              </div>
            </div>

            {/* Booking Inquiry Form Panel */}
            <div className="bg-neutral-900 border border-white/10 rounded-none p-6 shadow-2xl text-left">
              <h3 className="font-display text-base font-bold uppercase tracking-wider mb-4">Service Enquiry</h3>
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-mono text-neutral-400 tracking-widest font-bold flex items-center gap-1">
                        <User className="w-3" /> First Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-neutral-950 border border-white/5 rounded-none px-3 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase font-mono text-neutral-400 tracking-widest font-bold flex items-center gap-1">
                          <Phone className="w-3" /> Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="07738 427208"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-neutral-950 border border-white/5 rounded-none px-3 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase font-mono text-neutral-400 tracking-widest font-bold flex items-center gap-1">
                          <Mail className="w-3" /> Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-neutral-950 border border-white/5 rounded-none px-3 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-mono text-neutral-400 tracking-widest font-bold flex items-center gap-1">
                        <Hammer className="w-3.5" /> Room / Project Type
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bathroom renovation, Kitchen splashback"
                        value={formData.projectDetails}
                        onChange={e => setFormData({ ...formData, projectDetails: e.target.value })}
                        className="w-full bg-neutral-950 border border-white/5 rounded-none px-3 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-mono text-neutral-400 tracking-widest font-bold flex items-center gap-1">
                        <Calendar className="w-3" /> Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-neutral-950 border border-white/5 rounded-none px-3 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] uppercase font-mono text-neutral-400 tracking-widest font-bold block">
                        Add a message or tell us more about what you need
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Approximate area size, type of tiles you prefer, any special requirements..."
                        value={formData.additionalNotes}
                        onChange={e => setFormData({ ...formData, additionalNotes: e.target.value })}
                        className="w-full bg-neutral-950 border border-white/5 rounded-none px-3 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-widest rounded-none transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Send Request</span>
                    </button>
                  </form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-center py-4"
                  >
                    <div className="w-12 h-12 bg-cyan-500/10 text-cyan-400 rounded-none flex items-center justify-center mx-auto border border-cyan-455/20">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <h4 className="font-display font-extrabold text-base text-neutral-100 uppercase tracking-wide">Enquiry Submitted!</h4>
                      <p className="text-neutral-400 text-xs font-sans leading-relaxed">
                        Your service enquiry is ready. You can open an email draft instantly or copy the summary below to send via WhatsApp/SMS.
                      </p>
                    </div>

                    <div className="bg-neutral-950 rounded-none p-4 border border-white/5 text-left font-mono text-[9px] text-neutral-400 h-44 overflow-y-auto whitespace-pre-wrap">
                      <FileText className="w-3.5 h-3.5 text-neutral-500 absolute top-5 right-5" />
                      {generateMailContent()}
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={handleSendEmail}
                        className="py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-[10px] uppercase tracking-widest rounded-none flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Email</span>
                      </button>

                      <button
                        onClick={handleCopyToClipboard}
                        className="py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-white/10 font-bold text-[10px] uppercase tracking-widest rounded-none flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copySuccess ? 'Copied' : 'Copy Text'}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono underline block mx-auto pt-2 cursor-pointer"
                    >
                      &larr; Make Changes to Estimate
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
