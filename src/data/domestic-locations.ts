export interface DomesticLocation {
  code: string;
  name: string;
  type: 'airport' | 'port' | 'both';
  island: string;
  isPopular: boolean;
}

export const DOMESTIC_LOCATIONS: DomesticLocation[] = [
  // Jawa
  { code: 'CGK', name: 'Jakarta (CGK / Tanjung Priok)', type: 'both', island: 'Jawa', isPopular: true },
  { code: 'SUB', name: 'Surabaya (SUB / Tanjung Perak)', type: 'both', island: 'Jawa', isPopular: true },
  { code: 'DPS', name: 'Bali / Denpasar (DPS / Gilimanuk)', type: 'both', island: 'Bali & Nusa Tenggara', isPopular: true },
  { code: 'YIA', name: 'Yogyakarta (YIA / Kulon Progo)', type: 'airport', island: 'Jawa', isPopular: true },
  { code: 'SRG', name: 'Semarang (SRG / Tanjung Emas)', type: 'both', island: 'Jawa', isPopular: true },
  { code: 'BDO', name: 'Bandung (BDO)', type: 'airport', island: 'Jawa', isPopular: false },
  { code: 'MRK', name: 'Merak - Cilegon (Pelabuhan Ferry ASDP)', type: 'port', island: 'Jawa', isPopular: true },
  { code: 'KTP', name: 'Banyuwangi / Ketapang (Pelabuhan)', type: 'both', island: 'Jawa', isPopular: true },

  // Sumatera
  { code: 'KNO', name: 'Medan (KNO / Pelabuhan Belawan)', type: 'both', island: 'Sumatera', isPopular: true },
  { code: 'BTH', name: 'Batam (Hang Nadim / Batam Centre FTZ)', type: 'both', island: 'Sumatera', isPopular: true },
  { code: 'PLM', name: 'Palembang (PLM / Boom Baru)', type: 'both', island: 'Sumatera', isPopular: true },
  { code: 'PDG', name: 'Padang (PDG / Teluk Bayur)', type: 'both', island: 'Sumatera', isPopular: true },
  { code: 'TKG', name: 'Lampung / Bakauheni (TKG / Pelabuhan)', type: 'both', island: 'Sumatera', isPopular: true },
  { code: 'PKU', name: 'Pekanbaru (PKU)', type: 'airport', island: 'Sumatera', isPopular: false },
  { code: 'BTJ', name: 'Banda Aceh (BTJ / Pelabuhan Ulee Lheue)', type: 'both', island: 'Sumatera', isPopular: false },

  // Sulawesi
  { code: 'UPG', name: 'Makassar (UPG / Pelabuhan Soekarno-Hatta)', type: 'both', island: 'Sulawesi', isPopular: true },
  { code: 'MDC', name: 'Manado (MDC / Pelabuhan Bitung)', type: 'both', island: 'Sulawesi', isPopular: true },
  { code: 'PLW', name: 'Palu (PLW / Pantoloan)', type: 'both', island: 'Sulawesi', isPopular: false },
  { code: 'KDI', name: 'Kendari (KDI / Pelabuhan Nusantara)', type: 'both', island: 'Sulawesi', isPopular: false },
  { code: 'BAU', name: 'Baubau - Buton (Pelabuhan Murhum)', type: 'both', island: 'Sulawesi', isPopular: false },

  // Kalimantan
  { code: 'BPN', name: 'Balikpapan (BPN / Pelabuhan Semayang)', type: 'both', island: 'Kalimantan', isPopular: true },
  { code: 'BDJ', name: 'Banjarmasin (BDJ / Pelabuhan Trisakti)', type: 'both', island: 'Kalimantan', isPopular: true },
  { code: 'PNK', name: 'Pontianak (PNK / Pelabuhan Dwikora)', type: 'both', island: 'Kalimantan', isPopular: true },
  { code: 'TRK', name: 'Tarakan (TRK / Pelabuhan Malundung)', type: 'both', island: 'Kalimantan', isPopular: false },

  // Nusa Tenggara, Maluku & Papua
  { code: 'LBJ', name: 'Labuan Bajo - Komodo (LBJ / Pelabuhan)', type: 'both', island: 'Bali & Nusa Tenggara', isPopular: true },
  { code: 'LOP', name: 'Lombok / Mataram (LOP / Lembar)', type: 'both', island: 'Bali & Nusa Tenggara', isPopular: true },
  { code: 'KOE', name: 'Kupang (KOE / Tenau)', type: 'both', island: 'Bali & Nusa Tenggara', isPopular: false },
  { code: 'AMQ', name: 'Ambon (AMQ / Pelabuhan Yos Sudarso)', type: 'both', island: 'Maluku', isPopular: true },
  { code: 'TTE', name: 'Ternate (TTE / Ahmad Yani)', type: 'both', island: 'Maluku', isPopular: false },
  { code: 'SOQ', name: 'Sorong - Raja Ampat (SOQ / Pelabuhan)', type: 'both', island: 'Papua', isPopular: true },
  { code: 'DJJ', name: 'Jayapura (DJJ / Pelabuhan Jayapura)', type: 'both', island: 'Papua', isPopular: true },
  { code: 'MKQ', name: 'Merauke (MKQ / Pelabuhan Merauke)', type: 'both', island: 'Papua', isPopular: false },
];
