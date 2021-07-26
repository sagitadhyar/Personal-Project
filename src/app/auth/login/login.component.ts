import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthHelper } from 'src/app/utils/auth-helper';
import { Constants } from 'src/app/utils/constants';
import { GlobalHelper } from 'src/app/utils/global-helper';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = Constants.SITE_TITTLE
  hide = true
  isLoading = false
  errorMsg: string = " "

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required ]),
  });

  matcher = new MyErrorStateMatcher();

  async onSubmit(){
    this.errorMsg = ""
    this.isLoading = true

    //Dummy loading 1 detik
    await GlobalHelper.delay(1000)
    
    this.isLoading = false

    if(AuthHelper.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)) this.router.navigateByUrl('/admin')
    else this.errorMsg = "Username atau password salah"

  }
}
