import { CountryRegulation } from '@/types/regulation';

export const COUNTRY_REGULATIONS: CountryRegulation[] = [
  {
    countryCode: 'ID',
    countryName: 'Indonesia',
    flag: '🇮🇩',
    lastUpdated: '2025-01',
    planeRules: [
      { category: 'Baterai', item: 'Powerbank', status: 'conditional', details: 'Wajib di kabin. Maks 100Wh tanpa izin, 100–160Wh perlu izin maskapai, >160Wh dilarang.', conditions: 'Di kabin pesawat saja' },
      { category: 'Cairan', item: 'Cairan/Gel/Aerosol (LAGs)', status: 'conditional', details: 'Penerbangan internasional: ≤100ml per wadah, total ≤1L dalam ziplock transparan. Domestik: aturan maskapai masing-masing.', conditions: 'Penerbangan internasional' },
      { category: 'Senjata', item: 'Senjata Tajam (Pisau, Gunting >6cm)', status: 'forbidden', details: 'Dilarang di kabin. Boleh di bagasi check-in dengan kemasan aman.', conditions: 'Bagasi check-in' },
      { category: 'Vape', item: 'Vape / E-cigarette', status: 'conditional', details: 'Wajib di kabin (baterai litium). Liquid ≤100ml di kabin.', conditions: 'Kabin pesawat' },
      { category: 'Barang Berbahaya', item: 'Gas/Bahan Mudah Terbakar', status: 'forbidden', details: 'Dilarang tanpa pengecualian.' },
    ],
    shipRules: [
      { category: 'Berat Bagasi', item: 'Bagasi Cuma-Cuma Pelni', status: 'conditional', details: 'Pelni: 40 kg per tiket dewasa, 30 kg anak-anak. Kelebihan dikenakan biaya.' },
      { category: 'Barang Berbahaya', item: 'Gas/Elpiji/Bahan Bakar', status: 'forbidden', details: 'Dilarang keras di kapal penumpang. Risiko kebakaran.' },
      { category: 'Makanan', item: 'Durian', status: 'forbidden', details: 'Dilarang di kabin penumpang karena bau. Bisa dikirim sebagai kargo tersegel.' },
      { category: 'Kendaraan', item: 'Kendaraan Bermotor', status: 'conditional', details: 'Boleh di kapal Ro-Ro. Tanki harus dikosongkan atau minim (< 1/4 tangki).', conditions: 'Kapal Ro-Ro, tanki minim bahan bakar' },
    ],
    customsLimits: [
      { category: 'Barang Belanjaan', limit: 'FOB USD 500 per orang', details: 'Pembebasan bea masuk barang bawaan penumpang. Kelebihan dikenakan Bea Masuk + PPN + PPh.' },
      { category: 'Rokok', limit: '200 batang / 25 cerutu / 100g tembakau', details: 'Per orang dewasa. Kelebihan dimusnahkan atau dikenakan cukai.' },
      { category: 'Alkohol', limit: 'Maks 1 liter per orang dewasa', details: 'Kelebihan dimusnahkan di bandara.' },
      { category: 'Uang Tunai', limit: '≥ Rp 100 juta atau setara valas', details: 'Wajib lapor ke Bea Cukai dan Bank Indonesia (PPATK).' },
      { category: 'Gadget / IMEI', limit: 'USD 500 bebas bea', details: 'HP/tablet/laptop baru dari LN: bebas bea jika ≤ USD 500. Daftarkan IMEI di beacukai.go.id sebelum keberangkatan atau setibanya.' },
    ],
    quarantineInfo: [
      'Hewan peliharaan: wajib sertifikat kesehatan dari dokter hewan dan sertifikat vaksinasi rabies',
      'Tanaman/bibit: wajib Sertifikat Kesehatan Tanaman (Phytosanitary Certificate) dari Karantina Pertanian',
      'Produk daging/ikan: harus dari sumber legal dan bersertifikat. Deklarasikan ke Karantina Hewan di bandara',
    ],
    generalNotes: [
      'Isi Electronic Customs Declaration (e-CD) di aplikasi Bea Cukai atau website beacukai.go.id sebelum tiba',
      'Barang untuk keperluan pribadi dengan kondisi wajar tidak dikenakan bea masuk',
      'Barang kiriman/oleh-oleh: jika terlihat seperti barang dagangan, bisa dikenakan bea masuk meski di bawah USD 500',
    ],
  },
  {
    countryCode: 'SG',
    countryName: 'Singapura',
    flag: '🇸🇬',
    lastUpdated: '2025-01',
    planeRules: [
      { category: 'Vape', item: 'Vape / E-cigarette / Tembakau Elektrik', status: 'forbidden', details: 'DILARANG KERAS. Denda SGD 2.000 untuk importasi ilegal. Sangat serius bagi wisatawan.' },
      { category: 'Rokok', item: 'Rokok Tanpa Cukai Singapura', status: 'forbidden', details: 'Rokok tanpa label cukai Singapura (duty-not-paid) dilarang. Maksimal 1 paket rokok duty-paid.' },
      { category: 'Narkotika', item: 'Narkoba/Zat Psikotropika', status: 'forbidden', details: 'Hukuman MATI. Zero tolerance policy.' },
      { category: 'Makanan', item: 'Daging Babi Segar/Kamar', status: 'forbidden', details: 'Tidak boleh dibawa dari Malaysia atau negara lain tanpa izin AVS.' },
      { category: 'Baterai', item: 'Powerbank / Baterai Litium', status: 'conditional', details: 'Aturan standar IATA berlaku. Wajib di kabin.', conditions: 'Di kabin' },
    ],
    shipRules: [
      { category: 'Barang Impor', item: 'Rokok', status: 'forbidden', details: 'Sama seperti aturan pesawat. Rokok tanpa cukai Singapura dilarang masuk.' },
    ],
    customsLimits: [
      { category: 'Rokok', limit: '0 batang duty-free', details: 'Tidak ada kuota duty-free untuk rokok di Singapura (berlaku sejak 2022).' },
      { category: 'Alkohol', limit: '1 liter wine + 1 liter beer + 1 liter spirits', details: 'Untuk penumpang yang menginap ≥48 jam di luar Singapura. Yang < 48 jam tidak dapat duty-free.' },
      { category: 'Barang Belanjaan', limit: 'SGD 500 (menginap ≥48 jam) / SGD 100 (<48 jam)', details: 'Pembebasan GST untuk barang bawaan personal.' },
    ],
    quarantineInfo: [
      'Buah dan sayuran segar umumnya boleh jika untuk konsumsi pribadi dan dalam jumlah wajar',
      'Daging segar/produk hewan dari Indonesia/Malaysia perlu izin AVS (Singapore Food Agency)',
      'Hewan peliharaan: perlu izin AVS, karantina wajib untuk beberapa negara asal',
    ],
    generalNotes: [
      'Singapura sangat ketat terhadap narkoba — hukuman mati berlaku untuk kepemilikan di atas ambang batas',
      'Permen karet (chewing gum) tidak diizinkan untuk dijual, tapi boleh dibawa untuk konsumsi pribadi dalam jumlah kecil',
      'Isi e-Customs Declaration melalui Singapore Customs sebelum tiba',
    ],
  },
  {
    countryCode: 'AU',
    countryName: 'Australia',
    flag: '🇦🇺',
    lastUpdated: '2025-01',
    planeRules: [
      { category: 'Makanan', item: 'Buah/Sayuran Segar', status: 'forbidden', details: 'Dilarang masuk tanpa izin impor. Wajib deklarasi. Risiko denda AUD 222+.' },
      { category: 'Makanan', item: 'Daging/Produk Hewani', status: 'forbidden', details: 'Daging segar/beku umumnya dilarang. Produk kemasan pabrik bisa diizinkan jika dideklarasikan.' },
      { category: 'Makanan', item: 'Makanan Kemasan Pabrikan', status: 'conditional', details: 'Boleh jika dideklarasikan. Bisa diizinkan setelah pemeriksaan biosecurity.', conditions: 'Wajib deklarasi di formulir Incoming Passenger Card' },
      { category: 'Tanaman', item: 'Tanaman/Bibit/Tanah', status: 'forbidden', details: 'Dilarang keras. Australia sangat melindungi ekosistemnya.' },
      { category: 'Kayu', item: 'Produk Kayu Mentah/Jerami/Rotan Alami', status: 'conditional', details: 'Wajib deklarasi dan pemeriksaan biosecurity.' },
      { category: 'Obat', item: 'Obat-obatan Keras', status: 'conditional', details: 'Bawa resep dokter. Beberapa obat dilarang di Australia.' },
    ],
    shipRules: [
      { category: 'Biosecurity', item: 'Semua Produk Pertanian', status: 'conditional', details: 'Aturan biosecurity Australia sangat ketat untuk jalur laut juga.' },
    ],
    customsLimits: [
      { category: 'Barang Belanjaan', limit: 'AUD 900 per orang (≥18 tahun)', details: 'AUD 450 untuk anak di bawah 18 tahun. Kelebihan dikenakan GST 10% dan bea masuk.' },
      { category: 'Rokok', limit: '25 batang atau 25g tembakau', details: 'Per orang berusia ≥18 tahun. Rokok Australia sangat mahal karena cukai tinggi.' },
      { category: 'Alkohol', limit: '2.25 liter total', details: 'Untuk penumpang berusia ≥18 tahun.' },
      { category: 'Uang Tunai', limit: 'AUD 10.000+', details: 'Wajib deklarasi jika membawa uang tunai atau monetary instruments senilai AUD 10.000 atau lebih.' },
    ],
    quarantineInfo: [
      'WAJIB: Isi Incoming Passenger Card (IPC) dengan jujur sebelum mendarat',
      'Semua makanan, tanaman, dan produk hewan WAJIB dideklarasikan meski ada kemungkinan boleh masuk',
      'Denda minimum AUD 222 untuk non-deklarasi barang yang seharusnya dilaporkan',
      'Anjing dan kucing dari banyak negara (termasuk Indonesia) memerlukan masa karantina wajib',
      'Indonesia masuk kategori risiko rabies tinggi — hewan peliharaan perlu karantina minimal 10 hari',
    ],
    generalNotes: [
      'Australia Biosecurity adalah yang paling ketat di dunia — selalu deklarasikan jika ragu',
      'Biosecurity detection dogs berpatroli di area kedatangan bandara Australia',
      'Petugas berwenang dapat menyita dan memusnahkan barang yang tidak dideklarasikan',
    ],
  },
  {
    countryCode: 'JP',
    countryName: 'Jepang',
    flag: '🇯🇵',
    lastUpdated: '2025-01',
    planeRules: [
      { category: 'Narkotika', item: 'Obat Keras/Psikotropika', status: 'forbidden', details: 'Jepang sangat ketat. Bahkan beberapa obat batuk OTC (mengandung pseudoephedrine/codeine) dilarang tanpa izin Yakkan Mochi-in.' },
      { category: 'Obat', item: 'Obat dengan Resep Dokter', status: 'conditional', details: 'Bawa resep dokter dalam bahasa Inggris. Untuk penggunaan >1 bulan atau jenis tertentu, perlu izin Yakkan Mochi-in dari Kementerian Kesehatan Jepang.', conditions: 'Sertai surat Yakkan Mochi-in untuk obat keras' },
      { category: 'Makanan', item: 'Daging/Produk Hewani Segar', status: 'forbidden', details: 'Daging segar dari Indonesia tidak boleh masuk tanpa sertifikat. Aturan karantina ketat (PMD — Penyakit Mulut dan Kuku).' },
      { category: 'Makanan', item: 'Makanan Kemasan Pabrikan', status: 'conditional', details: 'Umumnya boleh jika dideklarasikan.', conditions: 'Deklarasikan ke Karantina Hewan/Tumbuhan Jepang di bandara' },
      { category: 'Tanaman', item: 'Buah/Sayuran Segar', status: 'conditional', details: 'Beberapa boleh masuk, beberapa dilarang. Pisang, mangga: bisa lolos jika memenuhi syarat. Selalu deklarasikan.' },
    ],
    shipRules: [],
    customsLimits: [
      { category: 'Barang Belanjaan', limit: 'JPY 200.000 per orang', details: 'Diperkirakan sekitar USD 1.300. Kelebihan dikenakan bea masuk.' },
      { category: 'Rokok', limit: '200 batang atau 250g tembakau', details: 'Untuk orang berusia ≥20 tahun.' },
      { category: 'Alkohol', limit: '3 botol (750ml masing-masing)', details: 'Untuk orang berusia ≥20 tahun.' },
      { category: 'Parfum', limit: '2 oz (60ml)', details: 'Duty-free allowance untuk parfum.' },
    ],
    quarantineInfo: [
      'Wajib isi formulir Customs Declaration di pesawat',
      'Daging segar/beku dari Indonesia dilarang masuk Jepang',
      'Hewan peliharaan ke Jepang: prosedur sangat panjang dan mahal (bisa memerlukan 180 hari persiapan)',
    ],
    generalNotes: [
      'Jepang melarang impor pornografi, bahan-bahan porno, dan senjata replika tertentu',
      'Beberapa obat yang umum di Indonesia (seperti obat flu mengandung pseudoephedrine) bisa ilegal di Jepang',
    ],
  },
  {
    countryCode: 'SA',
    countryName: 'Arab Saudi',
    flag: '🇸🇦',
    lastUpdated: '2025-01',
    planeRules: [
      { category: 'Alkohol', item: 'Minuman Beralkohol', status: 'forbidden', details: 'DILARANG KERAS. Hukum Islam berlaku. Bisa dipenjara.' },
      { category: 'Makanan', item: 'Daging Babi / Produk Babi', status: 'forbidden', details: 'Dilarang masuk karena aturan agama Islam.' },
      { category: 'Media', item: 'Konten Pornografi', status: 'forbidden', details: 'Dilarang. Bisa disita dan pemilik ditindak.' },
      { category: 'Air Zamzam', item: 'Air Zamzam', status: 'conditional', details: 'Jemaah haji/umrah: boleh membawa 5 liter air zamzam yang dikemas secara resmi oleh otoritas Arab Saudi. Tidak boleh membawa air zamzam sendiri dengan wadah pribadi.', conditions: 'Kemasan resmi dari pemerintah Arab Saudi' },
      { category: 'Obat', item: 'Obat-obatan Tertentu', status: 'conditional', details: 'Beberapa obat (terutama mengandung opioid, psikotropika) memerlukan izin khusus.', conditions: 'Bawa resep dokter berbahasa Arab atau Inggris' },
    ],
    shipRules: [],
    customsLimits: [
      { category: 'Rokok', limit: '400 batang atau 500g tembakau', details: 'Untuk penumpang non-Muslim.' },
      { category: 'Hadiah', limit: 'SAR 3.000 per orang', details: 'Hadiah senilai di bawah SAR 3.000 bebas bea.' },
    ],
    quarantineInfo: [
      'Hewan peliharaan: perlu sertifikat kesehatan dan vaksinasi rabies',
      'Produk hewani: harus bersertifikat halal',
    ],
    generalNotes: [
      'Aturan pakaian: lebih baik berpakaian sopan saat memasuki negara ini',
      'GPS tracker dan drone memerlukan izin dari otoritas Arab Saudi',
      'Kamera DSLR dan perlengkapan media profesional mungkin memerlukan deklarasi/izin',
    ],
  },
  {
    countryCode: 'US',
    countryName: 'Amerika Serikat',
    flag: '🇺🇸',
    lastUpdated: '2025-01',
    planeRules: [
      { category: 'Cairan', item: 'Cairan/Aerosol/Gel (3-1-1 Rule)', status: 'conditional', details: 'TSA 3-1-1: Masing-masing ≤3.4oz (100ml), dalam 1 quart (≈1L) zip-lock, 1 tas per penumpang.', conditions: 'Untuk kabin pesawat' },
      { category: 'Baterai', item: 'Powerbank/Baterai Litium', status: 'conditional', details: 'Standar FAA: ≤100Wh di kabin (tanpa izin), 100–160Wh boleh dengan izin maskapai. Wajib di kabin.', conditions: 'Di kabin saja' },
      { category: 'Senjata Api', item: 'Senjata Api', status: 'conditional', details: 'Boleh di bagasi check-in jika dideklarasikan, dalam wadah terkunci keras, tanpa peluru di senjata. Ikuti aturan TSA dan maskapai.', conditions: 'Bagasi check-in, dideklarasikan, terkunci' },
      { category: 'Makanan', item: 'Produk Pertanian/Daging Segar', status: 'conditional', details: 'CBP (Customs & Border Protection) sangat ketat. Banyak produk daging, buah, sayuran dari Indonesia dilarang masuk.', conditions: 'Deklarasikan semua produk pertanian di kartu CBP' },
    ],
    shipRules: [],
    customsLimits: [
      { category: 'Barang Belanjaan', limit: 'USD 800 per orang', details: 'Duty-free exemption. Kelebihan dikenakan bea masuk.' },
      { category: 'Rokok', limit: '200 batang (1 karton)', details: 'Duty-free untuk orang berusia ≥21 tahun.' },
      { category: 'Alkohol', limit: '1 liter', details: 'Duty-free untuk orang berusia ≥21 tahun.' },
      { category: 'Uang Tunai', limit: 'USD 10.000+', details: 'Wajib deklarasi ke CBP. Tidak ilegal membawa lebih, tapi wajib dilaporkan.' },
    ],
    quarantineInfo: [
      'WAJIB isi formulir CBP 6059B (Customs Declaration) di pesawat atau CBP Mobile Passport app',
      'Buah dan sayuran segar dari banyak negara Asia dilarang masuk AS',
      'Daging dari Indonesia: umumnya dilarang masuk AS',
    ],
    generalNotes: [
      'Visa/ESTA: Warga Indonesia memerlukan visa B1/B2 atau ESTA jika memenuhi syarat',
      'Beberapa negara bagian memiliki aturan lokal yang lebih ketat (misal: California untuk tanaman)',
      'Ganja/cannabis: meski legal di beberapa negara bagian, DILARANG di tingkat federal dan tidak boleh dibawa lintas negara/ke luar AS',
    ],
  },
  {
    countryCode: 'MY',
    countryName: 'Malaysia',
    flag: '🇲🇾',
    lastUpdated: '2025-01',
    planeRules: [
      { category: 'Narkotika', item: 'Narkoba', status: 'forbidden', details: 'Hukuman mati untuk perdagangan narkoba di Malaysia.' },
      { category: 'Vape', item: 'Vape / E-cigarette', status: 'conditional', details: 'Vape boleh dibawa untuk penggunaan pribadi. Liquid nicotine legal. Hindari di depan umum.', conditions: 'Penggunaan pribadi' },
      { category: 'Alkohol', item: 'Alkohol', status: 'conditional', details: 'Boleh dibawa untuk non-muslim. Batas duty-free: 1 liter.', conditions: 'Untuk non-Muslim' },
      { category: 'Makanan', item: 'Produk Halal', status: 'conditional', details: 'Produk daging harus halal dan bersertifikat halal Malaysia (JAKIM) untuk diedarkan. Untuk konsumsi pribadi lebih fleksibel.' },
    ],
    shipRules: [
      { category: 'Ferry Batam-Singapura', item: 'Barang Elektronik', status: 'conditional', details: 'Banyak barang elektronik dari Batam dibeli turis untuk di-claim duty-free, tapi Bea Cukai Malaysia (JKDM) bisa memeriksa', conditions: 'Sesuai batas duty-free' },
    ],
    customsLimits: [
      { category: 'Barang Belanjaan', limit: 'MYR 500 per orang', details: 'Duty-free allowance. Kelebihan dikenakan bea masuk.' },
      { category: 'Rokok', limit: '200 batang', details: 'Duty-free per orang dewasa.' },
      { category: 'Alkohol', limit: '1 liter', details: 'Untuk penumpang non-Muslim berusia ≥18 tahun.' },
    ],
    quarantineInfo: [
      'Buah-buahan segar: Harus dideklarasikan. Beberapa bisa masuk jika bebas hama.',
      'Hewan peliharaan: Butuh sertifikat kesehatan dan vaksinasi. Bebas karantina jika dari negara bebas rabies.',
    ],
    generalNotes: [
      'Malaysia sangat ketat terhadap narkoba — hukuman mati berlaku',
      'Batik dan kain tradisional: tidak ada batasan impor untuk keperluan pribadi',
    ],
  },
];
