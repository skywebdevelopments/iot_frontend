import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupService } from '../service/user/signup.service';
import { SignupDialogComponent } from '../signup-dialog/signup-dialog.component';
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form_signup: any;

  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern('^[_A-z0-9]*((-|s)*[_A-z0-9])*$'),
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
  ]);

  password = new FormControl('',
  [
    Validators.required, 
    Validators.minLength(5),
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') 
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private service_signup: SignupService,
    private router: Router,
    private _snackBar: MatSnackBar,

  ) { }

  init_form() {
    // validators 
    // name min length 
    // required.
    this.form_signup = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      Confirm_password: this.password
    },{ validators: this.MatchPassword })
  }
  
  MatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password').value;
    let confirmPassword = abstractControl.get('Confirm_password').value;
    if (password != confirmPassword) {
        abstractControl.get('Confirm_password').setErrors({
          MatchPassword: true
        })
    } else {
      return null
    }
  }

  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }


  onsubmit() {
    // check the form is valid 
    if (this.form_signup.valid && this.form_signup.get('password').value === this.form_signup.get('Confirm_password').value) {
      this.form_signup.removeControl('Confirm_password');

      // submit the form
      this.service_signup.service_signup(this.form_signup.value).then(res => {

        if (res['code'] === 3100) {
          this.Invalid_signup()
        }
        else {
          this.router.navigate([{ outlets: { first: [ 'Login' ] }}])
          this.form_signup.reset();
        }
      })
    }
  }

  Invalid_signup() {
    let dialogRef = this.dialog.open(SignupDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        this.router.navigate([{ outlets: { first: [ 'Login' ] }}])
      }
      else{
        window.location.reload();
      }

    })
    this.form_signup.reset();
  }

  ngOnInit(): void {
    this.init_form();

  }

}
