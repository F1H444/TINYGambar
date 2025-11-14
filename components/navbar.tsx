"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks: NavLink[] = [
    { name: "Cara Kerja", href: "#how-it-works" },
    { name: "Fitur", href: "#features" },
    { name: "Mengapa?", href: "#why-webp" },
  ];

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-500 ${
          mounted ? "opacity-100" : "opacity-0"
        } ${scrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"}`}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`relative bg-gradient-to-br from-white to-gray-50 border-4 border-black transition-all duration-300 ${
              scrolled
                ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl"
                : "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl"
            }`}
          >
            {/* Desktop Layout */}
            <div className="hidden md:flex md:items-center md:justify-between w-full h-20 px-8 lg:px-12">
              {/* Logo */}
              <a
                href="#"
                className="group flex items-center gap-3 px-5 py-3 bg-black text-yellow-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(250,204,21,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(250,204,21,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-150 rounded-lg"
              >
                <div className="relative">
                  <div className="w-3 h-3 bg-yellow-300 rounded-sm animate-pulse" />
                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-base lg:text-lg font-black tracking-wider">
                  TINY<span className="text-white">Gambar</span>
                </span>
              </a>

              {/* Navigation - Right Side */}
              <nav className="flex items-center gap-8 lg:gap-12">
                {navLinks.map((link, idx) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`group relative font-black text-base lg:text-lg text-black hover:text-yellow-500 transition-all duration-300 ${
                      mounted
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-yellow-400 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex items-center justify-between w-full h-16 sm:h-20 px-4 sm:px-6">
              {/* Logo Mobile */}
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2.5 bg-black text-yellow-300 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] rounded-lg"
              >
                <div className="w-2.5 h-2.5 bg-yellow-300 rounded-sm animate-pulse" />
                <span className="text-sm font-black tracking-wider">
                  TINY<span className="text-white">Gambar</span>
                </span>
              </a>

              {/* Hamburger Button */}
              <button
                onClick={toggleMobileMenu}
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-br from-yellow-300 to-yellow-400 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] transition-all duration-150 rounded-lg"
                aria-label="Toggle menu"
              >
                <Menu
                  className="w-6 h-6 sm:w-7 sm:h-7 text-black"
                  strokeWidth={3}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-gradient-to-br from-black via-gray-900 to-black transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex flex-col">
          {/* Header Menu Mobile */}
          <div className="flex items-center justify-between h-20 sm:h-24 flex-shrink-0">
            <a
              href="#"
              onClick={toggleMobileMenu}
              className="flex items-center gap-2 px-4 py-3 bg-yellow-300 text-black border-3 border-yellow-300 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] rounded-lg"
            >
              <div className="w-2.5 h-2.5 bg-black rounded-sm" />
              <span className="text-sm font-black tracking-wider">
                TINYGambar
              </span>
            </a>
            <button
              onClick={toggleMobileMenu}
              className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-white/10 backdrop-blur-sm border-3 border-white/30 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all rounded-lg"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={3} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8 pb-20">
            {navLinks.map((link, idx) => (
              <a
                key={link.name}
                href={link.href}
                onClick={toggleMobileMenu}
                className={`group relative text-4xl sm:text-5xl lg:text-6xl font-black text-white hover:text-yellow-300 transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
                style={{ transitionDelay: `${idx * 100 + 200}ms` }}
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-2 bg-yellow-300 group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}