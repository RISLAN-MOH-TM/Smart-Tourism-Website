'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { CurrencySelector } from './CurrencySelector';
import { Menu, X, Phone, Mail } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { messages } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Always show navbar when user changes pages
  useEffect(() => {
    setVisible(true);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Auto-hide navbar on scroll down, show on scroll up
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Always show navbar if near the top
          if (currentScrollY <= 80) {
            setVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 10) {
            // Scrolling down significantly -> hide navbar
            if (!mobileMenuOpen) {
              setVisible(false);
            }
          } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 10) {
            // Scrolling up significantly -> show navbar
            setVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: messages.nav.home },
    { href: '/packages', label: messages.nav.packages },
    { href: '/trip-planner', label: messages.nav.tripPlanner },
    { href: '/destinations', label: messages.nav.destinations },
    { href: '/about', label: messages.nav.about },
    { href: '/reviews', label: messages.nav.reviews },
    { href: '/contact', label: messages.nav.contact },
  ];

  return (
    <header
      className={`sticky top-0 z-40 bg-white border-b border-stone-200 shadow-sm transition-transform duration-300 ease-in-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Top Utility Bar */}
      <div className="bg-stone-100 text-stone-600 text-xs border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-800" />
              +94 11 243 7050
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-emerald-800" />
              travel@smart-tourism.lk
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-stone-500 hidden sm:inline">
              Official Sri Lanka Tourism Discovery Portal
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 gap-2">
          {/* Logo & Brand with Real logo.jpg */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-stone-300 shadow-xs flex-shrink-0 bg-white">
              <Image
                src="/logo.jpg"
                alt="Smart Tourism Sri Lanka Logo"
                fill
                priority
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="block font-serif text-base sm:text-xl font-bold tracking-tight text-emerald-950 leading-tight">
                {messages.nav.brand}
              </span>
              <span className="block text-[9px] sm:text-[10px] tracking-wider uppercase text-stone-500 font-medium">
                Ceylon Travel Board • Est. 2026
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links - Flexible on lg and xl screens */}
          <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5 text-stone-700 font-medium text-xs xl:text-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-1 transition-colors hover:text-emerald-800 whitespace-nowrap ${
                    isActive
                      ? 'text-emerald-900 font-bold border-b-2 border-emerald-800'
                      : 'text-stone-700'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Selectors & CTA */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-3 flex-shrink-0">
            <LanguageSelector />
            <CurrencySelector />
            <Link
              href="/#enquiry"
              className="bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded text-xs font-semibold transition-colors shadow-sm whitespace-nowrap"
            >
              {messages.nav.enquiry}
            </Link>
          </div>

          {/* Mobile Menu & Language Toggle (< lg screens) */}
          <div className="flex lg:hidden items-center gap-1.5">
            <div className="sm:hidden">
              <LanguageSelector />
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-stone-700 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-stone-900" />
              ) : (
                <Menu className="w-6 h-6 text-stone-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-6 space-y-3 shadow-lg max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="text-xs text-stone-500 uppercase font-semibold">
              Currency
            </span>
            <CurrencySelector />
          </div>
          <div className="flex flex-col space-y-1 text-sm font-medium text-stone-800">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded hover:bg-stone-200 transition-colors ${
                  pathname === link.href ? 'bg-stone-200 font-bold text-emerald-900' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-emerald-800 text-white rounded text-center font-semibold mt-2 shadow-sm"
            >
              {messages.nav.enquiry}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
