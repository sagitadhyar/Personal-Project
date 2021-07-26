import { Component, OnInit } from '@angular/core';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { Constants } from 'src/app/utils/constants';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthHelper, User} from 'src/app/utils/auth-helper';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  title = Constants.SITE_TITTLE
  screenWidth: number
  userData: User

  navList = Constants.LIST_ADMIN_MENU
  constructor(public dialog:MatDialog, private router:Router) {
    this.userData = AuthHelper.isLoggedIn()
    if(!this.userData) this.router.navigateByUrl('/login')

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
        title: "Anda yakin ingin keluar?",
      }
    }).afterClosed().subscribe(ok => {
      if(ok) {
        AuthHelper.logout()
        window.location.reload()
      }
    });
  }

}
