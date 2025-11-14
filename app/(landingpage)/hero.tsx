"use client";

import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  FiUploadCloud,
  FiFile,
  FiLoader,
  FiCheckCircle,
  FiDownload,
  FiInfo,
  FiX,
} from "react-icons/fi";
import JSZip from "jszip";
import { saveAs } from "file-saver";

type UploadedFile = File & { preview: string };

interface ConvertedFile {
  blob: Blob;
  name: string;
}

export default function HeroConverter() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[] | null>(
    null
  );

  const [format, setFormat] = useState("image/webp");
  const [quality, setQuality] = useState(0.8);
  const [estimatedSize, setEstimatedSize] = useState<number | null>(null);

  // Estimasi ukuran file berdasarkan kualitas
  useEffect(() => {
    if (files.length > 0) {
      const totalOriginalSize = files.reduce((acc, file) => acc + file.size, 0);

      // Estimasi berdasarkan format dan kualitas
      let compressionFactor = quality;

      if (format === "image/webp") {
        compressionFactor = quality * 0.7; // WebP lebih efisien
      } else if (format === "image/jpeg") {
        compressionFactor = quality * 0.85;
      } else if (format === "image/png") {
        compressionFactor = 1.0; // PNG lossless
      }

      const estimated = totalOriginalSize * compressionFactor;
      setEstimatedSize(estimated);
    } else {
      setEstimatedSize(null);
    }
  }, [files, format, quality]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setConvertedFiles(null);
    setFiles((prevFiles: UploadedFile[]) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  }, []);

  const removeFile = (index: number) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".svg"],
    },
    noClick: false,
    noKeyboard: false,
    multiple: true,
  });

  const convertImage = (
    file: File,
    targetFormat: string,
    targetQuality: number
  ): Promise<ConvertedFile> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        if (typeof e.target?.result !== "string") {
          return reject(new Error("Gagal membaca file"));
        }
        img.src = e.target.result;
      };

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          return reject(new Error("Gagal mendapatkan konteks canvas"));
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error("Gagal membuat blob dari canvas"));
            }
            const originalName = file.name.split(".").slice(0, -1).join(".");
            const newExtension = targetFormat.split("/")[1];
            const newName = `${originalName}.${newExtension}`;

            resolve({ blob, name: newName });
          },
          targetFormat,
          targetQuality
        );
      };

      img.onerror = () => {
        reject(new Error("Gagal memuat gambar"));
      };

      reader.readAsDataURL(file);
    });
  };

  const handleConversion = async () => {
    if (files.length === 0) return;

    setIsConverting(true);
    setConvertedFiles(null);

    try {
      const conversionPromises = files.map((file: File) =>
        convertImage(file, format, quality)
      );
      const results = await Promise.all(conversionPromises);

      setConvertedFiles(results);
      console.log("Konversi berhasil!", results);
    } catch (error) {
      console.error("Error selama konversi:", error);
    } finally {
      setIsConverting(false);
      setFiles([]);
    }
  };

  const handleDownload = async () => {
    if (!convertedFiles || convertedFiles.length === 0) return;

    const zip = new JSZip();

    convertedFiles.forEach((file: ConvertedFile) => {
      zip.file(file.name, file.blob);
    });

    try {
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "hasil-konversi.zip");
    } catch (error) {
      console.error("Gagal membuat file zip:", error);
    } finally {
      setConvertedFiles(null);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center p-4 md:p-8 bg-yellow-300 relative overflow-hidden">
      {/* Elemen Latar Belakang Brutalist */}
      <div className="absolute inset-0 -skew-y-6 flex flex-col justify-around opacity-10 pointer-events-none">
        <MarqueeText text="KONVERSI GAMBAR" direction="left" />
        <MarqueeText text="CEPAT & AMAN" direction="right" />
        <MarqueeText text="PNG JPG GIF -> WEBP" direction="left" />
      </div>

      <motion.div
        className="w-full max-w-3xl z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* JUDUL DAN SUB-JUDUL */}
        <motion.div
          variants={itemVariants}
          className="bg-white border-4 border-black p-6 rounded-lg shadow-brutalist mb-8"
        >
          <motion.h1 className="text-4xl md:text-6xl font-extrabold text-black mb-3 text-center">
            TINYGambar
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-black text-center">
            Ubah PNG, JPG, GIF ke{" "}
            <span className="font-bold border-2 border-black bg-yellow-300 py-1 px-2">
              WebP
            </span>
            . Cepat, Aman, Tanpa Upload Server.
          </motion.p>
        </motion.div>

        {/* KOTAK UPLOAD */}
        {files.length === 0 && !convertedFiles && (
          <div {...getRootProps()}>
            <motion.div
              variants={itemVariants}
              className={`w-full h-64 p-8 bg-white border-4 border-black rounded-lg
                          flex flex-col items-center justify-center text-center
                          cursor-pointer transition-all duration-200
                          shadow-brutalist hover:shadow-brutalist-hover focus:outline-none`}
              animate={{
                scale: isDragActive ? 1.05 : 1,
                backgroundColor: isDragActive ? "#000000" : "#FFFFFF",
                color: isDragActive ? "#FFFF00" : "#000000",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <input {...getInputProps()} />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <FiUploadCloud size={64} />
              </motion.div>
              <p className="text-xl font-bold mt-4">
                {isDragActive
                  ? "LEPASKAN SEKARANG!"
                  : "Seret file ke sini, atau klik untuk memilih."}
              </p>
              <p className="text-sm mt-2">(Maks. 10MB per file)</p>
            </motion.div>
          </div>
        )}

        {/* DAFTAR FILE & OPSI KONVERSI */}
        {files.length > 0 && (
          <motion.div
            className="w-full mt-8 bg-white border-4 border-black rounded-lg p-6 shadow-brutalist"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-xl font-bold mb-4 text-black">
              File Siap Dikonversi ({files.length}):
            </h3>

            {/* Daftar File */}
            <div className="max-h-48 overflow-y-auto mb-4 border-2 border-black p-2 bg-gray-50 rounded-md">
              {files.map((file: UploadedFile, i: number) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 text-black hover:bg-gray-100 rounded"
                >
                  <span className="flex items-center gap-2 truncate flex-1">
                    <FiFile />
                    <span className="font-medium truncate">{file.name}</span>
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm text-gray-600">
                      {formatBytes(file.size)}
                    </span>
                    <button
                      onClick={() => removeFile(i)}
                      className="p-1 hover:bg-red-100 rounded-full transition-colors"
                      title="Hapus file"
                    >
                      <FiX className="text-red-600" size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Size Info */}
            <div className="mb-4 p-3 bg-yellow-100 border-2 border-black rounded-lg">
              <div className="flex items-start gap-2 text-black">
                <FiInfo className="mt-1 shrink-0" />
                <div className="text-sm">
                  <p className="font-bold">
                    Ukuran Total Asli:{" "}
                    {formatBytes(files.reduce((acc, f) => acc + f.size, 0))}
                  </p>
                  {estimatedSize && (
                    <p className="mt-1">
                      Estimasi Ukuran Setelah Konversi:{" "}
                      <span className="font-bold text-green-700">
                        {formatBytes(estimatedSize)}
                      </span>{" "}
                      (~
                      {Math.round(
                        (estimatedSize /
                          files.reduce((acc, f) => acc + f.size, 0)) *
                          100
                      )}
                      % dari ukuran asli)
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Opsi Konfigurasi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label
                  htmlFor="format"
                  className="block text-sm font-bold text-black mb-1"
                >
                  Format Tujuan:
                </label>
                <select
                  id="format"
                  value={format}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setFormat(e.target.value)
                  }
                  className="w-full p-2 border-2 border-black rounded-lg font-bold bg-white text-black"
                >
                  <option value="image/webp">WebP</option>
                  <option value="image/jpeg">JPEG</option>
                  <option value="image/png">PNG</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="quality"
                  className="block text-sm font-bold text-black mb-1"
                >
                  Kualitas: {(quality * 100).toFixed(0)}%
                </label>
                <input
                  id="quality"
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={quality}
                  disabled={format === "image/png"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setQuality(parseFloat(e.target.value))
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
                {format === "image/png" && (
                  <p className="text-xs text-gray-600 mt-1">
                    PNG adalah format lossless (kualitas tidak berpengaruh)
                  </p>
                )}
              </div>
            </div>

            {/* Tombol Aksi */}
            <motion.button
              onClick={handleConversion}
              disabled={isConverting}
              className={`w-full p-4 mt-4 text-xl font-bold border-4 border-black rounded-lg
                          shadow-brutalist hover:shadow-brutalist-hover
                          flex items-center justify-center gap-3
                          transition-all duration-150
                          ${
                            isConverting
                              ? "bg-gray-400 text-gray-800 animate-pulse"
                              : "bg-yellow-300 text-black hover:bg-black hover:text-yellow-300"
                          }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isConverting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <FiLoader />
                  </motion.div>
                  MEMPROSES...
                </>
              ) : (
                `KONVERSI ${files.length} GAMBAR`
              )}
            </motion.button>
          </motion.div>
        )}

        {/* HASIL KONVERSI */}
        {convertedFiles && convertedFiles.length > 0 && (
          <motion.div
            className="w-full mt-8 bg-white border-4 border-black rounded-lg p-6 shadow-brutalist text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <FiCheckCircle
                size={64}
                className="text-green-500 mx-auto mb-4"
              />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4 text-black">
              Konversi Berhasil!
            </h3>
            <p className="text-lg mb-2 text-black">
              {convertedFiles.length} file telah dikonversi.
            </p>
            <p className="text-sm text-gray-700 mb-6">
              Total ukuran:{" "}
              {formatBytes(
                convertedFiles.reduce((acc, f) => acc + f.blob.size, 0)
              )}
            </p>
            <motion.button
              onClick={handleDownload}
              className={`w-full p-4 text-xl font-bold border-4 border-black rounded-lg
                          shadow-brutalist hover:shadow-brutalist-hover
                          flex items-center justify-center gap-3
                          bg-yellow-300 text-black hover:bg-black hover:text-yellow-300
                          transition-all duration-150`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiDownload />
              UNDUH SEMUA ({convertedFiles.length}) SEBAGAI .ZIP
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

const MarqueeText = ({
  text,
  direction = "left",
}: {
  text: string;
  direction: "left" | "right";
}) => (
  <div className="w-full overflow-hidden">
    <motion.div
      className="flex whitespace-nowrap"
      animate={{
        x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      }}
      transition={{
        ease: "linear",
        duration: 20,
        repeat: Infinity,
      }}
    >
      <span className="text-6xl font-extrabold text-black opacity-20 mx-4">
        {text}
      </span>
      <span className="text-6xl font-extrabold text-black opacity-20 mx-4">
        {text}
      </span>
      <span className="text-6xl font-extrabold text-black opacity-20 mx-4">
        {text}
      </span>
      <span className="text-6xl font-extrabold text-black opacity-20 mx-4">
        {text}
      </span>
    </motion.div>
  </div>
);
