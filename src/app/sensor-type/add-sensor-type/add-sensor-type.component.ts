import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AddSensorTypeService } from '../../service/sensor-type/add-sensor-type.service';

@Component({
  selector: 'app-add-sensor-type',
  templateUrl: './add-sensor-type.component.html',
  styleUrls: ['./add-sensor-type.component.css']
})
export class AddSensorTypeComponent implements OnInit {

  formData: any;
  Formsensor: FormGroup;
  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private service_add_sensor_type: AddSensorTypeService
  ) { }


  init_form() {
    this.Formsensor = this.formBuilder.group({
      // validators 
      // Min length 4  
      // required.
      type: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])]
    });

  }

  //Create Sensor-type
  save_sensor_type() {
    if (this.Formsensor.valid) {
      console.log(this.Formsensor)
      this.formData = this.Formsensor.value
      console.log(this.formData)
      this.service_add_sensor_type.service_add_sensor_type(this.formData).then(res => {
        this.openSnackBar(res['status']['message'], "Ok", 2000);
        this.Formsensor.reset();
      })
    }
    else {
      this.openSnackBar("Invalid value", "Ok", 2000);
    }
  }
  openSnackBar(message: string, action: string, interval: number) {
    this._snackBar.open(message, action);
  }
  //End

  


  ngOnInit(): void {
    this.init_form();
    console.log('HE ENJY')
  }

}
