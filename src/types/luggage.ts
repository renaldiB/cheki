// TypeScript interfaces for luggage analysis and trip data

export type TransportMode = 'plane' | 'ship';
export type TripType = 'domestic' | 'international';
export type ItemStatus = 'allowed' | 'conditional' | 'forbidden';
export type PlacementType = 'cabin' | 'checkin' | 'either';

export interface LuggageItem {
  id: string;
  name: string;
  placement: PlacementType;
  quantity?: string;
}

export interface AnalysisResult {
  item: string;
  status: ItemStatus;
  placement: PlacementType;
  placementWarning?: string;
  reasons: string[];
  tips: string[];
  customsNote?: string;
}

export interface TripInfo {
  transportMode: TransportMode;
  tripType: TripType;
  originCountry: string;
  destinationCountry: string;
  isCustomDestination: boolean;
}

export interface AnalyzeRequest {
  items: LuggageItem[];
  trip: TripInfo;
  apiKey?: string;
  provider?: 'gemini' | 'openai' | 'deepseek' | 'local';
}

export interface AnalyzeResponse {
  results: AnalysisResult[];
  generalAdvice: string;
  customsInfo?: string;
  countrySpecificNotes?: string;
  analysisSource: 'ai' | 'local';
}

export interface ChecklistItem {
  id: string;
  name: string;
  placement: PlacementType;
  checked: boolean;
  hasWarning?: boolean;
  warningMessage?: string;
}

export interface PackingList {
  id: string;
  name: string;
  trip?: TripInfo;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
}
