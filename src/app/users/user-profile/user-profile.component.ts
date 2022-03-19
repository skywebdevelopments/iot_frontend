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
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  email = new FormControl("");
  role = new FormControl("");
  username = new FormControl("");
  password = new FormControl("");
  password_user:any;
  newpassword = new FormControl("");
  id: any;
  password_validation = false;
  constructor(private service_enc_dec: EncrDecrService,
    private service_listUser: ListUsersService,
    private service_deleteUser: DeleteUserService,
    private service_updateUser: UpdateUserService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public cookieService: CookieService) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null || !localStorage.getItem('token')) {
      alert("You are not authorized");
    }
    else {
      let token = this.service_enc_dec.get(localStorage.getItem('token'), environment.backend.t_secret);
      let decoded_user = jwt_decode(token)
      this.service_listUser.service_list_user_by_id(decoded_user).then(res => {
        this.username = new FormControl(res['username'], [Validators.required, Validators.minLength(4)]);
        this.email = new FormControl({value: res['email'], disabled: true});
        this.role = new FormControl({value: res['u_group']['groupname'], disabled: true});
        this.password_user=res['password']
        this.password = new FormControl("",[Validators.required]);
        this.newpassword = new FormControl("",[ Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]);
        this.id =res['id']

      })
    }
  }

  delete_dialog() {
    var get_user={"id":this.id}
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        this.service_deleteUser.service_delete_user(get_user).then(() => {
          localStorage.removeItem("token");
          this.cookieService.deleteAll();
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
    if (this.username.hasError('required')) {
      return 'You must enter a username.';
    }
    if (this.username.hasError('minlength')) {
      return 'Username must be at least 4 characters long.';
    }
  }

  getErrorMessagepass() {
    if (this.password.hasError('required')) {
      return 'You must enter a password.';
    }
  }

  getErrorMessagenewpass() {
      if (this.newpassword.hasError('pattern'))
      return 'Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.';
  }
  
  submit_all() {
    var get_user;
    if(this.newpassword.value.length!==0){
    get_user={"id":this.id,"username":this.username.value,"password":this.newpassword.value}
    }
    else{
    get_user={"id":this.id,"username":this.username.value,"password":this.password.value}
    }
    this.service_updateUser.service_update_user(get_user).then(res => {
      this.openSnackBar(`Saved successfully`, 'Ok', 2000)
      location.reload();
    })
  }

}
