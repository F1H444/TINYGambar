"use client";

import { useState, useEffect } from "react";
import { Github, Twitter, Instagram, Zap, Image, Sparkles } from "lucide-react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: { currentTarget: { getBoundingClientRect: () => any; }; clientX: number; clientY: number; }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const socials = [
    { icon: Github, href: "#", name: "GitHub", color: "hover:bg-purple-500" },
    { icon: Twitter, href: "#", name: "Twitter", color: "hover:bg-blue-400" },
    {
      icon: Instagram,
      href: "#",
      name: "Instagram",
      color: "hover:bg-pink-500",
    },
  ];

  const features = [
    { icon: Zap, text: "Kompresi Cepat" },
    { icon: Image, text: "Kualitas Terjaga" },
    { icon: Sparkles, text: "Hasil Optimal" },
  ];

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* --- ZONA 1: AKSI (KUNING DENGAN GRADIENT) --- */}
      <div
        className="relative bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-400 text-black p-8 sm:p-12 lg:p-20 overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(#000 2px, transparent 2px), linear-gradient(to right, #000 2px, transparent 2px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Floating Circles */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-black/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl" />

          {/* Mouse Follow Effect */}
          <div
            className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl transition-all duration-300 pointer-events-none"
            style={{
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
            }}
          />
        </div>

        <div
          className={`relative z-10 max-w-7xl mx-auto transition-all duration-700 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="flex flex-col items-center text-center gap-12">
            {/* Teks Judul dengan Animasi */}
            <div className="space-y-6">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] text-black">
                SIAP OPTIMASI
                <br />
                <span className="inline-block bg-black text-yellow-300 px-4 py-2 mt-2 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  GAMBAR ANDA?
                </span>
              </h2>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 pt-4 justify-center">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-black/20 transition-all duration-300 hover:bg-black hover:text-yellow-300 hover:scale-105 ${
                      mounted
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: `${idx * 100 + 200}ms` }}
                  >
                    <feature.icon className="w-4 h-4" />
                    <span className="text-sm font-bold">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
