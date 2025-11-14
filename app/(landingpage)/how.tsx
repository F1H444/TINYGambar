"use client";

import React from "react";
import { motion } from "framer-motion";

// Data untuk langkah-langkah, agar mudah di-edit
const steps = [
  {
    number: "1",
    title: "Unggah Gambar",
    description:
      "Seret & lepas file Anda ke kotak di atas. Konversi massal? Tentu saja bisa.",
  },
  {
    number: "2",
    title: "Atur Format",
    description:
      "Pilih format output (WebP, JPG) dan atur kualitas gambar sesuka Anda.",
  },
  {
    number: "3",
    title: "Unduh .Zip",
    description:
      "Semua file dikonversi di browser Anda, lalu di-zip. Cepat, aman, dan instan.",
  },
];

// Varian animasi untuk Framer Motion
const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Setiap anak akan muncul 0.2s setelah sebelumnya
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50, // Mulai dari 50px di bawah
  },
  visible: {
    opacity: 1,
    y: 0, // Kembali ke posisi 0
    transition: {
      type: "spring", // Animasi pegas
      stiffness: 100,
      damping: 10,
    },
  },
};

export default function HowItWorks() {
  return (
    <section className="w-full bg-white py-24 px-4 md:px-8 border-t-4 border-black overflow-hidden" id="how-it-works">
      {/* Kontainer miring untuk efek dinamis */}
      <motion.div
        className="max-w-6xl mx-auto -skew-y-3" // <-- EFEK MIRING BRUTALIST
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Trigger saat 20% terlihat
      >
        {/* === JUDUL BAGIAN === */}
        <motion.div
          className="skew-y-3" // <-- Luruskan kembali konten di dalamnya
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 text-center">
            PROSES ANTI RIBET
          </h2>
          <p className="text-xl text-black text-center mb-16 max-w-2xl mx-auto">
            Tidak perlu server. Tidak perlu menunggu. Semuanya terjadi 100% di
            browser Anda.
          </p>
        </motion.div>

        {/* === GRID 3 LANGKAH === */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 skew-y-3" // <-- Luruskan kembali konten di dalamnya
          variants={gridVariants} // Terapkan varian container
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 border-4 border-black rounded-lg shadow-brutalist 
                         flex flex-col relative overflow-hidden
                         group" // <-- 'group' untuk hover
              variants={cardVariants} // Terapkan varian untuk setiap kartu
              // Animasi saat di-hover (Brutalist style)
              whileHover={{
                y: -8,
                boxShadow: "10px 10px 0px #000",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* EFEK HOVER: Latar belakang kuning muncul */}
              <div
                className="absolute inset-0 bg-yellow-300 transition-transform duration-300 ease-out
                            translate-y-full group-hover:translate-y-0 z-0"
              ></div>

              {/* Angka besar sebagai elemen desain */}
              <span
                className="absolute -top-4 -right-2 text-[120px] font-extrabold 
                             text-gray-100 group-hover:text-black 
                             group-hover:opacity-30 transition-all duration-300 z-10"
              >
                {step.number}
              </span>

              {/* Konten Kartu */}
              <div className="relative z-20">
                <h3 className="text-3xl font-extrabold text-black mb-3">
                  {step.title}
                </h3>
                <p className="text-base text-black leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
