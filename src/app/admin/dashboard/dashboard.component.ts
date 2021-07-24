import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/utils/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  adminMenus = Constants.LIST_ADMIN_MENU.filter(e => !e.hideFromDashboard)
  screenWidth: number

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

}
