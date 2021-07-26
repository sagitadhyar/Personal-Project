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
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  title = Constants.SITE_TITTLE
  hide = true
  hideConfirm = true
  isLoading = false
  errorMsg: string = " "

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  forgotForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]),
    passwordConfirm: new FormControl('', [ Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

  async onSubmit() {
    this.errorMsg = ""
    this.isLoading = true

    //Dummy loading 1 detik
    await GlobalHelper.delay(1000)
    
    if(this.forgotForm.controls.password.value !== this.forgotForm.controls.passwordConfirm.value) {
      this.errorMsg = "Password konfirmasi tidak sesuai"
      this.isLoading = false
      return
    }
    
    this.isLoading = false

    if(AuthHelper.changePassword(this.forgotForm.controls.email.value, this.forgotForm.controls.password.value)) this.router.navigateByUrl('/admin')
    else this.errorMsg = "Email tidak ditemukan"
  }

}
