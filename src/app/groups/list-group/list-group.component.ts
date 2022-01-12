import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListGroupService } from '../../service/group/list-group.service';
import { DeleteGroupService } from '../../service/group/delete-group.service';
import { UpdateGroupService } from '../../service/group/update-group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatSortable } from '@angular/material/sort';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { VerifyTokenService } from '../../service/user/verify-token.service';

export interface groupElement {
  name: "text",
  active: "boolean",
  rec_id: "text"
}

const TABLE_SCHEMA = {
  "isEdit": "isEdit"
}
// to be filled from the service
const ELEMENT_DATA: groupElement[] = [];
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
  authorized:boolean;
  // end


  displayedColumns: string[] = ['select', 'name', 'active', 'isEdit'];
  dataSource = new MatTableDataSource<groupElement>(ELEMENT_DATA);
  selection = new SelectionModel<groupElement>(true, []);


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
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private service_verifyToken: VerifyTokenService

  ) { }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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

        this.openSnackBar(res['data']['message'], '', 4000);

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
          // 1. delete the flag
        delete item['isEdit']
        // 2. post to the update API
        this.service_updateGroup.service_update_group(item).then(res=>{
          this.openSnackBar(`Saved successfully`,'',2000)
        })
        
      }
      this.enable_save_all = false;
    })
  
  }

    
  check_authorization(){
    this.service_verifyToken.verify_token().then(res => {
      this.authorized=true;
    }).catch((err) => {
      if (err.status === 401) {
        this.authorized=false;
      }
    })
  }


  ngOnInit(): void {
    // get the data table on init.
    this.get_group_list(false);
    this.check_authorization();

    
    // end
  };

}
