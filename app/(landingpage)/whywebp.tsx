"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
// Ikon untuk poin-poin manfaat
import { FiZap, FiTrendingUp, FiSmartphone } from "react-icons/fi";

// Varian animasi (konsisten dengan file lain)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

/**
 * Komponen Helper untuk Poin Manfaat
 */
const BenefitItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div className="flex items-start gap-4" variants={itemVariants}>
    {/* Ikon dengan style brutalist */}
    <div className="flex-shrink-0 text-black p-3 bg-yellow-300 border-4 border-black rounded-lg shadow-brutalist">
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-extrabold text-black mb-1">{title}</h3>
      <p className="text-lg text-black leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

/**
 * Komponen Utama: WhyWebP
 */
export default function WhyWebP() {
  return (
    <section className="w-full bg-white py-24 px-4 md:px-8 border-t-4 border-black" id="why-webp">
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* === KOLOM KIRI: VISUAL PERBANDINGAN === */}
        <motion.div
          className="relative h-72 md:h-96 flex items-center justify-center order-last md:order-first"
          variants={itemVariants}
        >
          {/* Gambar PNG (Besar) */}
          <motion.div
            className="w-64 h-64 bg-white border-4 border-black rounded-lg shadow-brutalist 
                       flex flex-col items-center justify-center p-4 
                       animate-float" // <-- Animasi dari config Anda
          >
            <span className="text-sm font-bold">GAMBAR.PNG</span>
            <div className="flex-1 w-full bg-gray-200 my-2 rounded border-2 border-black"></div>
            <span className="text-3xl font-extrabold text-black">1.2 MB</span>
          </motion.div>

          {/* Gambar WebP (Kecil) - Menimpa */}
          <motion.div
            className="absolute w-36 h-36 bg-yellow-300 border-4 border-black rounded-lg shadow-brutalist 
                       flex flex-col items-center justify-center p-2 
                       animate-float-fast" // <-- Animasi dari config Anda
            style={{ right: "10%", bottom: "10%" }}
          >
            <span className="text-xs font-bold">GAMBAR.WEBP</span>
            <div className="flex-1 w-full bg-black my-1 rounded"></div>
            <span className="text-xl font-extrabold text-black">210 KB</span>
          </motion.div>
        </motion.div>

        {/* === KOLOM KANAN: TEKS PENJELASAN === */}
        <motion.div variants={itemVariants}>
          <h2 className="text-5xl md:text-6xl font-extrabold text-black mb-6">
            MENGAPA UKURAN PENTING?
          </h2>
          <p className="text-xl text-black leading-relaxed mb-10">
            Format modern seperti{" "}
            <span className="font-bold border-2 border-black bg-yellow-300 py-1 px-2">
              WebP
            </span>
            memberikan kualitas visual yang sama dengan PNG/JPG, namun dengan
            ukuran file
            <strong className="underline decoration-4 decoration-yellow-300">
              {" "}
              30-50% lebih kecil
            </strong>
            .
          </p>

          {/* List Keuntungan */}
          <div className="space-y-6">
            <BenefitItem
              icon={<FiZap size={30} />}
              title="Website Super Cepat"
              description="Situs Anda dimuat instan. Pengguna tidak perlu menunggu, mengurangi 'bounce rate'."
            />
            <BenefitItem
              icon={<FiTrendingUp size={30} />}
              title="Peringkat SEO Lebih Baik"
              description="Google memberi hadiah pada situs yang cepat. Ukuran gambar yang kecil adalah kunci utama."
            />
            <BenefitItem
              icon={<FiSmartphone size={30} />}
              title="Hemat Kuota Pengguna"
              description="Pengguna mobile Anda akan berterima kasih karena Anda menghemat kuota data mereka."
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
