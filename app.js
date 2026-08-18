/**
 * ISTIQOMAH STOCK - OFFLINE-FIRST LOGIC ENGINE
 * Handles LocalStorage CRUD, Multi-Floor Navigation, Stock Thresholds, Dynamic SVG Charts, Reports & Barcode/QR Scanner
 * Styled strictly with custom thematic SVGs (No tacky emojis)
 */

// THEMED SVG ICON LIBRARY (Coklat, Hitam, Merah)
const ICONS = {
  dashboard: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>`,
  floor1: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
  floor2: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.5a2 2 0 0 0 1.25 1.55L7 12v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-9l2.89-1.26a2 2 0 0 0 1.25-1.55l.58-3.5a2 2 0 0 0-1.34-2.23z"></path></svg>`,
  floor3: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  floor4: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
  alert: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  mutations: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>`,
  settings: `<svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
  search: `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  location: `<svg class="icon-svg-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  plus: `<svg class="icon-svg-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  minus: `<svg class="icon-svg-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  trend: `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
  shield: `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  download: `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  print: `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>`,
  pdf: `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  reset: `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>`,
  check: `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  close: `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  box: `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>`,
  arrowRight: `<svg class="icon-svg-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  note: `<svg class="icon-svg-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
  clock: `<svg class="icon-svg-xs" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  barcode: `<svg class="icon-svg-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><line x1="7" y1="12" x2="17" y2="12"></line></svg>`
};

// Initial Seed Data
const INITIAL_DATA = {
  floors: [
    {
      id: 'L1',
      name: 'Lantai 1: Kebutuhan Sehari-Hari',
      shortName: 'Lantai 1 (Kebutuhan)',
      iconKey: 'floor1',
      slots: [
        { id: 'L1_S1', code: 'Stock 1', name: 'Pempes & Popok Bayi' },
        { id: 'L1_S2', code: 'Stock 2', name: 'Sabun, Sampo & Mandi' },
        { id: 'L1_S3', code: 'Stock 3', name: 'Minyak Goreng & Bumbu' },
        { id: 'L1_S4', code: 'Stock 4', name: 'Beras & Sembako' },
        { id: 'L1_S5', code: 'Stock 5', name: 'Minuman & Snack' },
        { id: 'L1_S6', code: 'Stock 6', name: 'Deterjen & Pembersih' }
      ]
    },
    {
      id: 'L2',
      name: 'Lantai 2: Pakaian',
      shortName: 'Lantai 2 (Pakaian)',
      iconKey: 'floor2',
      slots: [
        { id: 'L2_S1', code: 'Stock 1', name: 'Pakaian Pria' },
        { id: 'L2_S2', code: 'Stock 2', name: 'Pakaian Wanita' },
        { id: 'L2_S3', code: 'Stock 3', name: 'Pakaian Anak & Balita' },
        { id: 'L2_S4', code: 'Stock 4', name: 'Busana Muslim & Gamis' },
        { id: 'L2_S5', code: 'Stock 5', name: 'Hijab & Aksesoris' },
        { id: 'L2_S6', code: 'Stock 6', name: 'Pakaian Dalam & Kaos Kaki' }
      ]
    },
    {
      id: 'L3',
      name: 'Lantai 3: Perabotan',
      shortName: 'Lantai 3 (Perabotan)',
      iconKey: 'floor3',
      slots: [
        { id: 'L3_S1', code: 'Stock 1', name: 'Alat Masak & Dapur' },
        { id: 'L3_S2', code: 'Stock 2', name: 'Wadah Plastik & Toples' },
        { id: 'L3_S3', code: 'Stock 3', name: 'Elektronik & Lampu' },
        { id: 'L3_S4', code: 'Stock 4', name: 'Alat Kebersihan' },
        { id: 'L3_S5', code: 'Stock 5', name: 'Rak & Organizer' }
      ]
    },
    {
      id: 'L4',
      name: 'Lantai 4: Gudang Utama',
      shortName: 'Lantai 4 (Gudang)',
      iconKey: 'floor4',
      slots: [
        { id: 'L4_S1', code: 'Stock 1', name: 'Buffer Sembako & Dry' },
        { id: 'L4_S2', code: 'Stock 2', name: 'Buffer Toiletries & Kimia' },
        { id: 'L4_S3', code: 'Stock 3', name: 'Buffer Pakaian & Tekstil' },
        { id: 'L4_S4', code: 'Stock 4', name: 'Buffer Perabotan Box' },
        { id: 'L4_S5', code: 'Stock 5', name: 'Inbound Unboxing Staging' },
        { id: 'L4_S6', code: 'Stock 6', name: 'Karantina Retur / Rusak' }
      ]
    }
  ],
  items: [
    // Lantai 1: Kebutuhan Sehari-Hari
    { id: 'ITM-001', floorId: 'L1', slotId: 'L1_S1', name: 'MamyPoko Pants M34', sku: 'PMP-001', barcode: '89912345001', unit: 'Pack', stock: 48, minStock: 10, maxStock: 120, location: 'Rak 1A', weeklyOut: 145 },
    { id: 'ITM-002', floorId: 'L1', slotId: 'L1_S1', name: 'Sweety Silver Pants L28', sku: 'PMP-002', barcode: '89912345002', unit: 'Pack', stock: 0, minStock: 8, maxStock: 100, location: 'Rak 1B', weeklyOut: 90 },
    { id: 'ITM-003', floorId: 'L1', slotId: 'L1_S1', name: 'Merries Good Skin XL26', sku: 'PMP-003', barcode: '89912345003', unit: 'Pack', stock: 5, minStock: 8, maxStock: 80, location: 'Rak 1C', weeklyOut: 60 },
    { id: 'ITM-004', floorId: 'L1', slotId: 'L1_S2', name: 'Lifebuoy Lemon Fresh 450ml', sku: 'SBN-001', barcode: '89912345004', unit: 'Pouch', stock: 6, minStock: 12, maxStock: 150, location: 'Rak 2A', weeklyOut: 98 },
    { id: 'ITM-005', floorId: 'L1', slotId: 'L1_S2', name: 'Biore Guard Eucalyptus 400ml', sku: 'SBN-002', barcode: '89912345005', unit: 'Pouch', stock: 32, minStock: 10, maxStock: 120, location: 'Rak 2B', weeklyOut: 75 },
    { id: 'ITM-006', floorId: 'L1', slotId: 'L1_S3', name: 'Bimoli Minyak Goreng 2L Refill', sku: 'MYK-002', barcode: '89912345006', unit: 'Pcs', stock: 0, minStock: 15, maxStock: 150, location: 'Rak 3A', weeklyOut: 125 },
    { id: 'ITM-007', floorId: 'L1', slotId: 'L1_S3', name: 'Filma Minyak Goreng 2L', sku: 'MYK-003', barcode: '89912345007', unit: 'Pcs', stock: 18, minStock: 12, maxStock: 120, location: 'Rak 3B', weeklyOut: 85 },
    { id: 'ITM-008', floorId: 'L1', slotId: 'L1_S4', name: 'Beras Pandan Wangi 5kg', sku: 'BRS-001', barcode: '89912345008', unit: 'Karung', stock: 24, minStock: 10, maxStock: 80, location: 'Pallet 4A', weeklyOut: 42 },
    { id: 'ITM-009', floorId: 'L1', slotId: 'L1_S4', name: 'Gulaku Tebu Kuning 1kg', sku: 'GLA-001', barcode: '89912345009', unit: 'Pcs', stock: 4, minStock: 15, maxStock: 200, location: 'Rak 4B', weeklyOut: 110 },
    { id: 'ITM-010', floorId: 'L1', slotId: 'L1_S5', name: 'Teh Botol Sosro Kotak 250ml', sku: 'MNM-001', barcode: '89912345010', unit: 'Dus', stock: 15, minStock: 5, maxStock: 60, location: 'Rak 5A', weeklyOut: 55 },
    { id: 'ITM-011', floorId: 'L1', slotId: 'L1_S6', name: 'Rinso Anti Noda Molto 770g', sku: 'DTG-001', barcode: '89912345011', unit: 'Pouch', stock: 28, minStock: 10, maxStock: 100, location: 'Rak 6A', weeklyOut: 68 },

    // Lantai 2: Pakaian & Fashion
    { id: 'ITM-012', floorId: 'L2', slotId: 'L2_S1', name: 'Kemeja Flannel Kotak Merah L', sku: 'FSH-001', barcode: '89912345012', unit: 'Pcs', stock: 14, minStock: 5, maxStock: 40, location: 'Gantungan 1A', weeklyOut: 30 },
    { id: 'ITM-013', floorId: 'L2', slotId: 'L2_S1', name: 'Kaos Polos Combed 30s Hitam XL', sku: 'FSH-002', barcode: '89912345013', unit: 'Pcs', stock: 35, minStock: 10, maxStock: 80, location: 'Rak Susun 1B', weeklyOut: 75 },
    { id: 'ITM-014', floorId: 'L2', slotId: 'L2_S4', name: 'Gamis Syar`i Set Khimar M', sku: 'GMS-004', barcode: '89912345014', unit: 'Pcs', stock: 2, minStock: 6, maxStock: 30, location: 'Gantungan 4A', weeklyOut: 24 },
    { id: 'ITM-015', floorId: 'L2', slotId: 'L2_S4', name: 'Baju Koko Katun Bordir Putih L', sku: 'KOK-001', barcode: '89912345015', unit: 'Pcs', stock: 16, minStock: 6, maxStock: 50, location: 'Gantungan 4B', weeklyOut: 28 },
    { id: 'ITM-016', floorId: 'L2', slotId: 'L2_S5', name: 'Pashmina Ceruty Baby Doll Hitam', sku: 'PSM-005', barcode: '89912345016', unit: 'Pcs', stock: 45, minStock: 15, maxStock: 120, location: 'Rak Aksesoris 5', weeklyOut: 62 },

    // Lantai 3: Perabotan & Home Living
    { id: 'ITM-017', floorId: 'L3', slotId: 'L3_S1', name: 'Wajan Teflon Anti Lengket 24cm', sku: 'WJN-001', barcode: '89912345017', unit: 'Pcs', stock: 12, minStock: 4, maxStock: 30, location: 'Rak Dapur 1A', weeklyOut: 18 },
    { id: 'ITM-018', floorId: 'L3', slotId: 'L3_S2', name: 'Toples Kedap Udara Seal 1.5L', sku: 'TPL-001', barcode: '89912345018', unit: 'Set', stock: 22, minStock: 6, maxStock: 50, location: 'Rak Plastik 2', weeklyOut: 45 },
    { id: 'ITM-019', floorId: 'L3', slotId: 'L3_S3', name: 'Lampu LED Philips 15W Putih', sku: 'LMP-003', barcode: '89912345019', unit: 'Pcs', stock: 3, minStock: 8, maxStock: 60, location: 'Rak Lampu 3', weeklyOut: 38 },
    { id: 'ITM-020', floorId: 'L3', slotId: 'L3_S4', name: 'Spin Mop Pel Putar 360 Otomatis', sku: 'PEL-001', barcode: '89912345020', unit: 'Set', stock: 8, minStock: 3, maxStock: 25, location: 'Display Kebersihan 4', weeklyOut: 12 },

    // Lantai 4: Gudang Utama & Buffer
    { id: 'ITM-021', floorId: 'L4', slotId: 'L4_S1', name: 'Kartonan Minyak Bimoli 2L (Dus)', sku: 'GUD-MYK01', barcode: '89912345021', unit: 'Dus', stock: 120, minStock: 20, maxStock: 400, location: 'Zona Pallet A1', weeklyOut: 0 },
    { id: 'ITM-022', floorId: 'L4', slotId: 'L4_S2', name: 'Bal Popok MamyPoko Pants M (Bal)', sku: 'GUD-PMP01', barcode: '89912345022', unit: 'Bal', stock: 45, minStock: 10, maxStock: 150, location: 'Zona Rak B3', weeklyOut: 0 },
    { id: 'ITM-023', floorId: 'L4', slotId: 'L4_S3', name: 'Karung Kodi Gamis Muslimah', sku: 'GUD-GMS01', barcode: '89912345023', unit: 'Kodi', stock: 18, minStock: 5, maxStock: 80, location: 'Zona Tekstil C2', weeklyOut: 0 }
  ],
  mutations: [
    { id: 'MUT-001', itemId: 'ITM-006', type: 'OUT', qty: 24, from: 'Lantai 1: Display', to: 'Kasir Utama', timestamp: '2026-08-18 10:30', note: 'Habis terjual di kasir' },
    { id: 'MUT-002', itemId: 'ITM-001', type: 'IN', qty: 20, from: 'Lantai 4: Gudang', to: 'Lantai 1: Display', timestamp: '2026-08-18 09:15', note: 'Restock rutin pagi' },
    { id: 'MUT-003', itemId: 'ITM-014', type: 'OUT', qty: 4, from: 'Lantai 2: Display', to: 'Penjualan', timestamp: '2026-08-18 11:45', note: 'Stok menipis' }
  ]
};

// Main Stock Application Class
class StockApp {
  constructor() {
    this.storageKey = 'istiqomah_stock_db_v1';
    this.currentView = 'dashboard';
    this.currentSlotFilter = 'ALL';
    this.searchQuery = '';
    this.selectedItemForMutation = null;
    this.mutationType = 'IN';
    
    // Scanner properties
    this.scannerStream = null;
    this.scannerScanning = false;
    this.audioContext = null;
    this.scannerMode = 'DEFAULT'; // 'DEFAULT' or 'ADD_ITEM'

    this.loadData();
    this.initElements();
    this.bindEvents();
    this.render();
  }

  loadData() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        this.state = JSON.parse(saved);
      } else {
        this.state = JSON.parse(JSON.stringify(INITIAL_DATA));
        this.saveData();
      }
    } catch (e) {
      console.warn('LocalStorage error, using initial dataset:', e);
      this.state = JSON.parse(JSON.stringify(INITIAL_DATA));
    }
  }

  saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save to LocalStorage:', e);
    }
    this.updateAlertBadge();
  }

  resetData() {
    if (confirm('Apakah Anda yakin ingin me-reset database ke data awal?')) {
      this.state = JSON.parse(JSON.stringify(INITIAL_DATA));
      this.saveData();
      this.showToast('Data berhasil di-reset ke default!', 'success');
      this.render();
    }
  }

  initElements() {
    this.drawerBtn = document.getElementById('drawerToggleBtn');
    this.drawer = document.getElementById('appDrawer');
    this.drawerBackdrop = document.getElementById('drawerBackdrop');
    this.drawerCloseBtn = document.getElementById('drawerCloseBtn');
    this.drawerItems = document.querySelectorAll('.drawer-nav-item');
    this.contentContainer = document.getElementById('appContent');
    this.headerTitle = document.getElementById('headerTitle');
    this.headerSub = document.getElementById('headerSub');
    this.fabBtn = document.getElementById('fabBtn');
    this.alertCountBadge = document.getElementById('alertCountBadge');
    this.headerScanBtn = document.getElementById('headerScanBtn');
    this.drawerScanItem = document.getElementById('drawerScanItem');

    // Mutation Modal
    this.mutationModal = document.getElementById('mutationModal');
    this.modalCloseBtn = document.getElementById('modalCloseBtn');
    this.mutationForm = document.getElementById('mutationForm');

    // Add Item Modal
    this.addItemModal = document.getElementById('addItemModal');
    this.addItemForm = document.getElementById('addItemForm');
    this.addItemCloseBtn = document.getElementById('addItemCloseBtn');

    // Edit Item Modal
    this.editItemModal = document.getElementById('editItemModal');
    this.editItemForm = document.getElementById('editItemForm');
    this.editItemCloseBtn = document.getElementById('editItemCloseBtn');

    // Scanner Modal
    this.scannerModal = document.getElementById('scannerModal');
    this.scannerCloseBtn = document.getElementById('scannerCloseBtn');
    this.scannerVideo = document.getElementById('scannerVideo');
    this.scannerCanvas = document.getElementById('scannerCanvas');
    this.manualBarcodeForm = document.getElementById('manualBarcodeForm');
    this.manualBarcodeInput = document.getElementById('manualBarcodeInput');
    this.scannerStatusText = document.getElementById('scannerStatusText');
  }

  bindEvents() {
    // Drawer open/close
    this.drawerBtn.addEventListener('click', () => this.openDrawer());
    this.drawerCloseBtn.addEventListener('click', () => this.closeDrawer());
    this.drawerBackdrop.addEventListener('click', () => this.closeDrawer());

    // Drawer Navigation
    this.drawerItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const view = item.getAttribute('data-view');
        if (view) {
          this.switchView(view);
          this.closeDrawer();
        }
      });
    });

    // Scanner Buttons
    if (this.headerScanBtn) {
      this.headerScanBtn.addEventListener('click', () => this.openScanner());
    }
    if (this.drawerScanItem) {
      this.drawerScanItem.addEventListener('click', () => {
        this.closeDrawer();
        this.openScanner();
      });
    }
    if (this.scannerCloseBtn) {
      this.scannerCloseBtn.addEventListener('click', () => this.closeScanner());
    }
    if (this.scannerModal) {
      this.scannerModal.addEventListener('click', (e) => {
        if (e.target === this.scannerModal) this.closeScanner();
      });
    }
    if (this.manualBarcodeForm) {
      this.manualBarcodeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = this.manualBarcodeInput.value.trim();
        if (code) {
          this.processScannedCode(code);
        }
      });
    }

    // Alert icon in top right
    document.getElementById('headerAlertBtn').addEventListener('click', () => {
      this.switchView('report_outofstock');
    });

    // Modal Close buttons
    this.modalCloseBtn.addEventListener('click', () => this.closeModal(this.mutationModal));
    if (this.addItemCloseBtn) {
      this.addItemCloseBtn.addEventListener('click', () => this.closeModal(this.addItemModal));
    }

    // Modal Background click to close
    this.mutationModal.addEventListener('click', (e) => {
      if (e.target === this.mutationModal) this.closeModal(this.mutationModal);
    });
    if (this.addItemModal) {
      this.addItemModal.addEventListener('click', (e) => {
        if (e.target === this.addItemModal) this.closeModal(this.addItemModal);
      });
    }

    // Mutation    // Form Submissions
    this.mutationForm.addEventListener('submit', (e) => { e.preventDefault(); this.handleMutationSubmit(); });
    this.addItemForm.addEventListener('submit', (e) => { e.preventDefault(); this.handleAddItemSubmit(); });
    
    if (this.editItemForm) {
      this.editItemForm.addEventListener('submit', (e) => { e.preventDefault(); this.handleEditItemSubmit(); });
    }

    // Modal close hooks
    this.modalCloseBtn.addEventListener('click', () => this.closeModal(this.mutationModal));
    this.addItemCloseBtn.addEventListener('click', () => this.closeModal(this.addItemModal));
    
    if (this.editItemCloseBtn) {
      this.editItemCloseBtn.addEventListener('click', () => this.closeModal(this.editItemModal));
    }

    // Floating Action Button
    this.fabBtn.addEventListener('click', () => {
      if (this.currentView.startsWith('floor_')) {
        this.openAddItemModal();
      } else {
        this.switchView('floor_1');
      }
    });

    // Handle Keyboard ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeDrawer();
        this.closeModal(this.mutationModal);
        this.closeModal(this.addItemModal);
        this.closeScanner();
      }
    });
  }

  // ==========================================
  // BARCODE & QR SCANNER ENGINE
  // ==========================================
  async openScannerForAdd() {
    this.scannerMode = 'ADD_ITEM';
    await this.openScanner();
  }

  async openScannerForEdit() {
    this.scannerMode = 'EDIT_ITEM';
    await this.openScanner();
  }

  async openScanner() {
    if (this.scannerMode !== 'ADD_ITEM' && this.scannerMode !== 'EDIT_ITEM') {
      this.scannerMode = 'DEFAULT';
    }
    
    this.openModal(this.scannerModal);
    if (this.manualBarcodeInput) {
      this.manualBarcodeInput.value = '';
      this.manualBarcodeInput.focus();
    }
    if (this.scannerStatusText) {
      this.scannerStatusText.textContent = 'Menghubungkan ke kamera gawai...';
    }

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } }
        });
        this.scannerStream = stream;
        if (this.scannerVideo) {
          this.scannerVideo.srcObject = stream;
          this.scannerVideo.play();
          this.scannerScanning = true;
          if (this.scannerStatusText) {
            this.scannerStatusText.textContent = 'Arahkan kamera ke barcode produk...';
          }
          this.startScanLoop();
        }
      } else {
        if (this.scannerStatusText) {
          this.scannerStatusText.textContent = 'Kamera tidak tersedia, gunakan input manual di bawah';
        }
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      if (this.scannerStatusText) {
        this.scannerStatusText.textContent = 'Kamera offline/diblokir. Gunakan input manual atau simulasi chip.';
      }
    }
  }

  closeScanner() {
    this.scannerScanning = false;
    if (this.scannerStream) {
      this.scannerStream.getTracks().forEach(track => track.stop());
      this.scannerStream = null;
    }
    if (this.scannerVideo) {
      this.scannerVideo.srcObject = null;
    }
    this.closeModal(this.scannerModal);
  }

  startScanLoop() {
    if (!this.scannerScanning) return;

    if ('BarcodeDetector' in window) {
      const barcodeDetector = new BarcodeDetector({
        formats: ['qr_code', 'ean_13', 'ean_8', 'code_128', 'code_39', 'upc_a', 'upc_e']
      });

      const detectFrame = async () => {
        if (!this.scannerScanning || !this.scannerVideo || this.scannerVideo.readyState < 2) {
          if (this.scannerScanning) requestAnimationFrame(detectFrame);
          return;
        }

        try {
          const barcodes = await barcodeDetector.detect(this.scannerVideo);
          if (barcodes.length > 0) {
            const rawValue = barcodes[0].rawValue;
            this.processScannedCode(rawValue);
            return;
          }
        } catch (e) {
          // ignore frame detection error
        }

        if (this.scannerScanning) {
          requestAnimationFrame(detectFrame);
        }
      };

      requestAnimationFrame(detectFrame);
    }
  }

  playScanBeep() {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = this.audioContext;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1050, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);

      if (navigator.vibrate) {
        navigator.vibrate([40, 30, 70]);
      }
    } catch (e) {
      console.log('Audio feedback not available');
    }
  }

  processScannedCode(code) {
    this.playScanBeep();
    this.closeScanner();

    const trimmedCode = code.trim().toLowerCase();

    if (this.scannerMode === 'ADD_ITEM') {
      const barcodeInput = document.getElementById('newItemBarcode');
      if (barcodeInput) {
        barcodeInput.value = trimmedCode;
        this.showToast('Barcode berhasil disalin ke form!', 'success');
      }
      this.scannerMode = 'DEFAULT';
      return;
    } else if (this.scannerMode === 'EDIT_ITEM') {
      const barcodeInput = document.getElementById('editItemBarcode');
      if (barcodeInput) {
        barcodeInput.value = trimmedCode;
        this.showToast('Barcode berhasil disalin ke form!', 'success');
      }
      this.scannerMode = 'DEFAULT';
      return;
    }

    // Look up item in database
    const foundItem = this.state.items.find(i => 
      (i.barcode && i.barcode.toLowerCase() === trimmedCode) ||
      (i.sku && i.sku.toLowerCase() === trimmedCode)
    );

    if (foundItem) {
      this.showToast(`Barang Ditemukan: ${foundItem.name}!`, 'success');
      this.openMutationDialog(foundItem.id);
    } else {
      this.showToast(`Barcode "${code}" belum terdaftar. Silakan daftarkan!`, 'warning');
      this.openAddItemModal(code);
    }
  }

  openDrawer() {
    this.drawer.classList.add('open');
    this.drawerBackdrop.classList.add('active');
  }

  closeDrawer() {
    this.drawer.classList.remove('open');
    this.drawerBackdrop.classList.remove('active');
  }

  openModal(modal) {
    modal.classList.add('active');
  }

  closeModal(modal) {
    modal.classList.remove('active');
  }

  switchView(viewName) {
    this.currentView = viewName;
    this.currentSlotFilter = 'ALL';
    this.searchQuery = '';

    // Update active class in drawer
    this.drawerItems.forEach(item => {
      if (item.getAttribute('data-view') === viewName) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    this.render();
  }

  // Calculate Metrics & Alerts
  getOutAndLowStockItems() {
    return this.state.items.filter(item => item.stock <= item.minStock);
  }

  getEmptyStockItems() {
    return this.state.items.filter(item => item.stock === 0);
  }

  getItemHealth(item) {
    if (item.stock === 0) return 'empty';
    if (item.stock <= item.minStock) return 'low';
    return 'safe';
  }

  // Quick Inbound/Outbound
  quickAdjust(itemId, delta) {
    const item = this.state.items.find(i => i.id === itemId);
    if (!item) return;

    if (delta < 0 && item.stock <= 0) {
      this.showToast(`Stok ${item.name} sudah 0 (Habis)!`, 'error');
      return;
    }

    const newStock = Math.max(0, item.stock + delta);
    item.stock = newStock;

    // Record mutation
    this.state.mutations.unshift({
      id: 'MUT-' + Date.now(),
      itemId: item.id,
      type: delta > 0 ? 'IN' : 'OUT',
      qty: Math.abs(delta),
      from: delta > 0 ? 'Inbound Cepat' : 'Display Toko',
      to: delta > 0 ? 'Display Toko' : 'Penjualan Cepat',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      note: 'Penyesuaian cepat'
    });

    this.saveData();
    this.render();
    this.showToast(`Stok ${item.name} diperbarui: ${item.stock} ${item.unit}`, delta > 0 ? 'success' : 'warning');
  }

  // Open Detailed Mutation Dialog
  openMutationDialog(itemId) {
    const item = this.state.items.find(i => i.id === itemId);
    if (!item) return;

    this.selectedItemForMutation = item;
    const floor = this.state.floors.find(f => f.id === item.floorId);
    const slot = floor ? floor.slots.find(s => s.id === item.slotId) : null;

    document.getElementById('modalItemName').textContent = item.name;
    document.getElementById('modalItemMeta').textContent = `${floor ? floor.shortName : ''} • ${slot ? slot.code + ': ' + slot.name : ''} • Lokasi: ${item.location}`;
    document.getElementById('modalCurrentStock').textContent = `${item.stock} ${item.unit}`;
    document.getElementById('modalInputQty').value = '1';
    document.getElementById('modalInputNote').value = '';

    // Check warehouse L4 availability
    const l4Match = this.state.items.find(i => i.floorId === 'L4' && i.name.toLowerCase().includes(item.name.split(' ')[0].toLowerCase()));
    const l4Box = document.getElementById('modalL4Availability');
    if (l4Box) {
      if (l4Match) {
        l4Box.innerHTML = `Stok tersedia di Lantai 4 (Gudang): <strong style="color:#86EFAC;">${l4Match.stock} ${l4Match.unit}</strong>`;
        l4Box.style.display = 'block';
      } else {
        l4Box.innerHTML = `Stok cadangan Gudang (L4): <span style="color:#FCA5A5;">Tidak ada buffer langsung</span>`;
        l4Box.style.display = 'block';
      }
    }

    // Default Type is IN
    this.setMutationType('IN');
    this.openModal(this.mutationModal);
  }

  setMutationType(type) {
    this.mutationType = type;
    const inBtn = document.getElementById('toggleTypeIn');
    const outBtn = document.getElementById('toggleTypeOut');
    if (type === 'IN') {
      inBtn.classList.add('active', 'in');
      outBtn.classList.remove('active', 'out');
    } else {
      outBtn.classList.add('active', 'out');
      inBtn.classList.remove('active', 'in');
    }
  }

  handleMutationSubmit() {
    if (!this.selectedItemForMutation) return;

    const qty = parseInt(document.getElementById('modalInputQty').value, 10);
    const note = document.getElementById('modalInputNote').value.trim() || 'Mutasi Manual';

    if (isNaN(qty) || qty <= 0) {
      this.showToast('Jumlah mutasi harus lebih dari 0!', 'error');
      return;
    }

    const item = this.selectedItemForMutation;
    if (this.mutationType === 'OUT' && item.stock < qty) {
      this.showToast(`Stok tidak mencukupi! Tersedia hanya ${item.stock} ${item.unit}`, 'error');
      return;
    }

    if (this.mutationType === 'IN') {
      item.stock += qty;
    } else {
      item.stock -= qty;
    }

    // Add mutation entry
    this.state.mutations.unshift({
      id: 'MUT-' + Date.now(),
      itemId: item.id,
      type: this.mutationType,
      qty: qty,
      from: this.mutationType === 'IN' ? 'Lantai 4: Gudang / Supplier' : `${item.floorId}: Display`,
      to: this.mutationType === 'IN' ? `${item.floorId}: Display` : 'Kasir / Pelanggan',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      note: note
    });

    this.saveData();
    this.closeModal(this.mutationModal);
    this.render();
    this.showToast(`Berhasil mencatat mutasi ${this.mutationType} sebanyak ${qty} ${item.unit}!`, 'success');
  }

  // Open Add Item Modal
  openAddItemModal(prefilledBarcode = '') {
    const floorSelect = document.getElementById('newItemFloor');
    const slotSelect = document.getElementById('newItemSlot');

    floorSelect.innerHTML = this.state.floors.map(f => `
      <option value="${f.id}" ${this.currentView === 'floor_' + f.id.replace('L', '') ? 'selected' : ''}>${f.shortName}</option>
    `).join('');

    const updateSlots = () => {
      const selectedFloorId = floorSelect.value;
      const floor = this.state.floors.find(f => f.id === selectedFloorId);
      if (floor) {
        slotSelect.innerHTML = floor.slots.map(s => `
          <option value="${s.id}">${s.code}: ${s.name}</option>
        `).join('');
      }
    };

    floorSelect.onchange = updateSlots;
    updateSlots();

    // Generate SKU suggestion or use prefilled barcode
    const randomSkuNum = Math.floor(100 + Math.random() * 900);
    document.getElementById('newItemSku').value = `SKU-${randomSkuNum}`;
    document.getElementById('newItemBarcode').value = prefilledBarcode || `89912345${randomSkuNum}`;
    document.getElementById('newItemName').value = '';
    document.getElementById('newItemStock').value = '20';
    document.getElementById('newItemMinStock').value = '5';
    document.getElementById('newItemLocation').value = 'Rak A1';

    this.openModal(this.addItemModal);
  }

  handleAddItemSubmit() {
    const name = document.getElementById('newItemName').value.trim();
    const floorId = document.getElementById('newItemFloor').value;
    const slotId = document.getElementById('newItemSlot').value;
    const sku = document.getElementById('newItemSku').value.trim();
    const barcode = document.getElementById('newItemBarcode').value.trim();
    const stock = parseInt(document.getElementById('newItemStock').value, 10) || 0;
    const minStock = parseInt(document.getElementById('newItemMinStock').value, 10) || 5;
    const maxStock = parseInt(document.getElementById('newItemMaxStock').value, 10) || 100;
    const unit = document.getElementById('newItemUnit').value;
    const location = document.getElementById('newItemLocation').value.trim() || 'Rak 1';

    if (!name || !sku) {
      this.showToast('Nama barang dan SKU wajib diisi!', 'error');
      return;
    }

    const newItem = {
      id: 'ITM-' + Date.now(),
      floorId,
      slotId,
      name,
      sku,
      barcode,
      stock,
      minStock,
      maxStock,
      unit,
      location,
      weeklyOut: 0
    };

    this.state.items.push(newItem);
    this.saveData();
    this.closeModal(this.addItemModal);
    this.render();
    this.showToast(`Barang "${name}" berhasil ditambahkan ke ${floorId}!`, 'success');
  }

  updateAlertBadge() {
    const criticalCount = this.getOutAndLowStockItems().length;
    if (this.alertCountBadge) {
      if (criticalCount > 0) {
        this.alertCountBadge.textContent = criticalCount;
        this.alertCountBadge.style.display = 'inline-block';
      } else {
        this.alertCountBadge.style.display = 'none';
      }
    }

    const drawerAlert = document.getElementById('drawerAlertBadge');
    if (drawerAlert) {
      drawerAlert.textContent = criticalCount;
    }
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? ICONS.check : type === 'error' ? ICONS.close : ICONS.alert;
    toast.innerHTML = `<span class="icon-inline">${icon}</span> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ==========================================
  // EDIT & DELETE ITEM
  // ==========================================
  openEditItemModal() {
    if (!this.selectedItemForMutation) return;
    
    // Close mutation modal first
    this.closeModal(this.mutationModal);

    const item = this.selectedItemForMutation;
    
    document.getElementById('editItemId').value = item.id;
    document.getElementById('editItemName').value = item.name;
    document.getElementById('editItemSku').value = item.sku;
    document.getElementById('editItemBarcode').value = item.barcode || '';
    document.getElementById('editItemMinStock').value = item.minStock;
    document.getElementById('editItemMaxStock').value = item.maxStock;
    document.getElementById('editItemUnit').value = item.unit;
    document.getElementById('editItemLocation').value = item.location;

    // Populate Floor
    const floorSelect = document.getElementById('editItemFloor');
    floorSelect.innerHTML = this.state.floors.map(f => `<option value="${f.id}">${f.name}</option>`).join('');
    floorSelect.value = item.floorId;

    // Populate Slot
    const slotSelect = document.getElementById('editItemSlot');
    const updateSlots = () => {
      const floor = this.state.floors.find(f => f.id === floorSelect.value);
      if (floor) {
        slotSelect.innerHTML = floor.slots.map(s => `<option value="${s.id}">${s.code} - ${s.name}</option>`).join('');
      }
    };
    
    updateSlots();
    slotSelect.value = item.slotId;
    
    floorSelect.onchange = () => {
      updateSlots();
    };

    this.openModal(this.editItemModal);
  }

  handleEditItemSubmit() {
    const id = document.getElementById('editItemId').value;
    const itemIndex = this.state.items.findIndex(i => i.id === id);
    
    if (itemIndex === -1) {
      this.showToast('Barang tidak ditemukan!', 'error');
      return;
    }

    this.state.items[itemIndex] = {
      ...this.state.items[itemIndex],
      name: document.getElementById('editItemName').value,
      floorId: document.getElementById('editItemFloor').value,
      slotId: document.getElementById('editItemSlot').value,
      sku: document.getElementById('editItemSku').value,
      barcode: document.getElementById('editItemBarcode').value,
      minStock: parseInt(document.getElementById('editItemMinStock').value, 10),
      maxStock: parseInt(document.getElementById('editItemMaxStock').value, 10),
      unit: document.getElementById('editItemUnit').value,
      location: document.getElementById('editItemLocation').value
    };

    this.saveData();
    this.closeModal(this.editItemModal);
    this.render();
    this.showToast('Barang berhasil diperbarui!', 'success');
  }

  deleteItem() {
    const id = document.getElementById('editItemId').value;
    const item = this.state.items.find(i => i.id === id);
    
    if (!item) return;

    if (confirm(`Yakin ingin MENGHAPUS secara permanen barang "${item.name}" dari sistem?`)) {
      this.state.items = this.state.items.filter(i => i.id !== id);
      
      // Delete mutations as well
      this.state.mutations = this.state.mutations.filter(m => m.itemId !== id);

      this.saveData();
      this.closeModal(this.editItemModal);
      this.render();
      this.showToast('Barang berhasil dihapus!', 'warning');
    }
  }

  // ==========================================
  // VIEW RENDERERS
  // ==========================================
  render() {
    this.updateAlertBadge();

    if (this.currentView === 'dashboard') {
      this.renderDashboard();
    } else if (this.currentView.startsWith('floor_')) {
      const floorNum = this.currentView.replace('floor_', '');
      this.renderFloorPage('L' + floorNum);
    } else if (this.currentView === 'report_outofstock') {
      this.renderOutOfStockReport();
    } else if (this.currentView === 'mutations') {
      this.renderMutationsPage();
    } else if (this.currentView === 'settings') {
      this.renderSettingsPage();
    }
  }

  // 1. DASHBOARD & VISUAL ANALYTICS
  renderDashboard() {
    this.headerTitle.innerHTML = 'Istiqomah <span>Stock</span>';
    this.headerSub.innerHTML = '<span class="status-indicator"></span> Dashboard Analitik Realtime';

    const totalItems = this.state.items.length;
    const totalStock = this.state.items.reduce((sum, item) => sum + item.stock, 0);
    const criticalItems = this.getOutAndLowStockItems();
    const emptyItems = this.getEmptyStockItems();
    const safeItems = this.state.items.filter(i => i.stock > i.minStock);

    // Stock per floor
    const floorStocks = this.state.floors.map(floor => {
      const items = this.state.items.filter(i => i.floorId === floor.id);
      const sum = items.reduce((s, i) => s + i.stock, 0);
      return { floor, count: items.length, stock: sum };
    });

    const l1Stock = floorStocks[0].stock;
    const l2Stock = floorStocks[1].stock;
    const l3Stock = floorStocks[2].stock;
    const l4Stock = floorStocks[3].stock;

    this.contentContainer.innerHTML = `
      <!-- TOP STATS CARDS -->
      <div class="stats-cards-grid">
        <div class="stat-card">
          <div class="stat-card-title">Total Stok Tersedia</div>
          <div class="stat-card-val">${totalStock.toLocaleString()}</div>
          <div class="stat-card-sub">${totalItems} SKU terdaftar</div>
        </div>

        <div class="stat-card" style="cursor:pointer;" onclick="app.switchView('report_outofstock')">
          <div class="stat-card-title">Status Stok Kritis</div>
          <div class="stat-card-val" style="color:${emptyItems.length > 0 ? '#E11D48' : '#059669'};">
            ${emptyItems.length} <span style="font-size:12px; font-weight:600; color:var(--text-muted);">Habis</span> / ${criticalItems.length - emptyItems.length} <span style="font-size:12px; font-weight:600; color:var(--text-muted);">Menipis</span>
          </div>
          <div class="stat-card-sub" style="color:#BE123C;">Klik untuk Laporan &rarr;</div>
        </div>
      </div>

      <!-- INVENTORY HEALTH TEXT -->
      <div class="chart-card" style="padding:16px;">
        <div class="chart-card-title" style="margin-bottom:12px;">
          <span class="icon-inline">${ICONS.shield}</span> Rasio Kesehatan Stok
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; text-align:center; gap:8px;">
          <div style="background:#F0FDF4; padding:8px; border-radius:6px; border:1px solid #BBF7D0;">
            <div style="font-size:16px; font-weight:800; color:#166534;">${safeItems.length}</div>
            <div style="font-size:10px; font-weight:700; color:#15803D;">AMAN</div>
          </div>
          <div style="background:#FFFBEB; padding:8px; border-radius:6px; border:1px solid #FEF3C7;">
            <div style="font-size:16px; font-weight:800; color:#B45309;">${criticalItems.length - emptyItems.length}</div>
            <div style="font-size:10px; font-weight:700; color:#B45309;">MENIPIS</div>
          </div>
          <div style="background:#FFF1F2; padding:8px; border-radius:6px; border:1px solid #FECDD3;">
            <div style="font-size:16px; font-weight:800; color:#BE123C;">${emptyItems.length}</div>
            <div style="font-size:10px; font-weight:700; color:#BE123C;">HABIS</div>
          </div>
        </div>
      </div>

      <!-- FLOOR DISTRIBUTION LIST -->
      <div class="chart-card" style="padding:16px;">
        <div class="chart-card-title" style="margin-bottom:12px;">
          <span class="icon-inline">${ICONS.trend}</span> Distribusi Stok per Lantai
        </div>
        <div style="display:flex; flex-direction:column; gap:8px;">
          <div style="display:flex; justify-content:space-between; padding-bottom:6px; border-bottom:1px solid var(--border-subtle);">
            <span style="font-weight:600;">Lantai 1 (Kebutuhan)</span>
            <span style="font-weight:700;">${l1Stock} Pcs</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding-bottom:6px; border-bottom:1px solid var(--border-subtle);">
            <span style="font-weight:600;">Lantai 2 (Pakaian)</span>
            <span style="font-weight:700;">${l2Stock} Pcs</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding-bottom:6px; border-bottom:1px solid var(--border-subtle);">
            <span style="font-weight:600;">Lantai 3 (Perabotan)</span>
            <span style="font-weight:700;">${l3Stock} Pcs</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <span style="font-weight:600;">Lantai 4 (Gudang)</span>
            <span style="font-weight:700;">${l4Stock} Pcs</span>
          </div>
        </div>
      </div>

      <!-- FAST-MOVING LIST -->
      <div class="chart-card" style="padding:16px;">
        <div class="chart-card-title" style="margin-bottom:12px;">
          <span class="icon-inline">${ICONS.trend}</span> Top 5 Produk Paling Laris
        </div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          ${fastMoving.map((item, idx) => `
            <div style="display:flex; justify-content:space-between; font-size:12px;">
              <span>${idx + 1}. <span style="font-weight:600; color:var(--text-white);">${item.name}</span></span>
              <span style="font-weight:700; color:#E11D48;">${item.weeklyOut || 0} ${item.unit}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 2. FLOOR SPECIFIC PAGE (L1, L2, L3, L4)
  renderFloorPage(floorId) {
    const floor = this.state.floors.find(f => f.id === floorId);
    if (!floor) return;

    this.headerTitle.innerHTML = `<span class="icon-inline">${ICONS[floor.iconKey]}</span> <span>${floor.shortName}</span>`;
    this.headerSub.innerHTML = `<span class="status-indicator"></span> ${floor.name}`;

    let items = this.state.items.filter(i => i.floorId === floorId);

    // Apply Slot Filter
    if (this.currentSlotFilter !== 'ALL') {
      items = items.filter(i => i.slotId === this.currentSlotFilter);
    }

    // Apply Search Filter
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(i => 
        i.name.toLowerCase().includes(q) ||
        i.sku.toLowerCase().includes(q) ||
        (i.barcode && i.barcode.toLowerCase().includes(q)) ||
        i.location.toLowerCase().includes(q)
      );
    }

    this.contentContainer.innerHTML = `
      <!-- SEARCH BOX -->
      <div class="search-box">
        <span class="icon-inline" style="color:var(--text-muted);">${ICONS.search}</span>
        <input type="text" id="floorSearchInput" class="search-input" placeholder="Cari nama barang, SKU, atau barcode..." value="${this.escapeHtml(this.searchQuery)}">
        ${this.searchQuery ? `<button class="clear-search-btn" style="display:flex;" onclick="app.clearSearch()">${ICONS.close}</button>` : ''}
      </div>

      <!-- SLOT PILLS FILTER -->
      <div class="slot-pills-container">
        <button class="slot-pill ${this.currentSlotFilter === 'ALL' ? 'active' : ''}" onclick="app.setSlotFilter('ALL')">
          Semua Slot (${this.state.items.filter(i => i.floorId === floorId).length})
        </button>
        ${floor.slots.map(s => {
          const slotItemCount = this.state.items.filter(i => i.slotId === s.id).length;
          return `
            <button class="slot-pill ${this.currentSlotFilter === s.id ? 'active' : ''}" onclick="app.setSlotFilter('${s.id}')">
              ${s.code}: ${s.name} (${slotItemCount})
            </button>
          `;
        }).join('')}
      </div>

      <!-- ITEMS SPLIT LIST -->
      <div class="split-lists-container">
        <!-- AVAILABLE / LOW STOCK -->
        <div style="margin-bottom: 24px;">
          <div style="font-weight:700; color:var(--text-white); margin-bottom: 12px; font-size: 14.5px; border-bottom: 2px solid var(--border-subtle); padding-bottom: 6px; display:flex; justify-content:space-between;">
            <span>Stok Tersedia / Menipis</span>
            <span style="color:var(--text-dim);">${items.filter(i => i.stock > 0).length} Barang</span>
          </div>
          <div class="items-grid">
            ${items.filter(i => i.stock > 0).length === 0 ? `
              <div style="font-size:12px; color:var(--text-muted); text-align:center; padding: 20px 0;">Tidak ada barang yang tersedia.</div>
            ` : items.filter(i => i.stock > 0).map(item => {
              const slot = floor.slots.find(s => s.id === item.slotId);
              const health = this.getItemHealth(item);
              const statusLabel = health === 'low' ? 'MENIPIS' : 'AMAN';

              return `
                <div class="item-card status-${health}" onclick="app.openMutationDialog('${item.id}')">
                  <div class="item-header">
                    <div class="item-title-box">
                      <div class="item-name">${item.name}</div>
                      <div class="item-sku-row">
                        <span>SKU: ${item.sku}</span>
                        <span>•</span>
                        <span style="display:inline-flex; align-items:center; gap:3px;">${ICONS.location} ${item.location}</span>
                        ${item.barcode ? `<span>•</span><span>BC: ${item.barcode}</span>` : ''}
                      </div>
                    </div>

                    <div class="item-stock-box">
                      <div class="item-stock-val" style="color: ${health === 'low' ? '#D97706' : '#059669'};">
                        ${item.stock}
                      </div>
                      <div class="item-unit">${item.unit}</div>
                    </div>
                  </div>

                  <div class="item-meta-row">
                    <div style="display:flex; align-items:center; gap:6px;">
                      <span class="item-slot-tag">${slot ? slot.code : 'Slot'}</span>
                      <span class="status-pill ${health}">${statusLabel}</span>
                    </div>
                    <div style="font-size: 10px; color: var(--text-dim); font-weight:600;">Klik untuk update mutasi</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- EMPTY STOCK -->
        <div>
          <div style="font-weight:700; color:var(--ruby-primary); margin-bottom: 12px; font-size: 14.5px; border-bottom: 2px solid var(--ruby-subtle); padding-bottom: 6px; display:flex; justify-content:space-between;">
            <span>Stok Habis / Kosong</span>
            <span style="color:var(--ruby-dark);">${items.filter(i => i.stock === 0).length} Barang</span>
          </div>
          <div class="items-grid">
            ${items.filter(i => i.stock === 0).length === 0 ? `
              <div style="font-size:12px; color:var(--text-muted); text-align:center; padding: 20px 0;">Tidak ada barang yang habis di kategori ini.</div>
            ` : items.filter(i => i.stock === 0).map(item => {
              const slot = floor.slots.find(s => s.id === item.slotId);
              const health = 'empty';
              const statusLabel = 'STOK HABIS';

              return `
                <div class="item-card status-${health}" onclick="app.openMutationDialog('${item.id}')" style="background: rgba(225, 29, 72, 0.02); border-color: rgba(225, 29, 72, 0.1);">
                  <div class="item-header">
                    <div class="item-title-box">
                      <div class="item-name">${item.name}</div>
                      <div class="item-sku-row">
                        <span>SKU: ${item.sku}</span>
                        <span>•</span>
                        <span style="display:inline-flex; align-items:center; gap:3px;">${ICONS.location} ${item.location}</span>
                        ${item.barcode ? `<span>•</span><span>BC: ${item.barcode}</span>` : ''}
                      </div>
                    </div>

                    <div class="item-stock-box">
                      <div class="item-stock-val" style="color: #E11D48;">
                        ${item.stock}
                      </div>
                      <div class="item-unit">${item.unit}</div>
                    </div>
                  </div>

                  <div class="item-meta-row">
                    <div style="display:flex; align-items:center; gap:6px;">
                      <span class="item-slot-tag">${slot ? slot.code : 'Slot'}</span>
                      <span class="status-pill ${health}">${statusLabel}</span>
                    </div>
                    <div style="font-size: 10px; color: var(--ruby-primary); font-weight:600;">Klik untuk restock</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // Bind search input
    const searchInput = document.getElementById('floorSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.render();
        const inputAfter = document.getElementById('floorSearchInput');
        if (inputAfter) {
          inputAfter.focus();
          inputAfter.setSelectionRange(inputAfter.value.length, inputAfter.value.length);
        }
      });
    }
  }

  setSlotFilter(slotId) {
    this.currentSlotFilter = slotId;
    this.render();
  }

  clearSearch() {
    this.searchQuery = '';
    this.render();
  }

  // 3. OUT OF STOCK & CRITICAL RESTOCK TRACKER REPORT
  renderOutOfStockReport() {
    this.headerTitle.innerHTML = `<span class="icon-inline">${ICONS.alert}</span> <span>Laporan Stok Habis</span>`;
    this.headerSub.innerHTML = '<span class="status-indicator"></span> Tracking & Rekomendasi Restock';

    const criticalItems = this.getOutAndLowStockItems();
    const emptyItems = this.getEmptyStockItems();
    const lowItems = criticalItems.filter(i => i.stock > 0);

    this.contentContainer.innerHTML = `
      <!-- BANNER PERINGATAN -->
      <div class="report-alert-banner">
        <div class="report-alert-icon">${ICONS.alert}</div>
        <div>
          <div style="font-weight:800; font-size:14px; color:#F87171;">
            ${emptyItems.length} Barang Habis & ${lowItems.length} Barang Menipis
          </div>
          <div style="font-size:11.5px; color:#E7D7CE; margin-top:2px;">
            Lakukan mutasi pemindahan dari Gudang Lantai 4 atau hubungi supplier.
          </div>
        </div>
      </div>

      <!-- EXPORT ACTIONS -->
      <div class="btn-export-row">
        <button class="btn-secondary" onclick="app.exportCsvReport()">
          <span class="icon-inline">${ICONS.download}</span> Ekspor CSV
        </button>
        <button class="btn-primary" onclick="window.print()">
          <span class="icon-inline">${ICONS.print}</span> Cetak / PDF
        </button>
      </div>

      <!-- DAFTAR ITEM KRITIS -->
      <div class="items-grid">
        ${criticalItems.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon" style="color:var(--green-safe);">${ICONS.shield}</div>
            <div style="font-weight:700; color:#34D399;">Semua Stok Aman</div>
            <div style="font-size:12px;">Tidak ada barang yang habis atau di bawah batas minimum stok saat ini.</div>
          </div>
        ` : criticalItems.map(item => {
          const floor = this.state.floors.find(f => f.id === item.floorId);
          const slot = floor ? floor.slots.find(s => s.id === item.slotId) : null;
          const health = this.getItemHealth(item);

          // Find buffer availability in Lantai 4
          const l4Item = this.state.items.find(i => i.floorId === 'L4' && i.name.toLowerCase().includes(item.name.split(' ')[0].toLowerCase()));

          return `
            <div class="item-card status-${health}">
              <div class="item-header">
                <div class="item-title-box">
                  <div class="item-name">${item.name}</div>
                  <div class="item-sku-row">
                    <span>${floor ? floor.shortName : ''}</span>
                    <span>•</span>
                    <span>${slot ? slot.code : ''}</span>
                    <span>•</span>
                    <span>SKU: ${item.sku}</span>
                  </div>
                </div>

                <div class="item-stock-box">
                  <div class="item-stock-val" style="color: ${health === 'empty' ? '#F87171' : '#FBBF24'};">
                    ${item.stock}
                  </div>
                  <div class="item-unit">${item.unit}</div>
                </div>
              </div>

              <!-- REKOMENDASI RESTOCK / BUFFER STATUS -->
              <div style="background:#181412; padding:8px 10px; border-radius:6px; border:1px solid #382E28; font-size:11.5px; display:flex; flex-direction:column; gap:4px;">
                <div style="display:flex; justify-content:space-between;">
                  <span style="color:var(--text-muted);">Batas Minimum: <strong>${item.minStock} ${item.unit}</strong></span>
                  <span style="color:var(--text-muted);">Kapasitas Maks: <strong>${item.maxStock} ${item.unit}</strong></span>
                </div>

                <div style="border-top:1px dashed rgba(255,255,255,0.08); padding-top:4px; display:flex; justify-content:space-between; align-items:center;">
                  <span>Buffer di Gudang (L4):</span>
                  <strong style="color:${l4Item && l4Item.stock > 0 ? '#86EFAC' : '#FCA5A5'};">
                    ${l4Item ? `${l4Item.stock} ${l4Item.unit}` : 'Tidak Ada'}
                  </strong>
                </div>
              </div>

              <div class="item-meta-row">
                <span class="status-pill ${health}">${health === 'empty' ? 'HABIS TOTAL' : 'MENIPIS'}</span>
                <button class="btn-primary" style="padding:5px 10px; font-size:11px;" onclick="app.openMutationDialog('${item.id}')">
                  <span class="icon-inline">${ICONS.box}</span> Tarik dari Gudang / Tambah
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  // 4. MUTATION HISTORY
  renderMutationsPage() {
    this.headerTitle.innerHTML = `<span class="icon-inline">${ICONS.mutations}</span> <span>Laporan Pengambilan & Mutasi</span>`;
    this.headerSub.innerHTML = '<span class="status-indicator"></span> Riwayat Keluar / Masuk Barang';

    this.contentContainer.innerHTML = `
      <div class="btn-export-row" style="margin-bottom: 4px;">
        <button class="btn-secondary" onclick="app.exportMutationsCsv()">
          <span class="icon-inline">${ICONS.download}</span> Ekspor Riwayat (CSV)
        </button>
      </div>

      <div class="items-grid">
        ${this.state.mutations.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">${ICONS.note}</div>
            <div style="font-weight:700; color:var(--text-white);">Belum ada riwayat mutasi</div>
          </div>
        ` : this.state.mutations.map(m => {
          const item = this.state.items.find(i => i.id === m.itemId);
          const isIn = m.type === 'IN';

          return `
            <div class="item-card" style="border-left: 4px solid ${isIn ? 'var(--green-safe)' : 'var(--ruby-primary)'}; padding: 12px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div style="font-weight:700; font-size:13px; color:var(--text-white);">
                  ${item ? item.name : 'Barang Terhapus'}
                </div>
                <span style="font-weight:800; font-size:14px; color:${isIn ? 'var(--green-bright)' : 'var(--ruby-primary)'};">
                  ${isIn ? '+' : '-'}${m.qty} <span style="font-size:10px;">${item ? item.unit : 'Pcs'}</span>
                </span>
              </div>

              <div style="font-size:11px; color:var(--text-muted); display:flex; justify-content:space-between; margin-top:4px;">
                <span>Dari: <strong>${m.from}</strong> <span class="icon-inline" style="color:var(--text-dim);">${ICONS.arrowRight}</span> Ke: <strong>${m.to}</strong></span>
              </div>

              <div style="font-size:10px; color:var(--text-dim); display:flex; justify-content:space-between; margin-top:6px; padding-top:6px; border-top:1px solid var(--border-subtle);">
                <span style="display:inline-flex; align-items:center; gap:4px; font-weight:600;"><span class="icon-inline">${ICONS.note}</span> ${m.note}</span>
                <span style="display:inline-flex; align-items:center; gap:4px; font-weight:600;"><span class="icon-inline">${ICONS.clock}</span> ${m.timestamp}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  exportMutationsCsv() {
    if (this.state.mutations.length === 0) {
      this.showToast('Tidak ada riwayat mutasi untuk diekspor.', 'warning');
      return;
    }

    let csvContent = 'ID Mutasi,Tanggal,Waktu,Tipe,Barang,SKU,Jumlah,Satuan,Asal (Dari),Tujuan (Ke),Keterangan\n';
    this.state.mutations.forEach(m => {
      const item = this.state.items.find(i => i.id === m.itemId);
      const parts = m.timestamp.split(' ');
      const date = parts[0] || '';
      const time = parts[1] || '';
      const typeLabel = m.type === 'IN' ? 'MASUK' : 'KELUAR';
      
      csvContent += `"${m.id}","${date}","${time}","${typeLabel}","${item ? item.name : 'Unknown'}","${item ? item.sku : ''}",${m.qty},"${item ? item.unit : ''}","${m.from}","${m.to}","${m.note}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Istiqomah_Stock_Mutasi_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('Laporan Mutasi berhasil diekspor!', 'success');
  }

  // 5. SETTINGS & LOCAL BACKUP
  renderSettingsPage() {
    this.headerTitle.innerHTML = `<span class="icon-inline">${ICONS.settings}</span> <span>Pengaturan Data</span>`;
    this.headerSub.innerHTML = '<span class="status-indicator"></span> Backup & Pemeliharaan Offline';

    this.contentContainer.innerHTML = `
      <div class="chart-card">
        <div class="chart-card-title">
          <span class="icon-inline">${ICONS.download}</span> Pencadangan Lokal (Offline Backup)
        </div>
        <p style="font-size:12px; color:var(--text-muted);">
          Unduh seluruh basis data stok dan riwayat mutasi dalam format JSON untuk disimpan di memori perangkat atau dipindahkan ke gawai lain secara offline.
        </p>

        <button class="btn-primary" onclick="app.downloadBackupJson()">
          <span class="icon-inline">${ICONS.download}</span> Unduh Backup Data (.JSON)
        </button>
      </div>

      <div class="chart-card">
        <div class="chart-card-title">
          <span class="icon-inline">${ICONS.pdf}</span> Dokumen Perencanaan PDF
        </div>
        <p style="font-size:12px; color:var(--text-muted);">
          Buka berkas Master Blueprint & SRS Istiqomah Stock yang telah digenerate.
        </p>

        <a href="./Istiqomah_Stock_Perencanaan_Mobile_App.pdf" target="_blank" class="btn-secondary" style="text-decoration:none;">
          <span class="icon-inline">${ICONS.pdf}</span> Buka File PDF Blueprint
        </a>
      </div>

      <div class="chart-card" style="border-color:rgba(220, 38, 38, 0.4);">
        <div class="chart-card-title" style="color:#F87171;">
          <span class="icon-inline">${ICONS.alert}</span> Reset Basis Data
        </div>
        <p style="font-size:12px; color:var(--text-muted);">
          Kembalikan data barang, slot rak, dan transaksi ke kondisi default.
        </p>

        <button class="btn-secondary" style="border-color:var(--red-primary); color:#F87171;" onclick="app.resetData()">
          <span class="icon-inline">${ICONS.reset}</span> Reset ke Data Awal
        </button>
      </div>
    `;
  }

  // Export CSV
  exportCsvReport() {
    const criticalItems = this.getOutAndLowStockItems();
    if (criticalItems.length === 0) {
      this.showToast('Tidak ada data stok habis/kritis untuk diekspor.', 'warning');
      return;
    }

    let csvContent = 'Lokasi Lantai,Slot ID,Nama Barang,SKU,Barcode,Stok Saat Ini,Batas Minimum,Satuan,Status\n';
    criticalItems.forEach(item => {
      const floor = this.state.floors.find(f => f.id === item.floorId);
      const slot = floor ? floor.slots.find(s => s.id === item.slotId) : null;
      const status = item.stock === 0 ? 'HABIS TOTAL' : 'MENIPIS';
      csvContent += `"${floor ? floor.name : ''}","${slot ? slot.code : ''}","${item.name}","${item.sku}","${item.barcode || ''}",${item.stock},${item.minStock},"${item.unit}","${status}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Istiqomah_Stock_Laporan_Habis_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('Laporan CSV berhasil diunduh secara lokal!', 'success');
  }

  // Download Backup JSON
  downloadBackupJson() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `Istiqomah_Stock_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('File backup JSON berhasil diunduh!', 'success');
  }

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
}

// Instantiate App globally
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new StockApp();
});
