import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ListUsernameUsersService } from '../service/user/list-username-users.service';
import { UpdateUserRolesService } from '../service/user/update-user-roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  Users: any;
  User_ID: any;
  User_Roles:any;
  Updated_values:any;
  permissions = [
    "sensor:delete",
    "sensor:create",
    "sensor:list",
    "sensor:update",
    "group:list",
    "group:update",
    "group:delete",
    "group:create",
    "group",
    "sensor",
    "admin"
  ];

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service_ListUsername_User: ListUsernameUsersService,
    private service_Updateroles_User: UpdateUserRolesService
  ) { }


  Get_users() {
    var Users = []
    this.service_ListUsername_User.service_list_usernames().then(res => {
      for (let user of res['data']) {
        Users.push(user);
      };
    });
    return Users;
  }

  onCheckboxChange(event: any,value,index) {
    if (event.target.checked) {
      value.roles.push(this.permissions[index]);
    } 
    else {
      const index_element=value.roles.indexOf(this.permissions[index])
      value.roles.splice(index_element, 1); 
    }
    this.User_ID=value.id;
    this.User_Roles=value.roles;
  }
 
  onsubmit() {
    this.Updated_values={userid:this.User_ID,permissions:this.User_Roles}
      this.service_Updateroles_User.service_update_user_premissions(this.Updated_values).then(res => {
        this.openSnackBar(`Permissions Updated Successfully`, '', 2000)
      })
  }

  check_value(array, item) {
    for (let index of array) {
      if (index === item)
        return true;
    }
    return false
  }

  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }

  ngOnInit(): void {
    this.Users = this.Get_users();
  }

}
