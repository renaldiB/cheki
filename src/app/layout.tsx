import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Chekii – Cek Kepatuhan Barang Bawaan Pesawat & Kapal Laut',
  description:
    'Aplikasi pintar inspeksi barang bawaan perjalanan internasional & domestik dengan AI. Dilengkapi panduan resmi Bea Cukai, aturan ICAO/IMO, dan packing checklist.',
  keywords: [
    'barang bawaan pesawat',
    'aturan bagasi kapal pelni',
    'aturan powerbank kabin',
    'bea cukai indonesia',
    'registrasi imei',
    'karantina australia',
    'chekii',
  ],
  authors: [{ name: 'Chekii Travel Compliance' }],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/images/cheki-mascot.png', type: 'image/png' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-brand-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
