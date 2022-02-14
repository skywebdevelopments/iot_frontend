import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddSensorService } from '../../../service/sensor/add-sensor.service';
import { ListMqqtUserService } from '../../../service/user/list-mqqt-user.service';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.css']
})
export class AddSensorComponent implements OnInit {

  // form vars.
  form_AddSensor: any;
  authorized = false;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  formData: any;
  mqtt: any;
  // end
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service_addSensor: AddSensorService,
    private service_ListMqtt_User: ListMqqtUserService,
    private _formBuilder: FormBuilder

  ) {

  }
  init_form() {

    this.firstFormGroup = this._formBuilder.group({
      mac_address: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$')
      ])],
      // validators 
      // Min length 4 
      // required.
      client_id: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      active: [
        false,
      ],

      // validators 
      // Min length 4  
      // required.
      sensor_type: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      // validators 
      // Min length 4  
      // required.
      serial_number: ['', Validators.compose([

        Validators.minLength(4),
      ])],

    });
    this.secondFormGroup = this._formBuilder.group({
      // validators 
      // pattern 
      // required.
      static_ip: ['', Validators.compose([
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
      ])],
      // validators 
      // Min length 4  
      // required.
      dns1: ['', Validators.compose([

        Validators.minLength(4),
      ])],
      // validators 
      // Min length 4  
      // required.
      dns2: ['', Validators.compose([

        Validators.minLength(4),
      ])],
      // validators 
      // Min length 4  
      // required.
      gateway: ['', Validators.compose([

        Validators.minLength(4),
      ])],
      // validators 
      // Min length 4  
      // required.
      subnet: ['', Validators.compose([

        Validators.minLength(4),
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

        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
      ])],
      // validators 
      // Min length 4  
      // required.
      sim_serial: ['', Validators.compose([
        Validators.minLength(4),
      ])],
      // validators 
      // Min length 4  
      // required.
      ota_password: ['', Validators.compose([
        Validators.minLength(4)
      ])],
      // validators 
      // pattern  
      // required.
      sim_msidm: ['', Validators.compose([

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

        Validators.minLength(4),
      ])],
      // validators 
      // pattern  
      // required.
      ap_ip: ['', Validators.compose([

        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
      ])],
      // validators 
      // Min length 4  
      // required.
      ap_password: ['', Validators.compose([

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

  save_sensor() {
    // check the form is valid 
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      // submit the form
      this.formData = Object.assign(this.firstFormGroup.value,
        this.secondFormGroup.value,
        this.thirdFormGroup.value)

      this.service_addSensor.service_add_sensor(this.formData).then(res => {
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

  ngOnInit(): void {
    // init_form on page load
    this.init_form();
    this.mqtt = this.Get_mqqtuser();
  }

}