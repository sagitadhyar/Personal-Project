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

  navList = Constants.adminMenus
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
