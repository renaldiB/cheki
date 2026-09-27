import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-xl border-t border-cyan-100/90 text-slate-600 text-xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0">
              <img
                src="/images/cheki-mascot.png"
                alt="Cheki Mascot"
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm tracking-tight">
                Cheki Travel Compliance AI
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Sistem Inspeksi Kepatuhan Bagasi Pesawat &amp; Pelayaran Terpadu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs font-bold text-slate-500 font-mono">
            <Link href="/" className="hover:text-primary-container transition-colors">
              AI Scanner
            </Link>
            <Link href="/regulations" className="hover:text-primary-container transition-colors">
              Directory
            </Link>
            <Link href="/customs" className="hover:text-primary-container transition-colors">
              Customs &amp; Tax
            </Link>
            <Link href="/checklist" className="hover:text-primary-container transition-colors">
              Checklist
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p className="text-center sm:text-left leading-relaxed max-w-3xl">
            ⚠️ <strong>Disclaimer Regulasi:</strong> Aturan barang berbahaya penerbangan mengacu pada standar ICAO Annex 18 &amp; Ditjen Perhubungan Udara. Regulasi maritim mengacu pada standar IMO &amp; PT Pelni. Ketentuan pabean mengacu pada PMK 203/2017 Bea Cukai Indonesia. Selalu periksa kebijakan maskapai dan operator kapal sebelum keberangkatan.
          </p>
          <div className="shrink-0 font-mono font-bold text-slate-500">
            CHEKI-01 // AIRPORT READY
          </div>
        </div>
      </div>
    </footer>
  );
}
