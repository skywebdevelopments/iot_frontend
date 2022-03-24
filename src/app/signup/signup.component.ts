import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
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
  password="";

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
        Validators.required, Validators.minLength(4)
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ])],
      Confirm_password: ['', Validators.compose([Validators.required, this.checkPasswords()])]
    })
  }

  //to take input password
  onChangepassword(password: string) {
      this.password= password;
  }
  
  getErrorMessagusername() {
    if (this.form_signup.controls['username'].hasError('required')) {
      return 'username field is required.';
    }
    if (this.form_signup.controls['username'].hasError('minlength')) {
      return 'Username must be at least 4 characters long.';
    }
  }

  getErrorMessageEmail() {
    if (this.form_signup.controls['email'].hasError('required')) {
      return 'Email field is required.';
    }
    if (this.form_signup.controls['email'].hasError('pattern')) {
      return 'Invalid email format.';
    }
  }

  getErrorMessagepass() {
    if (this.form_signup.controls['password'].hasError('required')) {
      return 'Password field is required.';
    }
    if (this.form_signup.controls['password'].hasError('pattern')) {
      return 'Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.';
    }
  }

  getErrorMessageconfirmpass() {
    if (this.form_signup.controls['Confirm_password'].hasError('required')) {
      return 'Confirm password field is required.';
    }
    if (this.form_signup.controls['Confirm_password'].hasError('notSame')) {
      return "Password fields doesn't match.";
    }
  }

  //custom validation for confirm_password
  checkPasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const confirm_pass = control.value;
      return confirm_pass === this.password ? null : { notSame: true }
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
    if (this.form_signup.valid) {
      this.form_signup.removeControl('Confirm_password');

      // submit the form
      this.service_signup.service_signup(this.form_signup.value).then(res => {
        if (res['code'] === 3100) {
          this.Invalid_signup()
        }
        else {
          this.router.navigateByUrl('Login')
          this.form_signup.reset();
        }
      })
    }
  }

  Invalid_signup() {
    let dialogRef = this.dialog.open(SignupDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        this.router.navigateByUrl('Login')
      }
      else {
        window.location.reload();
      }

    })
    this.form_signup.reset();
  }

  ngOnInit(): void {
    this.init_form();

  }

}
