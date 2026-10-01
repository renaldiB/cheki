'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { getLocalStorage, STORAGE_KEYS } from '@/lib/storage';
import { PackingList } from '@/types/luggage';
import { Radar, Compass, Calculator, ClipboardCheck, Luggage } from 'lucide-react';

const navItems = [
  { href: '/', label: 'AI Luggage Scanner', shortLabel: 'Scanner', icon: Radar },
  { href: '/regulations', label: 'Panduan Negara & Pelabuhan', shortLabel: 'Direktori', icon: Compass },
  { href: '/customs', label: 'Simulasi Bea Cukai', shortLabel: 'Bea Cukai', icon: Calculator },
  { href: '/checklist', label: 'Packing Checklist', shortLabel: 'Checklist', icon: ClipboardCheck },
];

export default function Navbar() {
  const pathname = usePathname();
  const [checklistCount, setChecklistCount] = useState<number>(0);

  useEffect(() => {
    const updateCount = () => {
      const lists = getLocalStorage<PackingList[]>(STORAGE_KEYS.PACKING_LISTS, []);
      const count = lists[0]?.items?.length || 0;
      setChecklistCount(count);
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    window.addEventListener('checklist-updated', updateCount);
    return () => {
      window.removeEventListener('storage', updateCount);
      window.removeEventListener('checklist-updated', updateCount);
    };
  }, []);

  return (
    <>
      {/* Top Floating Header (Desktop, Tablet & Mobile) */}
      <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-2 pb-1 pointer-events-none">
        <div className="max-w-[1280px] mx-auto h-16 md:h-18 bg-white/95 rounded-full px-3.5 sm:px-5 flex items-center justify-between border border-slate-200 shadow-sm pointer-events-auto">
          {/* Brand Logo with Cheki Mascot */}
          <div className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2 group active:scale-[0.98] transition-transform">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0 transition-transform duration-200 group-hover:scale-105">
                <img
                  src="/images/cheki-mascot.png"
                  alt="Chekii Mascot Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                  Chekii
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 font-mono text-[10px] font-semibold border border-sky-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600 animate-pulse"></span>
                  <span>AI</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop & Tablet Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100 rounded-full border border-slate-200/80">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    'px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full font-semibold text-xs transition-all flex items-center gap-1.5 active:scale-[0.98]',
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                  )}
                >
                  <Icon size={15} strokeWidth={2} />
                  <span>{label}</span>
                  {href === '/checklist' && checklistCount > 0 && (
                    <span
                      className={clsx(
                        'px-1.5 py-0.2 rounded-full text-[10px] font-bold font-mono',
                        isActive ? 'bg-white text-sky-700' : 'bg-slate-200 text-slate-700'
                      )}
                    >
                      {checklistCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Status Capsules & Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 font-mono text-[11px] font-medium border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>ICAO &amp; Bea Cukai 2025</span>
            </div>

            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-mono text-[11px] border border-slate-200/60">
              <span className="text-slate-500 font-medium">USD/IDR</span>
              <span className="font-semibold text-slate-800">16.250</span>
            </div>

            {/* Quick Checklist Shortcut Pill */}
            <Link
              href="/checklist"
              className="relative p-2 rounded-full bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200 hover:border-sky-300 transition-all flex items-center justify-center active:scale-[0.98]"
              title="Packing Checklist"
            >
              <Luggage size={18} strokeWidth={2} />
              {checklistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-600 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                  {checklistCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Floating Bottom Dock */}
      <nav className="lg:hidden fixed bottom-3 inset-x-3 z-[99999] bg-white border border-slate-200/90 rounded-2xl p-1 shadow-lg max-w-md mx-auto">
        <div className="flex items-center justify-around">
          {navItems.map(({ href, shortLabel, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative flex-1 active:scale-[0.98]',
                  isActive
                    ? 'text-sky-600 font-semibold'
                    : 'text-slate-500 hover:text-slate-900 font-medium'
                )}
              >
                <div
                  className={clsx(
                    'p-1.5 rounded-lg transition-colors',
                    isActive ? 'bg-sky-50 text-sky-600' : ''
                  )}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight font-medium">{shortLabel}</span>
                {href === '/checklist' && checklistCount > 0 && (
                  <span className="absolute top-1 right-3 w-4 h-4 text-[9px] font-mono font-bold bg-sky-600 text-white rounded-full flex items-center justify-center shadow-sm">
                    {checklistCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
