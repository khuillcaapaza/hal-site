"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { site, navLinks } from "@/lib/site";

type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-green-900 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {site.emergencyLabel}
          </span>
          <div className="flex items-center gap-4">
            <a href={`tel:${site.contact.phoneRaw}`} className="hover:text-green-200 transition-colors">
              ☎ {site.contact.phone}
            </a>
            <span className="hidden sm:inline text-green-300">{site.location}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Hospital Antonio Lorena"
              width={56}
              height={56}
              className="w-14 h-14 object-contain"
              priority
            />
            <div className="hidden sm:block">
              <p className="text-green-900 font-bold text-base leading-tight">Hospital Antonio Lorena</p>
              <p className="text-gray-500 text-xs">del Cusco</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {(navLinks as NavLink[]).map((link) =>
              link.children ? (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-green-700 font-medium transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <svg className="w-3 h-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[210px]">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-600 hover:text-green-700 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contacto"
              className="bg-green-700 hover:bg-green-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              Contáctanos
            </a>
          </div>

          {/* Mobile burger */}
          <button
            className="lg:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2">
          {(navLinks as NavLink[]).map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className="block py-2 text-gray-700 hover:text-green-700 font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="pl-4 border-l border-gray-100 ml-1 mb-1">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-1.5 text-sm text-gray-500 hover:text-green-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a
            href="#contacto"
            className="mt-3 block w-full text-center bg-green-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full"
          >
            Contáctanos
          </a>
        </div>
      )}
    </header>
  );
}
