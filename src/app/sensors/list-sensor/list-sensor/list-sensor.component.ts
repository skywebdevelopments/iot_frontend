import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListSensorService } from '../../../service/sensor/list-sensor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatSortable } from '@angular/material/sort';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

export interface sensorElement {
  mac_address: "text",
  client_id: "text",
  active: "boolean",
  ota_password: "text",
  sensor_type: "text",
  static_ip: "text",
  dns1: "text",
  dns2: "text",
  gateway: "text",
  subnet: "text",
  serial_number: "text",
  sleep_time: "number",
  ap_name: "text",
  ap_ip: "text",
  ap_password: "text",
  node_profile: "number",
  host_ip: "text",
  board_name: "text",
  board_model: "text",
  sim_serial: "text",
  sim_msidm: "text",
  flags: "text",
  mqttUserId: "number",

}

const TABLE_SCHEMA = {
  "isEdit": "isEdit",
  "isDelete":"isDelete"
}
// to be filled from the service
const ELEMENT_DATA: sensorElement[] = [];

@Component({
  selector: 'app-list-sensor',
  templateUrl: './list-sensor.component.html',
  styleUrls: ['./list-sensor.component.css']
})
export class ListSensorComponent implements OnInit {
 // form controls.
 enable_save_all = false
 form_updateGroup: any;
 replace_with_input = false;
 // end
  displayedColumns: string[] =
    [ 'select',
      'mac_address',
      'client_id',
      'active',
      'ota_password',
      'sensor_type',
      'static_ip',
      'dns1',
      'dns2',
      'gateway',
      'subnet',
      'serial_number',
      'sleep_time',
      'ap_name',
      'ap_ip',
      'ap_password',
      'node_profile',
      'host_ip',
      'board_name',
      'board_model',
      'sim_serial',
      'sim_msidm',
      'flags',
      'mqttUserId',
      'isEdit',
      'isDelete'];

  dataSource = new MatTableDataSource<sensorElement>(ELEMENT_DATA);
  selection = new SelectionModel<sensorElement>(true, []);

  dataSchema = TABLE_SCHEMA;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }
  constructor(
    private service_listSensor: ListSensorService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog
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
  checkboxLabel(row?: sensorElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.mac_address}`;
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  openDialog() {
    this.dialog.open(ListSensorComponent);
  }
  
  // get Sensor list
  get_sensor_list(showSnackBar: boolean) {
    this.service_listSensor.service_list_sensor().then(res => {
      // add data to the table (data source)
      this.dataSource.data = res['data']
      // control the sort
      // TODO: switch to an input
      this.sort.sort({ id: 'client_id', start: 'asc' } as MatSortable)
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
  delete_group() { }

  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }

  // log event (test)
  enable_edit_mode() {}
  edit_group(e: any) {}
  submit_all() {}
  ngOnInit(): void {
    // get the data table on init.
    this.get_sensor_list(false);
    // end
  }

}
