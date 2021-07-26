import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthHelper, User } from 'src/app/utils/auth-helper';
import { Constants } from 'src/app/utils/constants';
import { GlobalHelper } from 'src/app/utils/global-helper';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  title = Constants.SITE_TITTLE
  hide = true
  hideConfirm = true
  isLoading = false
  errorMsg: string = " "

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  async onSubmit() {
    this.errorMsg = ""
    this.isLoading = true

    //Dummy loading 1 detik
    await GlobalHelper.delay(1000)
    
    if(this.signupForm.controls.password.value !== this.signupForm.controls.passwordConfirm.value) {
      this.errorMsg = "Password konfirmasi tidak sesuai"
      this.isLoading = false
      return
    }

    const user : User = {
      username: this.signupForm.controls.username.value,
      email: this.signupForm.controls.email.value,
      nip: this.signupForm.controls.nip.value,
      password: this.signupForm.controls.password.value
    } as User
    
    this.isLoading = false

    const error = AuthHelper.signup(user)

    if(error) {
      this.errorMsg = error as string
      return
    }
    
    this.router.navigateByUrl('/admin')
  }

  signupForm = new FormGroup({
    username: new FormControl('', [ Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[a-z0-9]+$/i) ]),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    nip: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]),
    passwordConfirm: new FormControl('', [ Validators.required]),
  });

  matcher = new MyErrorStateMatcher();

}
