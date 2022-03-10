import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SensorTypeService } from '../../service/sensor/sensor-type.service';
import { DeleteSensorTypeService } from '../../service/sensor-type/delete-sensor-type.service';
import { UpdateSensorTypeService } from '../../service//sensor-type/update-sensor-type.service';
import { AddSensorTypeService } from '../../service/sensor-type/add-sensor-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatSortable } from '@angular/material/sort';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthorizeRoleService } from '../../service/user/authorize-role.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface sensortypeElement {
  type: "text",
  rec_id: "text"
}

const TABLE_SCHEMA = {
  "isEdit": "isEdit",
  "isDelete": "isDelete"
}
// to be filled from the service
const ELEMENT_DATA: sensortypeElement[] = [];

@Component({
  selector: 'app-list-sensor-type',
  templateUrl: './list-sensor-type.component.html',
  styleUrls: ['./list-sensor-type.component.css']
})
export class ListSensorTypeComponent implements OnInit {

  enable_save_all = false
  form_updatesensor_type: any;
  replace_with_input = false;
  authorized: boolean;
  Formsensor: FormGroup;
  formData: any;

  displayedColumns: string[] = ['select', 'type', 'isEdit', 'isDelete'];
  dataSource = new MatTableDataSource<sensortypeElement>(ELEMENT_DATA);
  selection = new SelectionModel<sensortypeElement>(true, []);

  dataSchema = TABLE_SCHEMA;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }

  constructor(
    private service_listsensortype: SensorTypeService,
    private service_deletesensortype: DeleteSensorTypeService,
    private service_updatesensortype: UpdateSensorTypeService,
    private formBuilder: FormBuilder,
    private service_add_sensor_type: AddSensorTypeService,

    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private service_authorize: AuthorizeRoleService,

    private dialog: MatDialog,
  ) { }

  init_form() {
    this.Formsensor = this.formBuilder.group({
      // validators 
      // Min length 4  
      // required.
      type: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      active:[false]
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
  checkboxLabel(row?: sensortypeElement): string {
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

  // get group list
  get_sensor_type_list(showSnackBar: boolean) {

    this.service_listsensortype.service_list_sensor_type().then(res => {

      if (res['data']) {
        // add data to the table (data source)
        this.dataSource.data = res['data']

        // control the sort
        // TODO: switch to an input
        this.sort.sort({ id: 'type', start: 'asc' } as MatSortable)
        this.dataSource.sort = this.sort;
        // end
        // display a notification
    
      }
      else {
        this.dataSource.data = [];
        this.openSnackBar("list is Empty!", "Ok", 2000);

      }
    });
  };

  // UI Functions
  isBool(val): boolean { return typeof val === 'boolean'; }

  // delete group
  delete_sensor_type() {

    this.selection.selected.forEach(sensor_type => {
      let formData = {
        rec_id: sensor_type.rec_id
      }

      this.service_deletesensortype.service_delete_sensor_type(formData).then(res => {
        console.log(res);

        this.openSnackBar(res['data']['message'], '', 4000);

        // recall refresh
        this.get_sensor_type_list(true);

      })
    })
    // !important: clear all the current selections after delete requests
    this.selection.clear();
  }

  // log event (test)
  enable_edit_mode() {
    this.replace_with_input = !this.replace_with_input;
  }

  edit_sensor_type(e: any) {
    let rec_id = e.rec_id
    this.dataSource.data.forEach(item => {

      this.form_updatesensor_type = this.fb.group({
        name: [item.type, Validators.compose([
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
        this.service_updatesensortype.service_update_sensor_type(item).then(res => {
          // 1. delete the flag
          delete item['isEdit']
          this.openSnackBar(`Saved successfully`, '', 2000)
          this.enable_save_all = false;

        })
      }
      //this.enable_save_all = false;
    })
  }

  // delete sensor type
  delete_sensor_type_onerec(e: any) {
    if (e['isDelete'] !== undefined && e['isDelete'] == true) {
      // 1. delete the flag
      delete e['isDelete']
      this.service_deletesensortype.service_delete_sensor_type(e).then(res => {
        console.log(res);
        this.openSnackBar(res['data']['message'], '', 4000);
        // recall refresh
        this.get_sensor_type_list(true);
      })
    }
  }

  delete_dialog(e: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'confirm') {
        e['isDelete'] = !e['isDelete'];
        this.delete_sensor_type_onerec(e);
      }
    })
  }


  //Create Sensor-type
  save_sensor_type() {
    console.log('heyyy')
    if (this.Formsensor.valid) {
      console.log(this.Formsensor)
      this.formData = this.Formsensor.value
      console.log(this.formData)
      this.service_add_sensor_type.service_add_sensor_type(this.formData).then(res => {
        this.openSnackBar(res['status']['message'], "Ok", 2000);
        this.Formsensor.reset();
      })
    }
    else {
      this.openSnackBar("Invalid value", "Ok", 2000);
    }
  }

  //End


  ngOnInit(): void {
    this.init_form();
    this.get_sensor_type_list(false);
  }
  authorize(role) {
    return this.service_authorize.service_authorize_user(role);
  }
}
