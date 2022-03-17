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
import { AuthorizeRoleService } from '../../../service/user/authorize-role.service'
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';
import { ListMqqtUserService } from '../../../service/sensor/list-mqqt-user.service';

import { SensorTypeService } from '../../../service/sensor/sensor-type.service';

export interface sensorElement {
  mac_address: "text",
  client_id: "text",
  active: "boolean",
  static_ip: "text",
  dns1: "text",
  dns2: "text",
  gateway: "text",
  subnet: "text",
  serial_number: "text",
  sleep_time: "number",
  ap_name: "text",
  ap_ip: "text",
  node_profile: "number",
  host_ip: "text",
  board_name: "text",
  board_model: "text",
  sim_serial: "text",
  sim_msidm: "text",
  flags: "text",
  mqttUserId: "number",
  sensortypeId: "number",
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
  authorized = false;
  mqtt: any;
  sensor_typee: any;
  selectedTableRecord: any;
  // end
  displayedColumns: string[] =
    ['select',
      'board_name',
      'board_model',
      'sensor_type',
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
    private service_authorize: AuthorizeRoleService,
    private service_ListMqtt_User: ListMqqtUserService,
    private service_sensor_type: SensorTypeService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog
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
      //check if list is not empty
      if (res['data']) {
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
      } else {
        this.dataSource.data = []
        this.openSnackBar("list is empty", "Ok", 2000);
      }


    }).catch(err => {
      this.openSnackBar(err, "Ok", 4000);
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
          Validators.required,
          Validators.pattern('^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$')
        ])],

        client_id: [item.client_id, Validators.compose([
          Validators.required,
          Validators.minLength(4),
        ])],
        sensortypeId: [item.sensortypeId, Validators.compose([
          Validators.required,
          Validators.minLength(1),
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
          Validators.pattern('[0-9]{11}')
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
          this.get_sensor_list(true);
        })

      }
      this.enable_save_all = false;
    })
  }


  // delete sensor
  delete_sensor_onerec(e: any) {
    if (e['isDelete'] !== undefined && e['isDelete'] == true) {
      // 1. delete the flag
      delete e['isDelete']
      this.service_deleteSensor.service_delete_sensor(e).then(res => {
        console.log(res);
        this.openSnackBar(res['data']['message'], '', 4000);
        // recall refresh
        this.get_sensor_list(true);
      })
    }
  }

  authorize(role) {
    return this.service_authorize.service_authorize_user(role);
  }
  delete_dialog(e: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'confirm') {
        e['isDelete'] = !e['isDelete'];
        this.delete_sensor_onerec(e);
      }
    })
  }

  Get_mqqtuser() {
    var mqtt_User = []
    this.service_ListMqtt_User.service_list_mqttUser().then(res => {
      res['data'].forEach(function (mqtt_user) {
        mqtt_User.push(mqtt_user)
      });
    });
    return mqtt_User;
  }

  Get_sensorType() {
    var sensorType = []
    this.service_sensor_type.service_list_sensor_type().then(res => {
      res['data'].forEach(function (sensor_type) {
        sensorType.push(sensor_type)
      });
    });
    return sensorType;
  }

  selectTableRow(row:any){
    this.selectedTableRecord = row;
  }

  ngOnInit(): void {
    // get the data table on init.
    this.get_sensor_list(false);
    this.mqtt = this.Get_mqqtuser();
    this.sensor_typee = this.Get_sensorType();
    // end
  }

}
