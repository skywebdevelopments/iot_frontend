import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListUsersService } from '../../../app/service/user/list-users.service';
import { UpdateUserService } from '../../../app/service/user/update-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortable } from '@angular/material/sort';
import { AuthorizeRoleService } from '../../../app/service/user/authorize-role.service';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ListUserGroupsService } from '../../service/user/list-user-groups.service';


export interface userElement {
  username: "text",
  email: "text",
  active: "boolean",
  u_group: "text",
  rec_id: "text"
}

const TABLE_SCHEMA = {
  "isEdit": "isEdit",
}
// to be filled from the service
const ELEMENT_DATA: userElement[] = [];


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  // form controls.
  enable_save_all = false
  form_updateUser: any;
  replace_with_input = false;
  authorized: boolean;
  // end
  displayedColumns: string[] = ['username', 'email', 'active', "u_group", 'isEdit'];
  dataSource = new MatTableDataSource<userElement>(ELEMENT_DATA);
  selection = new SelectionModel<userElement>(true, []);
  dataSchema = TABLE_SCHEMA;
  user_groups = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }
  constructor(
    private service_listUser: ListUsersService,
    private service_updateUser: UpdateUserService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private service_authorize: AuthorizeRoleService,
    private service_List_UserGroups: ListUserGroupsService,
  ) { }


  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  // get user list
  get_user_list(showSnackBar: boolean) {
    this.service_listUser.service_list_users().then(res => {
      if (res['data']) {
        // add data to the table (data source)
        this.dataSource.data = res['data']
        // control the sort
        // TODO: switch to an input
        this.sort.sort({ id: 'Username', start: 'asc' } as MatSortable)
        this.dataSource.sort = this.sort;
        // end
        // display a notification
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

  // UI Functions
  isBool(val): boolean { return typeof val === 'boolean'; }
  isobject(val): boolean { return typeof val === 'object'; }
  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }


  // log event (test)
  enable_edit_mode() {
    this.replace_with_input = !this.replace_with_input;
  }

  submit_all() {
    // flag the 
    this.dataSource.data.forEach(item => {
      if (item['isEdit'] !== undefined && item['isEdit'] == true) {
        delete item['isEdit']
        this.service_updateUser.service_update_user_active(item).then(()=> {
          this.service_updateUser.service_update_user_role(item).then(res => {
            this.openSnackBar(`Saved successfully`, 'Ok', 2000)
          })
        })
      }
      this.enable_save_all = false;
    })

  }

  check_value(user_assined_groups, user_group) {
    if (user_assined_groups === user_group)
      return true;
    else
      return false
  }

  get_usergroups_list() {
    this.service_List_UserGroups.service_list_usergroups().then(res => {
      for (var usergroup of res['data']) {
        this.user_groups.push(usergroup);
      }
    });
  };

  ngOnInit(): void {
    this.get_user_list(false);
    this.get_usergroups_list();
  }
  authorize(role) {
    return this.service_authorize.service_authorize_user(role);
  }
}
