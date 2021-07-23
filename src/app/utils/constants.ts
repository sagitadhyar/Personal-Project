export class Constants {

    public static SITE_TITTLE: string = "INVENTORYKU";
    public static LIST_ADMIN_MENU = [
        { color: '#EF5350', link: '/admin/dashboard', icon: 'dashboard', title: 'Dashboard' },
        { color: '#AB47BC', link: '/admin/barang', icon: 'inbox', title: 'Barang' },
        { color: '#5C6BC0', link: '/admin/pegawai', icon: 'group', title: 'Pegawai' },
        { color: '#29B6F6', link: '/admin/supplier', icon: 'shopping_cart', title: 'Supplier' },
        { color: '#26A69A', link: '/admin/permintaan', icon: 'save_alt', title: 'Permintaan' },
        { color: '#9CCC65', link: '/admin/pembelian', icon: 'payments', title: 'Pembelian' },
        { color: '#D4E157', link: '/admin/pengiriman', icon: 'send', title: 'Pengiriman' }
      ]

    public static SHOW_DUMMY_BUTTON : boolean = true
    public static DUMMY_NAMA_BARANG_PREFIX : string[] = ['Meja', 'Lemari', 'Laci', 'Komputer', 'Kalender', 'Telefon', 'Sepeda Motor', 'Mobil', 'Pensil', 'Pulpen', 'Jam Dinding', 'Kursi Kayu ', 'Kursi Besi', 'LCD Proyektor', 'Papan Tulis', 'Papan Visual', 'AC Split', 'Kipas Angin', 'Microphonw', 'Tabung Gas', 'Alat Hias', 'Karpet', 'Asbak Tinggi', 'Fingerprint Absensi', 'TIang Bendera', 'Dispenser', 'Palu Sidang', 'Handy Cam', 'DSLR', 'Kompor Gas', 'Kompor Listring', 'Server', 'PC', 'Macbook', 'Router', 'Router Besar', 'Printer', 'Scanner', 'Laptop', 'Kalkulator', 'Rak Besi', 'Rak Kayu']
    public static DUMMY_NAMA_BARANG_SUFIX : string[] = ['Kecil', 'Sedang', 'Besar']
    public static DUMMY_SATUAN : string [] = ['Buah', 'Unit']
    public static DUMMY_KATEGORI : string [] = ['K1', 'K2', 'K3', 'K4', 'K5']
    

}