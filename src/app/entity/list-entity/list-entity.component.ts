import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListEntityService } from '../../service/entity/list-entity.service';
import { DeleteEntityService } from '../../service/entity/delete-entity.service';
import { UpdateEntityService } from '../../service/entity/update-entity.service';
import { AddEntityService } from '../../service/entity/add-entity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatSortable } from '@angular/material/sort';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthorizeRoleService } from '../../service/user/authorize-role.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface EntityElement {
  type: "text",
  rec_id: "text",
  name: "text",
}

const TABLE_SCHEMA = {
  "isEdit": "isEdit",
  "isDelete": "isDelete"
}
// to be filled from the service
const ELEMENT_DATA: EntityElement[] = [];

@Component({
  selector: 'app-list-entity',
  templateUrl: './list-entity.component.html',
  styleUrls: ['./list-entity.component.css']
})
export class ListEntityComponent implements OnInit {
  enable_save_all = false
  form_updateentity: any;
  replace_with_input = false;
  authorized: boolean;
  Formentity: FormGroup;
  formData: any;

  displayedColumns: string[] = ['select', 'type', 'name', 'isEdit', 'isDelete'];
  dataSource = new MatTableDataSource<EntityElement>(ELEMENT_DATA);
  selection = new SelectionModel<EntityElement>(true, []);

  dataSchema = TABLE_SCHEMA;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }
  constructor(
    private service_listentity: ListEntityService,
    private service_deleteentity: DeleteEntityService,
    private service_updateentity: UpdateEntityService,
    private formBuilder: FormBuilder,
    private service_addentity: AddEntityService,

    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private service_authorize: AuthorizeRoleService,

    private dialog: MatDialog,
  ) { }

  init_form() {
    this.Formentity = this.formBuilder.group({
      // validators 
      // Min length 4  
      // required.
      type: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])]
    });
  }

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
  checkboxLabel(row?: EntityElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
  }
  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }


  // get entity list
  get_entity_list(showSnackBar: boolean) {
    this.service_listentity.service_list_entity().then(res => {
      if (res['data']) {
        // add data to the table (data source)
        this.dataSource.data = res['data']
        this.sort.sort({ id: 'type', start: 'asc' } as MatSortable)
        this.dataSource.sort = this.sort;
      }
      else {
        this.dataSource.data = [];
        this.openSnackBar("list is Empty!", "Ok", 2000);
      }
    });
  };

  // UI Functions
  isBool(val): boolean { return typeof val === 'boolean'; }

  // delete entity
  delete_entity() {
    this.selection.selected.forEach(sensor_type => {
      let formData = {
        rec_id: sensor_type.rec_id
      }
      this.service_deleteentity.service_delete_entity(formData).then(res => {
        this.openSnackBar(res['status'], '', 4000);
        // recall refresh
        this.get_entity_list(true);
      })
    })
    // !important: clear all the current selections after delete requests
    this.selection.clear();
  }

  // log event (test)
  enable_edit_mode() {
    this.replace_with_input = !this.replace_with_input;
  }

  edit_entity(e: any) {
    let rec_id = e.rec_id
    this.dataSource.data.forEach(item => {

      this.form_updateentity = this.fb.group({
        type: [item.type, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
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
        this.service_updateentity.service_update_entity(item).then(res => {
          // 1. delete the flag
          delete item['isEdit']
          this.openSnackBar(res['status'], '', 2000)
          this.enable_save_all = false;

        })
      }
      //this.enable_save_all = false;
    })
  }

  // delete entity
  delete_entity_onerec(e: any) {
    if (e['isDelete'] !== undefined && e['isDelete'] == true) {
      // 1. delete the flag
      delete e['isDelete']
      this.service_deleteentity.service_delete_entity(e).then(res => {
        console.log(res);
        this.openSnackBar(res['status'], '', 4000);
        // recall refresh
        this.get_entity_list(true);
      })
    }
  }

  delete_dialog(e: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'confirm') {
        e['isDelete'] = !e['isDelete'];
        this.delete_entity_onerec(e);
      }
    })
  }


  //Create entity
  save_entity() {
    if (this.Formentity.valid) {
      console.log(this.Formentity)
      this.formData = this.Formentity.value
      console.log(this.formData)
      this.service_addentity.service_add_entity(this.formData).then(res => {
        this.openSnackBar(res['status'], "Ok", 2000);
        this.Formentity.reset();
      })
    }
    else {
      this.openSnackBar("Invalid value", "Ok", 2000);
    }
  }

  //End


  ngOnInit(): void {
    this.init_form();
    this.get_entity_list(false);
  }
  authorize(role) {
    return this.service_authorize.service_authorize_user(role);
  }
}

