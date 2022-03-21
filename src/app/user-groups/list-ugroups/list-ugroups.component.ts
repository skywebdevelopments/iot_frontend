import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListUserGroupsService } from '../../service/user/list-user-groups.service';
import { DeleteUgroupService } from '../../service/user/delete-ugroup.service';
import { UpdateUgroupService } from '../../service/user/update-ugroup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatSortable } from '@angular/material/sort';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthorizeRoleService } from '../../service/user/authorize-role.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ListRolesService } from '../../service/user/list-roles.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface ugroupElement {
  groupname: string,
  active: boolean,
  roles: any,
  rec_id: string
}

const TABLE_SCHEMA = {
  "isEdit": "isEdit",
  "isDelete": "isDelete"
}

const ELEMENT_DATA: ugroupElement[] = [];

@Component({
  selector: 'app-list-ugroups',
  templateUrl: './list-ugroups.component.html',
  styleUrls: ['./list-ugroups.component.css']
})
export class ListUgroupsComponent implements OnInit {

  panelOpenState = false;
  avaliableRoles = [];
  assignedRoles = [];
  data = [];
  groupname = new FormControl("");
  active = new FormControl(false);
  rec_id: any;
  authorized: boolean;

  displayedColumns: string[] = ['select', 'groupname', 'active', 'roles', 'isEdit', 'isDelete'];
  dataSource = new MatTableDataSource<ugroupElement>(ELEMENT_DATA);
  selection = new SelectionModel<ugroupElement>(true, []);


  dataSchema = TABLE_SCHEMA;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private service_listUGroup: ListUserGroupsService,

    private service_deleteUGroup: DeleteUgroupService,
    private service_updateUgroup: UpdateUgroupService,
    private service_List_Roles: ListRolesService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private service_authorize: AuthorizeRoleService,
    private dialog: MatDialog,
  ) { }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    if (this.dataSource.data) {
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return 0;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ugroupElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.groupname}`;
  }
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  // get group list
  get_ugroup_list(showSnackBar: boolean) {
    this.service_listUGroup.service_list_usergroups().then(res => {
      if (res['data']) {
        // add data to the table (data source)
        console.log(res['data'])
        this.dataSource.data = res['data']
        // control the sort
        // TODO: switch to an input
        this.sort.sort({ id: 'groupname', start: 'asc' } as MatSortable)
        this.dataSource.sort = this.sort;
        // end
        // display a notification
        if (showSnackBar) {
          this.avaliableRoles = [];
          this.assignedRoles = [];
          this.data = [];
          this.groupname = new FormControl("");
          this.active = new FormControl(false);
          this.rec_id = ""
          this.openSnackBar("list is updated", "Ok", 4000);
        }
      }
      else {
        this.dataSource.data = [];
        this.openSnackBar("list is Empty!", "Ok", 2000);
      }
    });
  };


  /// for Edit Modal
  //return all roles
  get_roles(Roles_group: any) {
    this.service_List_Roles.service_list_usergroups().then(res => {
      for (var item of res['data']) {
        var id = Roles_group.indexOf(item['role']);
        if (id === -1)
          this.avaliableRoles.push(item['role'])
      }
    });
  };

  edit_ugroup(ugroup: any) {
    this.groupname = new FormControl(ugroup.groupname, [Validators.required, Validators.minLength(4)]);
    for (var item of ugroup.roles)
      this.assignedRoles.push(item)
    this.active = new FormControl(ugroup.active);
    this.get_roles(this.assignedRoles)
    //ugroup.isEdit = !ugroup.isEdit
    this.rec_id = ugroup.rec_id;
  }
  getErrorMessageGroup() {
    if (this.groupname.hasError('required')) {
      return 'You must enter a groupname';
    }
    if (this.groupname.hasError('minlength')) {
      return 'Groupname must be at least 4 characters long.';
    }
  }
  save_changes() {
    var formdata = { "groupname": this.groupname.value, "active": this.active.value, "roles": this.assignedRoles, "rec_id": this.rec_id }
    this.service_updateUgroup.service_update_ugroup(formdata).then(res => {
      if (res['code'] === 3100) {
        this.openSnackBar("Group Name is already exist", "Ok", 2000);
      }
      else {
        this.openSnackBar(`Saved successfully`, 'Ok', 2000)
        location.reload();
      }
    })

  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.avaliableRoles, event.previousIndex, event.currentIndex);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.data.push(event.container.data);
    }
  }
  //////End

  // UI Functions
  isBool(val): boolean { return typeof val === 'boolean'; }

  // delete group
  delete_ugroup() {
    this.selection.selected.forEach(group => {
      if (group.groupname == "public") {
        this.openSnackBar("public group is forbidden to be deleted", 'Ok', 4000);
      }
      else {
        let formData = {
          rec_id: group.rec_id
        }
        this.service_deleteUGroup.service_delete_ugroup(formData).then(res => {
          this.openSnackBar(res['message'], 'OK', 4000);
          this.get_ugroup_list(true);
        })
      }
    })
    //!important: clear all the current selections after delete requests
    this.selection.clear();
  }

  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }


  // delete group
  delete_ugroup_onerec(e: any) {
    if (e['isDelete'] !== undefined && e['isDelete'] == true) {
      // 1. delete the flag
      delete e['isDelete']
      this.service_deleteUGroup.service_delete_ugroup(e).then(res => {
        this.openSnackBar(res['message'], 'Ok', 4000);
        // recall refresh
        this.get_ugroup_list(true);
      })
    }
  }

  delete_dialog(e: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'confirm') {
        e['isDelete'] = !e['isDelete'];
        this.delete_ugroup_onerec(e);
      }
    })
  }
  ngOnInit(): void {
    this.get_ugroup_list(false);
  }
  authorize(role) {
    return this.service_authorize.service_authorize_user(role);
  }
}
