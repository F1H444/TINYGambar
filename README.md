# ⚡ TINYGambar

![Banner Image](public/opengraph-image.png) 
<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-f0f?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

**Konversi gambar sat-set, tanpa upload server, privasi 100% aman.**
<br />
Ubah PNG/JPG/GIF menjadi WebP dengan gaya _Neo-Brutalism_.

</div>

---

## 📖 Tentang Project

**TinyGambar** adalah aplikasi web modern untuk mengoptimalkan ukuran gambar (kompresi dan konversi ke WebP) yang berjalan sepenuhnya di sisi klien (*client-side*). 

Tidak ada gambar yang diunggah ke server. Semua proses "sihir" terjadi langsung di browser pengguna menggunakan kekuatan modern web API. Ini berarti prosesnya **super cepat**, hemat kuota upload, dan **privasi pengguna terjamin**.

Dibangun dengan desain *Neo-Brutalism* yang berani, menggunakan warna kuning mencolok, border tebal, dan bayangan keras.

## ✨ Fitur Utama

* **🔒 100% Client-Side:** Gambar tidak pernah meninggalkan perangkat Anda. Aman!
* **🚀 Performa Kilat:** Dibangun dengan Next.js 16 (App Router) terbaru.
* **📦 Konversi Massal:** Drag & drop banyak gambar sekaligus.
* **💾 Auto-Zip:** Unduh semua hasil konversi dalam satu file `.zip` rapi.
* **🎨 Desain Brutalist:** UI yang unik, responsif, dan penuh animasi interaktif (Framer Motion).
* **📱 Responsive:** Tampil ciamik di desktop maupun mobile.

## 🛠️ Tech Stack

Project ini dibuat menggunakan teknologi terkini:

-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Alpha/Beta features included)
-   **Animation:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/) & React Icons
-   **Utilities:**
    -   `jszip` (Untuk membungkus file hasil)
    -   `react-dropzone` (Drag & drop area)
    -   `file-saver` (Menangani download)

## 🚀 Cara Menjalankan (Local Development)

Ikuti langkah ini untuk menjalankan project di komputer kamu:

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/username/tinygambar.git](https://github.com/username/tinygambar.git)
    cd tinygambar
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # atau
    yarn install
    # atau
    pnpm install
    # atau
    bun install
    ```

3.  **Jalankan development server:**
    ```bash
    npm run dev
    ```

4.  **Buka browser:**
    Kunjungi [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

## 📂 Struktur Folder

```bash
tinygambar/
├── app/                 # Next.js App Router (Pages & Layouts)
│   ├── (landingpage)/   # Group route untuk halaman utama
│   │   ├── hero.tsx     # Komponen utama konverter
│   │   ├── fitur.tsx    # Bagian fitur
│   │   └── ...
│   ├── globals.css      # Global styles (Tailwind imports)
│   └── layout.tsx       # Root layout
├── components/          # Reusable components (Navbar, Footer)
├── public/              # Static assets
├── tailwind.config.js   # Konfigurasi Tailwind (Shadow brutalist, dll)
└── ...
