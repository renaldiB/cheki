// Standard item rules used by the fallback rule engine
// Status: allowed | conditional | forbidden
// transport: plane | ship | both

export interface ItemRule {
  keywords: string[];
  status: 'allowed' | 'conditional' | 'forbidden';
  transport: 'plane' | 'ship' | 'both';
  placement?: 'cabin' | 'checkin' | 'either';
  placementWarningIfWrong?: string;
  reasons: string[];
  tips: string[];
  customsNote?: string;
}

export const ITEM_RULES: ItemRule[] = [
  // === BATTERIES & ELECTRONICS ===
  {
    keywords: ['powerbank', 'power bank', 'baterai cadangan', 'portable charger'],
    status: 'conditional',
    transport: 'plane',
    placement: 'cabin',
    placementWarningIfWrong: '⚠️ Powerbank WAJIB di kabin! Dilarang keras di bagasi check-in karena risiko kebakaran.',
    reasons: ['Powerbank/baterai litium wajib dibawa di kabin pesawat (IATA DGR)'],
    tips: ['Maks 100Wh (≈20.000 mAh) boleh tanpa izin', '100–160Wh perlu persetujuan maskapai', '>160Wh DILARANG naik pesawat', 'Tutup terminal dengan plester/selotip untuk keamanan'],
  },
  {
    keywords: ['powerbank', 'power bank'],
    status: 'conditional',
    transport: 'ship',
    placement: 'either',
    reasons: ['Powerbank di kapal lebih fleksibel namun tetap harus dijaga aman'],
    tips: ['Simpan di tas yang mudah diakses', 'Jauhkan dari benda mudah terbakar', 'Jangan charge tanpa pengawasan'],
  },
  {
    keywords: ['laptop', 'notebook', 'komputer'],
    status: 'conditional',
    transport: 'plane',
    placement: 'cabin',
    reasons: ['Laptop mengandung baterai litium, disarankan di kabin'],
    tips: ['Saat pemeriksaan keamanan, keluarkan laptop dari tas', 'Di bagasi check-in boleh jika baterai dilepas'],
  },
  {
    keywords: ['hp', 'handphone', 'smartphone', 'ponsel', 'iphone', 'android', 'telepon'],
    status: 'allowed',
    transport: 'both',
    placement: 'either',
    reasons: ['HP/smartphone diizinkan di pesawat maupun kapal'],
    tips: ['Aktifkan mode pesawat saat penerbangan', 'Jika membeli gadget baru di luar negeri, daftarkan IMEI di Bea Cukai Indonesia'],
    customsNote: 'HP baru dari luar negeri: bebas bea jika harga ≤ USD 500. Jika > USD 500, kena Bea Masuk + PPN + PPh. Daftarkan IMEI di laman beacukai.go.id.',
  },
  {
    keywords: ['drone', 'uav', 'kamera drone'],
    status: 'conditional',
    transport: 'plane',
    placement: 'either',
    reasons: ['Drone diizinkan namun baterai LiPo wajib di kabin'],
    tips: ['Baterai drone harus di kabin (≤100Wh)', 'Beberapa negara memerlukan izin terbang drone (Mesir, China, dll.)'],
    customsNote: 'Di beberapa negara, drone perlu didaftarkan ke otoritas penerbangan sipil setempat sebelum digunakan.',
  },
  {
    keywords: ['charger', 'adaptor', 'travel adapter'],
    status: 'allowed',
    transport: 'both',
    placement: 'either',
    reasons: ['Charger/adaptor boleh dibawa'],
    tips: ['Bawa adaptor universal untuk perjalanan internasional'],
  },
  {
    keywords: ['kamera', 'camera', 'gopro', 'action cam'],
    status: 'allowed',
    transport: 'both',
    placement: 'either',
    reasons: ['Kamera diizinkan'],
    tips: ['Keluarkan kamera dari tas saat pemeriksaan keamanan bandara'],
  },

  // === LIQUIDS & COSMETICS ===
  {
    keywords: ['parfum', 'perfume', 'minyak wangi', 'cologne'],
    status: 'conditional',
    transport: 'plane',
    placement: 'cabin',
    placementWarningIfWrong: '⚠️ Parfum >100ml dilarang di kabin! Pindahkan ke bagasi check-in.',
    reasons: ['Aturan LAGs (Liquids, Aerosols, Gels) berlaku di penerbangan internasional'],
    tips: ['Maks 100ml per wadah di kabin', 'Total semua cairan kabin maks 1 liter dalam ziplock transparan 20x20cm', 'Di bagasi check-in tidak ada batasan khusus (kemasan aman)'],
  },
  {
    keywords: ['sampo', 'shampoo', 'kondisioner', 'sabun cair', 'shower gel', 'body wash'],
    status: 'conditional',
    transport: 'plane',
    placement: 'cabin',
    reasons: ['Cairan harus ≤100ml per botol jika di kabin'],
    tips: ['Gunakan travel size (≤100ml) untuk di kabin', 'Beli travel-size atau gunakan solid bar shampoo untuk kabin'],
  },
  {
    keywords: ['sunscreen', 'tabir surya', 'lotion', 'krim'],
    status: 'conditional',
    transport: 'plane',
    placement: 'cabin',
    reasons: ['Termasuk kategori cairan (LAGs)'],
    tips: ['Maks 100ml jika di kabin', 'Ukuran besar masukkan ke bagasi check-in'],
  },
  {
    keywords: ['deodorant', 'antiperspirant'],
    status: 'conditional',
    transport: 'plane',
    reasons: ['Deodorant roll-on/gel termasuk cairan (≤100ml di kabin)', 'Deodorant solid/stick boleh di kabin tanpa batasan'],
    tips: ['Pilih deodorant stick/solid untuk perjalanan kabin', 'Roll-on maksimal 100ml'],
  },
  {
    keywords: ['air minum', 'air mineral', 'botol minum', 'minuman'],
    status: 'conditional',
    transport: 'plane',
    placement: 'cabin',
    reasons: ['Cairan >100ml dilarang di kabin melewati security check'],
    tips: ['Kosongkan botol minum sebelum masuk security, isi ulang setelah melewati pemeriksaan', 'Atau beli air minum setelah security/di dalam bandara'],
  },

  // === FOOD & AGRICULTURAL PRODUCTS ===
  {
    keywords: ['rendang', 'rendang daging', 'rendang sapi'],
    status: 'conditional',
    transport: 'plane',
    reasons: ['Rendang kering biasanya boleh dibawa', 'Berkuah kental bisa dianggap cairan (>100ml dilarang di kabin)'],
    tips: ['Rendang kering/padat: aman di kabin atau bagasi', 'Rendang berkuah: masukkan bagasi check-in', 'Di Australia: rendang mengandung daging WAJIB dideklarasikan, bisa ditolak tanpa sertifikat veteriner'],
    customsNote: '🇦🇺 Australia: Produk daging wajib deklarasi di formulir karantina. Bisa disita jika tidak memiliki izin impor daging. Denda berat jika tidak lapor.',
  },
  {
    keywords: ['sambal', 'saus cabai', 'saus'],
    status: 'conditional',
    transport: 'plane',
    reasons: ['Termasuk kategori cairan/gel jika konsistensi cair'],
    tips: ['Sambal kemasan pabrik biasanya lebih aman dari sisi karantina', 'Di kabin maks 100ml, sisanya di bagasi check-in'],
    customsNote: 'Beberapa negara memiliki aturan karantina ketat terhadap produk buah/sayuran (termasuk bahan dalam sambal)',
  },
  {
    keywords: ['buah', 'apel', 'jeruk', 'mangga', 'pisang', 'fruit'],
    status: 'conditional',
    transport: 'plane',
    reasons: ['Buah segar bisa kena aturan karantina di negara tujuan'],
    tips: ['Buah segar harus dideklarasikan di formulir karantina setibanya di negara tujuan', 'Australia & Selandia Baru: DILARANG membawa buah segar kecuali ada izin khusus'],
    customsNote: '🇦🇺🇳🇿 Australia & Selandia Baru melarang keras masuknya buah/sayuran segar. Denda bisa mencapai AUD 222+ per pelanggaran.',
  },
  {
    keywords: ['mie instan', 'indomie', 'mie', 'noodle'],
    status: 'allowed',
    transport: 'both',
    reasons: ['Makanan kering/instan umumnya diizinkan'],
    tips: ['Bawa dalam kemasan tersegel', 'Deklarasikan jika diminta di kartu imigrasi negara tujuan'],
  },
  {
    keywords: ['kopi', 'coffee', 'teh', 'tea'],
    status: 'allowed',
    transport: 'both',
    reasons: ['Kopi/teh dalam kemasan kering umumnya diizinkan'],
    tips: ['Bawa dalam kemasan tersegel', 'Kopi dalam bentuk biji atau bubuk umumnya boleh, cek aturan negara tujuan'],
  },
  {
    keywords: ['daging', 'ayam', 'sapi', 'kambing', 'ikan', 'seafood'],
    status: 'conditional',
    transport: 'plane',
    reasons: ['Produk daging/ikan mentah sangat dibatasi antar negara karena aturan karantina hewan'],
    tips: ['Daging beku olahan (kaleng, kemasan pabrik): lebih mudah lolos', 'Daging mentah/segar: umumnya dilarang masuk banyak negara tanpa sertifikat veteriner', 'Selalu deklarasikan di formulir bea cukai/karantina'],
    customsNote: 'Australia, Selandia Baru, Jepang, dan sebagian besar negara Eropa melarang masuknya daging segar/mentah tanpa izin impor khusus.',
  },
  {
    keywords: ['telur', 'egg'],
    status: 'conditional',
    transport: 'plane',
    reasons: ['Telur segar dilarang di banyak negara karena risiko penyakit unggas'],
    tips: ['Produk telur olahan (kemasan tertutup pabrik) lebih aman', 'Selalu deklarasikan'],
  },
  {
    keywords: ['tanaman', 'bibit', 'benih', 'seeds', 'bunga', 'plant'],
    status: 'conditional',
    transport: 'plane',
    reasons: ['Tanaman/benih harus memiliki sertifikat fitokarantina untuk dibawa ke luar negeri'],
    tips: ['Tanaman hias dalam pot umumnya dilarang dibawa ke luar negeri', 'Benih perlu sertifikat kesehatan tanaman dari Karantina Pertanian Indonesia', 'Deklarasikan di formulir karantina negara tujuan'],
  },

  // === SHARP ITEMS ===
  {
    keywords: ['pisau', 'knife', 'belati', 'golok', 'parang'],
    status: 'forbidden',
    transport: 'plane',
    placement: 'checkin',
    placementWarningIfWrong: '🚫 Pisau/senjata tajam DILARANG di kabin! Harus di bagasi check-in atau tidak dibawa.',
    reasons: ['Senjata tajam dilarang di kabin pesawat (standar ICAO/IATA & Kemenhub)'],
    tips: ['Simpan di bagasi check-in dalam wadah tertutup aman', 'Pisau dapur dalam perjalanan harus di bagasi check-in', 'Beberapa jenis pisau mungkin memerlukan izin khusus di negara tujuan'],
  },
  {
    keywords: ['gunting', 'scissors', 'gunting kuku', 'nail clipper', 'nail scissors'],
    status: 'conditional',
    transport: 'plane',
    placement: 'cabin',
    reasons: ['Gunting kuku dan gunting kecil (bilah ≤6cm) umumnya boleh di kabin'],
    tips: ['Gunting kuku: boleh di kabin (Kemenhub/Ditjen Hubud)', 'Gunting dengan bilah >6cm: harus di bagasi check-in', 'Cek aturan maskapai masing-masing'],
  },
  {
    keywords: ['cutter', 'silet', 'razor', 'pisau cukur', 'box cutter'],
    status: 'forbidden',
    transport: 'plane',
    placement: 'checkin',
    placementWarningIfWrong: '🚫 Cutter/silet DILARANG di kabin pesawat!',
    reasons: ['Cutter dan silet dilarang di kabin'],
    tips: ['Simpan di bagasi check-in', 'Razor/shaver elektrik boleh di kabin'],
  },
  {
    keywords: ['pedang', 'sword', 'keris', 'tombak', 'senjata tradisional'],
    status: 'conditional',
    transport: 'plane',
    reasons: ['Senjata tradisional/keris perlu penanganan khusus'],
    tips: ['Harus di bagasi check-in', 'Keris dan senjata tradisional mungkin memerlukan dokumen khusus dari kepolisian atau dinas kebudayaan', 'Koordinasikan dengan maskapai minimal 24 jam sebelum keberangkatan'],
  },

  // === WEAPONS & DANGEROUS GOODS ===
  {
    keywords: ['pistol', 'senjata api', 'airsoft gun', 'peluru', 'ammunition', 'firearm'],
    status: 'conditional',
    transport: 'plane',
    reasons: ['Senjata api harus dideklarasikan dan ditangani dengan prosedur khusus'],
    tips: ['Wajib lapor ke maskapai saat check-in', 'Harus dikunci dalam wadah keras khusus', 'Peluru harus dalam wadah terpisah', 'Memerlukan izin dari otoritas kepolisian/imigrasi negara tujuan'],
  },
  {
    keywords: ['gas', 'elpiji', 'lpg', 'tabung gas', 'tabung oksigen', 'gas kaleng'],
    status: 'forbidden',
    transport: 'both',
    reasons: ['Tabung gas/elpiji dilarang keras di pesawat maupun kapal penumpang karena bahaya kebakaran/ledakan'],
    tips: ['Gas cooking portable (kaleng kecil khusus backpacking seperti MSR/Jetboil): boleh di bagasi check-in pesawat dengan aturan ketat (max 300ml, katup tertutup), DILARANG di kapal', 'Selalu kosongkan tabung gas sepenuhnya sebelum dibawa'],
  },
  {
    keywords: ['korek api', 'lighter', 'matches', 'korek'],
    status: 'conditional',
    transport: 'plane',
    placement: 'cabin',
    reasons: ['Korek api biasa boleh di kabin (1 buah), dilarang di bagasi check-in'],
    tips: ['Korek api biasa (bukan dapur/jet lighter besar): 1 buah di kantong/kabin', 'Korek api biru/jet flame: DILARANG', 'Dilarang di bagasi check-in'],
  },
  {
    keywords: ['bahan peledak', 'dinamit', 'explosive', 'petasan', 'kembang api'],
    status: 'forbidden',
    transport: 'both',
    reasons: ['Bahan peledak/petasan/kembang api dilarang keras di semua moda transportasi penumpang'],
    tips: ['Dilarang tanpa pengecualian'],
  },
  {
    keywords: ['bensin', 'solar', 'minyak', 'bahan bakar', 'fuel', 'gasoline'],
    status: 'forbidden',
    transport: 'both',
    reasons: ['Bahan bakar cair dilarang di pesawat maupun kapal penumpang'],
    tips: ['Kosongkan tanki kendaraan/alat sebelum dikirim sebagai kargo terpisah'],
  },
  {
    keywords: ['cat', 'thinner', 'solvent', 'pelarut'],
    status: 'forbidden',
    transport: 'plane',
    reasons: ['Cat dan pelarut mudah terbakar dilarang di pesawat'],
    tips: ['Kirim sebagai kargo khusus jika diperlukan'],
  },

  // === VAPE & TOBACCO ===
  {
    keywords: ['vape', 'e-cigarette', 'rokok elektrik', 'pod', 'liquid vape', 'vaping'],
    status: 'conditional',
    transport: 'plane',
    placement: 'cabin',
    placementWarningIfWrong: '⚠️ Vape/e-cigarette WAJIB di kabin! Dilarang di bagasi check-in karena baterai litium.',
    reasons: ['Vape mengandung baterai litium, wajib di kabin pesawat', 'Liquid vape termasuk kategori cairan (maks 100ml di kabin)'],
    tips: ['Jangan gunakan atau charge vape di pesawat', 'Liquid vape ≤100ml di kabin, >100ml di bagasi check-in (dalam ziplock)'],
    customsNote: '🇸🇬 Singapura: Vape DILARANG KERAS (denda SGD 2.000+ atau penjara). 🇹🇭 Thailand: Vape dilarang, bisa ditahan. 🇮🇳 India: Dilarang.',
  },
  {
    keywords: ['rokok', 'cigarette', 'cerutu', 'cigar', 'tembakau', 'tobacco'],
    status: 'conditional',
    transport: 'plane',
    reasons: ['Rokok diizinkan dibawa namun ada batasan impor'],
    tips: ['Jangan merokok di pesawat', 'Batas bebas bea cukai Indonesia: 200 batang rokok/25 cerutu/100g tembakau', 'Di Australia: maks 25 batang rokok atau 25g tembakau bebas bea'],
    customsNote: 'Batas impor rokok bervariasi per negara. Indonesia: 200 batang bebas bea. Kelebihan dikenakan cukai rokok.',
  },

  // === MEDICATIONS ===
  {
    keywords: ['obat', 'medicine', 'obat-obatan', 'suplemen', 'vitamin', 'pill', 'tablet'],
    status: 'conditional',
    transport: 'both',
    reasons: ['Obat-obatan personal umumnya boleh dibawa'],
    tips: ['Bawa dalam kemasan asli dengan label jelas', 'Bawa resep dokter untuk obat-obatan keras/narkotika', 'Beberapa obat (kodein, morfin, benzodiazepine) memerlukan izin khusus di negara tertentu'],
    customsNote: 'Selalu bawa resep dokter dalam bahasa Inggris untuk obat-obatan keras. Beberapa negara (UAE, Qatar, Jepang) melarang obat tertentu yang bebas di Indonesia.',
  },
  {
    keywords: ['insulin', 'syringe', 'jarum suntik', 'alat suntik'],
    status: 'conditional',
    transport: 'both',
    reasons: ['Insulin dan alat suntik boleh dibawa jika untuk keperluan medis'],
    tips: ['Bawa surat keterangan dokter', 'Simpan insulin di tas kabin (suhu stabil)', 'Jarum suntik harus dikemas aman dalam wadah khusus'],
  },

  // === SHIP-SPECIFIC ===
  {
    keywords: ['durian'],
    status: 'forbidden',
    transport: 'ship',
    reasons: ['Durian dilarang dibawa di kapal karena bau menyengat yang dapat mengganggu penumpang lain'],
    tips: ['Kirim sebagai kargo terpisah dengan kemasan tertutup rapat', 'Beberapa operator ferry mengizinkan jika dikemas sangat rapat, cek kebijakan masing-masing operator'],
  },
  {
    keywords: ['sepeda motor', 'motor', 'kendaraan bermotor'],
    status: 'conditional',
    transport: 'ship',
    reasons: ['Kendaraan bermotor bisa dibawa di kapal Ro-Ro atau kapal penumpang tertentu'],
    tips: ['Tanki bahan bakar harus dikosongkan atau sangat minim', 'Koordinasikan dengan operator kapal saat pembelian tiket', 'Ada biaya tambahan untuk kendaraan'],
  },
  {
    keywords: ['beras', 'rice'],
    status: 'allowed',
    transport: 'ship',
    reasons: ['Beras/bahan pokok umum boleh dibawa di kapal'],
    tips: ['Perhatikan batas berat bagasi kapal (biasanya 40 kg gratis di Pelni)', 'Kemas dengan rapi agar tidak bocor'],
  },
  {
    keywords: ['hewan', 'anjing', 'kucing', 'pet', 'binatang peliharaan'],
    status: 'conditional',
    transport: 'both',
    reasons: ['Hewan peliharaan memerlukan dokumen khusus'],
    tips: ['Butuh sertifikat kesehatan hewan dari dokter hewan berwenang', 'Sertifikat vaksinasi rabies (harus berlaku)', 'Kapal Pelni: umumnya tidak mengizinkan hewan di kabin penumpang', 'Pesawat: bisa di kabin (ukuran kecil, maskapai tertentu) atau sebagai kargo'],
    customsNote: 'Untuk hewan ke luar negeri, butuh Health Certificate dan izin karantina dari negara tujuan.',
  },

  // === MISC ITEMS ===
  {
    keywords: ['hair dryer', 'pengering rambut', 'hair straightener', 'catok'],
    status: 'allowed',
    transport: 'plane',
    placement: 'either',
    reasons: ['Hair dryer dan alat perawatan rambut boleh dibawa'],
    tips: ['Cek kompatibilitas voltase (Indonesia 220V)', 'Bawa adaptor universal untuk perjalanan internasional'],
  },
  {
    keywords: ['setrika', 'iron', 'travel iron'],
    status: 'allowed',
    transport: 'plane',
    placement: 'checkin',
    reasons: ['Setrika boleh dibawa namun lebih aman di bagasi check-in'],
    tips: ['Setrika perjalanan mini biasanya boleh di kabin', 'Pastikan kondisi dingin saat dikemas'],
  },
  {
    keywords: ['uang', 'cash', 'uang tunai', 'dollar', 'euro', 'rupiah'],
    status: 'conditional',
    transport: 'plane',
    reasons: ['Membawa uang tunai dalam jumlah besar harus dilaporkan'],
    tips: ['Uang tunai ≥ Rp 100 juta atau setara valas asing wajib lapor Bea Cukai Indonesia', 'Di luar negeri: umumnya USD 10.000 atau lebih wajib dideklarasikan', 'Gunakan kartu debit/kredit internasional untuk mengurangi risiko'],
    customsNote: 'Wajib isi formulir deklarasi jika membawa uang tunai ≥ Rp 100.000.000 atau setara USD 10.000.',
  },
  {
    keywords: ['power strip', 'stop kontak', 'extension cord', 'kabel ekstensi'],
    status: 'conditional',
    transport: 'plane',
    reasons: ['Power strip berpotensi menyebabkan beban listrik berlebih di pesawat'],
    tips: ['Power strip tanpa surge protector umumnya boleh di bagasi check-in', 'Beberapa maskapai melarang di kabin', 'Cek kebijakan maskapai Anda'],
  },
  {
    keywords: ['tripod', 'monopod', 'gorilla pod'],
    status: 'conditional',
    transport: 'plane',
    reasons: ['Tripod diizinkan namun perlu perhatian ukuran'],
    tips: ['Tripod kecil/travel: umumnya boleh di kabin', 'Tripod panjang: harus di bagasi check-in', 'Petugas keamanan berhak menolak jika dianggap bisa dijadikan senjata'],
  },
];
