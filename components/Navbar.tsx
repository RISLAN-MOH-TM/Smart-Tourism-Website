'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { CurrencySelector } from './CurrencySelector';
import { Menu, X, Phone, Mail, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { messages } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Always show navbar and close mobile menu when user navigates
  useEffect(() => {
    setVisible(true);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock background scroll when mobile menu is open on iOS / mobile
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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
            // Scrolling down -> hide navbar (unless mobile menu is active)
            if (!mobileMenuOpen) {
              setVisible(false);
            }
          } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 10) {
            // Scrolling up -> show navbar
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
      <div className="bg-stone-100 text-stone-600 text-[11px] sm:text-xs border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-3 sm:gap-4 truncate">
            <a
              href="tel:+94112437050"
              className="flex items-center gap-1 hover:text-emerald-800 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" />
              <span>+94 11 243 7050</span>
            </a>
            <a
              href="mailto:travel@smart-tourism.lk"
              className="hidden sm:flex items-center gap-1 hover:text-emerald-800 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-800 flex-shrink-0" />
              <span>travel@smart-tourism.lk</span>
            </a>
          </div>
          <span className="text-stone-500 text-[10px] sm:text-xs hidden xs:inline truncate">
            Official Sri Lanka Tourism Discovery Portal
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 gap-2">
          {/* Logo & Brand with Real logo.jpg */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group min-w-0 flex-1 max-w-[calc(100%-56px)] lg:max-w-none"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-stone-300 shadow-xs flex-shrink-0 bg-white">
              <Image
                src="/logo.jpg"
                alt="Smart Tourism Sri Lanka Logo"
                fill
                priority
                sizes="(max-width: 640px) 40px, 48px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block font-serif text-sm sm:text-lg lg:text-xl font-bold tracking-tight text-emerald-950 leading-tight truncate">
                {messages.nav.brand}
              </span>
              <span className="block text-[9px] sm:text-[10px] tracking-wider uppercase text-stone-500 font-medium truncate">
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

          {/* Mobile Hamburger Button - Perfectly centered & aligned on iPhone */}
          <div className="flex lg:hidden items-center flex-shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-stone-200 bg-stone-50 text-stone-700 hover:text-stone-900 hover:bg-stone-100 active:bg-stone-200 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-stone-900" />
              ) : (
                <Menu className="w-5 h-5 text-stone-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-8 shadow-xl max-h-[calc(100vh-64px)] overflow-y-auto">
          {/* Mobile Controls: Language & Currency */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded-lg border border-stone-200 shadow-xs mb-3">
            <div>
              <span className="block text-[11px] text-stone-500 uppercase font-semibold mb-1.5">
                Language
              </span>
              <LanguageSelector />
            </div>
            <div>
              <span className="block text-[11px] text-stone-500 uppercase font-semibold mb-1.5">
                Currency
              </span>
              <CurrencySelector />
            </div>
          </div>

          {/* Mobile Nav Links */}
          <div className="flex flex-col space-y-1 text-sm font-medium text-stone-800">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-3 rounded-md transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-100/70 font-bold text-emerald-950'
                      : 'hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <ArrowRight className="w-4 h-4 text-emerald-800" />}
                </Link>
              );
            })}

            <Link
              href="/#enquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3.5 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white rounded-lg text-center font-semibold mt-3 shadow-sm transition-colors"
            >
              {messages.nav.enquiry}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
