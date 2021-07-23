import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title = Constants.siteTitle
  screenWidth: number

  navList = [
    { link: '/admin/dashboard', icon: 'dashboard', title: 'Dashboard' },
    { link: '/admin/barang', icon: 'inbox', title: 'Barang' },
    { link: '/admin/pegawai', icon: 'group', title: 'Pegawai' },
    { link: '/admin/supplier', icon: 'shopping_cart', title: 'Supplier' },
    { link: '/admin/permintaan', icon: 'save_alt', title: 'Permintaan' },
    { link: '/admin/pembelian', icon: 'payments', title: 'Pembelian' },
    { link: '/admin/pengiriman', icon: 'send', title: 'Pengiriman' }
  ]

  constructor() {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
   }

  ngOnInit(): void {
  }

  doLogout()
  {
    let conf = confirm('Keluar Aplikasi?');
    if(conf)
    {
      localStorage.removeItem('appToken');
      window.location.reload();
    }
  }

}
