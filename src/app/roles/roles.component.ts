import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ListUsernameUsersService } from '../service/user/list-username-users.service';
import { ListUserGroupsService } from '../service/user/list-user-groups.service';
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
  Updated_values:any;
  User_ID: any;
  //User_Roles:any;
  /*permissions = [
    "sensor:delete",
    "sensor:create",
    "sensor:list",
    "sensor:update",
    "s_group:list",
    "s_group:update",
    "s_group:delete",
    "s_group:create",
    "s_group",
    "sensor",
    "admin"
  ];*/
  assigned_roles:any=[];
  delete_roles:any=[];
  permissions = [];
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
    private service_List_UserGroups:ListUserGroupsService,
    private service_Updateroles_User: UpdateUserRolesService
  ) { }


  onCheckboxChange(event: any,index) {
    
    if (event.target.checked) {
      //user.roles.push(this.permissions[index]);
      this.assigned_roles.push(this.permissions[index]);
      const index_element=this.delete_roles.indexOf(this.permissions[index])
      this.delete_roles.splice(index_element, 1);
    } 
    else {
      //const index_element=user.roles.indexOf(this.permissions[index])
      //user.roles.splice(index_element, 1); 
      this.delete_roles.push(this.permissions[index]);
      const index_element=this.assigned_roles.indexOf(this.permissions[index])
      this.assigned_roles.splice(index_element, 1); 
    }
    //this.User_ID=user.id;
    //this.User_Roles=user.roles;
  }

  onsubmit(user) {
    //this.Updated_values={userid:this.User_ID,permissions:this.User_Roles}
    this.User_ID=user.id;
    console.log(user.u_groups);
    console.log(this.assigned_roles)
    for(let u_group of user.u_groups){
      const found=this.assigned_roles.find(elem => {return elem.groupname===u_group.groupname})
      //console.log (found);
    }
    //console.log(this.delete_roles);
    //console.log(this.assigned_roles);
    /*this.Updated_values={userid:this.User_ID,new_assign:this.assigned_roles,delete_assigned:this.delete_roles}
      this.service_Updateroles_User.service_update_user_roles(this.Updated_values).then(res => {
        this.openSnackBar(`Permissions Updated Successfully`, '', 2000)
      })
      window.location.reload()*/
  }

  check_value(user_assined_groups, user_group_id) {
    for (let group of user_assined_groups) {
      if (group['id'] === user_group_id)
      //if (group === user_group_id)
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

  get_usergroups_list() {
    this.service_List_UserGroups.service_list_usergroups().then(res => {
      for( var usergroup of res['data'] ){
        this.permissions.push(usergroup);
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
    this.get_usergroups_list();
  }
}
