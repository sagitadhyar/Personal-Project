import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHelper} from 'src/app/utils/auth-helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'inventory-barang-swalayan';

  constructor(private router: Router){
    if(AuthHelper.isLoggedIn()) this.router.navigateByUrl('/admin')
  }
}
