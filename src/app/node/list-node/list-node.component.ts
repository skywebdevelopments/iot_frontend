import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListNodeService } from '../../service/node/list-node.service';
import { UpdateNodeService } from '../../service/node/update-node.service';
import { DeleteNodeService } from '../../service/node/delete-node.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatSortable } from '@angular/material/sort';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizeRoleService } from '../../service/user/authorize-role.service'
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { ListMqqtUserService } from '../../service/node/list-mqqt-user.service';
import { ListGroupService } from '../../service/n_group/list-group.service';
import { ListEntityService } from '../../service/entity/list-entity.service';
import { MapGroupSensorService } from '../../service/n_group/map-group-sensor.service';

export interface nodeElement {
  mac_address: "text",
  friendly_name: "text",
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
  mqttuserId: "number",
  entityId: "number",
  rec_id: "text"
}

const TABLE_SCHEMA = {
  "isEdit": "isEdit",
  "isDelete": "isDelete"
}
// to be filled from the service
const ELEMENT_DATA: nodeElement[] = [];

@Component({
  selector: 'app-list-node',
  templateUrl: './list-node.component.html',
  styleUrls: ['./list-node.component.css']
})
export class ListNodeComponent implements OnInit {

  // form controls.
  enable_save_all = false
  form_updateNode: any;
  formData = {}
  formDataa: any
  replace_with_input = false;
  authorized = false;
  mqtt: any;
  group: any;
  entity: any;
  selectedTableRecord: any;
  selectedTableRecorde: any;
  selected = '';
  // end
  displayedColumns: string[] =
    ['select',
      'friendly_name',
      'board_model',
      'board_name',
      'isEdit',
      'isDelete'];

  dataSource = new MatTableDataSource<nodeElement>(ELEMENT_DATA);
  selection = new SelectionModel<nodeElement>(true, []);

  dataSchema = TABLE_SCHEMA;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }
  constructor(
    private service_listNode: ListNodeService,
    private service_updateNode: UpdateNodeService,
    private service_deleteNode: DeleteNodeService,
    private service_authorize: AuthorizeRoleService,
    private service_ListMqtt_User: ListMqqtUserService,
    private service_entity: ListEntityService,
    private service_mapSensor: MapGroupSensorService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private service_listGroup: ListGroupService
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.mac_address}`;
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  // get Node list
  get_node_list(showSnackBar: boolean) {
    this.service_listNode.service_list_node().then(res => {
      console.log(res['data'])
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

  // delete node
  delete_node() {
    this.selection.selected.forEach(node => {
      let formData = {
        rec_id: node.rec_id
      }

      this.service_deleteNode.service_delete_node(formData).then(res => {
        console.log(res);
        this.openSnackBar(res['data']['message'], '', 4000);
        // recall refresh
        this.get_node_list(true);

      })
    })
    // !important: clear all the current selections after delete requests
    this.selection.clear();
    location.reload();

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
  edit_node(selectedTableRecord: any) {
    this.form_updateNode = this.fb.group({
      mac_address: [selectedTableRecord.mac_address, Validators.compose([
        Validators.pattern('^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$')
      ])],

      client_id: [selectedTableRecord.client_id, Validators.compose([
        Validators.minLength(4),
      ])],
      entityId: [selectedTableRecord.entityId, Validators.compose([
        Validators.minLength(1),
      ])],
      static_ip: [selectedTableRecord.static_ip, Validators.compose([
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'),
      ])],
      dns1: [selectedTableRecord.dns1, Validators.compose([
        Validators.minLength(4),
      ])],
      dns2: [selectedTableRecord.dns2, Validators.compose([
        Validators.minLength(4),
      ])],
      gateway: [selectedTableRecord.gateway, Validators.compose([
        Validators.minLength(4),
      ])],
      subnet: [selectedTableRecord.subnet, Validators.compose([
        Validators.minLength(4),
      ])],
      serial_number: [selectedTableRecord.serial_number, Validators.compose([
        Validators.minLength(4),
      ])],
      sleep_time: [selectedTableRecord.sleep_time, Validators.compose([
        Validators.minLength(3),
      ])],
      ap_name: [selectedTableRecord.ap_name, Validators.compose([
        Validators.minLength(4),
      ])],
      ap_ip: [selectedTableRecord.ap_ip, Validators.compose([

        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
      ])],

      node_profile: [selectedTableRecord.node_profile, Validators.compose([

        Validators.minLength(3),
      ])],
      host_ip: [selectedTableRecord.host_ip, Validators.compose([

        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
      ])],
      board_name: [selectedTableRecord.board_name, Validators.compose([

        Validators.minLength(4),
      ])],
      board_model: [selectedTableRecord.board_model, Validators.compose([

        Validators.minLength(4),
      ])],
      sim_serial: [selectedTableRecord.sim_serial, Validators.compose([

        Validators.minLength(4),
      ])],
      sim_msidm: [selectedTableRecord.sim_msidm, Validators.compose([

        Validators.pattern('[0-9]{11}')
      ])],
      flags: [selectedTableRecord.flags, Validators.compose([

        Validators.minLength(4),
      ])],
      mqttuserId: [selectedTableRecord.mqttuserId, Validators.compose([

        Validators.minLength(1),
      ])],
      rec_id: [selectedTableRecord.rec_id, Validators.compose([
        Validators.minLength(1),
      ])],
      ota_password: [selectedTableRecord.ota_password, Validators.compose([
        Validators.minLength(1),
      ])],
      ap_password: [selectedTableRecord.ap_password, Validators.compose([
        Validators.minLength(1),
      ])],
      active: [selectedTableRecord.active],
      friendly_name: [selectedTableRecord.friendly_name, Validators.compose([
        Validators.minLength(1),
      ])]
    });

  }
  submit_all() {
    this.service_updateNode.service_update_node(this.form_updateNode.value).then(res => {
      this.openSnackBar(`Saved successfully`, '', 2000)
      this.get_node_list(true);
    })
    location.reload();
    this.enable_save_all = false;
  }


  // delete node
  delete_node_onerec(e: any) {
    if (e['isDelete'] !== undefined && e['isDelete'] == true) {
      // 1. delete the flag
      delete e['isDelete']
      this.service_deleteNode.service_delete_node(e).then(res => {
        console.log(res);
        this.openSnackBar(res['data']['message'], '', 4000);
        // recall refresh
        this.get_node_list(true);
      })
    }
    location.reload();
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
        this.delete_node_onerec(e);
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

  Get_entity() {
    var Entity = []
    this.service_entity.service_list_entity().then(res => {
      res['data'].forEach(function (entity) {
        Entity.push(entity)
      });
    });
    return Entity;
  }

  selectTableRow(row: any) {
    this.selectedTableRecord = row;

  }

  selectTableRowe(row: any) {

    this.selectedTableRecorde = row;
    console.log(this.selectedTableRecorde)

  }

  // get group list
  get_group_list() {
    var group = []
    this.service_listGroup.service_list_group().then(res => {
      res['data'].forEach(function (group_name) {
        group.push(group_name)
      });
    });
    return group;
  };

  assign_nodes() {

    this.selection.selected.forEach(node_data => {
      this.formData["nodeId"] = node_data['id'];
      this.formData["rec_id"] = this.selected
      this.service_mapSensor.service_assign_sensor(this.formData).then(res => {
        this.openSnackBar("Nodes assigned successfully ", "Ok", 2000);
      }).catch((err) => {
        this.openSnackBar(err, "Ok", 2000);
      })
    })
  //  location.reload();
  }

  ngOnInit(): void {
    // get the data table on init.
    this.get_node_list(false);
    this.mqtt = this.Get_mqqtuser();
    this.entity = this.Get_entity();
    this.group = this.get_group_list();
    // end
  }

}
