import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListGroupService } from '../../service/n_group/list-group.service';
import { DeleteGroupService } from '../../service/n_group/delete-group.service';
import { UpdateGroupService } from '../../service/n_group/update-group.service';
import { DeleteNodeService } from '../../service/node/delete-node.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatSortable } from '@angular/material/sort';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthorizeRoleService } from '../../service/user/authorize-role.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface groupElement {
  name: "text",
  active: "boolean",
  rec_id: "text"
}

export interface nodeElement {
  friendly_name: "text",
  board_name: "text",
  board_model: "text",
  rec_id: "text"
}

const TABLE_SCHEMA = {
  "isEdit": "isEdit",
  "isDelete": "isDelete"
}
// to be filled from the service
const ELEMENT_DATA: groupElement[] = [];
const Node_DATA: nodeElement[] = [];
@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})


export class ListGroupComponent implements OnInit {
  // form controls.
  enable_save_all = false
  form_updateGroup: any;
  replace_with_input = false;
  authorized: boolean;
  selectedTableRecord: any;
  // end


  displayedColumns: string[] = ['select', 'name', 'active', 'isEdit', 'isDelete'];

  //node Table
  displayedColumnss: string[] = ['select', 'friendly_name', 'board_name','board_model'];

  dataSource = new MatTableDataSource<groupElement>(ELEMENT_DATA);
  selection = new SelectionModel<groupElement>(true, []);

//Node Table
  dataSourcee = new MatTableDataSource<nodeElement>(Node_DATA);
  selectionn = new SelectionModel<nodeElement>(true, []);


  dataSchema = TABLE_SCHEMA;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }
  constructor(
    private service_listGroup: ListGroupService,
    private service_deleteGroup: DeleteGroupService,
    private service_updateGroup: UpdateGroupService,

    private service_deletenode:DeleteNodeService,

    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private service_authorize: AuthorizeRoleService,

    private dialog: MatDialog,
  ) {
  }

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
  checkboxLabel(row?: groupElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }


  // for nodes 

  isAllSelectedd() {
    const numSelected = this.selectionn.selected.length;
    if (this.dataSourcee.data) {
      const numRows = this.dataSourcee.data.length;
      return numSelected === numRows;
    }
    return 0;
  }

  masterTogglee() {
    if (this.isAllSelectedd()) {
      this.selectionn.clear();
      return;
    }

    this.selectionn.select(...this.dataSourcee.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabell(row?: nodeElement): string {
    if (!row) {
      return `${this.isAllSelectedd() ? 'deselect' : 'select'} all`;
    }
    return `${this.selectionn.isSelected(row) ? 'deselect' : 'select'} row ${row.friendly_name}`;
  }

  applyFilterr(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourcee.filter = filterValue.trim().toLowerCase();
    if (this.dataSourcee.paginator) {
      this.dataSourcee.paginator.firstPage();
    }

  }

  //end

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  // get group list
  get_group_list(showSnackBar: boolean) {

    this.service_listGroup.service_list_group().then(res => {
      if (res['data']) {
        console.log(res['data'])
        // add data to the table (data source)
        this.dataSource.data = res['data']

        // control the sort
        // TODO: switch to an input
        this.sort.sort({ id: 'name', start: 'asc' } as MatSortable)
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

  // end

  // delete group
  delete_group() {

    this.selection.selected.forEach(group => {
      let formData = {
        rec_id: group.rec_id
      }

      this.service_deleteGroup.service_delete_group(formData).then(res => {
        console.log(res);

        this.openSnackBar(res['message'], '', 4000);

        // recall refresh
        this.get_group_list(true);

      })
    })
    // !important: clear all the current selections after delete requests
    this.selection.clear();
  }

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
  edit_group(e: any) {
    let rec_id = e.rec_id
    this.dataSource.data.forEach(item => {

      this.form_updateGroup = this.fb.group({
        name: [item.name, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])]
      });
    });
  };



  submit_all() {
    // flag the 
    this.dataSource.data.forEach(item => {
      if (item['isEdit'] !== undefined && item['isEdit'] == true) {
        // 2. post to the update API
        this.service_updateGroup.service_update_group(item).then(res => {
          if (res['status'] === 3100) {
            //console.log(this.form_updateGroup.form.controls['name'].value);
            this.openSnackBar("Group Name is already exist", "Ok", 2000);
          }
          else {
            // 1. delete the flag
            delete item['isEdit']
            this.openSnackBar(`Saved successfully`, '', 2000)
            this.enable_save_all = false;
          }
        })
      }
      //this.enable_save_all = false;
    })

  }

  // delete group
  delete_group_onerec(e: any) {

    if (e['isDelete'] !== undefined && e['isDelete'] == true) {
      // 1. delete the flag
      delete e['isDelete']
      this.service_deleteGroup.service_delete_group(e).then(res => {
        console.log(res);
        this.openSnackBar(res['message'], '', 4000);
        // recall refresh
        this.get_group_list(true);
      })
    }
  }

  delete_dialog(e: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'confirm') {
        e['isDelete'] = !e['isDelete'];
        this.delete_group_onerec(e);
      }
    })
  }

  
  selectTableRow(row: any) {
    this.selectedTableRecord = row;
    this.dataSourcee.data= this.selectedTableRecord.node
  }

   // delete group
   delete_node() {

    this.selectionn.selected.forEach(node => {
      let formData = {
        rec_id: node.rec_id
      }

      this.service_deletenode.service_delete_node(formData).then(res => {
        console.log(res);

        this.openSnackBar(res['message'], '', 4000);

        // recall refresh
      //  this.get_group_list(true);

      })
    })
    // !important: clear all the current selections after delete requests
    this.selectionn.clear();
  }

  ngOnInit(): void {
    // get the data table on init.
    this.get_group_list(false);

    // end
  };
  authorize(role) {
    return this.service_authorize.service_authorize_user(role);
  }
}
