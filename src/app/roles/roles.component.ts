import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ListUsernameUsersService } from '../service/user/list-username-users.service';
import { UpdateUserRolesService } from '../service/user/update-user-roles.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface UserElement {
  email: "text",
  username: "boolean",
  roles: "text"
}
const ELEMENT_DATA: UserElement[] = []

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})

export class RolesComponent implements OnInit {
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
  displayedColumns: string[] = ["email", "username", "roles"];
  dataSource = new MatTableDataSource<UserElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service_ListUsername_User: ListUsernameUsersService,
    private service_Updateroles_User: UpdateUserRolesService
  ) { }


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
      window.location.reload()
  }

  check_value(array, item) {
    for (let index of array) {
      if (index === item)
        return true;
    }
    return false
  }

  get_users_list(showSnackBar: boolean) {
    this.service_ListUsername_User.service_list_usernames().then(res => {
      if (res['data']) {
        // add data to the table (data source)
        this.dataSource.data = res['data']
        if (showSnackBar) {
          this.openSnackBar("list is updated", "Ok", 4000);
        }
      }
      else {
        this.dataSource.data = [];
        this.openSnackBar("list is Empty!", "Ok", 2000);
      }
    });
  };

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }

  ngOnInit(): void {
    this.get_users_list(false);
  }
}
