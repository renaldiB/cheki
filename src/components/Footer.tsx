import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 shrink-0">
              <img
                src="/images/cheki-mascot.png"
                alt="Chekii Mascot"
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm tracking-tight">
                Chekii Travel Compliance AI
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Sistem Inspeksi Kepatuhan Bagasi Pesawat &amp; Pelayaran Terpadu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs font-semibold text-slate-500 font-mono">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              AI Scanner
            </Link>
            <Link href="/regulations" className="hover:text-sky-600 transition-colors">
              Directory
            </Link>
            <Link href="/customs" className="hover:text-sky-600 transition-colors">
              Customs &amp; Tax
            </Link>
            <Link href="/checklist" className="hover:text-sky-600 transition-colors">
              Checklist
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p className="text-center sm:text-left leading-relaxed max-w-3xl">
            <AlertTriangle size={13} className="inline mr-1 text-slate-400 shrink-0" />
            <strong>Disclaimer Regulasi:</strong> Aturan barang berbahaya penerbangan mengacu pada standar ICAO Annex 18 &amp; Ditjen Perhubungan Udara. Regulasi maritim mengacu pada standar IMO &amp; PT Pelni. Ketentuan pabean mengacu pada PMK 203/2017 Bea Cukai Indonesia. Selalu periksa kebijakan maskapai dan operator kapal sebelum keberangkatan.
          </p>
          <div className="shrink-0 font-mono font-semibold text-slate-500">
            CHEKII-01 // AIRPORT READY
          </div>
        </div>
      </div>
    </footer>
  );
}
