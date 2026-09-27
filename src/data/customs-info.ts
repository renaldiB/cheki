// Customs (Bea Cukai) Indonesia information
export const CUSTOMS_INFO = {
  title: 'Panduan Bea Cukai Indonesia',
  subtitle: 'Berdasarkan PMK 203/PMK.04/2017 & peraturan terbaru',
  lastUpdated: '2025-01',
  sections: [
    {
      id: 'barang-bawaan',
      title: '🛄 Pembebasan Barang Bawaan',
      icon: '🛄',
      items: [
        { label: 'Batas Bebas Bea Masuk', value: 'FOB USD 500 per orang', description: 'Barang bawaan penumpang (bukan kiriman) senilai s/d USD 500 dibebaskan dari Bea Masuk dan PPN.' },
        { label: 'Anak-anak', value: 'FOB USD 500 per anak', description: 'Anak yang bepergian bersama orang tua tetap mendapat fasilitas pembebasan USD 500 sendiri.' },
        { label: 'Kelebihan Pembebasan', value: 'Bea Masuk + PPN 11% + PPh', description: 'Nilai di atas USD 500 dikenakan bea masuk sesuai HS Code barang, PPN 11%, dan PPh 10% (NPWP) atau 20% (non-NPWP).' },
      ],
    },
    {
      id: 'imei',
      title: '📱 Registrasi IMEI Gadget',
      icon: '📱',
      items: [
        { label: 'Wajib Daftarkan', value: 'HP, Tablet, Laptop, Komputer', description: 'Perangkat komunikasi & elektronik yang dibeli di luar negeri wajib didaftarkan IMEI-nya.' },
        { label: 'Cara Daftar', value: 'Aplikasi Bea Cukai / beacukai.go.id', description: 'Bisa didaftarkan sebelum berangkat atau setibanya di Indonesia. Setelah 90 hari tanpa registrasi, perangkat tidak bisa digunakan di jaringan Indonesia.' },
        { label: 'Bebas Bea', value: 'S/d USD 500 per orang (total gadget)', description: 'Jika nilai total gadget baru dari LN ≤ USD 500, bebas bea. Kelebihan dikenakan bea masuk.' },
        { label: 'Catatan', value: 'Barang secondhand juga wajib daftar', description: 'Hp bekas dari luar negeri juga perlu didaftarkan IMEI-nya.' },
      ],
    },
    {
      id: 'rokok-alkohol',
      title: '🚬 Rokok & Alkohol',
      icon: '🚬',
      items: [
        { label: 'Rokok Bebas Bea', value: '200 batang / 25 cerutu / 100g tembakau', description: 'Per orang dewasa (≥18 tahun). Kelebihan akan dimusnahkan oleh petugas atau dikenakan cukai.' },
        { label: 'Minuman Beralkohol', value: 'Maks 1 liter per orang dewasa', description: 'Hanya untuk penumpang berusia ≥21 tahun. Jenis apapun (wine, beer, spirits). Kelebihan dimusnahkan.' },
        { label: 'Vape/Liquid Nikotin', value: 'Terbatas, bea cukai berlaku', description: 'Liquid vape dikenakan cukai. Bawa dalam jumlah wajar untuk penggunaan pribadi.' },
      ],
    },
    {
      id: 'uang',
      title: '💰 Uang Tunai & Instrumen Keuangan',
      icon: '💰',
      items: [
        { label: 'Batas Lapor', value: '≥ Rp 100.000.000 atau setara valas', description: 'Membawa uang tunai senilai Rp 100 juta ke atas WAJIB dilaporkan ke Bea Cukai. Tidak dilarang, tapi harus lapor.' },
        { label: 'Instrumen Keuangan', value: 'Cek, wesel, dll.', description: 'Instrumen keuangan (cek, promissory notes) senilai ≥ Rp 100 juta juga wajib dilaporkan.' },
        { label: 'Tidak Dilaporkan', value: 'Bisa disita & denda', description: 'Uang tunai yang tidak dilaporkan bisa disita sebagai barang bukti tindak pidana pencucian uang.' },
      ],
    },
    {
      id: 'ecd',
      title: '📋 Electronic Customs Declaration (e-CD)',
      icon: '📋',
      items: [
        { label: 'Cara Mengisi', value: 'Aplikasi Mobile Bea Cukai / bea.go.id', description: 'Isi e-CD sebelum tiba di Indonesia untuk mempercepat proses. Atau isi formulir kertas di pesawat.' },
        { label: 'Yang Harus Dideklarasikan', value: 'Barang melebihi batas, uang ≥ Rp 100 juta, hewan/tanaman', description: 'Selalu jujur dalam mengisi formulir. Ketidakjujuran bisa dikenakan sanksi.' },
        { label: 'Pemeriksaan', value: 'Jalur Hijau & Merah', description: 'Jalur Hijau: barang dalam batas normal (bisa acak dicek). Jalur Merah: wajib untuk barang melebihi batas atau yang dideklarasikan.' },
      ],
    },
  ],
  calculatorInfo: {
    title: 'Simulasi Bea Masuk Sederhana',
    description: 'Estimasi kasar bea masuk yang harus dibayar',
    formula: 'Bea Masuk = (Nilai Barang - USD 500) × (BM% + PPN 11% + PPh%)',
    notes: 'Tarif BM bervariasi per jenis barang (5–40%). Gunakan sebagai estimasi saja. Konsultasi langsung ke Bea Cukai untuk informasi akurat.',
  },
};
