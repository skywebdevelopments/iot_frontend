import { Component, OnInit } from '@angular/core';
import { EncrDecrService } from '../../service/encr-decr.service'
import jwt_decode from "jwt-decode";
import { environment } from '../../../environments/environment.prod'
import { ListUsersService } from '../../../app/service/user/list-users.service';
import { DeleteUserService } from '../../../app/service/user/delete-user.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router'
import { UpdateUserService } from '../../../app/service/user/update-user.service';
import { SHA256, enc } from "crypto-js";
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  email: any;
  role: any;
  name :any;
  password: any;
  password_user: any;
  newpassword: any;
  id: any;
  form_update: FormGroup;
  form_delete: FormGroup;
  password_validation = false;
  decoded_user: any;
  constructor(
    private formBuilder: FormBuilder,
    private service_enc_dec: EncrDecrService,
    private service_listUser: ListUsersService,
    private service_deleteUser: DeleteUserService,
    private service_updateUser: UpdateUserService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //form edit 
    this.form_update = this.formBuilder.group({
      name: ["", Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ["", Validators.compose([Validators.required])],
      newpassword: ["", Validators.compose([Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])]
    })
    //end
     //form delete 
     this.form_delete = this.formBuilder.group({
      password: ["", Validators.compose([Validators.required])]
    })
    //end
    let token = this.service_enc_dec.get(localStorage.getItem('token'), environment.backend.t_secret);
    this.decoded_user = jwt_decode(token)
    this.service_listUser.service_list_user_by_id(this.decoded_user).then(res => {
      this.name = res['username']
      this.email = res['email']
      this.role = res['u_group']['groupname']
      this.id = res['id']
      this.password_user = res['password']
      this.form_update.controls['name'].setValue(this.name)
    })
  }

  delete_dialog() {
    var get_user = { "id": this.id }
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        this.service_deleteUser.service_delete_user(get_user).then(() => {
          this.router.navigateByUrl('Login')
        })
      }
    })
  }

  //snackbar
  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }

  onChangepassword(password: string) {
    const hashedPass = SHA256(password).toString(enc.Base64);
    if (hashedPass.localeCompare(this.password_user) === 0)
      this.password_validation = true;
    else
      this.password_validation = false;
  }

  getErrorMessagename() {
    if ( this.form_update.controls['name'].hasError('required')) {
      return 'You must enter a username.';
    }
    if ( this.form_update.controls['name'].hasError('minlength')) {
      return 'Username must be at least 4 characters long.';
    }
  }

  getErrorMessagenewpass() {
    if ( this.form_update.controls['newpassword'].hasError('pattern'))
      return 'Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.';
  }

  submit_all() {
    var get_user;
    if (this.form_update.controls['newpassword'].value.length !== 0) {
      get_user = { "id": this.id, "username": this.form_update.controls['name'].value, "password": this.form_update.controls['newpassword'].value }
    }
    else {
      get_user = { "id": this.id, "username": this.form_update.controls['name'].value, "password": this.form_update.controls['password'].value }
    }
    this.service_updateUser.service_update_user(get_user).then(res => {
      this.openSnackBar(`Saved successfully`, 'Ok', 2000)
      location.reload();
    })
  }

}
