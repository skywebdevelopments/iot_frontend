import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder,FormArray,FormControl, ValidatorFn } from '@angular/forms';
import { ListUsernameUsersService } from '../service/user/list-username-users.service';
import { UpdateUserRolesService } from '../service/user/update-user-roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  Users:any;
  form_roles: any;
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

  Get_mqqtuser() {
    var User_names = []
    this.service_ListUsername_User.service_list_usernames().then(res => {
      res['data'].forEach(function (user) {
        User_names.push(user)
      });
    });
    return User_names;
  }

  get permissionsFormArray() {
    return this.form_roles.controls.permissions as FormArray;
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;
  }

  private addCheckboxes() {
    this.permissions.forEach(() => this.permissionsFormArray.push(new FormControl(false)));
  }

  init_form() {
    this.form_roles = this.formBuilder.group({
      userid: [null, Validators.compose([
        Validators.required
      ])],
      permissions: new FormArray([], this.minSelectedCheckboxes(1))
    })
    this.addCheckboxes();
  }

  onsubmit() {
    this.form_roles.value.permissions = this.form_roles.value.permissions
      .map((checked, i) => checked ? this.permissions[i] : null)
      .filter(v => v !== null);
      this.service_Updateroles_User.service_update_user_premissions(this.form_roles.value).then(res => {
        this.openSnackBar(`Permissions Updated Successfully`, '', 2000)
      })
    
  }

  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }
  ngOnInit(): void {
    this.init_form();
    this.Users= this.Get_mqqtuser();
  }

}
