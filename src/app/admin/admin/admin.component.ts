import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title = Constants.SITE_TITTLE
  screenWidth: number

  navList = Constants.LIST_ADMIN_MENU
  constructor() {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
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
