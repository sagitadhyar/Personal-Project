import { Component, OnInit } from '@angular/core';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { Constants } from 'src/app/utils/constants';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocalStorageHelper } from 'src/app/utils/local-storage-helper';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title = Constants.SITE_TITTLE
  screenWidth: number

  navList = Constants.LIST_ADMIN_MENU
  constructor(public dialog:MatDialog, private router:Router) {
    if(!LocalStorageHelper.isLoggedIn()) this.router.navigateByUrl('/login')

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
    this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: {
        title: "Keluar Aplikasi?",
      }
    }).afterClosed().subscribe(ok => {
      if(ok) {
        localStorage.removeItem('user');
        window.location.reload();
      }
    });
  }

}
