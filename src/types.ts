export interface TilingPackage {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  basePrices: {
    standard: number;
    pattern: number;
  };
  features: string[];
  duration: string;
  badge?: string;
  qualityGuarantee?: string;
}

export interface ExtraService {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'wall' | 'floor' | 'specialty';
}

export type TileFormat = 'large' | 'medium' | 'small';
export type PatternType = 'standard' | 'pattern';

export interface ServiceInquiry {
  name: string;
  email: string;
  phone: string;
  projectType: TileFormat;
  projectDetails: string; // e.g. "Kitchen renovation, 25m²"
  selectedPackageId: string;
  selectedExtras: string[];
  preferredDate: string;
  additionalNotes: string;
}
