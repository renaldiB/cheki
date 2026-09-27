import { CountryRegulation } from '@/types/regulation';

export const COUNTRY_REGULATIONS: CountryRegulation[] = [
  {
    "countryCode": "ID",
    "countryName": "Indonesia",
    "flag": "🇮🇩",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di kabin. Maks 100Wh tanpa izin, 100–160Wh perlu izin maskapai, >160Wh dilarang.",
        "conditions": "Di kabin pesawat saja"
      },
      {
        "category": "Cairan",
        "item": "Cairan/Gel/Aerosol (LAGs)",
        "status": "conditional",
        "details": "Penerbangan internasional: ≤100ml per wadah, total ≤1L dalam ziplock transparan. Domestik: aturan maskapai masing-masing.",
        "conditions": "Penerbangan internasional"
      },
      {
        "category": "Senjata",
        "item": "Senjata Tajam (Pisau, Gunting >6cm)",
        "status": "forbidden",
        "details": "Dilarang di kabin. Boleh di bagasi check-in dengan kemasan aman.",
        "conditions": "Bagasi check-in"
      },
      {
        "category": "Vape",
        "item": "Vape / E-cigarette",
        "status": "conditional",
        "details": "Wajib di kabin (baterai litium). Liquid ≤100ml di kabin.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Barang Berbahaya",
        "item": "Gas/Bahan Mudah Terbakar",
        "status": "forbidden",
        "details": "Dilarang tanpa pengecualian."
      }
    ],
    "shipRules": [
      {
        "category": "Berat Bagasi",
        "item": "Bagasi Cuma-Cuma Pelni",
        "status": "conditional",
        "details": "Pelni: 40 kg per tiket dewasa, 30 kg anak-anak. Kelebihan dikenakan biaya."
      },
      {
        "category": "Barang Berbahaya",
        "item": "Gas/Elpiji/Bahan Bakar",
        "status": "forbidden",
        "details": "Dilarang keras di kapal penumpang. Risiko kebakaran."
      },
      {
        "category": "Makanan",
        "item": "Durian",
        "status": "forbidden",
        "details": "Dilarang di kabin penumpang karena bau. Bisa dikirim sebagai kargo tersegel."
      },
      {
        "category": "Kendaraan",
        "item": "Kendaraan Bermotor",
        "status": "conditional",
        "details": "Boleh di kapal Ro-Ro. Tanki harus dikosongkan atau minim (< 1/4 tangki).",
        "conditions": "Kapal Ro-Ro, tanki minim bahan bakar"
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "FOB USD 500 per orang",
        "details": "Pembebasan bea masuk barang bawaan penumpang. Kelebihan dikenakan Bea Masuk + PPN + PPh."
      },
      {
        "category": "Rokok",
        "limit": "200 batang / 25 cerutu / 100g tembakau",
        "details": "Per orang dewasa. Kelebihan dimusnahkan atau dikenakan cukai."
      },
      {
        "category": "Alkohol",
        "limit": "Maks 1 liter per orang dewasa",
        "details": "Hanya untuk usia ≥21 tahun. Kelebihan dimusnahkan di bandara."
      },
      {
        "category": "Uang Tunai",
        "limit": "≥ Rp 100 juta atau setara valas",
        "details": "Wajib lapor ke Bea Cukai dan Bank Indonesia (PPATK)."
      },
      {
        "category": "Gadget / IMEI",
        "limit": "USD 500 bebas bea",
        "details": "HP/tablet/laptop baru dari LN: bebas bea jika ≤ USD 500. Daftarkan IMEI di beacukai.go.id sebelum keberangkatan atau setibanya."
      }
    ],
    "quarantineInfo": [
      "Hewan peliharaan: wajib sertifikat kesehatan dari dokter hewan dan sertifikat vaksinasi rabies",
      "Tanaman/bibit: wajib Sertifikat Kesehatan Tanaman (Phytosanitary Certificate) dari Karantina Pertanian",
      "Produk daging/ikan: harus dari sumber legal dan bersertifikat. Deklarasikan ke Karantina Hewan di bandara"
    ],
    "generalNotes": [
      "Isi Electronic Customs Declaration (e-CD) di aplikasi Bea Cukai atau website beacukai.go.id sebelum tiba",
      "Barang untuk keperluan pribadi dengan kondisi wajar tidak dikenakan bea masuk",
      "Barang kiriman/oleh-oleh: jika terlihat seperti barang dagangan, bisa dikenakan bea masuk meski di bawah USD 500"
    ]
  },
  {
    "countryCode": "MY",
    "countryName": "Malaysia",
    "flag": "🇲🇾",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Narkotika",
        "item": "Narkoba & Zat Psikotropika",
        "status": "forbidden",
        "details": "Hukuman MATI berlaku untuk penyelundupan narkoba di Malaysia di bawah Dangerous Drugs Act."
      },
      {
        "category": "Vape",
        "item": "Vape / E-cigarette",
        "status": "conditional",
        "details": "Boleh dibawa di kabin untuk penggunaan pribadi. Liquid nikotin harus memenuhi aturan maskapai (maks 100ml).",
        "conditions": "Di kabin pesawat"
      },
      {
        "category": "Baterai",
        "item": "Powerbank / Baterai Litium",
        "status": "conditional",
        "details": "Wajib di bagasi kabin. Maksimal 100Wh (standar Malaysia Airlines/AirAsia).",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Makanan",
        "item": "Produk Halal & Daging",
        "status": "conditional",
        "details": "Makanan olahan pabrik berlabel halal diizinkan. Daging segar memerlukan sertifikat karantina MAQIS."
      }
    ],
    "shipRules": [
      {
        "category": "Ferry Batam-Johor/Melaka",
        "item": "Barang Elektronik & Belanjaan",
        "status": "conditional",
        "details": "Pemeriksaan ketat oleh Jabatan Kastam Diraja Malaysia (JKDM) di pelabuhan Stulang Laut dan Pasir Gudang.",
        "conditions": "Sesuai batas duty-free"
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "MYR 500 per orang",
        "details": "Pembebasan bea masuk untuk barang keperluan pribadi dan cinderamata."
      },
      {
        "category": "Rokok",
        "limit": "200 batang / 50 cerutu / 225g tembakau",
        "details": "Untuk penumpang berusia 18 tahun ke atas yang tinggal di luar negeri lebih dari 72 jam."
      },
      {
        "category": "Alkohol",
        "limit": "1 liter minuman beralkohol",
        "details": "Khusus untuk penumpang non-Muslim berusia 21 tahun ke atas (tinggal > 72 jam)."
      },
      {
        "category": "Uang Tunai",
        "limit": "USD 10.000 atau setara",
        "details": "Membawa uang tunai atau instrumen pembayaran senilai USD 10.000 ke atas wajib diisi di Customs Form 22."
      }
    ],
    "quarantineInfo": [
      "Pemeriksaan karantina pertanian dilakukan oleh MAQIS (Malaysian Quarantine and Inspection Services)",
      "Tanaman hidup, tanah, dan bibit dilarang tanpa izin impor MAQIS",
      "Hewan peliharaan: wajib memiliki microchip ISO dan sertifikat vaksinasi rabies"
    ],
    "generalNotes": [
      "Bebas visa kunjungan bagi WNI hingga 30 hari untuk tujuan wisata",
      "Wajib mengisi Malaysia Digital Arrival Card (MDAC) secara online dalam kurun waktu 3 hari sebelum kedatangan",
      "Paspor harus memiliki masa berlaku minimal 6 bulan dari tanggal ketibaan"
    ]
  },
  {
    "countryCode": "SA",
    "countryName": "Arab Saudi",
    "flag": "🇸🇦",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Alkohol",
        "item": "Minuman Beralkohol",
        "status": "forbidden",
        "details": "DILARANG KERAS TANPA PENGECUALIAN. Hukum syariah berlaku ketat dengan ancaman penjara, denda besar, dan deportasi."
      },
      {
        "category": "Makanan",
        "item": "Daging Babi & Produk Mengandung Babi",
        "status": "forbidden",
        "details": "Dilarang keras masuk wilayah Kerajaan Arab Saudi."
      },
      {
        "category": "Media",
        "item": "Konten Pornografi & Simbol Berhala",
        "status": "forbidden",
        "details": "Materi pornografi, judi, atau publikasi yang bertentangan dengan ajaran Islam disita dan diproses hukum."
      },
      {
        "category": "Air Zamzam",
        "item": "Air Zamzam",
        "status": "conditional",
        "details": "Jemaah haji/umrah hanya boleh membawa 5 liter air zamzam resmi dalam kemasan pabrik khusus proyek Raja Abdullah bin Abdulaziz melalui maskapai.",
        "conditions": "Kemasan resmi bandara/maskapai"
      },
      {
        "category": "Obat",
        "item": "Obat-obatan Khusus / Tramadol",
        "status": "conditional",
        "details": "Obat penenang, pereda nyeri turunan opioid, dan tramadol dilarang keras tanpa resep dokter spesialis resmi berbahasa Arab/Inggris.",
        "conditions": "Resep dokter resmi"
      },
      {
        "category": "Drone",
        "item": "Drone Kamera",
        "status": "forbidden",
        "details": "Dilarang masuk tanpa izin resmi General Authority of Civil Aviation (GACA) Arab Saudi."
      }
    ],
    "shipRules": [
      {
        "category": "Jeddah Islamic Port",
        "item": "Pemeriksaan Syariat",
        "status": "forbidden",
        "details": "Pemeriksaan ketat terhadap alkohol, babi, dan obat terlarang di pelabuhan laut Jeddah."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "SAR 3.000 per orang",
        "details": "Pembebasan bea masuk untuk barang bawaan pribadi dan hadiah."
      },
      {
        "category": "Rokok",
        "limit": "200 batang rokok / 500g tembakau",
        "details": "Maksimal 200 batang rokok (1 slof) untuk konsumsi pribadi (usia ≥18 tahun)."
      },
      {
        "category": "Uang Tunai & Logam Mulia",
        "limit": "SAR 60.000 atau setara valas",
        "details": "Wajib dilaporkan ke Zakat, Tax and Customs Authority (ZATCA) jika membawa uang atau emas perhiasan bernilai SAR 60.000 ke atas (~USD 16.000)."
      }
    ],
    "quarantineInfo": [
      "Wajib membawa sertifikat vaksinasi meningitis meningokokus bagi jemaah haji dan umrah",
      "Makanan kemasan yang dibawa wajib bersertifikasi halal dan tidak kadaluwarsa",
      "Hewan peliharaan dilarang kecuali izin khusus anjing pemandu atau kucing dengan izin impor MEWA"
    ],
    "generalNotes": [
      "WNI memerlukan Visa Umrah, Visa Ziarah Wisata, atau Visa Haji melalui aplikasi Nusuk/KSA Visa",
      "Patuhi norma kesopanan berpakaian publik (Public Decorum Charter) selama berada di Tanah Suci",
      "Pengambilan foto di area dalam Masjidil Haram dan Masjid Nabawi dibatasi untuk gadget pribadi, dilarang kamera tripod profesional tanpa izin"
    ]
  },
  {
    "countryCode": "SG",
    "countryName": "Singapura",
    "flag": "🇸🇬",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Vape",
        "item": "Vape / E-cigarette / Pods",
        "status": "forbidden",
        "details": "DILARANG KERAS SECARA MUTLAK. Kepemilikan vape didenda hingga SGD 2.000, impor ilegal didenda hingga SGD 10.000 atau penjara 6 bulan."
      },
      {
        "category": "Rokok",
        "item": "Rokok Tanpa Cukai Singapura",
        "status": "forbidden",
        "details": "Semua batang rokok yang masuk Singapura wajib berlabel SDPC (Singapore Duty-Paid Cigarette). Tidak ada kuota rokok bebas bea sama sekali!"
      },
      {
        "category": "Narkotika",
        "item": "Narkoba / Cannabis / Psikotropika",
        "status": "forbidden",
        "details": "Hukuman MATI berlaku untuk penyelundupan narkoba di atas ambang batas (Zero Tolerance Policy)."
      },
      {
        "category": "Makanan",
        "item": "Permen Karet (Chewing Gum)",
        "status": "conditional",
        "details": "Penjualan dilarang. Hanya permen karet medis/dental dengan resep dokter yang diizinkan dalam jumlah kecil."
      },
      {
        "category": "Baterai",
        "item": "Powerbank Litium",
        "status": "conditional",
        "details": "Wajib di bagasi kabin (maks 100Wh). Dilarang di bagasi tercatat (check-in).",
        "conditions": "Di kabin pesawat"
      }
    ],
    "shipRules": [
      {
        "category": "Ferry Harbourfront & Tanah Merah",
        "item": "Pemeriksaan Bea Cukai Batam-Singapura",
        "status": "forbidden",
        "details": "Pemeriksaan x-ray menyeluruh untuk rokok tanpa cukai, vape, dan barang dagangan selundupan."
      }
    ],
    "customsLimits": [
      {
        "category": "Rokok",
        "limit": "0 batang duty-free",
        "details": "TIDAK ADA PEMBEBASAN CUKAI ROKOK. Membawa bahkan 1 bungkus rokok wajib lapor di Jalur Merah dan membayar bea & GST."
      },
      {
        "category": "Alkohol",
        "limit": "1 liter wine + 1 liter bir + 1 liter spirits",
        "details": "Hanya untuk penumpang berusia ≥18 tahun yang menghabiskan waktu minimal 48 jam di luar Singapura (tidak berlaku jika tiba dari Malaysia)."
      },
      {
        "category": "Barang Belanjaan (GST Relief)",
        "limit": "SGD 500 (perjalanan ≥48 jam) / SGD 100 (<48 jam)",
        "details": "Pembebasan Goods and Services Tax (GST 9%) untuk barang bawaan pribadi."
      },
      {
        "category": "Uang Tunai",
        "limit": "SGD 20.000 atau setara valas",
        "details": "Wajib mengisi formulir NP727 (Cross-Border Cash Declaration) jika membawa tunai SGD 20.000 ke atas."
      }
    ],
    "quarantineInfo": [
      "Singapore Food Agency (SFA) melarang membawa daging segar (sapi, babi, unggas) dari Indonesia tanpa izin",
      "Makanan laut olahan (ikan, udang beku) diizinkan maksimal 5 kg per orang",
      "Hewan peliharaan: wajib izin impor AVS dan karantina ketat (Indonesia masuk rabies risk group)"
    ],
    "generalNotes": [
      "Bebas visa kunjungan bagi pemegang paspor Indonesia hingga 30 hari",
      "Wajib mengisi Singapore Electronic Arrival Card (SG Arrival Card) beserta Electronic Health Declaration dalam 3 hari sebelum tiba",
      "Dilarang membawa senjata mainan berbentuk pistol atau senjata tajam replika tanpa izin kepolisian Singapura"
    ]
  },
  {
    "countryCode": "TH",
    "countryName": "Thailand",
    "flag": "🇹🇭",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Vape",
        "item": "Vape / E-Cigarette / Pods / Shisha Elektrik",
        "status": "forbidden",
        "details": "DILARANG TOTAL SEJAK 2014. Membawa, mengisap, atau menyimpan vape diancam denda hingga THB 30.000 atau hukuman penjara hingga 10 tahun."
      },
      {
        "category": "Narkotika & Ganja",
        "item": "Ganja / Ekstrak Cannabis Lintas Batas",
        "status": "forbidden",
        "details": "MESKIPUN ganja memiliki regulasi domestik terbatas di Thailand, membawa ganja MASUK atau KELUAR perbatasan internasional adalah TINDAK PIDANA BERAT."
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di kabin pesawat (maks 100Wh / 20.000mAh bebas, 100-160Wh maks 2 unit dengan izin maskapai, >160Wh dilarang keras).",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Makanan",
        "item": "Produk Babi Olahan",
        "status": "forbidden",
        "details": "Dilarang membawa daging babi segar maupun olahan untuk pencegahan Demam Babi Afrika (ASF)."
      }
    ],
    "shipRules": [
      {
        "category": "Pelabuhan Phuket & Samui",
        "item": "Pemeriksaan Barang Duty-Free",
        "status": "conditional",
        "details": "Pemeriksaan ketat kepabeanan Thailand terhadap batas kuota rokok dan minuman keras di pintu masuk laut."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "THB 20.000 per orang",
        "details": "Pembebasan bea masuk untuk barang keperluan pribadi dan oleh-oleh senilai s/d THB 20.000 (~USD 550)."
      },
      {
        "category": "Rokok",
        "limit": "200 batang rokok (1 slof) / 250g tembakau",
        "details": "Dilarang membawa rokok melebihi batas atas nama rombongan. Membawa >200 batang didenda hingga puluhan ribu Baht dan disita."
      },
      {
        "category": "Alkohol",
        "limit": "Maksimal 1 liter",
        "details": "Untuk penumpang berusia 20 tahun ke atas. Kelebihan kuota akan disita dan dikenakan denda cukai."
      },
      {
        "category": "Uang Tunai",
        "limit": "USD 15.000 atau setara / THB 50.000",
        "details": "Membawa uang tunai valas setara USD 15.000 ke atas wajib dideklarasikan ke Thai Customs."
      }
    ],
    "quarantineInfo": [
      "Dilarang membawa buah segar (termasuk mangga, durian mentah) tanpa sertifikat fitosanitari Departemen Pertanian",
      "Dilarang membawa daging segar dan olahan tanpa izin dari Department of Livestock Development",
      "Hewan peliharaan: wajib microchip ISO 11784/11785 dan sertifikat vaksin rabies minimal 21 hari sebelum terbang"
    ],
    "generalNotes": [
      "WNI menikmati fasilitas BEBAS VISA KUNJUNGAN hingga 60 hari untuk keperluan pariwisata",
      "Pastikan memiliki bukti tiket penerbangan kepulangan dan dana yang cukup (minimal THB 10.000/orang atau THB 20.000/keluarga jika sewaktu-waktu diperiksa petugas imigrasi)",
      "Jangan pernah membawa pulang snack atau makanan kemasan Thailand yang berlogo daun ganja ke Indonesia!"
    ]
  },
  {
    "countryCode": "JP",
    "countryName": "Jepang",
    "flag": "🇯🇵",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Obat",
        "item": "Obat Flu / Alergi Tertentu (Pseudoephedrine & Codeine)",
        "status": "forbidden",
        "details": "Jepang melarang keras obat flu yang mengandung pseudoephedrine >10% atau kodein tanpa izin Yakkan Shoumei (Kemenkes Jepang)."
      },
      {
        "category": "Makanan",
        "item": "Daging Segar & Daging Olahan (Abon/Rendang)",
        "status": "forbidden",
        "details": "DILARANG KERAS TANPA SERTIFIKAT. Hewan ternak dari Indonesia dilarang masuk untuk mencegah PMK (Penyakit Mulut dan Kuku). Anjing pelacak pabean bertugas di Narita & Haneda."
      },
      {
        "category": "Baterai",
        "item": "Powerbank & Catokan Rambut Baterai",
        "status": "conditional",
        "details": "Powerbank wajib di kabin (maks 100Wh bebas). PERHATIAN: Catokan rambut tanpa kabel baterai tanam (cordless hair straightener) DILARANG di kabin maupun bagasi check-in kecuali baterai bisa dilepas.",
        "conditions": "Di kabin pesawat"
      },
      {
        "category": "Vape",
        "item": "Vape Nikotin",
        "status": "conditional",
        "details": "Liquid nikotin dibatasi maksimal 120ml untuk konsumsi pribadi (diklasifikasikan sebagai produk farmasi di Jepang).",
        "conditions": "Maksimal 120ml di kabin"
      },
      {
        "category": "Senjata & Replika",
        "item": "Pedang Samurai / Replika Airsoft",
        "status": "forbidden",
        "details": "Dilarang masuk di bawah Swords and Firearms Control Act Jepang."
      }
    ],
    "shipRules": [
      {
        "category": "Kapal Pesiar Yokohama & Kobe",
        "item": "Pemeriksaan Imigrasi & Bea Cukai Jepang",
        "status": "conditional",
        "details": "Semua bagasi kapal pesiar internasional dipindai dengan x-ray dan pemeriksaan anjing pelacak karantina makanan."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "JPY 200.000 per orang",
        "details": "Pembebasan bea masuk untuk barang belanjaan senilai s/d JPY 200.000 (~USD 1.350). Barang satuan di bawah JPY 10.000 bebas bea otomatis."
      },
      {
        "category": "Rokok",
        "limit": "200 batang rokok / 50 cerutu / 250g tembakau",
        "details": "Khusus untuk penumpang berusia 20 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "3 botol (maks 760ml per botol, total ~2.28 liter)",
        "details": "Untuk penumpang berusia 20 tahun ke atas."
      },
      {
        "category": "Parfum",
        "limit": "2 ons (sekitar 56-60 ml)",
        "details": "Parfum konsentrat bebas bea hingga 2 fl. oz (eau de cologne/toilette tidak dihitung limit ini)."
      },
      {
        "category": "Uang Tunai",
        "limit": "JPY 1.000.000 atau setara valas",
        "details": "Deklarasi wajib jika membawa uang tunai atau cek senilai JPY 1 juta ke atas."
      }
    ],
    "quarantineInfo": [
      "Pemeriksaan Karantina Hewan (Animal Quarantine Service - AQS) sangat ketat terhadap daging sapi, ayam, dan babi",
      "Buah segar dari Indonesia (seperti mangga, pepaya) dilarang masuk untuk mencegah lalat buah oriental",
      "Hewan peliharaan: memerlukan masa persiapan hingga 180 hari (microchip, 2x vaksin rabies, tes titer antibodi darah)"
    ],
    "generalNotes": [
      "WNI pemegang e-Paspor (paspor elektronik) dapat mengajukan Bebas Visa Elektronik (Visa Waiver) selama 15 hari via sistem JAVES secara gratis",
      "Pemegang paspor biasa (non-elektronik) wajib mengajukan Visa Kunjungan Jepang melalui JVAC / Kedutaan",
      "Isi Visit Japan Web (VJW) untuk registrasi imigrasi dan QR code Bea Cukai sebelum tiba di bandara Jepang"
    ]
  },
  {
    "countryCode": "KR",
    "countryName": "Korea Selatan",
    "flag": "🇰🇷",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Makanan",
        "item": "Daging Babi, Sosis, Dendeng, Abon & Kornet",
        "status": "forbidden",
        "details": "DILARANG KERAS SECARA MUTLAK. Ancaman denda hingga KRW 5.000.000 (pelanggaran pertama) s/d KRW 10.000.000 (sekitar Rp 60-120 juta) untuk pencegahan Flu Babi Afrika (ASF)."
      },
      {
        "category": "Vape",
        "item": "Vape / Rokok Elektrik",
        "status": "conditional",
        "details": "Maksimal 20ml liquid dengan kadar nikotin <1%. Wajib di bagasi kabin karena baterai litium. Kadar nikotin >1% dianggap zat beracun dan disita.",
        "conditions": "Di kabin pesawat"
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di kabin pesawat (maks 100Wh bebas, 100-160Wh maks 2 unit dengan izin Korean Air/Asiana). Dilarang di bagasi check-in.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Narkotika & Psikotropika",
        "item": "Obat Terlarang & Ganja",
        "status": "forbidden",
        "details": "Korea Selatan menerapkan zero-tolerance. Membawa produk ganja/CBD diancam hukuman penjara berat hingga deportasi."
      }
    ],
    "shipRules": [
      {
        "category": "Port of Busan / Incheon Ferry",
        "item": "Karantina Pertanian Jalur Laut",
        "status": "forbidden",
        "details": "Anjing pelacak karantina hewan (Quarantine Detector Dogs) memeriksa setiap penumpang feri dari Jepang atau Tiongkok."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "USD 800 per orang",
        "details": "Pembebasan bea masuk (Basic Duty-Free Allowance) untuk barang bawaan pribadi dan belanjaan."
      },
      {
        "category": "Alkohol",
        "limit": "2 botol (total volume maks 2 liter, nilai maks USD 400)",
        "details": "Khusus untuk penumpang berusia 19 tahun ke atas."
      },
      {
        "category": "Rokok",
        "limit": "200 batang rokok (1 karton) / 50 cerutu / 20ml e-liquid",
        "details": "Bebas bea untuk penumpang berusia 19 tahun ke atas."
      },
      {
        "category": "Parfum",
        "limit": "Maksimal 100 ml",
        "details": "Bebas bea untuk parfum konsentrat berukuran hingga 100ml."
      },
      {
        "category": "Uang Tunai",
        "limit": "USD 10.000 atau setara valas",
        "details": "Membawa uang tunai atau instrumen keuangan senilai USD 10.000 ke atas wajib dideklarasikan ke Korea Customs Service."
      }
    ],
    "quarantineInfo": [
      "Wajib mengisi deklarasi karantina kesehatan Q-CODE secara online atau formulir kuning di pesawat",
      "Semua produk hewani, buah segar (apel, mangga), biji-bijian, dan tanaman berakar WAJIB dilaporkan ke APQA di bandara Incheon",
      "Hewan peliharaan: wajib microchip ISO dan sertifikat tes antibodi rabies (titer RNIT minimal 0.5 IU/ml)"
    ],
    "generalNotes": [
      "WNI memerlukan Visa Korea Selatan (diajukan melalui Korea Visa Application Center - KVAC di Jakarta/Bali) atau K-ETA jika memenuhi skema bebas visa sementara",
      "Belanja kosmetik & fashion: manfaatkan fasilitas Immediate Tax Refund (potongan langsung PPN di kasir dengan scan paspor di toko berlogo Tax Free)",
      "Unduh aplikasi navigasi lokal seperti Naver Map atau KakaoMap karena Google Maps memiliki fitur rute jalan kaki terbatas di Korea Selatan"
    ]
  },
  {
    "countryCode": "CN",
    "countryName": "China",
    "flag": "🇨🇳",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Baterai",
        "item": "Powerbank (Aturan Ketat CAAC)",
        "status": "conditional",
        "details": "WAJIB BERLABEL JELAS & TERTULIS KAPASITAS Wh. Powerbank tanpa label atau tulisan pudar LANGSUNG DISITA oleh security bandara. Maks 100Wh di kabin (100-160Wh izin maskapai, >160Wh dilarang). Dilarang dipakai mengecas saat terbang.",
        "conditions": "Wajib ada label kapasitas di kabin"
      },
      {
        "category": "Korek Api",
        "item": "Korek Api & Pemantik Gas (Lighter)",
        "status": "forbidden",
        "details": "CAAC MELARANG TOTAL KOREK API dalam bentuk apa pun, baik di kabin maupun di bagasi check-in. Harus dibuang di security checkpoint."
      },
      {
        "category": "Makanan",
        "item": "Daging Segar, Masakan Daging, & Buah Segar",
        "status": "forbidden",
        "details": "Dilarang membawa daging sapi, unggas, babi, dendeng, dan buah segar untuk pencegahan penyakit tanaman dan karantina hayati."
      },
      {
        "category": "Drone",
        "item": "Drone / UAV Kamera",
        "status": "conditional",
        "details": "Drone > 250 gram wajib didaftarkan di sistem online CAAC Tiongkok. Terbang tanpa izin di kota besar dapat berujung penahanan.",
        "conditions": "Wajib registrasi CAAC"
      }
    ],
    "shipRules": [
      {
        "category": "Pelabuhan Shanghai & Shenzhen",
        "item": "Pemeriksaan X-Ray Pabean Jalur Laut",
        "status": "conditional",
        "details": "China Customs menerapkan pemeriksaan bagasi x-ray 100% pada kedatangan kapal feri Hong Kong/Makau dan kapal pesiar."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "RMB 2.000 per orang (~USD 280)",
        "details": "Pembebasan bea masuk bagi wisatawan asing non-residen untuk barang yang akan ditinggalkan/dihadiahkan di Tiongkok."
      },
      {
        "category": "Rokok",
        "limit": "400 batang rokok / 100 cerutu / 500g tembakau",
        "details": "Bebas bea untuk penumpang berusia 18 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "1.500 ml minuman beralkohol (>12% ABV)",
        "details": "Sekitar 2 botol ukuran 750ml untuk konsumsi pribadi penumpang dewasa."
      },
      {
        "category": "Uang Tunai",
        "limit": "RMB 20.000 atau valas setara USD 5.000",
        "details": "Membawa uang tunai RMB > 20.000 atau valas > USD 5.000 wajib lapor ke China Customs."
      }
    ],
    "quarantineInfo": [
      "Entry-Exit Inspection and Quarantine Tiongkok melarang sarang burung walet mentah, tanah, bibit tanaman, dan produk susu hewani segar",
      "Hewan peliharaan: maksimal 1 anjing atau kucing per penumpang, wajib microchip dan sertifikat vaksinasi rabies resmi"
    ],
    "generalNotes": [
      "WNI memerlukan Visa China (diajukan melalui Chinese Visa Application Service Center) atau fasilitas bebas visa transit 144 jam / 24 jam jika memiliki tiket lanjutan ke negara ketiga",
      "Sangat disarankan menginstal aplikasi Alipay atau WeChat Pay dan menautkan kartu debit/kredit internasional Visa/Mastercard sebelum berangkat (transaksi di China hampir 100% cashless)",
      "Gunakan eSIM roaming internasional atau VPN legal jika ingin mengakses layanan Google, WhatsApp, dan Instagram selama di Tiongkok Daratan"
    ]
  },
  {
    "countryCode": "AE",
    "countryName": "Uni Emirat Arab",
    "flag": "🇦🇪",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Obat",
        "item": "Obat Terlarang, Narkotika & Psikotropika",
        "status": "forbidden",
        "details": "DILARANG KERAS TANPA IZIN MOHAP. Obat batuk/flu mengandung kodein, tramadol, obat penenang valium/xanax wajib surat izin elektronik dari Kementerian Kesehatan UEA (MOHAP). Hukuman penjara berat untuk pelanggaran."
      },
      {
        "category": "Drone",
        "item": "Drone Kamera",
        "status": "forbidden",
        "details": "Dilarang membawa drone ke UEA tanpa izin resmi General Civil Aviation Authority (GCAA). Drone tanpa izin akan disita di bandara Dubai (DXB) / Abu Dhabi (AUH)."
      },
      {
        "category": "Vape",
        "item": "Vape / E-Cigarette",
        "status": "conditional",
        "details": "Boleh dibawa di bagasi kabin untuk pemakaian pribadi (maks 100ml liquid). Dilarang mengisap vape di dalam gedung bandara dan tempat umum.",
        "conditions": "Di kabin pesawat"
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin sesuai aturan Emirates/Etihad (maks 100Wh). Dilarang di bagasi tercatat.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Media",
        "item": "Materi Pornografi & Perjudian",
        "status": "forbidden",
        "details": "Dilarang keras membawa majalah, video, atau alat judi."
      }
    ],
    "shipRules": [
      {
        "category": "Cruise Terminal Dubai (Port Rashid)",
        "item": "Pemeriksaan Bea Cukai Pelabuhan Pesiar",
        "status": "conditional",
        "details": "Pemeriksaan bagasi ketat terhadap obat terlarang dan senjata api replika di terminal kapal pesiar Teluk Arab."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan / Hadiah",
        "limit": "AED 3.000 per orang (~USD 815)",
        "details": "Pembebasan bea masuk untuk barang keperluan pribadi dan cinderamata."
      },
      {
        "category": "Rokok",
        "limit": "400 batang rokok / 50 cerutu / 500g tembakau",
        "details": "Bebas bea untuk penumpang berusia 18 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "4 liter alkohol ATAU 2 karton bir (maks 24 kaleng @355ml)",
        "details": "Khusus untuk penumpang non-Muslim berusia di atas 21 tahun."
      },
      {
        "category": "Uang Tunai & Logam Mulia",
        "limit": "AED 60.000 atau setara valas (~USD 16.300)",
        "details": "Wajib lapor via aplikasi iDeclare Dubai Customs jika membawa uang tunai/cek senilai AED 60.000 ke atas."
      }
    ],
    "quarantineInfo": [
      "Makanan kemasan pabrik berlabel halal diizinkan. Dilarang membawa produk babi tanpa izin edar khusus",
      "Tanaman hidup, tanah, dan bibit dilarang masuk tanpa izin Kementerian Perubahan Iklim dan Lingkungan (MOCCAE)",
      "Hewan peliharaan: dilarang sebagai bagasi kabin (hanya via kargo manifest) dan memerlukan izin impor impor MOCCAE"
    ],
    "generalNotes": [
      "WNI memerlukan Visa Masuk UEA (Tourist Visa) yang bisa diajukan secara online melalui maskapai (Emirates/Etihad), hotel, atau agen perjalanan",
      "Patuhi norma kesopanan publik lokal, hindari kemesraan berlebihan di tempat umum (public display of affection)",
      "Unduh aplikasi iDeclare Dubai Customs untuk mempercepat proses pemeriksaan barang bawaan saat mendarat di Terminal 1/2/3 Bandara Dubai"
    ]
  },
  {
    "countryCode": "HK",
    "countryName": "Hong Kong",
    "flag": "🇭🇰",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Vape & Rokok Elektrik",
        "item": "Vape / Pods / Heat-not-burn / E-Liquid",
        "status": "forbidden",
        "details": "DILARANG KERAS SECARA MUTLAK SEJAK 2022. Membawa, mengimpor, menjual, atau memiliki produk rokok alternatif di Hong Kong diancam denda hingga HKD 50.000 dan penjara 6 bulan."
      },
      {
        "category": "CBD (Cannabidiol)",
        "item": "Minyak CBD, Skincare CBD & Suplemen CBD",
        "status": "forbidden",
        "details": "DILARANG TOTAL. Sejak 2023, CBD diklasifikasikan sebagai Narkotika Berbahaya Golongan 1 di Hong Kong. Impor ilegal diancam hukuman penjara SEUMUR HIDUP dan denda HKD 5.000.000."
      },
      {
        "category": "Senjata & Bela Diri",
        "item": "Pepper Spray (Semprotan Merica) & Stun Gun",
        "status": "forbidden",
        "details": "Semprotan merica gantungan kunci, stun gun, dan brass knuckle dikategorikan senjata api ilegal di Hong Kong dengan ancaman pidana berat."
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin (maks 100Wh). Dilarang di bagasi check-in.",
        "conditions": "Kabin pesawat"
      }
    ],
    "shipRules": [
      {
        "category": "Ferry Hong Kong - Makau (TurboJET/Cotai)",
        "item": "Pemeriksaan Imigrasi & Bea Cukai Feri",
        "status": "forbidden",
        "details": "Larangan vape, pepper spray, dan narkoba berlaku sama persis di terminal feri Sheung Wan dan Tsim Sha Tsui."
      }
    ],
    "customsLimits": [
      {
        "category": "Rokok Duty-Free",
        "limit": "HANYA 19 BATANG ROKOK (Kurang dari 1 bungkus)",
        "details": "PERINGATAN SANGAT PENTING: Kuota duty-free Hong Kong HANYA 19 batang rokok atau 1 batang cerutu (maks 25g). Membawa 1 bungkus isi 20 batang wajib lapor di Jalur Merah!"
      },
      {
        "category": "Minuman Beralkohol",
        "limit": "1 liter minuman beralkohol (>30% ABV)",
        "details": "Khusus untuk minuman keras dengan kadar alkohol di atas 30%. Anggur (wine) dan bir di bawah 30% ABV bebas bea tanpa kuota (Hong Kong free wine port)."
      },
      {
        "category": "Barang Belanjaan",
        "limit": "Bebas Bea (Free Port)",
        "details": "Hong Kong adalah pelabuhan bebas pajak, tidak ada bea masuk atau PPN untuk sebagian besar barang belanjaan pribadi, pakaian, dan elektronik."
      },
      {
        "category": "Uang Tunai",
        "limit": "HKD 120.000 atau setara valas (~USD 15.300)",
        "details": "Membawa uang tunai atau CBNI senilai HKD 120.000 ke atas wajib mengisi formulir deklarasi di pos pabean."
      }
    ],
    "quarantineInfo": [
      "Food and Environmental Hygiene Department (FEHD) melarang membawa daging mentah, unggas segar, dan telur mentah tanpa sertifikat resmi",
      "Tanaman hidup dan hewan langka dilindungi wajib memiliki izin CITES / AFCD"
    ],
    "generalNotes": [
      "Pemegang paspor Indonesia menikmati BEBAS VISA KUNJUNGAN hingga 30 hari di Hong Kong",
      "Beli Octopus Card di bandara untuk pembayaran cepat di MTR, bus, trem, feri, dan minimarket 7-Eleven/Circle K",
      "Periksa kembali gantungan kunci tas Anda: pastikan tidak ada semprotan merica (pepper spray) pembela diri sebelum terbang ke Hong Kong"
    ]
  },
  {
    "countryCode": "TW",
    "countryName": "Taiwan",
    "flag": "🇹🇼",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Makanan / Daging Babi",
        "item": "Semua Produk Babi (Sosis, Abon, Dendeng, Dimsum)",
        "status": "forbidden",
        "details": "DENDA WAJIB LANGSUNG NT$ 200.000 (~Rp 100 JUTA) untuk pelanggaran pertama pencegahan Demam Babi Afrika (ASF)! Jika denda tidak dibayar langsung di bandara, wisatawan DITOLAK MASUK DAN LANGSUNG DIDEPORTASI. Termasuk sisa makanan dari pesawat."
      },
      {
        "category": "Vape & E-Cigarette",
        "item": "Rokok Elektrik, Pods, Heat-not-burn",
        "status": "forbidden",
        "details": "DILARANG TOTAL di bawah Tobacco Hazards Prevention Act Taiwan. Membawa masuk vape akan disita dan dikenakan sanksi denda administratif."
      },
      {
        "category": "Buah & Tanaman Segar",
        "item": "Buah Tropis Segar (Mangga, Salak, Jeruk, dll)",
        "status": "forbidden",
        "details": "Dilarang keras masuk Taiwan untuk mencegah penyebaran hama lalat buah. Anjing pelacak karantina aktif di bandara Taoyuan (TPE)."
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin (maks 100Wh). Dilarang di bagasi check-in.",
        "conditions": "Kabin pesawat"
      }
    ],
    "shipRules": [
      {
        "category": "Port of Keelung & Kaohsiung",
        "item": "Deteksi Karantina Hewan Pelabuhan Laut",
        "status": "forbidden",
        "details": "Anjing pelacak karantina (Quarantine Beagles) memeriksa seluruh koper penumpang kapal pesiar untuk produk daging babi."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "NT$ 35.000 per orang (~USD 1.100)",
        "details": "Pembebasan bea masuk untuk barang keperluan pribadi dan oleh-oleh konsumsi."
      },
      {
        "category": "Rokok",
        "limit": "200 batang rokok (1 karton) / 25 cerutu / 1 pon tembakau",
        "details": "Bebas bea untuk penumpang berusia 20 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "Maksimal 1.5 liter minuman beralkohol",
        "details": "Untuk penumpang berusia 18 tahun ke atas."
      },
      {
        "category": "Uang Tunai",
        "limit": "NT$ 100.000, RMB 20.000, atau valas setara USD 10.000",
        "details": "Membawa uang tunai melebihi batas batas tersebut wajib lapor ke Taiwan Customs di Jalur Merah."
      }
    ],
    "quarantineInfo": [
      "PENTING: Buang semua sisa makanan, buah, atau daging ke tempat sampah karantina (Amnesty Bin) sebelum pos pemeriksaan paspor!",
      "Taiwan Bureau of Animal and Plant Health Inspection and Quarantine (BAPHIQ) sangat ketat terhadap produk pertanian luar negeri",
      "Hewan peliharaan: wajib microchip, vaksinasi rabies, dan uji netralisasi rabies serta karantina di pos karantina Taiwan"
    ],
    "generalNotes": [
      "WNI dapat memanfaatkan Sertifikat Otorisasi Perjalanan Bebas Visa (ROC Travel Authorization / TAC) secara gratis jika memiliki visa aktif negara maju (AS, Jepang, Schengen, Korea, dll.) atau mengajukan e-Visa / Visa Kertas via TETO",
      "Kartu transportasi EasyCard atau iPASS sangat praktis untuk naik MRT Taipei, Kaohsiung, dan belanja di seluruh minimarket Taiwan",
      "Fasilitas Tax Refund Taiwan: belanja minimal NT$ 2.000 di toko bertanda TRS (Tax Refund Shopping) dapat klaim pengembalian PPN 5% di bandara"
    ]
  },
  {
    "countryCode": "VN",
    "countryName": "Vietnam",
    "flag": "🇻🇳",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Drone",
        "item": "Drone Kamera / Flycam",
        "status": "forbidden",
        "details": "Membawa drone ke Vietnam DILARANG TANPA LISENSI RESMI dari Kementerian Pertahanan Vietnam. Drone tanpa izin akan disita di pabean bandara Noi Bai (HAN) atau Tan Son Nhat (SGN)."
      },
      {
        "category": "Narkotika",
        "item": "Narkoba & Zat Terlarang",
        "status": "forbidden",
        "details": "Hukuman MATI berlaku untuk penyelundupan atau kepemilikan narkoba dalam jumlah tertentu di Vietnam."
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin (maks 100Wh sesuai regulasi Vietnam Airlines & VietJet). Dilarang di bagasi check-in.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Vape",
        "item": "Vape / E-cigarette",
        "status": "conditional",
        "details": "Boleh untuk keperluan pribadi terbatas di kabin, namun penggunaan di tempat umum tertentu dilarang.",
        "conditions": "Di kabin pesawat"
      }
    ],
    "shipRules": [
      {
        "category": "Cruise Port Da Nang & Ha Long",
        "item": "Pemeriksaan Pabean Pelayaran Laut",
        "status": "conditional",
        "details": "Pemeriksaan barang elektronik bernilai tinggi dan uang tunai oleh Vietnam Customs di pelabuhan laut internasional."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "VND 10.000.000 per orang (~USD 400)",
        "details": "Pembebasan bea masuk untuk barang konsumsi pribadi dan cinderamata."
      },
      {
        "category": "Rokok",
        "limit": "200 batang rokok / 20 batang cerutu / 250g tembakau",
        "details": "Bebas bea untuk penumpang berusia 18 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "1.5L (>20% ABV) ATAU 2.0L (≤20% ABV) ATAU 3L bir",
        "details": "Untuk penumpang berusia 18 tahun ke atas."
      },
      {
        "category": "Uang Tunai",
        "limit": "USD 5.000 atau setara / VND 15.000.000",
        "details": "Membawa uang tunai valas > USD 5.000 atau VND > 15 juta WAJIB dideklarasikan ke Bea Cukai Vietnam."
      }
    ],
    "quarantineInfo": [
      "Dilarang membawa daging mentah, unggas segar, dan tanaman liar tanpa sertifikat karantina veteriner/fitosanitari",
      "Hewan peliharaan: wajib memiliki paspor hewan, sertifikat vaksinasi rabies, dan sertifikat kesehatan dari dokter hewan resmi"
    ],
    "generalNotes": [
      "Bebas visa kunjungan bagi WNI sesama negara anggota ASEAN hingga 30 hari",
      "Paspor Indonesia wajib memiliki masa berlaku minimal 6 bulan dari tanggal kedatangan",
      "Taksi di Vietnam: gunakan aplikasi Grab atau operator taksi terpercaya (Vinasun di Selatan, Mai Linh di Utara) untuk menghindari taksi nakal"
    ]
  },
  {
    "countryCode": "QA",
    "countryName": "Qatar",
    "flag": "🇶🇦",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Alkohol",
        "item": "Minuman Beralkohol (Semua Jenis)",
        "status": "forbidden",
        "details": "DILARANG KERAS DIBAWA MASUK OLEH TURIS. Semua alkohol, termasuk yang dibeli di duty-free bandara transit luar negeri, LANGSUNG DISITA oleh Bea Cukai Hamad International Airport (HIA)."
      },
      {
        "category": "Makanan",
        "item": "Produk Babi & Turunannya",
        "status": "forbidden",
        "details": "Dilarang masuk ke negara Qatar sesuai hukum syariat Islam."
      },
      {
        "category": "Vape",
        "item": "Vape / E-Cigarette",
        "status": "forbidden",
        "details": "Qatar melarang impor dan penjualan rokok elektrik. Perangkat vape akan disita di pos pemeriksaan bandara."
      },
      {
        "category": "Obat",
        "item": "Obat Penenang / Narkotika",
        "status": "conditional",
        "details": "Obat resep yang mengandung zat psikotropika wajib disertai surat dokter resmi berbahasa Inggris dan resep asli.",
        "conditions": "Wajib resep dokter berbahasa Inggris"
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin sesuai standar Qatar Airways (maks 100Wh). Dilarang di bagasi check-in.",
        "conditions": "Kabin pesawat"
      }
    ],
    "shipRules": [
      {
        "category": "Doha Cruise Port (Grand Cruise Terminal)",
        "item": "Aturan Syariat Pelabuhan Pesiar",
        "status": "forbidden",
        "details": "Larangan ketat alkohol, babi, dan materi pornografi berlaku penuh pada pemeriksaan kapal pesiar di pelabuhan Doha."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Pribadi / Hadiah",
        "limit": "QAR 3.000 per orang (~USD 825)",
        "details": "Pembebasan bea masuk untuk barang keperluan pribadi dan hadiah."
      },
      {
        "category": "Rokok",
        "limit": "400 batang rokok",
        "details": "Bebas bea untuk penumpang berusia 18 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "0 liter (TOTAL ZERO ALLOWANCE)",
        "details": "Turis tidak memiliki kuota pembebasan alkohol sama sekali di Qatar."
      },
      {
        "category": "Uang Tunai & Logam Mulia",
        "limit": "QAR 50.000 atau setara valas (~USD 13.700)",
        "details": "Membawa uang tunai, perhiasan emas, atau cek bernilai QAR 50.000 ke atas wajib dideklarasikan ke General Authority of Customs."
      }
    ],
    "quarantineInfo": [
      "Semua produk makanan impor harus halal dan berkemasan pabrik utuh",
      "Hewan peliharaan: wajib izin impor dari Kementerian Kotamadya Qatar (Ministry of Municipality) dan sertifikat uji antibodi rabies"
    ],
    "generalNotes": [
      "WNI berhak mendapatkan fasilitas BEBAS VISA KEDATANGAN (Visa on Arrival gratis) hingga 30 hari",
      "Syarat VoA Qatar: Paspor berlaku minimal 6 bulan, tiket penerbangan pulang/lanjutan, dan konfirmasi pemesanan hotel melalui Discover Qatar",
      "Manfaatkan metro canggih Doha Metro yang terhubung langsung dari Bandara Hamad ke pusat kota Souq Waqif, Msheireb, dan Lusail"
    ]
  },
  {
    "countryCode": "TR",
    "countryName": "Turki",
    "flag": "🇹🇷",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Benda Kuno & Cagar Budaya",
        "item": "Artefak Antik, Batu Kuno, Fosil & Koin Kuno",
        "status": "forbidden",
        "details": "DILARANG KERAS MEMBAWA KELUAR ARTEFAK SEJARAH. Mengambil batu atau benda dari situs arkeologi (seperti Ephesus/Hierapolis) diancam hukuman penjara berat atas tuduhan penyelundupan cagar budaya."
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin sesuai aturan Turkish Airlines (maks 100Wh). Dilarang di bagasi tercatat.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Drone",
        "item": "Drone / UAV Kamera",
        "status": "conditional",
        "details": "Drone > 500 gram wajib izin DGCA Turki. Drone tanpa izin berisiko ditahan sementara di pabean bandara Istanbul (IST).",
        "conditions": "Wajib izin pabean jika >500g"
      },
      {
        "category": "Obat",
        "item": "Obat Pribadi Resep Dokter",
        "status": "conditional",
        "details": "Bawa resep dokter resmi berbahasa Inggris untuk obat medis yang diperlukan selama perjalanan.",
        "conditions": "Sertai resep dokter"
      }
    ],
    "shipRules": [
      {
        "category": "Galataport Istanbul & Port of Kusadasi",
        "item": "Pemeriksaan Bea Cukai Bawah Tanah",
        "status": "conditional",
        "details": "Galataport Istanbul memiliki terminal bawah tanah canggih dengan pemindaian paspor dan bagasi otomatis untuk kapal pesiar Mediterania."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan / Hadiah",
        "limit": "€430 per orang dewasa (€150 usia <15 tahun)",
        "details": "Pembebasan bea masuk untuk barang pribadi dan cinderamata yang dibawa dalam penerbangan."
      },
      {
        "category": "Rokok & Tembakau",
        "limit": "600 batang rokok (3 karton) / 100 cerutilos / 50 cerutu / 250g tembakau",
        "details": "Kuota duty-free Turki sangat royal: hingga 3 karton rokok untuk penumpang berusia ≥18 tahun."
      },
      {
        "category": "Alkohol",
        "limit": "1 liter (>22% ABV) ATAU 2 liter (≤22% ABV)",
        "details": "Untuk penumpang berusia 18 tahun ke atas."
      },
      {
        "category": "Makanan Konsumsi",
        "limit": "1 kg kopi, 1 kg teh, 1 kg cokelat, 1 kg permen",
        "details": "Fasilitas kuota duty-free khusus bahan makanan kemasan khas oleh-oleh."
      },
      {
        "category": "Uang Tunai",
        "limit": "€10.000 atau setara valas",
        "details": "Membawa uang tunai senilai €10.000 ke atas wajib dideklarasikan di pos kepabeanan Turki."
      }
    ],
    "quarantineInfo": [
      "Dilarang membawa daging mentah dan produk susu tanpa sertifikat karantina veteriner",
      "Hewan peliharaan (maksimal 2 ekor): wajib microchip, paspor hewan, vaksinasi rabies, dan uji serologis antibodi rabies (FAVN test)"
    ],
    "generalNotes": [
      "WNI MENIKMATI BEBAS VISA KUNJUNGAN hingga 30 hari untuk tujuan pariwisata",
      "Masa berlaku paspor Indonesia wajib minimal 150 hari (5 bulan) sejak tanggal ketibaan di Turki",
      "Manfaatkan Tax Free Shopping (Global Blue / Tax Free Point): belanja fashion, jaket kulit, dan karpet di toko berlogo Tax Free berhak mendapatkan pengembalian PPN 10-20% di bandara Istanbul"
    ]
  },
  {
    "countryCode": "PH",
    "countryName": "Filipina",
    "flag": "🇵🇭",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Baterai",
        "item": "Powerbank Litium",
        "status": "conditional",
        "details": "Wajib di bagasi kabin (maks 100Wh). Dilarang di bagasi check-in.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Amunisi & Senjata",
        "item": "Peluru, Selongsong & Amunisi",
        "status": "forbidden",
        "details": "SANGAT DILARANG. Waspadai membawa cinderamata replika peluru atau amunisi aktif (skema keamanan ketat di bandara NAIA Manila)."
      },
      {
        "category": "Vape",
        "item": "Vape / E-Cigarette",
        "status": "conditional",
        "details": "Diizinkan untuk penggunaan pribadi di kabin pesawat (maks 100ml liquid). Dilarang mengisap di area publik tanpa zona merokok khusus.",
        "conditions": "Di kabin pesawat"
      },
      {
        "category": "Narkotika",
        "item": "Narkoba & Obat Psikotropika",
        "status": "forbidden",
        "details": "Undang-undang anti-narkoba Filipina (RA 9165) memberlakukan hukuman penjara seumur hidup untuk penyelundupan zat terlarang."
      }
    ],
    "shipRules": [
      {
        "category": "Ferry Antar Pulau (2GO / FastCat)",
        "item": "Aturan Keselamatan Pelayaran Laut",
        "status": "conditional",
        "details": "Pemeriksaan keamanan maritim terhadap tabung gas dan baterai kendaraan di terminal pelabuhan Manila & Batangas."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "PHP 10.000 per orang (~USD 180)",
        "details": "Pembebasan bea masuk barang bawaan umum penumpang."
      },
      {
        "category": "Rokok",
        "limit": "400 batang rokok / 50 cerutu / 250g tembakau",
        "details": "Bebas bea untuk penumpang berusia 18 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "Maksimal 2 botol (total tidak melebihi 1.5 liter)",
        "details": "Bebas bea untuk penumpang berusia 18 tahun ke atas."
      },
      {
        "category": "Uang Tunai",
        "limit": "PHP 50.000 tunai / valas setara USD 10.000",
        "details": "Membawa uang tunai Peso Filipina > PHP 50.000 atau valas > USD 10.000 wajib otorisasi Bangko Sentral ng Pilipinas (BSP) dan deklarasi bea cukai."
      }
    ],
    "quarantineInfo": [
      "Bureau of Animal Industry (BAI) melarang produk daging olahan babi untuk pencegahan Demam Babi Afrika",
      "Buah segar dan bibit tanaman wajib izin impor dari Bureau of Plant Industry (BPI)"
    ],
    "generalNotes": [
      "Bebas visa kunjungan bagi WNI sesama anggota ASEAN hingga 30 hari",
      "Wajib mengisi registrasi kedatangan eTravel (eTravel Portal) secara online sebelum jadwal penerbangan ke Filipina",
      "Gunakan aplikasi Grab di Manila dan Cebu untuk transportasi yang aman dan tarif pasti"
    ]
  },
  {
    "countryCode": "IN",
    "countryName": "India",
    "flag": "🇮🇳",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Vape & E-Cigarette",
        "item": "Vape / Pods / E-Hookah",
        "status": "forbidden",
        "details": "DILARANG KERAS SEJAK 2019 di bawah Prohibition of Electronic Cigarettes Act (PECA). Mengimpor, membawa, atau menggunakan vape di India dilarang dan dapat disita serta didenda di bandara."
      },
      {
        "category": "Telepon Satelit",
        "item": "Satellite Phone (Thuraya, Iridium)",
        "status": "forbidden",
        "details": "DILARANG KERAS TANPA LISENSI RESMI Kementerian Telekomunikasi India. Membawa telepon satelit tanpa izin adalah tindak pidana di bawah Indian Wireless Telegraphy Act (dapat ditangkap di bandara)."
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin (maks 100Wh). Dilarang di bagasi check-in.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Drone",
        "item": "Drone Kamera",
        "status": "forbidden",
        "details": "Wisatawan asing dilarang membawa atau menerbangkan drone di India tanpa izin khusus dari DGCA dan Kementerian Pertahanan."
      }
    ],
    "shipRules": [
      {
        "category": "Pelabuhan Mumbai & Kochi",
        "item": "Pemeriksaan Emas & Perhiasan Kapal Laut",
        "status": "conditional",
        "details": "Indian Customs sangat ketat memeriksa kepemilikan emas batangan dan perhiasan impor di pelabuhan kedatangan internasional."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan / Hadiah",
        "limit": "INR 15.000 per orang (~USD 180)",
        "details": "Pembebasan bea masuk bagi wisatawan asing non-India untuk barang konsumsi pribadi."
      },
      {
        "category": "Rokok",
        "limit": "100 batang rokok / 25 cerutu / 125g tembakau",
        "details": "Untuk penumpang berusia 18 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "Maksimal 2 liter minuman beralkohol atau wine",
        "details": "Untuk penumpang berusia 18 tahun ke atas."
      },
      {
        "category": "Uang Tunai",
        "limit": "USD 5.000 uang kertas valas / USD 10.000 total instrumen",
        "details": "Membawa uang kertas asing senilai USD 5.000 ke atas wajib dideklarasikan dalam Currency Declaration Form (CDF)."
      }
    ],
    "quarantineInfo": [
      "Animal Quarantine and Certification Services (AQCS) melarang membawa produk daging mentah dan olahan hewan liar",
      "Pengawasan ketat terhadap penyelundupan satwa liar dan tumbuhan yang dilindungi CITES"
    ],
    "generalNotes": [
      "WNI MEMERLUKAN VISA INDIA (e-Visa India) yang wajib diajukan secara online di portal resmi pemerintah India sebelum keberangkatan",
      "Paspor Indonesia harus berlaku minimal 6 bulan dengan minimal 2 halaman kosong",
      "Dilarang menerbangkan drone atau mengambil foto instalasi militer, bandara, jembatan strategis, dan situs perbatasan di India"
    ]
  },
  {
    "countryCode": "KH",
    "countryName": "Kamboja",
    "flag": "🇰🇭",
    "region": "asia",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Vape",
        "item": "Vape / E-Cigarette / Shisha Elektrik",
        "status": "forbidden",
        "details": "Dilarang diimpor, dijual, dan digunakan di Kamboja sesuai ketetapan National Authority for Combating Drugs."
      },
      {
        "category": "Benda Cagar Budaya",
        "item": "Artefak Kuno & Batuan Candi Angkor",
        "status": "forbidden",
        "details": "DILARANG KERAS membawa keluar artefak bersejarah, patung Buddha antik, atau pecahan batu dari kompleks Angkor Wat tanpa izin resmi Kementerian Kebudayaan Kamboja."
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin (maks 100Wh sesuai regulasi ICAO). Dilarang di bagasi tercatat.",
        "conditions": "Kabin pesawat"
      }
    ],
    "shipRules": [
      {
        "category": "Pelayaran Sungai Mekong & Pelabuhan Sihanoukville",
        "item": "Pemeriksaan Imigrasi Perbatasan Air",
        "status": "conditional",
        "details": "Pemeriksaan kepabeanan kapal pesiar sungai Vietnam - Phnom Penh untuk barang bawaan penumpang."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "USD 500 per orang",
        "details": "Pembebasan bea masuk untuk barang keperluan pribadi dan cinderamata."
      },
      {
        "category": "Rokok",
        "limit": "200 batang rokok / 50 cerutu / 250g tembakau",
        "details": "Bebas bea untuk penumpang berusia 18 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "Maksimal 2 liter wine atau 350ml minuman keras tinggi",
        "details": "Untuk penumpang berusia 18 tahun ke atas."
      },
      {
        "category": "Uang Tunai",
        "limit": "USD 10.000 atau setara valas",
        "details": "Membawa uang tunai senilai USD 10.000 ke atas wajib dideklarasikan ke General Department of Customs and Excise."
      }
    ],
    "quarantineInfo": [
      "Dilarang membawa daging mentah, unggas segar, dan tanaman hidup tanpa sertifikat sanitasi karantina"
    ],
    "generalNotes": [
      "Bebas visa kunjungan bagi WNI sesama anggota ASEAN hingga 30 hari",
      "Wajib mengisi Cambodia e-Arrival Card secara online sebelum tiba di bandara Phnom Penh atau Siem Reap Angkor (SAI)",
      "Mata uang US Dollar (USD) diterima secara luas di samping mata uang lokal Riel Kamboja (KHR), namun pastikan uang kertas USD dalam kondisi mulus tanpa robek"
    ]
  },
  {
    "countryCode": "NL",
    "countryName": "Belanda",
    "flag": "🇳🇱",
    "region": "europe",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Makanan / Meat & Dairy Ban",
        "item": "Daging Rendang, Abon, Dendeng, Sosis & Produk Susu",
        "status": "forbidden",
        "details": "DILARANG KERAS SESUAI REGULASI UNI EROPA. Membawa makanan olahan daging (sapi, ayam, babi) dan olahan susu dari negara non-UE (seperti Indonesia) DILARANG TOTAL untuk mencegah wabah PMK dan flu burung. Barang akan disita dan dimusnahkan oleh Douane di Bandara Schiphol."
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin (maks 100Wh bebas, 100-160Wh izin KLM/maskapai). Dilarang di bagasi check-in.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Vape",
        "item": "Vape / E-Cigarette",
        "status": "conditional",
        "details": "Boleh dibawa di bagasi kabin untuk pemakaian pribadi (maks 100ml liquid). Catatan: rasa liquid selain tembakau dilarang dijual di Belanda.",
        "conditions": "Di kabin pesawat"
      },
      {
        "category": "Tanaman & Umbi",
        "item": "Bibit Tanaman & Umbi Bunga Tulip",
        "status": "conditional",
        "details": "Umbi bunga tulip yang dibeli di Belanda untuk dibawa pulang ke Indonesia wajib memiliki Sertifikat Fitosanitari (Phytosanitary Certificate) agar lolos karantina bandara.",
        "conditions": "Wajib sertifikat fitosanitari"
      }
    ],
    "shipRules": [
      {
        "category": "Pelabuhan Rotterdam & Hook of Holland",
        "item": "Pemeriksaan Pabean Pelayaran Laut UE",
        "status": "conditional",
        "details": "Douane Belanda menerapkan aturan pabean Uni Eropa yang sama persis untuk kapal pesiar dan feri lintas Selat Inggris."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan (Air/Sea)",
        "limit": "€430 per orang dewasa (€150 usia <15 tahun)",
        "details": "Pembebasan bea masuk dan PPN Uni Eropa untuk barang bawaan pribadi dan belanjaan non-komersial."
      },
      {
        "category": "Rokok & Tembakau",
        "limit": "200 batang rokok / 100 cerutilos / 50 cerutu / 250g tembakau",
        "details": "Khusus untuk penumpang berusia 17 tahun ke atas dari luar Uni Eropa."
      },
      {
        "category": "Alkohol",
        "limit": "1 liter spirits (>22%) ATAU 2 liter fortified wine, PLUS 4 liter wine, PLUS 16 liter bir",
        "details": "Alokasi duty-free alkohol Uni Eropa untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Uang Tunai",
        "limit": "€10.000 atau setara valas",
        "details": "Membawa uang tunai atau instrumen keuangan senilai €10.000 ke atas WAJIB dideklarasikan kepada Douane Belanda."
      }
    ],
    "quarantineInfo": [
      "Regulasi Uni Eropa Regulation (EU) 2019/2122 melarang tegas produk hewani personal dari negara ketiga",
      "Ikan segar atau olahan diizinkan hingga 20 kg per orang",
      "Hewan peliharaan: wajib microchip ISO, sertifikat vaksinasi rabies, dan uji laboratorium antibodi rabies (titer test) minimal 3 bulan sebelum terbang"
    ],
    "generalNotes": [
      "WNI memerlukan VISA SCHENGEN (diproses melalui VFS Global Belanda di Jakarta/Surabaya/Bali)",
      "Belanda adalah destinasi favorit Eropa nomor satu bagi wisatawan Indonesia karena kedekatan historis dan diaspora kuliner Nusantara yang melimpah",
      "Tax Refund PPN Belanja: Pembelian barang minimal €50 dalam 1 toko dapat mengklaim Tax Refund PPN (hingga 21%) di konter Global Blue Bandara Schiphol sebelum check-in bagasi"
    ]
  },
  {
    "countryCode": "FR",
    "countryName": "Prancis",
    "flag": "🇫🇷",
    "region": "europe",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Makanan / Larangan Uni Eropa",
        "item": "Daging Sapi, Rendang, Babi, Ayam & Keju Segar",
        "status": "forbidden",
        "details": "DILARANG KERAS MEMBAWA DAGING & SUSU DARI LUAR UNI EROPA. Makanan khas Indonesia berbahan dasar daging akan disita dan dimusnahkan oleh Douane Prancis di Bandara Paris CDG."
      },
      {
        "category": "Barang Tiruan / KW",
        "item": "Barang Branded Palsu (Tas, Sepatu, Jam Tangan KW)",
        "status": "forbidden",
        "details": "HUKUM PRANCIS SANGAT KERAS TERHADAP BARANG PALSU (Counterfeit Goods). Membawa tas mewah tiruan dapat disita langsung oleh Bea Cukai Prancis dengan denda hingga 3 KALI NILAI BARANG ASLI atau tuntutan pidana!"
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin sesuai aturan Air France (maks 100Wh). Dilarang di bagasi check-in.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Vape",
        "item": "Vape / E-Cigarette",
        "status": "conditional",
        "details": "Diizinkan di bagasi kabin untuk keperluan pribadi (maks 100ml liquid).",
        "conditions": "Di kabin pesawat"
      }
    ],
    "shipRules": [
      {
        "category": "Port of Marseille, Le Havre & Nice",
        "item": "Pemeriksaan Pabean Maritim Prancis",
        "status": "conditional",
        "details": "Pemeriksaan kepabeanan Uni Eropa pada barang mewah dan perhiasan untuk penumpang kapal pesiar internasional."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "€430 per orang dewasa (€150 usia <15 tahun)",
        "details": "Pembebasan bea masuk untuk barang keperluan pribadi yang dibawa lewat jalur udara/laut."
      },
      {
        "category": "Rokok",
        "limit": "200 batang rokok / 100 cigarillos / 50 cerutu / 250g tembakau",
        "details": "Bebas bea untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "1 liter alkohol >22% ATAU 2 liter alkohol ≤22%, plus 4 liter wine, plus 16 liter bir",
        "details": "Untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Uang Tunai",
        "limit": "€10.000 atau setara valas",
        "details": "Membawa uang tunai senilai €10.000 ke atas wajib dideklarasikan secara tertulis kepada Douane Prancis."
      }
    ],
    "quarantineInfo": [
      "Pemeriksaan veteriner Uni Eropa berlaku ketat di bandara Paris Charles de Gaulle (CDG) dan Orly (ORY)",
      "Hewan peliharaan: wajib microchip, paspor hewan UE / sertifikat kesehatan resmi, dan vaksinasi rabies lengkap"
    ],
    "generalNotes": [
      "WNI memerlukan VISA SCHENGEN (diajukan melalui TLScontact Prancis di Indonesia)",
      "Destinasi wisata terpopuler dunia: Paris (Menara Eiffel, Louvre, Galeries Lafayette, Champs-Élysées)",
      "Fasilitas Detaxe (Tax Refund Prancis): Pembelian minimal €100 di satu toko dalam 1 hari memenuhi syarat pengembalian PPN (hingga 12%). Validasi barcode formulir di mesin kios PABLO bandara CDG sebelum check-in bagasi"
    ]
  },
  {
    "countryCode": "DE",
    "countryName": "Jerman",
    "flag": "🇩🇪",
    "region": "europe",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Makanan",
        "item": "Daging, Sosis, Rendang & Produk Olahan Susu",
        "status": "forbidden",
        "details": "DILARANG KERAS SESUAI ATURAN UNI EROPA. Membawa makanan hewani dari negara ketiga (Indonesia) dilarang total. Zoll (Bea Cukai Jerman) akan menyita di Bandara Frankfurt (FRA) dan Munich (MUC)."
      },
      {
        "category": "Obat",
        "item": "Obat Resep Keras & Narkotika",
        "status": "conditional",
        "details": "Membawa obat pribadi yang diresepkan dokter wajib disertai surat dokter resmi berbahasa Jerman atau Inggris.",
        "conditions": "Sertai resep dokter"
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin (Lufthansa: maks 100Wh tanpa izin, 100-160Wh izin maskapai). Dilarang di bagasi tercatat.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Barang CITES",
        "item": "Kulit Hewan Liar, Gading & Produk Satwa Lindung",
        "status": "forbidden",
        "details": "Zoll Jerman menindak tegas segala bentuk barang turunan flora dan fauna langka (denda sangat tinggi)."
      }
    ],
    "shipRules": [
      {
        "category": "Pelabuhan Hamburg & Kiel",
        "item": "Pengawasan Zoll Maritim Jerman",
        "status": "conditional",
        "details": "Pemeriksaan barang bernilai tinggi dan kepatuhan pabean untuk pelayaran pesiar Laut Baltik & Laut Utara."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "€430 per orang dewasa (€150 usia <15 tahun)",
        "details": "Pembebasan bea masuk jalur udara/laut untuk barang konsumsi pribadi dan hadiah."
      },
      {
        "category": "Rokok",
        "limit": "200 batang rokok / 100 cerutilos / 50 cerutu / 250g tembakau",
        "details": "Untuk penumpang berusia 17 tahun ke atas dari luar kawasan kepabeanan UE."
      },
      {
        "category": "Alkohol",
        "limit": "1 liter minuman keras (>22%), ATAU 2 liter fortified wine (≤22%), plus 4 liter wine, 16 liter bir",
        "details": "Untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Uang Tunai",
        "limit": "€10.000 atau setara valas",
        "details": "Deklarasi wajib kepada Zoll jika membawa uang tunai senilai €10.000 ke atas."
      }
    ],
    "quarantineInfo": [
      "Pengawasan biosecurity ketat terhadap produk pertanian dari luar UE",
      "Hewan peliharaan: wajib microchip ISO 11784/11785, vaksinasi rabies, dan uji antibodi rabies"
    ],
    "generalNotes": [
      "WNI memerlukan VISA SCHENGEN (diproses melalui VFS Global Jerman)",
      "Jerman terkenal dengan sistem transportasi umum terpadu (Deutsche Bahn / S-Bahn) dan pasar natal bersejarah (Weihnachtsmarkt)",
      "Simpan semua kuitansi belanjaan Anda karena Zoll Jerman sering melakukan pemeriksaan acak barang bernilai tinggi di pintu keluar bandara"
    ]
  },
  {
    "countryCode": "CH",
    "countryName": "Swiss",
    "flag": "🇨🇭",
    "region": "europe",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Makanan",
        "item": "Daging & Produk Susu dari Luar Eropa",
        "status": "forbidden",
        "details": "Swiss mengadopsi standar veteriner Uni Eropa: dilarang membawa daging dan susu dari luar wilayah UE/EFTA (seperti Indonesia). Makanan akan disita di bandara Zurich (ZRH) dan Geneva (GVA)."
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin sesuai aturan Swiss International Air Lines (maks 100Wh). Dilarang digunakan mengecas selama terbang.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Drone",
        "item": "Drone Kamera",
        "status": "conditional",
        "details": "Diizinkan dengan regulasi FOCA Swiss. Dilarang terbang di atas cagar alam pegunungan, kerumunan, atau dekat helipad Air-Glaciers/Rega.",
        "conditions": "Patuhi batas zona terbang FOCA"
      },
      {
        "category": "Vape",
        "item": "Vape / E-Cigarette",
        "status": "conditional",
        "details": "Diizinkan untuk penggunaan pribadi di kabin (maks 100ml liquid).",
        "conditions": "Di kabin pesawat"
      }
    ],
    "shipRules": [
      {
        "category": "Danau Jenewa & Danau Konstanz",
        "item": "Pemeriksaan Perbatasan Danau",
        "status": "conditional",
        "details": "Pos pabean federal Swiss (BAZG) memantau lalu lintas pelayaran perbatasan Prancis, Jerman, dan Swiss."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan Pribadi",
        "limit": "CHF 300 per orang (~USD 340)",
        "details": "Pembebasan bea masuk dan PPN Swiss untuk barang keperluan pribadi dan oleh-oleh."
      },
      {
        "category": "Daging Segar Konsumsi",
        "limit": "Maks 1 kg per orang",
        "details": "Ketentuan khusus pabean Swiss untuk daging dari negara yang diizinkan (dari UE). Dari negara non-UE dilarang."
      },
      {
        "category": "Rokok & Tembakau",
        "limit": "250 batang rokok ATAU 250 cerutu ATAU 250g tembakau",
        "details": "Bebas bea untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "5 liter (<18% ABV wine/bir) PLUS 1 liter (>18% ABV spirits)",
        "details": "Bebas bea untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Uang Tunai",
        "limit": "CHF 10.000 atau setara valas",
        "details": "Deklarasi wajib jika membawa uang tunai senilai CHF 10.000 ke atas saat ditanyakan petugas pabean BAZG."
      }
    ],
    "quarantineInfo": [
      "Federal Food Safety and Veterinary Office (FSVO) melarang impor pangan berisiko tinggi dari negara ketiga",
      "Hewan peliharaan: wajib microchip, paspor hewan, dan vaksinasi rabies lengkap"
    ],
    "generalNotes": [
      "Meskipun Swiss BUKAN anggota Uni Eropa, Swiss adalah BAGIAN RESMI DARI KAWASAN SCHENGEN. Visa Schengen berlaku penuh untuk masuk ke Swiss!",
      "Mata uang resmi adalah Franc Swiss (CHF), bukan Euro (beberapa tempat menerima Euro dengan kembalian CHF)",
      "Swiss Travel Pass sangat direkomendasikan untuk naik kereta panorama (Glacier Express, Bernina Express), kapal danau, dan bus antar kota"
    ]
  },
  {
    "countryCode": "GB",
    "countryName": "Inggris",
    "flag": "🇬🇧",
    "region": "europe",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Makanan / Meat & Dairy Ban",
        "item": "Daging Sapi, Rendang, Ayam, Babi & Susu Olahan",
        "status": "forbidden",
        "details": "DILARANG KERAS TANPA PENGECUALIAN. UK Border Force melarang total membawa daging, sosis, rendang, dan keju dari negara non-UE/EEA seperti Indonesia. Makanan akan langsung disita di bandara London Heathrow (LHR)."
      },
      {
        "category": "Senjata Tajam",
        "item": "Pisau Lipat, Pisau Berburu & Benda Berbilah",
        "status": "forbidden",
        "details": "Hukum senjata tajam di Inggris sangat ketat. Membawa pisau tanpa alasan sah di tempat umum adalah tindak pidana serius."
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin (British Airways: maks 100Wh). Dilarang di bagasi check-in.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Vape",
        "item": "Vape / E-Cigarette",
        "status": "conditional",
        "details": "Diizinkan di kabin untuk pemakaian pribadi (maks 100ml liquid).",
        "conditions": "Di kabin pesawat"
      }
    ],
    "shipRules": [
      {
        "category": "Pelabuhan Southampton & Dover",
        "item": "Pemeriksaan UK Border Force Jalur Laut",
        "status": "conditional",
        "details": "Pemeriksaan ketat imigrasi dan kepabeanan untuk kapal pesiar transatlantik dan kapal feri rute Prancis-Inggris."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan (Air)",
        "limit": "£390 per orang (~USD 500)",
        "details": "Pembebasan bea masuk bagi penumpang pesawat komersial untuk barang pribadi dan cinderamata."
      },
      {
        "category": "Rokok & Tembakau",
        "limit": "200 batang rokok / 100 cigarillos / 50 cerutu / 250g tembakau",
        "details": "Bebas bea untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "4 liter spirits (>22%) ATAU 9 liter fortified wine, PLUS 18 liter wine biasa, PLUS 42 liter bir",
        "details": "Alokasi duty-free alkohol Inggris untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Uang Tunai",
        "limit": "£10.000 atau setara valas",
        "details": "Membawa uang tunai senilai £10.000 ke atas wajib dideklarasikan ke UK Customs sebelum ketibaan."
      }
    ],
    "quarantineInfo": [
      "DEFRA melarang impor tanaman berakar, umbi, dan buah segar tertentu tanpa sertifikat fitosanitari",
      "Hewan peliharaan: wajib microchip, vaksinasi rabies, dan perawatan cacing pita (tapeworm treatment) sebelum tiba di Inggris"
    ],
    "generalNotes": [
      "PERINGATAN PENTING: Paspor Indonesia MEMERLUKAN VISA INGGRIS (Standard Visitor Visa), BUKAN VISA SCHENGEN! Inggris bukan anggota Uni Eropa dan bukan anggota kawasan Schengen.",
      "Pengajuan visa Inggris diproses via VFS Global dengan janji temu biometrik",
      "Transportasi di London: gunakan kartu nirsentuh (Contactless debit/credit card atau Apple/Google Pay) di Underground (Tube) dan bus London untuk tarif terbaik"
    ]
  },
  {
    "countryCode": "IT",
    "countryName": "Italia",
    "flag": "🇮🇹",
    "region": "europe",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Makanan",
        "item": "Daging, Sosis, Rendang & Produk Olahan Susu",
        "status": "forbidden",
        "details": "Larangan Uni Eropa berlaku penuh di Bandara Roma Fiumicino (FCO) dan Milan Malpensa (MXP). Makanan hewani dari luar UE dilarang masuk."
      },
      {
        "category": "Barang Tiruan / KW",
        "item": "Tas Mewah KW / Produk Fashion Palsu",
        "status": "forbidden",
        "details": "Guardia di Finanza (Polisi Keuangan & Pabean Italia) sangat aktif menindak barang tiruan mewah (Gucci, Prada, Armani palsu) dengan denda hingga ribuan Euro bagi pembeli/pembawa."
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin (ITA Airways: maks 100Wh). Dilarang di bagasi check-in.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Vape",
        "item": "Vape / E-Cigarette",
        "status": "conditional",
        "details": "Boleh di kabin pesawat untuk keperluan pribadi (maks 100ml liquid).",
        "conditions": "Di kabin pesawat"
      }
    ],
    "shipRules": [
      {
        "category": "Pelabuhan Cruise Civitavecchia (Roma), Venesia & Napoli",
        "item": "Pemeriksaan Pabean Maritim Mediterania",
        "status": "conditional",
        "details": "Pengawasan ketat pabean Italia terhadap deklarasi uang tunai dan belanjaan barang mewah bebas bea."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "€430 per orang dewasa (€150 usia <15 tahun)",
        "details": "Pembebasan bea masuk jalur udara/laut untuk barang konsumsi pribadi dan pakaian."
      },
      {
        "category": "Rokok",
        "limit": "200 batang rokok / 100 cigarillos / 50 cerutu / 250g tembakau",
        "details": "Untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "1 liter spirits (>22%) ATAU 2 liter fortified wine, plus 4 liter wine, 16 liter bir",
        "details": "Untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Uang Tunai",
        "limit": "€10.000 atau setara valas",
        "details": "Deklarasi wajib kepada Agenzia delle Dogane jika membawa uang tunai senilai €10.000 ke atas."
      }
    ],
    "quarantineInfo": [
      "Pemeriksaan veteriner ketat Uni Eropa terhadap produk hewani dan tanaman Mediterania",
      "Hewan peliharaan: wajib microchip, paspor hewan UE, dan vaksinasi rabies resmi"
    ],
    "generalNotes": [
      "WNI memerlukan VISA SCHENGEN (diajukan via VFS Global Italia)",
      "Destinasi favorit belanja fashion: Milan (Quadrilatero della Moda), Roma, Florence (The Mall Outlet)",
      "Fasilitas Tax Refund Italia (Sistem OTELLO): Belanja minimal €70,01 per transaksi berhak mendapatkan pengembalian PPN hingga 12-15% yang divalidasi di bandara sebelum keberangkatan"
    ]
  },
  {
    "countryCode": "ES",
    "countryName": "Spanyol",
    "flag": "🇪🇸",
    "region": "europe",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Makanan",
        "item": "Daging, Sosis, Rendang & Produk Olahan Susu",
        "status": "forbidden",
        "details": "Larangan kepabeanan Uni Eropa melarang makanan hewani dari negara ketiga tanpa sertifikat karantina resmi di Bandara Madrid Barajas (MAD) dan Barcelona El Prat (BCN)."
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin (Iberia: maks 100Wh). Dilarang di bagasi tercatat.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Vape",
        "item": "Vape / E-Cigarette",
        "status": "conditional",
        "details": "Diizinkan di kabin pesawat untuk pemakaian pribadi (maks 100ml liquid).",
        "conditions": "Di kabin pesawat"
      }
    ],
    "shipRules": [
      {
        "category": "Pelabuhan Barcelona, Valencia & Malaga",
        "item": "Hub Kapal Pesiar Terbesar Mediterania",
        "status": "conditional",
        "details": "Pemeriksaan bagasi x-ray pabean Agencia Tributaria untuk ribuan penumpang kapal pesiar internasional setiap hari."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "€430 per orang dewasa (€150 usia <15 tahun)",
        "details": "Pembebasan bea masuk bagi penumpang kedatangan udara atau laut."
      },
      {
        "category": "Rokok",
        "limit": "200 batang rokok / 100 cigarillos / 50 cerutu / 250g tembakau",
        "details": "Bebas bea untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "1 liter minuman beralkohol >22%, atau 2 liter ≤22%, plus 4 liter wine, 16 liter bir",
        "details": "Untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Uang Tunai",
        "limit": "€10.000 atau setara valas",
        "details": "Wajib deklarasi tertulis kepada Agencia Tributaria jika membawa uang tunai senilai €10.000 ke atas."
      }
    ],
    "quarantineInfo": [
      "Pengawasan ketat pabean Spanyol terhadap satwa liar dan tumbuhan eksotis CITES",
      "Hewan peliharaan: wajib microchip standar ISO dan sertifikat vaksinasi rabies lengkap"
    ],
    "generalNotes": [
      "WNI memerlukan VISA SCHENGEN (diproses melalui BLS International untuk Spanyol)",
      "KEUNTUNGAN BELANJA DI SPANYOL (Sistem DIVA Tax Free): Spanyol TIDAK MEMILIKI BATAS MINIMAL BELANJA untuk mengklaim Tax Refund PPN! Anda bisa memvalidasi formulir DIVA secara mandiri di kios digital bandara Madrid atau Barcelona",
      "Destinasi favorit: Barcelona (Sagrada Familia, Park Guell), Madrid (Istana Kerajaan, Stadion Santiago Bernabeu), Sevilla, dan Granada"
    ]
  },
  {
    "countryCode": "AT",
    "countryName": "Austria",
    "flag": "🇦🇹",
    "region": "europe",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Makanan",
        "item": "Daging, Sosis, Rendang & Produk Olahan Susu",
        "status": "forbidden",
        "details": "Ketentuan terpadu Uni Eropa berlaku penuh di Bandara Wina (VIE); makanan hewani dari luar UE dilarang masuk."
      },
      {
        "category": "Baterai",
        "item": "Powerbank",
        "status": "conditional",
        "details": "Wajib di bagasi kabin (Austrian Airlines: maks 100Wh). Dilarang di bagasi check-in.",
        "conditions": "Kabin pesawat"
      },
      {
        "category": "Vape",
        "item": "Vape / E-Cigarette",
        "status": "conditional",
        "details": "Diizinkan untuk konsumsi pribadi di kabin (maks 100ml liquid).",
        "conditions": "Di kabin pesawat"
      }
    ],
    "shipRules": [
      {
        "category": "Pelayaran Sungai Donau (Vienna - Budapest - Bratislava)",
        "item": "Pengawasan Pabean Sungai Eropa Tengah",
        "status": "conditional",
        "details": "Pemeriksaan kepatuhan pabean Schengen untuk kapal pesiar sungai internasional."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "€430 per penumpang dewasa lewat jalur udara (€150 usia <15 tahun)",
        "details": "Pembebasan bea masuk dan PPN Uni Eropa untuk barang keperluan pribadi dan hadiah."
      },
      {
        "category": "Rokok",
        "limit": "200 batang rokok / 100 cigarillos / 50 cerutu / 250g tembakau",
        "details": "Bebas bea untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Alkohol",
        "limit": "1 liter alkohol keras (>22%), atau 2 liter fortified wine, plus 4 liter wine, 16 liter bir",
        "details": "Untuk penumpang berusia 17 tahun ke atas."
      },
      {
        "category": "Uang Tunai",
        "limit": "€10.000 atau setara valas",
        "details": "Deklarasi wajib kepada Zollamt Österreich jika membawa uang tunai senilai €10.000 ke atas."
      }
    ],
    "quarantineInfo": [
      "Pengawasan karantina veteriner ketat dari Kementerian Sosial dan Kesehatan Austria untuk produk satwa liar",
      "Hewan peliharaan: wajib microchip, paspor hewan UE, dan vaksinasi rabies resmi"
    ],
    "generalNotes": [
      "WNI memerlukan VISA SCHENGEN (diproses via VFS Global Austria)",
      "Pembelian barang belanjaan minimal €75 di Austria berhak mendapatkan Tax Refund PPN turis di bandara Wina (Schwechat)",
      "Destinasi populer: Vienna (Istana Schönbrunn, Opera), desa dongeng Hallstatt, dan kota Mozart di Salzburg"
    ]
  },
  {
    "countryCode": "AU",
    "countryName": "Australia",
    "flag": "🇦🇺",
    "region": "other",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Makanan",
        "item": "Buah/Sayuran Segar",
        "status": "forbidden",
        "details": "Dilarang masuk tanpa izin impor. Wajib deklarasi. Risiko denda AUD 222+."
      },
      {
        "category": "Makanan",
        "item": "Daging/Produk Hewani",
        "status": "forbidden",
        "details": "Daging segar/beku dilarang. Produk kemasan pabrik bisa diizinkan jika dideklarasikan."
      },
      {
        "category": "Makanan",
        "item": "Makanan Kemasan Pabrikan",
        "status": "conditional",
        "details": "Boleh jika dideklarasikan. Bisa diizinkan setelah pemeriksaan biosecurity.",
        "conditions": "Wajib deklarasi di formulir Incoming Passenger Card"
      },
      {
        "category": "Tanaman",
        "item": "Tanaman/Bibit/Tanah",
        "status": "forbidden",
        "details": "Dilarang keras. Australia sangat melindungi ekosistemnya."
      },
      {
        "category": "Kayu",
        "item": "Produk Kayu Mentah/Jerami/Rotan Alami",
        "status": "conditional",
        "details": "Wajib deklarasi dan pemeriksaan biosecurity."
      },
      {
        "category": "Obat",
        "item": "Obat-obatan Keras",
        "status": "conditional",
        "details": "Bawa resep dokter. Beberapa obat dilarang di Australia."
      }
    ],
    "shipRules": [
      {
        "category": "Biosecurity",
        "item": "Semua Produk Pertanian",
        "status": "conditional",
        "details": "Aturan biosecurity Australia sangat ketat untuk jalur laut juga."
      }
    ],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "AUD 900 per orang (≥18 tahun)",
        "details": "AUD 450 untuk anak di bawah 18 tahun. Kelebihan dikenakan GST 10% dan bea masuk."
      },
      {
        "category": "Rokok",
        "limit": "25 batang atau 25g tembakau",
        "details": "Per orang berusia ≥18 tahun. Rokok Australia sangat mahal karena cukai tinggi."
      },
      {
        "category": "Alkohol",
        "limit": "2.25 liter total",
        "details": "Untuk penumpang berusia ≥18 tahun."
      },
      {
        "category": "Uang Tunai",
        "limit": "AUD 10.000+",
        "details": "Wajib deklarasi jika membawa uang tunai atau monetary instruments senilai AUD 10.000 atau lebih."
      }
    ],
    "quarantineInfo": [
      "WAJIB: Isi Incoming Passenger Card (IPC) dengan jujur sebelum mendarat",
      "Semua makanan, tanaman, dan produk hewan WAJIB dideklarasikan meski ada kemungkinan boleh masuk",
      "Denda minimum AUD 222 untuk non-deklarasi barang yang seharusnya dilaporkan",
      "Indonesia masuk kategori risiko rabies tinggi — hewan peliharaan perlu karantina minimal 10 hari"
    ],
    "generalNotes": [
      "Australia Biosecurity adalah yang paling ketat di dunia — selalu deklarasikan jika ragu",
      "Biosecurity detection dogs berpatroli di area kedatangan bandara Australia",
      "Petugas berwenang dapat menyita dan memusnahkan barang yang tidak dideklarasikan"
    ]
  },
  {
    "countryCode": "US",
    "countryName": "Amerika Serikat",
    "flag": "🇺🇸",
    "region": "other",
    "lastUpdated": "2025-01",
    "planeRules": [
      {
        "category": "Cairan",
        "item": "Cairan/Aerosol/Gel (3-1-1 Rule)",
        "status": "conditional",
        "details": "TSA 3-1-1: Masing-masing ≤3.4oz (100ml), dalam 1 quart (≈1L) zip-lock, 1 tas per penumpang.",
        "conditions": "Untuk kabin pesawat"
      },
      {
        "category": "Baterai",
        "item": "Powerbank/Baterai Litium",
        "status": "conditional",
        "details": "Standar FAA: ≤100Wh di kabin (tanpa izin), 100–160Wh boleh dengan izin maskapai. Wajib di kabin.",
        "conditions": "Di kabin saja"
      },
      {
        "category": "Senjata Api",
        "item": "Senjata Api",
        "status": "conditional",
        "details": "Boleh di bagasi check-in jika dideklarasikan, dalam wadah terkunci keras, tanpa peluru di senjata. Ikuti aturan TSA dan maskapai.",
        "conditions": "Bagasi check-in, dideklarasikan, terkunci"
      },
      {
        "category": "Makanan",
        "item": "Produk Pertanian/Daging Segar",
        "status": "conditional",
        "details": "CBP (Customs & Border Protection) sangat ketat. Banyak produk daging, buah, sayuran dari Indonesia dilarang masuk.",
        "conditions": "Deklarasikan semua produk pertanian di kartu CBP"
      }
    ],
    "shipRules": [],
    "customsLimits": [
      {
        "category": "Barang Belanjaan",
        "limit": "USD 800 per orang",
        "details": "Duty-free exemption. Kelebihan dikenakan bea masuk."
      },
      {
        "category": "Rokok",
        "limit": "200 batang (1 karton)",
        "details": "Duty-free untuk orang berusia ≥21 tahun."
      },
      {
        "category": "Alkohol",
        "limit": "1 liter",
        "details": "Duty-free untuk orang berusia ≥21 tahun."
      },
      {
        "category": "Uang Tunai",
        "limit": "USD 10.000+",
        "details": "Wajib deklarasi ke CBP. Tidak ilegal membawa lebih, tapi wajib dilaporkan."
      }
    ],
    "quarantineInfo": [
      "WAJIB isi formulir CBP 6059B (Customs Declaration) di pesawat atau CBP Mobile Passport app",
      "Buah dan sayuran segar dari banyak negara Asia dilarang masuk AS",
      "Daging dari Indonesia: umumnya dilarang masuk AS"
    ],
    "generalNotes": [
      "Visa/ESTA: Warga Indonesia memerlukan visa B1/B2 untuk tujuan pariwisata atau bisnis",
      "Beberapa negara bagian memiliki aturan lokal yang lebih ketat (misal: California untuk tanaman)",
      "Ganja/cannabis: meski legal di beberapa negara bagian, DILARANG di tingkat federal dan tidak boleh dibawa lintas negara/ke luar AS"
    ]
  }
];
