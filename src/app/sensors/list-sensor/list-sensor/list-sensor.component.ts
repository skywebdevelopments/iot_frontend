import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListSensorService } from '../../../service/sensor/list-sensor.service';
import { UpdateSensorService } from '../../../service/sensor/update-sensor.service';
import { DeleteSensorService } from '../../../service/sensor/delete-sensor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatSortable } from '@angular/material/sort';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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
  rec_id: "text"

}

const TABLE_SCHEMA = {
  "isEdit": "isEdit",
  "isDelete": "isDelete"
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
  form_updateSensor: any;
  replace_with_input = false;
  // end
  displayedColumns: string[] =
    ['select',
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
    private service_updateSensor: UpdateSensorService,
    private service_deleteSensor: DeleteSensorService,
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

  // delete sensor
  delete_sensor() { 
    
    this.selection.selected.forEach(sensor => {
      let formData = {
        rec_id: sensor.rec_id
      }

      this.service_deleteSensor.service_delete_sensor(formData).then(res => {
        console.log(res);

        this.openSnackBar(res['data']['message'], '', 4000);

        // recall refresh
        this.get_sensor_list(true);

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
  edit_sensor(e: any) {

    let rec_id = e.rec_id
    this.dataSource.data.forEach(item => {

      this.form_updateSensor = this.fb.group({
        mac_address: [item.mac_address, Validators.compose([
          Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'),
          Validators.required
        ])],

        client_id: [item.client_id, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        ota_password: [item.ota_password, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        sensor_type: [item.sensor_type, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        static_ip: [item.static_ip, Validators.compose([
          Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'),
          Validators.required,
        ])],
        dns1: [item.dns1, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        dns2: [item.dns2, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        gateway: [item.gateway, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        subnet: [item.subnet, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        serial_number: [item.serial_number, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        sleep_time: [item.sleep_time, Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ])],
        ap_name: [item.ap_name, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        ap_ip: [item.ap_ip, Validators.compose([
          Validators.required,
          Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
        ])],
        ap_password: [item.ap_password, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        node_profile: [item.node_profile, Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ])],
        host_ip: [item.host_ip, Validators.compose([
          Validators.required,
          Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
        ])],
        board_name: [item.board_name, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        board_model: [item.board_model, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        sim_serial: [item.sim_serial, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        sim_msidm: [item.sim_msidm, Validators.compose([
          Validators.required,
          Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
        ])],
        flags: [item.flags, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        mqttUserId: [item.mqttUserId, Validators.compose([
          Validators.required,
          Validators.minLength(1),
        ])]
      });
    });
  }
  submit_all() {
    // flag the 
    this.dataSource.data.forEach(item => {
      if (item['isEdit'] !== undefined && item['isEdit'] == true) {
        // 1. delete the flag
        delete item['isEdit']
        // 2. post to the update API
        this.service_updateSensor.service_update_sensor(item).then(res => {
          this.openSnackBar(`Saved successfully`, '', 2000)
        })

      }
      this.enable_save_all = false;
    })
  }

  
  // delete sensor
  delete_sensor_onerec(e:any) { 
    
    let rec_id = e.rec_id

      this.service_deleteSensor.service_delete_sensor(e).then(res => {
        console.log(res);

        this.openSnackBar(res['data']['message'], '', 4000);
        // recall refresh
        this.get_sensor_list(true);
      })
  }


  ngOnInit(): void {
    // get the data table on init.
    this.get_sensor_list(false);
    // end
  }

}
