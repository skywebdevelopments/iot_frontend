import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListSensorService } from '../../../service/sensor/list-sensor.service';
import { UpdateSensorService } from '../../../service/sensor/update-sensor.service';
import { DeleteSensorService } from '../../../service/sensor/delete-sensor.service';
import { MapGroupSensorService } from '../../../service/group/map-group-sensor.service';
import { ListMqqtUserService } from '../../../service/sensor/list-mqqt-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatSortable } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ListSensorComponent } from 'src/app/sensors/list-sensor/list-sensor/list-sensor.component';
import { AuthorizeRoleService } from 'src/app/service/user/authorize-role.service';

export interface sensorElement {
  mac_address: "text",
  client_id: "text",
  active: "boolean",
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
  selector: 'app-list-sensors',
  templateUrl: './list-sensors.component.html',
  styleUrls: ['./list-sensors.component.css']
})
export class ListSensorsComponent implements OnInit {
  @Input() id: any;
  name: any
  formData = {};
  isEmpty = true;
  displayedColumns: string[] =
    ['select',
      'mac_address',
      'client_id',
      'active',
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
      'node_profile',
      'host_ip',
      'board_name',
      'board_model',
      'sim_serial',
      'sim_msidm',
      'flags',
      'mqtt_user'];

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
    private service_mapSensor: MapGroupSensorService,
    private service_ListMqtt_User: ListMqqtUserService,
    private service_authorize: AuthorizeRoleService,
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
        this.isEmpty = false;
        // control the sort
        // TODO: switch to an input
        this.sort.sort({ id: 'client_id', start: 'asc' } as MatSortable)
        this.dataSource.sort = this.sort;
        // end
      }
      else {
        this.dataSource.data = [];
        this.isEmpty = true;
        this.openSnackBar("No sensors available", "Ok", 2000);
      }

    });
  };

  // UI Functions
  isBool(val): boolean { return typeof val === 'boolean'; }
  // end

  openSnackBar(message: string, action: string, interval: number) {
    let snackBarRef=this._snackBar.open(message, action);
    snackBarRef.onAction().subscribe(() => {
      window.location.reload()
    });
    setTimeout(() => {
      this._snackBar.dismiss()
    }, interval);
  }

  assign_sensors() {
    this.selection.selected.forEach(Sensor_data => {
      this.formData["sensorId"] = Sensor_data['id'];
      this.formData["rec_id"] = this.id;
      console.log(this.formData)
      this.service_mapSensor.service_assign_sensor(this.formData).then(res => {
        this.openSnackBar("Sensors assigned successfully ", "Ok", 2000);
      }).catch((err) => {
        this.openSnackBar(err, "Ok", 2000);
      })
    })
  }

  authorize(role) {
    return this.service_authorize.service_authorize_user(role);
  }

  ngOnInit(): void {
    // get the data table on init.
   // this.get_sensor_list(false);

    // end

  }

}
