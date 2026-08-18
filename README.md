# 📦 Istiqomah Stock - Aplikasi Manajemen Inventaris Offline-First (4 Lantai)

![Istiqomah Stock Logo](logo.svg)

**Istiqomah Stock** adalah sistem manajemen inventaris bertingkat 4 berbasis *offline-first* dengan antarmuka web modern, scanner barcode kamera interaktif, serta file instalasi mandiri **`Istiqomahstock.apk`** untuk gawai Android.

---

## 🌟 Fitur Utama

1. **100% Offline-First Engine:**
   - Beroperasi penuh tanpa ketergantungan koneksi internet.
   - Sinkronisasi instan ke penyimpanan lokal per gawai.
2. **Struktur Fisik 4 Lantai & Slot Terperinci:**
   - **Lantai 1:** Kebutuhan Sehari-Hari (Stock 1: Pempes, Stock 2: Sabun, Stock 3: Minyak, Stock 4: Sembako, dll).
   - **Lantai 2:** Pakaian & Fashion (Stock 1: Pria, Stock 2: Wanita, Stock 3: Anak, Stock 4: Gamis, dll).
   - **Lantai 3:** Perabotan & Home Living (Stock 1: Alat Masak, Stock 2: Toples, Stock 3: Lampu LED, dll).
   - **Lantai 4:** Gudang Utama & Buffer Induk (Buffer Sembako, Buffer Pakaian, Inbound Unboxing, Karantina Retur).
3. **Scanner Barcode & QR Code Interaktif:**
   - Scan kamera realtime dengan animasi laser garis merah dan reticle target.
   - Auto-lookup barang lintas lantai saat scan terdeteksi.
   - Dilengkapi audio beep sintetis Web Audio API dan haptic vibration.
   - Fallback input manual dan preset barcode simulasi.
4. **Dashboard Visual & Live Chart:**
   - Donut Chart SVG distribusi kuantitas stok 4 lantai.
   - Bar Chart Top 5 produk *fast-moving*.
   - Meteran rasio kesehatan stok (Aman, Menipis, Habis).
5. **Pelacakan Stok Habis & Rekomendasi Restock:**
   - Identifikasi otomatis barang kosong (0 pcs) dan menipis (≤ batas minimum).
   - Rekomendasi penarikan stok dari buffer Gudang Lantai 4 ke lantai display toko.
   - Ekspor laporan lokal ke format **CSV** dan cetak **PDF**.
6. **Desain UI/UX Ultra-Premium (Anti-AI Look):**
   - Palet warna eksklusif **Deep Obsidian** (`#090706`), **Roasted Mocha** (`#6E3B20`), dan **Crimson Ruby** (`#DC2626`).
   - Tombol 3D tactile dengan inset highlights dan efek kompresi fisik.
   - Navigasi drawer slide-in rapi di sudut kiri atas.

---

## 📱 File APK Android

File instalasi native Android APK mandiri:
- 📦 **`Istiqomahstock.apk`** *(Ukuran: 6.86 MB)*

---

## 📑 Dokumen Blueprint & Spesifikasi SRS

- 📄 **`Istiqomah_Stock_Perencanaan_Mobile_App.pdf`** *(Master Blueprint 9 Halaman)*
- 🌐 **`blueprint.html`** *(Source code HTML blueprint presisi cetak)*

---

## 🚀 Cara Menjalankan Versi Web Lokal

```bash
# Jalankan server lokal
node server.js
```
Akses melalui browser: `http://localhost:3000`

---

## 👨‍💻 Lisensi & Hak Cipta
© 2026 **Istiqomah Retail Group**. Seluruh hak cipta dilindungi undang-undang.
