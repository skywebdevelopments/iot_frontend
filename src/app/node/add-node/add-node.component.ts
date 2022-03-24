import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddNodeService } from '../../service/node/add-node.service';
import { ListMqqtUserService } from '../../service/node/list-mqqt-user.service';
import { ListEntityService } from '../../service/entity/list-entity.service';
import { ErrorDialogComponent } from '../../node/error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent implements OnInit {

// form vars.
form_AddNode: any;
authorized = false;
isLinear = true;
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
thirdFormGroup: FormGroup;
formData: any;
mqtt: any;
entity: any;
selectedFile: File;
file_input: any;
fault_input = {};
// end
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service_addNode: AddNodeService,
    private service_ListMqtt_User: ListMqqtUserService,
    private service_entity: ListEntityService,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  init_form() {

    this.firstFormGroup = this._formBuilder.group({
      mac_address: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$')
      ])],
      // validators 
      // Min length 4 
      // required.
      client_id: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      // validators 
      // Min length 4 
      // required.
      friendly_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      active: [
        false,
      ],

      // validators 
      // Min length 4  
      // required.
     entityId: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
      ])],
      // validators 
      // Min length 4  
      // required.
      serial_number: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],

    });
    this.secondFormGroup = this._formBuilder.group({
      // validators 
      // pattern 
      // required.
      static_ip: ['', Validators.compose([
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'),
        Validators.required,
      ])],
      // validators 
      // Min length 4  
      // required.
      dns1: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      // validators 
      // Min length 4  
      // required.
      dns2: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      // validators 
      // Min length 4  
      // required.
      gateway: ['', Validators.compose([
        Validators.minLength(4),
        Validators.required,
      ])],
      // validators 
      // Min length 4  
      // required.
      subnet: ['', Validators.compose([
        Validators.minLength(4),
        Validators.required,
      ])],

      // validators 
      //Type Number
      // Min length 3 
      // required.
      sleep_time: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      // validators 
      // pattern  
      // required.
      host_ip: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
      ])],
      // validators 
      // Min length 4  
      // required.
      sim_serial: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      // validators 
      // Min length 4  
      // required.
      ota_password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
      // validators 
      // pattern  
      // required.
      sim_msidm: ['', Validators.compose([
        Validators.required,

        Validators.pattern('[0-9]{11}')
      ])],
      // validators 
      // Min length 4  
      // required.
      flags: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],

    });
    this.thirdFormGroup = this._formBuilder.group({
      // validators 
      // Min length 4  
      // required.
      ap_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      // validators 
      // pattern  
      // required.
      ap_ip: ['', Validators.compose([
        Validators.required,
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
      ])],
      // validators 
      // Min length 4  
      // required.
      ap_password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      // validators 
      //Type number
      // Min length 3  
      // required.
      node_profile: [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      // validators 
      //Type number
      // Min length 1  
      // required.
      mqttUserId: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
      ])],
      // validators 
      // Min length 4  
      // required.
      board_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      board_model: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],

    })
  }

  save_node() {
    // check the form is valid 
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      // submit the form
      this.formData = Object.assign(this.firstFormGroup.value,
        this.secondFormGroup.value,
        this.thirdFormGroup.value)

      //  console.log(this.formData)
      this.service_addNode.service_add_node(this.formData).then(res => {
        //  console.log(this.formData)
        this.openSnackBar(res['status']['message'], "Ok", 4000);
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this.thirdFormGroup.reset();
      })
    }
    else {
      this.openSnackBar("invalid form values", "Ok", 4000);
    }
  }
  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);
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
    var sensorType = []
    this.service_entity.service_list_entity().then(res => {
      res['data'].forEach(function (sensor_type) {
        sensorType.push(sensor_type)
      });
    });
    return sensorType;
  }


  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {

      try {
        this.file_input = JSON.parse(fileReader.result as string);
      } catch {
        alert("Invalid Json file formate");
      }

      for (var key in this.file_input) {
        var each_sensor = this.file_input[key];
        this.service_addNode.service_add_node(each_sensor).then(res => {
          if (res['code'] === 2102) {


            this.fault_input[res['client_id']] = res['data'];
            this.openDialog(this.fault_input)

          }
          else {
            this.openSnackBar('Node(s) are added', "OK", 4000);
          }
        }).catch(err => {
          console.log(err)
        })
      }

    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  openDialog(fault_input) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        fault_input
      },
    }).afterClosed().subscribe(res => {
      window.location.reload();
    });
  }
  ngOnInit(): void {
    // init_form on page load
    this.init_form();
    this.mqtt = this.Get_mqqtuser();
    this.entity = this.Get_entity();
  }
}
