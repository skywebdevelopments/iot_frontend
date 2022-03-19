import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ListMqqtUserService } from '../service/sensor/list-mqqt-user.service';
import { DeleteMqttuserService } from '../service/mqtt_user/delete-mqttuser.service';
import { UpdateMqttuserService } from '../service/mqtt_user/update-mqttuser.service';
import { AddMqttuserService } from '../service/mqtt_user/add-mqttuser.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatSortable } from '@angular/material/sort';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthorizeRoleService } from '../service/user/authorize-role.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface mqttuserElement {
  username: "text",
  rec_id: "text",
  is_superuser: "boolean",
  password: "text",
}

const TABLE_SCHEMA = {
  "isEdit": "isEdit",
  "isDelete": "isDelete"
}
const ELEMENT_DATA: mqttuserElement[] = [];

@Component({
  selector: 'app-mqtt-user',
  templateUrl: './mqtt-user.component.html',
  styleUrls: ['./mqtt-user.component.css']
})
export class MqttUserComponent implements OnInit {


  enable_save_all = false
  form_updatemqttuser: any;
  replace_with_input = false;
  authorized: boolean;
  Formmqttuser: FormGroup;
  formData: any;

  displayedColumns: string[] = ['select', 'username', 'is_superuser', 'isEdit', 'isDelete'];
  dataSource = new MatTableDataSource<mqttuserElement>(ELEMENT_DATA);
  selection = new SelectionModel<mqttuserElement>(true, []);

  dataSchema = TABLE_SCHEMA;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }


  constructor(
    private service_listmqttuser: ListMqqtUserService,
    private service_deletemqttuser: DeleteMqttuserService,
    private service_updatemqttuser: UpdateMqttuserService,
    private formBuilder: FormBuilder,
    private service_add_mqtt_user: AddMqttuserService,

    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private service_authorize: AuthorizeRoleService,

    private dialog: MatDialog,
  ) { }

  init_form() {
    this.Formmqttuser = this.formBuilder.group({
      // validators 
      // Min length 4  
      // required.
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      is_superuser: [false],
      password: ['', Validators.compose([
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
  checkboxLabel(row?: mqttuserElement): string {
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

  // get Mqttuser list
  get_mqtt_user(showSnackBar: boolean) {

    this.service_listmqttuser.service_list_mqttUser().then(res => {

      if (res['data']) {
        // add data to the table (data source)
        this.dataSource.data = res['data']

        // control the sort
        // TODO: switch to an input
        this.sort.sort({ id: 'username', start: 'asc' } as MatSortable)
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

  // delete Mqttuser
  delete_mqttuser() {

    this.selection.selected.forEach(mqttuser => {
      let formData = {
        rec_id: mqttuser.rec_id
      }

      this.service_deletemqttuser.service_delete_mqtt_user(formData).then(res => {
        console.log(res);

        this.openSnackBar(res['status'], '', 4000);

        // recall refresh
        this.get_mqtt_user(true);

      })
    })
    // !important: clear all the current selections after delete requests
    this.selection.clear();
  }

  // log event (test)
  enable_edit_mode() {
    this.replace_with_input = !this.replace_with_input;
  }

  edit_mqttuser(e: any) {
    let rec_id = e.rec_id
    this.dataSource.data.forEach(item => {

      this.form_updatemqttuser = this.fb.group({
        name: [item.username, Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])]
      });
    });
  };

  submit_all() {
    this.dataSource.data.forEach(item => {
      if (item['isEdit'] !== undefined && item['isEdit'] == true) {
        // 2. post to the update API
        this.service_updatemqttuser.service_update_mqtt_user(item).then(res => {
          // 1. delete the flag
          delete item['isEdit']
          this.openSnackBar(res['status'], '', 2000)
          this.enable_save_all = false;

        })
      }
    })
  }
  // delete Mqttuser one rec
  delete_mqttuser_onerec(e: any) {
    if (e['isDelete'] !== undefined && e['isDelete'] == true) {
      // 1. delete the flag
      delete e['isDelete']
      this.service_deletemqttuser.service_delete_mqtt_user(e).then(res => {
        console.log(res);
        this.openSnackBar(res['status'], '', 4000);
        // recall refresh
        this.get_mqtt_user(true);
      })
    }
  }

  delete_dialog(e: any) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // NOTE: The result can also be nothing if the user presses the `esc` key or clicks outside the dialog
      if (result == 'confirm') {
        e['isDelete'] = !e['isDelete'];
        this.delete_mqttuser_onerec(e);
      }
    })
  }

  //Create mqttuser
  save_mqttuser() {
    if (this.Formmqttuser.valid) {
      console.log(this.Formmqttuser)
      this.formData = this.Formmqttuser.value
      console.log(this.formData)
      this.service_add_mqtt_user.service_add_mqtt_user(this.formData).then(res => {
        this.openSnackBar(res['status'], "Ok", 2000);
        this.Formmqttuser.reset();
      })
    }
    else {
      this.openSnackBar("Invalid value", "Ok", 2000);
    }
  }
  //End

  ngOnInit(): void {
    this.init_form();
    this.get_mqtt_user(false);
  }
  authorize(role) {
    return this.service_authorize.service_authorize_user(role);
  }

}
