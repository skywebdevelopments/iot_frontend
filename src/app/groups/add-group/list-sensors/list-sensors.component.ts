import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListSensorService } from '../../../service/sensor/list-sensor.service';
import { MapGroupSensorService } from '../../../service/group/map-group-sensor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizeRoleService } from 'src/app/service/user/authorize-role.service';

export interface nodeElement {
  friendly_name: "text",
  board_name: "text",
  board_model: "text",
  rec_id: "text"

}

// to be filled from the service
const ELEMENT_DATA: nodeElement[] = [];

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
    'friendly_name',
    'board_name',
    'board_model'];

  dataSource = new MatTableDataSource<nodeElement>(ELEMENT_DATA);
  selection = new SelectionModel<nodeElement>(true, []);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }
  constructor(
    private service_listSensor: ListSensorService,
    private service_mapSensor: MapGroupSensorService,
    private service_authorize: AuthorizeRoleService,
    private _snackBar: MatSnackBar,
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
  checkboxLabel(row?: nodeElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.friendly_name}`;
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  // get Sensor list
  get_node_list(showSnackBar: boolean) {
    this.service_listSensor.service_list_sensor().then(res => {
      //check if list is not empty
      if (res['data']) {
        // add data to the table (data source)
        this.dataSource.data = res['data']
        this.isEmpty = false;
        // control the sort
        // TODO: switch to an input
        this.sort.sort({ id: 'friendly_name', start: 'asc' } as MatSortable)
        this.dataSource.sort = this.sort;
        // end
      }
      else {
        this.dataSource.data = [];
        this.isEmpty = true;
        this.openSnackBar("No nodes available", "Ok", 2000);
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
    this.selection.selected.forEach(Node_data => {
      this.formData["nodeId"] = Node_data['id'];
      this.formData["rec_id"] = this.id;
      this.service_mapSensor.service_assign_sensor(this.formData).then(res => {
        this.openSnackBar("Nodes assigned successfully ", "Ok", 2000);
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
