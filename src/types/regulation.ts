// TypeScript interfaces for country regulations

export interface RegulationRule {
  category: string;
  item: string;
  status: 'allowed' | 'conditional' | 'forbidden';
  details: string;
  conditions?: string;
}

export interface CountryRegulation {
  countryCode: string;
  countryName: string;
  flag: string;
  planeRules: RegulationRule[];
  shipRules: RegulationRule[];
  customsLimits: CustomsLimit[];
  quarantineInfo: string[];
  generalNotes: string[];
  lastUpdated: string;
}

export interface CustomsLimit {
  category: string;
  limit: string;
  details: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  isPopular: boolean;
}
