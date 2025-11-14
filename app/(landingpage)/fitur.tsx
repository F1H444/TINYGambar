"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { FiLock, FiZap, FiBox, FiDollarSign } from "react-icons/fi";

// Data Fitur (Data Anda tidak berubah)
const features = [
  {
    icon: <FiLock size={40} />,
    title: "100% Aman & Privat",
    description:
      "Gambar Anda tidak pernah diunggah. Semua konversi dilakukan langsung di browser Anda. Aman.",
  },
  {
    icon: <FiZap size={40} />,
    title: "Super Cepat",
    description:
      "Tanpa upload, tanpa antrian. Konversi terjadi secepat komputer Anda bisa memprosesnya. Instan.",
  },
  {
    icon: <FiBox size={40} />,
    title: "Konversi Massal",
    description:
      "Seret puluhan file sekaligus. Kami akan mengkonversi semuanya dan memberikannya dalam satu file .zip.",
  },
  {
    icon: <FiDollarSign size={40} />,
    title: "Gratis Selamanya",
    description:
      "Tidak ada biaya tersembunyi, tidak ada langganan. Alat ini gratis untuk digunakan, kapanpun Anda mau.",
  },
];

// Varian animasi (Tidak berubah)
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

// =======================================================================
// ================== AWAL DARI PEROMBAKAN TAMPILAN ==================
// =======================================================================

export default function Features() {
  // Mendefinisikan class dasar untuk kartu agar mudah digunakan kembali
  const cardBaseClass =
    "bg-white border-4 border-black rounded-lg p-8 shadow-brutalist transition-all duration-200 hover:bg-black hover:text-white group";
  const cardHoverProps = {
    whileHover: { y: -8, boxShadow: "10px 10px 0px #000" },
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <section className="w-full bg-yellow-300 py-24 px-4 md:px-8 border-t-4 border-black" id="features">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold text-black mb-16 text-center"
          variants={itemVariants}
        >
          KENAPA HARUS PAKAI INI?
        </motion.h2>

        {/* TATA LETAK GRID ASIMETRIS BARU */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {/* Fitur 1: (Aman) - Memakan 2 kolom */}
          <motion.div
            className={`${cardBaseClass} md:col-span-2 md:flex items-center gap-8`}
            variants={itemVariants}
            {...cardHoverProps}
          >
            <div className="mb-5 md:mb-0 text-black group-hover:text-yellow-300 transition-colors flex-shrink-0">
              {features[0].icon}
            </div>
            <div>
              <h3 className="text-3xl font-extrabold mb-3 text-black group-hover:text-white transition-colors">
                {features[0].title}
              </h3>
              <p className="text-lg leading-relaxed text-black group-hover:text-white transition-colors">
                {features[0].description}
              </p>
            </div>
          </motion.div>

          {/* Fitur 2: (Cepat) - Memakan 1 kolom */}
          <motion.div
            className={`${cardBaseClass} flex flex-col items-center text-center`}
            variants={itemVariants}
            {...cardHoverProps}
          >
            <div className="mb-5 text-black group-hover:text-yellow-300 transition-colors">
              {features[1].icon}
            </div>
            <h3 className="text-2xl font-extrabold mb-3 text-black group-hover:text-white transition-colors">
              {features[1].title}
            </h3>
            <p className="text-base leading-relaxed text-black group-hover:text-white transition-colors">
              {features[1].description}
            </p>
          </motion.div>

          {/* Fitur 3: (Massal) - Memakan 1 kolom */}
          <motion.div
            className={`${cardBaseClass} flex flex-col items-center text-center`}
            variants={itemVariants}
            {...cardHoverProps}
          >
            <div className="mb-5 text-black group-hover:text-yellow-300 transition-colors">
              {features[2].icon}
            </div>
            <h3 className="text-2xl font-extrabold mb-3 text-black group-hover:text-white transition-colors">
              {features[2].title}
            </h3>
            <p className="text-base leading-relaxed text-black group-hover:text-white transition-colors">
              {features[2].description}
            </p>
          </motion.div>

          {/* Fitur 4: (Gratis) - Memakan 2 kolom */}
          <motion.div
            className={`${cardBaseClass} md:col-span-2 md:flex items-center gap-8`}
            variants={itemVariants}
            {...cardHoverProps}
          >
            <div className="mb-5 md:mb-0 text-black group-hover:text-yellow-300 transition-colors flex-shrink-0">
              {features[3].icon}
            </div>
            <div>
              <h3 className="text-3xl font-extrabold mb-3 text-black group-hover:text-white transition-colors">
                {features[3].title}
              </h3>
              <p className="text-lg leading-relaxed text-black group-hover:text-white transition-colors">
                {features[3].description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
