import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
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
      username: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])],
      Confirm_password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])]
    })
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
