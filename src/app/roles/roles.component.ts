import { Component, OnInit,ViewChild } from '@angular/core';
import { Validators, FormBuilder,FormArray,FormControl, ValidatorFn } from '@angular/forms';
import { ListUsernameUsersService } from '../service/user/list-username-users.service';
import { UpdateUserRolesService } from '../service/user/update-user-roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  Users:any;
  form_roles: any;
  @ViewChild('select') select: MatSelect;
  allSelected=false;
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
    var User_names = []
    this.service_ListUsername_User.service_list_usernames().then(res => {
      res['data'].forEach(function (user) {
        User_names.push(user)
      });
    });
    return User_names;
  }

  init_form() {
    this.form_roles = this.formBuilder.group({
      userid: [null, Validators.compose([
        Validators.required
      ])],
      permissions: [[], Validators.required]
    })
  }
  onsubmit() {
      this.service_Updateroles_User.service_update_user_premissions(this.form_roles.value).then(res => {
        this.openSnackBar(`Permissions Updated Successfully`, '', 2000)
      })
      this.form_roles.reset();
    
  }

  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }
  ngOnInit(): void {
    this.init_form();
    this.Users= this.Get_users();
  }

}
