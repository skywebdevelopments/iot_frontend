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
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  get_user: any;
  constructor(private service_enc_dec: EncrDecrService,
    private service_listUser: ListUsersService,
    private service_deleteUser: DeleteUserService,
    private service_updateUser: UpdateUserService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null || !localStorage.getItem('token')) {
      alert("You are not authorized");
    }
    else {
      let token = this.service_enc_dec.get(localStorage.getItem('token'), environment.backend.t_secret);
      let decoded_user = jwt_decode(token)
      this.service_listUser.service_list_user_by_id(decoded_user).then(res => {
        this.get_user = res;
      })
    }
  }

  delete_dialog() {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'confirm') {
        this.service_deleteUser.service_delete_user(this.get_user).then(()=>{
          this.router.navigateByUrl('Login')
        })
      }
    })
  }


  onChangeusername(user:string) { 
    this.get_user.username = user;
  }

  
  onChangepassword(password:string) { 
    /*var hash = CryptoJS.SHA256(password);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    console.log(this.get_user.password)
    console.log(btoa("password"));*/
  }

  submit_all() {
      /*this.service_updateUser.service_update_user(this.get_user).then(res => {
       console.log("Sucess Updated")
      })*/

    /*this.dataSource.data.forEach(item => {
      if (item['isEdit'] !== undefined && item['isEdit'] == true) {
        delete item['isEdit']
        this.service_updateUser.service_update_user_active(item).then(()=> {
          this.service_updateUser.service_update_user_role(item).then(res => {
            this.openSnackBar(`Saved successfully`, '', 2000)
          })
        })
      }
      this.enable_save_all = false;
    })*/

  }

}
