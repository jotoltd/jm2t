import { TilingPackage, ExtraService } from '../types';

export const EXTRAS_LINK = "#quote-estimator";

export const TILING_PACKAGES: TilingPackage[] = [
  {
    id: "wall-tiling-large",
    name: "Large Format Wall Tiling (600mm+)",
    badge: "Premium Finish",
    shortDesc: "Professional installation of large format wall tiles for modern, seamless aesthetics.",
    fullDesc: "Expert installation of large format wall tiles (600mm+) in standard or feature patterns. Perfect for contemporary bathrooms, kitchens, and feature walls. Includes precise cutting, professional adhesive application, and expert grouting.",
    qualityGuarantee: "10-Year Installation Warranty",
    duration: "1-3 Days (depending on area)",
    basePrices: {
      standard: 60,
      pattern: 75
    },
    features: [
      "Professional surface preparation and priming",
      "Precision tile cutting and edge finishing",
      "Premium adhesive application for large format tiles",
      "Standard grid or herringbone pattern layouts",
      "Waterproof membrane application for wet areas",
      "Expert grouting with colour matching"
    ]
  },
  {
    id: "wall-tiling-medium",
    name: "Medium Format Wall Tiling (300x600mm–600x600mm)",
    badge: "Most Popular",
    shortDesc: "Versatile medium format tiles ideal for bathrooms, kitchens, and splashbacks.",
    fullDesc: "Our most popular wall tiling service. Medium format tiles offer the perfect balance of visual impact and practicality. Suitable for all room sizes with a variety of layout options from classic grid to intricate herringbone patterns.",
    qualityGuarantee: "10-Year Installation Warranty",
    duration: "1-3 Days (depending on area)",
    basePrices: {
      standard: 65,
      pattern: 80
    },
    features: [
      "Complete wall preparation and levelling",
      "Medium format tile layout planning",
      "Standard or herringbone pattern installation",
      "Professional tile cutting for sockets and fixtures",
      "Sealing and waterproofing for bathroom areas",
      "Premium grout finishing and silicone sealant"
    ]
  },
  {
    id: "wall-tiling-small",
    name: "Small Format Wall Tiling",
    badge: "Classic Craftsmanship",
    shortDesc: "Traditional small tile installation for detailed, classic aesthetics.",
    fullDesc: "Specialist installation of small format wall tiles including metro tiles, mosaics, and traditional ceramics. Perfect for classic kitchens, Victorian bathrooms, and detailed feature walls requiring precision craftsmanship.",
    qualityGuarantee: "10-Year Installation Warranty",
    duration: "2-4 Days (depending on complexity)",
    basePrices: {
      standard: 70,
      pattern: 85
    },
    features: [
      "Intricate small tile pattern layout",
      "Precision cutting for detailed installations",
      "Classic metro, mosaic, or traditional layouts",
      "Herringbone, basket weave, or custom patterns",
      "Perfect alignment and spacing throughout",
      "Detailed finishing and corner work"
    ]
  },
  {
    id: "floor-tiling-large",
    name: "Large Format Floor Tiling",
    badge: "Modern Elegance",
    shortDesc: "Seamless large format floor tiles for spacious, contemporary interiors.",
    fullDesc: "Professional installation of large format floor tiles creating seamless, modern surfaces. Ideal for open-plan spaces, kitchens, and bathrooms. Includes floor preparation, levelling compound application, and expert laying for perfect results.",
    qualityGuarantee: "15-Year Floor Installation Warranty",
    duration: "2-5 Days (depending on area)",
    basePrices: {
      standard: 80,
      pattern: 95
    },
    features: [
      "Floor preparation and levelling compound",
      "Large format tile layout optimisation",
      "Professional adhesive for heavy traffic areas",
      "Standard or herringbone pattern options",
      "Expansion joint integration",
      "Anti-slip treatment options available"
    ]
  },
  {
    id: "floor-tiling-small",
    name: "Small Format Floor Tiling",
    badge: "Traditional Quality",
    shortDesc: "Classic small floor tiles with pattern options for timeless appeal.",
    fullDesc: "Expert installation of small format floor tiles including traditional ceramics, porcelain mosaics, and patterned designs. Perfect for bathrooms, utility rooms, and spaces requiring intricate layouts and detailed craftsmanship.",
    qualityGuarantee: "15-Year Floor Installation Warranty",
    duration: "3-6 Days (depending on complexity)",
    basePrices: {
      standard: 85,
      pattern: 100
    },
    features: [
      "Subfloor preparation and damp proofing",
      "Small tile pattern design and layout",
      "Intricate cutting around fixtures and pipes",
      "Standard grid or feature pattern installation",
      "Precision grouting and sealing",
      "Underfloor heating compatibility"
    ]
  },
  {
    id: "bespoke-countertops",
    name: "Bespoke Tile Countertops",
    badge: "Custom Design",
    shortDesc: "Custom tiled countertops and worktops for kitchens and utility spaces.",
    fullDesc: "Specialist installation of bespoke tiled countertops and worktops. From kitchen islands to utility room surfaces, we create durable, beautiful tiled worktops that are both practical and stunning. Includes substrate preparation, waterproofing, and professional edging.",
    qualityGuarantee: "10-Year Craftsmanship Guarantee",
    duration: "2-4 Days",
    basePrices: {
      standard: 90,
      pattern: 110
    },
    features: [
      "Substrate preparation and waterproofing",
      "Custom tile selection and layout design",
      "Professional cutting and edging solutions",
      "Heat-resistant and stain-resistant grouting",
      "Seamless integration with existing surfaces",
      "Protective sealing and finishing"
    ]
  },
  {
    id: "tile-repair",
    name: "Tile Installation & Repair",
    badge: "Restoration Expert",
    shortDesc: "Professional repair, replacement, and restoration of existing tiled surfaces.",
    fullDesc: "Expert tile repair and replacement services. Whether you need cracked tiles replaced, loose tiles re-fixed, or grout renewed, we provide seamless repairs that blend perfectly with your existing installation. Includes colour matching and professional finishing.",
    qualityGuarantee: "5-Year Repair Warranty",
    duration: "1-2 Days",
    basePrices: {
      standard: 55,
      pattern: 65
    },
    features: [
      "Cracked and damaged tile replacement",
      "Loose tile re-fixing and re-grouting",
      "Grout renewal and colour restoration",
      "Silicone sealant replacement",
      "Tile sourcing for colour matching",
      "Waterproofing repair for showers"
    ]
  }
];

export const EXTRA_SERVICES: ExtraService[] = [
  {
    id: "waterproof-membrane",
    name: "Premium Waterproof Membrane",
    description: "Complete tanking system for wet rooms and showers with guaranteed waterproofing.",
    price: 25,
    category: "wall"
  },
  {
    id: "underfloor-heating",
    name: "Underfloor Heating Preparation",
    description: "Substrate preparation and insulation for electric underfloor heating systems.",
    price: 35,
    category: "floor"
  },
  {
    id: "decorative-trim",
    name: "Decorative Tile Trim Installation",
    description: "Premium metal, chrome, or matching tile trim installation for perfect edge finishing.",
    price: 15,
    category: "wall"
  },
  {
    id: "sealing-service",
    name: "Natural Stone Sealing Service",
    description: "Professional impregnating sealant application for marble, granite, or natural stone tiles.",
    price: 40,
    category: "specialty"
  },
  {
    id: "remove-existing",
    name: "Existing Tile Removal",
    description: "Safe removal and disposal of existing tiles with wall/floor preparation.",
    price: 30,
    category: "specialty"
  },
  {
    id: "grout-refresh",
    name: "Grout Colour Refresh",
    description: "Epoxy grout upgrade or colour matching service for a premium finish.",
    price: 20,
    category: "specialty"
  },
  {
    id: "nicho-install",
    name: "Shower Niche Installation",
    description: "Custom recessed shower niche or shelving built into tiled walls.",
    price: 85,
    category: "wall"
  }
];
