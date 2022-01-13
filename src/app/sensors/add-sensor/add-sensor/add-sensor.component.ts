import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddSensorService } from '../../../service/sensor/add-sensor.service';
import { VerifyTokenService } from '../../../service/user/verify-token.service';

@Component({
  selector: 'app-add-sensor',
  templateUrl: './add-sensor.component.html',
  styleUrls: ['./add-sensor.component.css']
})
export class AddSensorComponent implements OnInit {

  // form vars.
  form_AddSensor: any;
  authorized=false;
  // end
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private service_addSensor: AddSensorService,
    private service_verifyToken: VerifyTokenService

  ) { }
  init_form() {
    //
    // validators 
    // pattern 
    // required.
    this.form_AddSensor = this.formBuilder.group({
      mac_address: ['', Validators.compose([
        Validators.required
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
      ota_password: ['', Validators.compose([
        Validators.minLength(4)
      ])],
      // validators 
      // Min length 4  
      // required.
      sensor_type: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
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
      // Min length 4  
      // required.
      serial_number: ['', Validators.compose([
     
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
      // pattern  
      // required.
      host_ip: ['', Validators.compose([
       
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
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
      // validators 
      // Min length 4  
      // required.
      sim_serial: ['', Validators.compose([
        Validators.minLength(4),
      ])],
      // validators 
      // pattern  
      // required.
      sim_msidm: ['', Validators.compose([
      
        Validators.pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')
      ])],
      // validators 
      // Min length 4  
      // required.
      flags: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])],
      // validators 
      //Type number
      // Min length 1  
      // required.
      mqttUserId: [null, Validators.compose([
        Validators.required,
        Validators.minLength(1),
      ])]


    })
  }
  save_sensor() {
    // check the form is valid 
    if (this.form_AddSensor.valid) {
      // submit the form
      this.service_addSensor.service_add_sensor(this.form_AddSensor.value).then(res => {
        this.openSnackBar(res['status']['message'], "Ok", 4000);
        this.form_AddSensor.reset();

      })
    }
    else {
      this.openSnackBar("invalid form values", "Ok", 4000);
    }
  }
  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);
  }

   
  check_authorization(){
    this.service_verifyToken.verify_token().then(res => {
      this.authorized=true;
    }).catch((err) => {
      if (err.status === 401) {
        this.authorized=false;
      }
    })
  }

  ngOnInit(): void {
    // init_form on page load
    this.check_authorization();
    this.init_form();
  }

}
